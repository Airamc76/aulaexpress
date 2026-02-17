import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AdminUser } from '../types';
import { Trash2, Shield, RefreshCw, Smartphone, UserX, UserCheck, Search, Loader2, Key, Plus, X, Save } from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
  const [newPassword, setNewPassword] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc('get_all_users_data');
    if (error) {
      console.error('Error fetching users:', error);
      alert('Error al cargar usuarios: ' + error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const { error } = await supabase.rpc('create_user_by_admin', {
      new_email: formData.email,
      new_password: formData.password,
      new_role: formData.role
    });

    if (error) {
      alert('Error creando usuario: ' + error.message);
    } else {
      alert('Usuario creado exitosamente');
      setIsCreateOpen(false);
      setFormData({ email: '', password: '', role: 'user' });
      fetchUsers();
    }
    setActionLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;
    
    setActionLoading(true);
    const { error } = await supabase.rpc('update_user_password_by_admin', {
      target_user_id: selectedUserId,
      new_password: newPassword
    });

    if (error) {
      alert('Error actualizando contraseña: ' + error.message);
    } else {
      alert('Contraseña actualizada correctamente');
      setIsPasswordOpen(false);
      setNewPassword('');
      setSelectedUserId(null);
    }
    setActionLoading(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario permanentemente? Esta acción no se puede deshacer.')) return;
    
    const { error } = await supabase.rpc('delete_user_by_admin', { target_user_id: userId });
    if (error) alert('Error al eliminar: ' + error.message);
    else {
      alert('Usuario eliminado correctamente');
      fetchUsers();
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    const { error } = await supabase.rpc('update_user_role_by_admin', { target_user_id: userId, new_role: newRole });
    if (error) alert('Error al actualizar rol: ' + error.message);
    else fetchUsers();
  };

  const handleReset2FA = async (userId: string) => {
    if (!confirm('¿Resetear el 2FA de este usuario? Tendrá que configurarlo de nuevo.')) return;
    
    const { error } = await supabase.rpc('reset_user_2fa_by_admin', { target_user_id: userId });
    if (error) alert('Error al resetear 2FA: ' + error.message);
    else {
      alert('2FA reseteado correctamente');
      fetchUsers();
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.user_role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Shield className="text-indigo-600" size={24} />
          Gestión de Usuarios
        </h2>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
          </div>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-100 whitespace-nowrap"
          >
            <Plus size={18} /> Crear Usuario
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs font-bold text-slate-500 uppercase border-b border-gray-100">
              <th className="py-3 px-4">Usuario</th>
              <th className="py-3 px-4">Rol</th>
              <th className="py-3 px-4">Estado 2FA</th>
              <th className="py-3 px-4">Registro</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin" size={20} /> Cargando usuarios...
                  </div>
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">No se encontraron usuarios</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.user_id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{user.email}</div>
                    <div className="text-xs text-slate-400 font-mono">{user.user_id.slice(0, 8)}...</div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={user.user_role}
                      onChange={(e) => handleRoleUpdate(user.user_id, e.target.value)}
                      className={`text-xs font-bold px-2 py-1 rounded border-none focus:ring-2 focus:ring-indigo-200 cursor-pointer ${
                        user.user_role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-slate-600'
                      }`}
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    {user.is_2fa_enabled ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <Smartphone size={12} /> Activado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                        <UserX size={12} /> Inactivo
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => { setSelectedUserId(user.user_id); setIsPasswordOpen(true); }}
                        title="Cambiar Contraseña"
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Key size={16} />
                      </button>
                      {user.is_2fa_enabled && (
                        <button
                          onClick={() => handleReset2FA(user.user_id)}
                          title="Resetear 2FA"
                          className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <RefreshCw size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user.user_id)}
                        title="Eliminar usuario"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE USER MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Crear Nuevo Usuario</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Rol</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none"
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center disabled:opacity-70 mt-4"
              >
                {actionLoading ? <Loader2 className="animate-spin" /> : 'Crear Usuario'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {isPasswordOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Cambiar Contraseña</h3>
              <button onClick={() => setIsPasswordOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none"
                  required
                  minLength={6}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center disabled:opacity-70 mt-4"
              >
                {actionLoading ? <Loader2 className="animate-spin" /> : 'Actualizar Contraseña'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
