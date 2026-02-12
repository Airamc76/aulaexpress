
import React from 'react';
import { Lock, EyeOff, Server, ShieldCheck } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Política de Privacidad</h1>
        <p className="text-slate-500 mb-12 italic leading-relaxed">Tu seguridad es nuestra prioridad.</p>

        <div className="space-y-12 text-slate-700 leading-relaxed">
          <section>
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Recopilación de Datos</h2>
            </div>
            <p className="mb-4">
              Para procesar tu acceso, recopilamos únicamente los datos necesarios:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Nombre y Apellido:</strong> Para personalizar tu comprobante.</li>
              <li><strong>Email (Gmail recomendado):</strong> Para otorgarte los permisos en Google Drive.</li>
              <li><strong>País de origen:</strong> Para cumplimiento de normativas fiscales básicas.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <EyeOff className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Uso de la Información</h2>
            </div>
            <p>
              Tus datos se utilizan exclusivamente para enviarte el acceso a la biblioteca comprada, brindarte soporte técnico y notificarte sobre actualizaciones vitales de tu contenido. <strong>No vendemos ni compartimos tu información con terceros para fines publicitarios.</strong>
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <Server className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Proveedores de Servicios</h2>
            </div>
            <p>
              Utilizamos plataformas externas de alta seguridad como <strong>Mercado Pago</strong> para el procesamiento de cobros y <strong>Google Cloud/Drive</strong> para el alojamiento del contenido. Estas empresas cuentan con sus propias políticas de privacidad internacionales.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Derechos del Usuario</h2>
            </div>
            <p>
              Puedes solicitar el acceso, rectificación o eliminación de tus datos en cualquier momento enviando un correo a <strong>ayuda@aulaexpress.com</strong>. Cumplimos con normativas internacionales de protección de datos (GDPR/LGPD aplicables).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
