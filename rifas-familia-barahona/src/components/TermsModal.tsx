'use client';

import { motion } from 'framer-motion';
import { X, FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface TermsModalProps {
  onClose: () => void;
}

export default function TermsModal({ onClose }: TermsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">Términos y Condiciones</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-8">
            {/* Introducción */}
            <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-400 mb-2">
                    Rifas Reguladas según CONALOT
                  </h3>
                  <p className="text-sm text-gray-300">
                    Todas nuestras rifas están reguladas y autorizadas por la Comisión Nacional 
                    de Loterías (CONALOT) de Venezuela, garantizando transparencia y legalidad 
                    en todos nuestros sorteos.
                  </p>
                </div>
              </div>
            </div>

            {/* Sección 1: Definiciones */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                1. Definiciones
              </h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <p>
                  <strong className="text-white">Familia Barahona:</strong> Se refiere a nuestra empresa 
                  organizadora de rifas, debidamente registrada y autorizada.
                </p>
                <p>
                  <strong className="text-white">Participante:</strong> Persona mayor de 18 años que 
                  adquiere uno o más boletos para participar en una rifa.
                </p>
                <p>
                  <strong className="text-white">Boleto:</strong> Documento físico o digital que acredita 
                  la participación en una rifa específica.
                </p>
                <p>
                  <strong className="text-white">Sorteo:</strong> Proceso aleatorio y transparente para 
                  determinar el número ganador de cada rifa.
                </p>
              </div>
            </div>

            {/* Sección 2: Participación */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                2. Condiciones de Participación
              </h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <ul className="list-disc list-inside space-y-2">
                  <li>Los participantes deben ser mayores de 18 años y residentes en Venezuela.</li>
                  <li>Se requiere registro previo con datos válidos y verificables.</li>
                  <li>Cada boleto tiene un número único e irrepetible.</li>
                  <li>La compra de boletos no garantiza premio alguno.</li>
                  <li>Los boletos son intransferibles una vez adquiridos.</li>
                </ul>
              </div>
            </div>

            {/* Sección 3: Métodos de Pago */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                3. Métodos de Pago y Verificación
              </h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <p>Aceptamos los siguientes métodos de pago:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Pago Móvil:</strong> Transferencias interbancarias inmediatas</li>
                  <li><strong className="text-white">Transferencia Bancaria:</strong> Transferencias tradicionales</li>
                  <li><strong className="text-white">Zelle:</strong> Para pagos internacionales</li>
                </ul>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-4">
                  <p className="text-blue-400 text-xs">
                    <strong>Importante:</strong> Todos los pagos requieren comprobante y están sujetos 
                    a verificación manual. Los boletos se activan únicamente tras la aprobación del pago.
                  </p>
                </div>
              </div>
            </div>

            {/* Sección 4: Sorteos */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                4. Proceso de Sorteos
              </h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <ul className="list-disc list-inside space-y-2">
                  <li>Los sorteos se realizan en la fecha y hora indicada para cada rifa.</li>
                  <li>El proceso es completamente aleatorio y verificable.</li>
                  <li>Se realizan transmisiones en vivo para garantizar transparencia.</li>
                  <li>Los resultados son inmutables una vez anunciados.</li>
                  <li>En caso de empate técnico, se realizará un segundo sorteo.</li>
                </ul>
              </div>
            </div>

            {/* Sección 5: Premios */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                5. Entrega de Premios
              </h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <ul className="list-disc list-inside space-y-2">
                  <li>Los ganadores serán contactados dentro de las 24 horas posteriores al sorteo.</li>
                  <li>Se requiere identificación válida para reclamar el premio.</li>
                  <li>Los premios deben reclamarse dentro de 30 días calendario.</li>
                  <li>Los gastos de entrega corren por cuenta del organizador.</li>
                  <li>Los premios no reclamados se consideran renunciados.</li>
                </ul>
              </div>
            </div>

            {/* Sección 6: Responsabilidades */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
                6. Limitaciones y Responsabilidades
              </h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <ul className="list-disc list-inside space-y-2">
                    <li>La participación en rifas implica riesgo de pérdida del dinero invertido.</li>
                    <li>No garantizamos ganancias ni resultados específicos.</li>
                    <li>Los participantes son responsables de proporcionar datos correctos.</li>
                    <li>No nos hacemos responsables por problemas técnicos ajenos a nosotros.</li>
                    <li>Las decisiones de la organización son definitivas e inapelables.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sección 7: Protección de Datos */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Shield className="h-5 w-5 text-blue-400 mr-2" />
                7. Protección de Datos Personales
              </h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <ul className="list-disc list-inside space-y-2">
                  <li>Protegemos la privacidad de todos los datos personales.</li>
                  <li>La información se usa únicamente para fines relacionados con las rifas.</li>
                  <li>No compartimos datos con terceros sin consentimiento.</li>
                  <li>Los participantes pueden solicitar la eliminación de sus datos.</li>
                  <li>Cumplimos con todas las normativas de protección de datos vigentes.</li>
                </ul>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Información de Contacto</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p><strong>Email:</strong> legal@familiabarahona.com</p>
                <p><strong>Teléfono:</strong> +58 414-123-4567</p>
                <p><strong>Dirección:</strong> Caracas, Venezuela</p>
                <p><strong>Horario de atención:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Fecha de actualización */}
            <div className="text-center text-xs text-gray-500 border-t border-gray-800 pt-4">
              <p>Términos actualizados el 23 de julio de 2025</p>
              <p>Versión 1.0 - Vigente desde el 1 de enero de 2025</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-800/50">
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-8 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
