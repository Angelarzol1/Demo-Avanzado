'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, FileText } from 'lucide-react';
import TermsModal from '@/components/TermsModal';

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer id="contact" className="bg-gray-900 text-white py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo y descripción */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">FB</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Familia Barahona</h3>
                  <p className="text-sm text-gray-400">Rifas Exclusivas</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Somos una empresa familiar dedicada a ofrecer rifas transparentes y premios de calidad. 
                Tu confianza es nuestra prioridad.
              </p>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#rifas" className="text-gray-400 hover:text-white transition-colors">
                    Rifas Disponibles
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    Nosotros
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Términos y Condiciones
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Política de Privacidad
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-yellow-400" />
                  <span className="text-gray-400">+58 414-123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-yellow-400" />
                  <span className="text-gray-400">info@familiabarahona.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  <span className="text-gray-400">Caracas, Venezuela</span>
                </li>
              </ul>
            </div>

            {/* Redes sociales */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-all"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
              
              {/* Logos de colaboradores y patrocinadores */}
              <div className="mt-6">
                <h5 className="text-sm font-medium mb-3 text-gray-400">Colaboradores</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-800 rounded-lg p-2 flex items-center justify-center h-12">
                    <span className="text-xs text-gray-400">Colaborador 1</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-2 flex items-center justify-center h-12">
                    <span className="text-xs text-gray-400">Colaborador 2</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="text-sm font-medium mb-3 text-gray-400">Patrocinadores</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-800 rounded-lg p-2 flex items-center justify-center h-12">
                    <span className="text-xs text-gray-400">Patrocinador 1</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-2 flex items-center justify-center h-12">
                    <span className="text-xs text-gray-400">Patrocinador 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                © 2025 Familia Barahona. Todos los derechos reservados.
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Rifas reguladas según CONALOT</span>
                <div className="flex items-center space-x-1">
                  <FileText className="h-3 w-3" />
                  <button
                    onClick={() => setShowTerms(true)}
                    className="hover:text-white transition-colors"
                  >
                    Términos legales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de términos y condiciones */}
      {showTerms && (
        <TermsModal onClose={() => setShowTerms(false)} />
      )}
    </>
  );
}
