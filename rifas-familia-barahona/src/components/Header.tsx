'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  onAuthClick: () => void;
}

export default function Header({ onAuthClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">FB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Familia Barahona</h1>
              <p className="text-xs text-gray-400">Rifas Exclusivas</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('rifas')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Rifas
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-black" />
                  </div>
                  <span className="text-white">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                      ADMIN
                    </span>
                  )}
                </button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700"
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm text-gray-300">{user.email}</p>
                      </div>
                      
                      {user.role === 'admin' && (
                        <button
                          onClick={() => {
                            window.location.href = '/admin';
                            setShowUserMenu(false);
                          }}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Panel Admin</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          // Ir a mis boletos
                          setShowUserMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Mis Boletos</span>
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.location.href = '/admin-simple'}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Panel Admin</span>
                </button>
                
                <button
                  onClick={onAuthClick}
                  className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-6 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition-all"
                >
                  Iniciar Sesión
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white"
          >
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 border-t border-gray-800 pt-4"
          >
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('rifas')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Rifas
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Contacto
              </button>
              
              {user ? (
                <div className="border-t border-gray-800 pt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-black" />
                    </div>
                    <span className="text-white">{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                        ADMIN
                      </span>
                    )}
                  </div>
                  
                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        window.location.href = '/admin';
                        setShowMobileMenu(false);
                      }}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Panel Admin</span>
                    </button>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      window.location.href = '/admin-simple';
                      setShowMobileMenu(false);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all w-full flex items-center justify-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Panel Admin</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onAuthClick();
                      setShowMobileMenu(false);
                    }}
                    className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-6 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition-all w-full"
                  >
                    Iniciar Sesión
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
