'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Ticket, ShoppingCart, Award, Users, Shield, Trophy, BarChart3, Gift } from 'lucide-react';
import RaffleModal from '@/components/RaffleModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { mockRaffles } from '@/data/mockData';
import type { Raffle } from '@/types';

export default function Home() {
  const [selectedRaffle, setSelectedRaffle] = useState<Raffle | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, login } = useAuth();
  const [raffles, setRaffles] = useState<Raffle[]>(mockRaffles);

  // Verificar parámetros de URL para mostrar modal de auth automáticamente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('showAuth') === 'true') {
        setShowAuthModal(true);
      }
    }
  }, []);

  const handleRaffleClick = (raffle: Raffle) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedRaffle(raffle);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header onAuthClick={() => setShowAuthModal(true)} />

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              FAMILIA BARAHONA
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Participa en nuestras rifas exclusivas y gana premios increíbles
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Trophy, label: 'Premios Entregados', value: '500+' },
              { icon: Gift, label: 'Rifas Activas', value: raffles.length.toString() },
              { icon: Users, label: 'Participantes', value: '10K+' },
              { icon: Shield, label: 'Años de Confianza', value: '5+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h2>
              <p className="text-xl text-gray-300 mb-6">
                Somos una empresa familiar venezolana con más de 5 años de experiencia 
                en el mundo de las rifas y sorteos.
              </p>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">100% Transparente</h3>
                    <p className="text-sm">Todas nuestras rifas están reguladas por CONALOT y son completamente transparentes.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Miles de Ganadores</h3>
                    <p className="text-sm">Hemos entregado más de 500 premios a familias venezolanas felices.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Trophy className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Premios de Calidad</h3>
                    <p className="text-sm">Solo ofrecemos productos nuevos y de las mejores marcas del mercado.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl p-1">
                <div className="bg-black rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4 text-center">Nuestra Misión</h3>
                  <p className="text-gray-300 text-center leading-relaxed">
                    Brindar entretenimiento responsable y oportunidades reales de ganar 
                    premios increíbles, manteniendo siempre la transparencia y confianza 
                    que nos caracteriza como familia.
                  </p>
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                      <Shield className="h-4 w-4" />
                      <span>Regulado por CONALOT</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Raffles Catalog */}
      <section id="rifas" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Rifas Disponibles</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Elige tu rifa favorita y participa para ganar premios increíbles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {raffles.map((raffle, index) => (
              <motion.div
                key={raffle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleRaffleClick(raffle)}
              >
                <div className="relative h-64">
                  <Image
                    src={raffle.image}
                    alt={raffle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                    ${raffle.ticketPrice}
                  </div>
                  {raffle.soldTickets >= raffle.totalTickets && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">AGOTADO</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{raffle.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{raffle.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Vendidos:</span>
                      <span>{raffle.soldTickets}/{raffle.totalTickets}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full"
                        style={{
                          width: `${(raffle.soldTickets / raffle.totalTickets) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-400">Fecha límite:</span>
                      <span className="text-white font-semibold">
                        {new Date(raffle.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {selectedRaffle && (
        <RaffleModal
          raffle={selectedRaffle}
          onClose={() => setSelectedRaffle(null)}
        />
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
