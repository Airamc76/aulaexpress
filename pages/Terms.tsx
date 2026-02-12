
import React from 'react';
import { Shield, Book, Globe, UserCheck } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Términos y Condiciones de Uso</h1>
        <p className="text-slate-500 mb-12 italic leading-relaxed">Última actualización: Mayo 2024</p>

        <div className="space-y-12 text-slate-700 leading-relaxed">
          <section>
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Naturaleza del Producto</h2>
            </div>
            <p className="mb-4">
              AulaExpress comercializa <strong>Acceso Privado a Bibliotecas Digitales</strong> alojadas en sistemas de almacenamiento en la nube (principalmente Google Drive). Al realizar una compra, el usuario adquiere el derecho de visualización y descarga de material educativo seleccionado.
            </p>
            <p>
              Este es un <strong>producto digital</strong>. No existe entrega de material físico, CD, USB o libros impresos. La entrega se realiza exclusivamente vía electrónica.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                <UserCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. Licencia de Uso Personal</h2>
            </div>
            <p className="mb-4">
              El acceso otorgado es <strong>personal, privado e intransferible</strong>. El usuario tiene prohibido:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Compartir las credenciales de acceso o enlaces directos con terceros.</li>
              <li>Revender el contenido de forma total o parcial.</li>
              <li>Distribuir el material en foros, redes sociales o plataformas de mensajería.</li>
              <li>Utilizar el contenido para fines comerciales sin autorización previa.</li>
            </ul>
            <p>
              Cualquier detección de uso fraudulento o distribución masiva resultará en la <strong>revocación inmediata del acceso</strong> sin posibilidad de reembolso.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Entrega y Acceso Permanente</h2>
            </div>
            <p className="mb-4">
              El acceso se entrega automáticamente tras la confirmación del pago por Mercado Pago. El comprador debe proporcionar un correo válido de <strong>Gmail</strong> para activar las invitaciones de Google Drive correctamente.
            </p>
            <p>
              AulaExpress garantiza el acceso permanente (mientras la infraestructura de Google Drive sea estable). En caso de interrupción técnica por parte del proveedor de hosting, AulaExpress proporcionará un enlace de respaldo en un plazo máximo de 48 horas hábiles.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                <Book className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Propiedad Intelectual</h2>
            </div>
            <p>
              Todo el contenido organizado en las bibliotecas digitales es propiedad de sus respectivos autores o ha sido curado por AulaExpress. La compra del acceso no otorga derechos de autor sobre el material, solo una licencia de uso para aprendizaje personal.
            </p>
          </section>
        </div>

        <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <p className="text-sm text-slate-500 text-center">
            Al realizar un pago en nuestra plataforma, declaras haber leído y aceptado íntegramente estos términos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
