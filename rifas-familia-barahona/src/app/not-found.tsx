'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Search className="h-16 w-16 text-black" />
        </motion.div>
        
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Página No Encontrada</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Lo sentimos, la página que buscas no existe. Puede que haya sido movida o eliminada.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-red-500 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>Volver al Inicio</span>
          </Link>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Link 
              href="/admin-simple" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Panel Admin
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/#rifas" 
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Ver Rifas
            </Link>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-xs text-gray-500"
        >
          <p>Familia Barahona - Rifas Exclusivas</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
