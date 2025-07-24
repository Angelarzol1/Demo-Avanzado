'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, DollarSign, Users, Trophy, Shuffle, Grid3X3 } from 'lucide-react';
import Image from 'next/image';
import { Raffle } from '@/types';
import TicketSelector from '@/components/TicketSelector';

interface RaffleModalProps {
  raffle: Raffle;
  onClose: () => void;
}

export default function RaffleModal({ raffle, onClose }: RaffleModalProps) {
  const [currentStep, setCurrentStep] = useState<'details' | 'tickets' | 'payment'>('details');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [selectionMode, setSelectionMode] = useState<'manual' | 'random'>('manual');

  const handleContinueToTickets = () => {
    setCurrentStep('tickets');
  };

  const handleTicketSelection = (numbers: number[]) => {
    setSelectedNumbers(numbers);
    if (numbers.length > 0) {
      setCurrentStep('payment');
    }
  };

  const progressPercentage = (raffle.soldTickets / raffle.totalTickets) * 100;
  const isAvailable = raffle.soldTickets < raffle.totalTickets;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 rounded-2xl max-w-6xl w-full mx-4 max-h-[95vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">{raffle.title}</h2>
              <p className="text-gray-400">Rifa #{raffle.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            {[
              { key: 'details', label: 'Detalles', icon: Trophy },
              { key: 'tickets', label: 'Boletos', icon: Grid3X3 },
              { key: 'payment', label: 'Pago', icon: DollarSign }
            ].map((step, index) => {
              const isActive = currentStep === step.key;
              const isCompleted = 
                (step.key === 'details') ||
                (step.key === 'tickets' && ['tickets', 'payment'].includes(currentStep)) ||
                (step.key === 'payment' && currentStep === 'payment');
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive ? 'bg-yellow-400 text-black' : 
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    <step.icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{step.label}</span>
                  </div>
                  {index < 2 && (
                    <div className="w-8 h-0.5 bg-gray-700 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          {currentStep === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="space-y-4">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <Image
                    src={raffle.image}
                    alt={raffle.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                    ${raffle.ticketPrice}
                  </div>
                  {!isAvailable && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">AGOTADO</span>
                    </div>
                  )}
                </div>
                
                {/* Additional Images */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative h-20 bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={raffle.image}
                        alt={`${raffle.title} ${i}`}
                        fill
                        sizes="(max-width: 768px) 33vw, 20vw"
                        className="object-cover opacity-75"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{raffle.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{raffle.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-yellow-400" />
                      <span className="text-gray-400 text-sm">Precio por Boleto</span>
                    </div>
                    <span className="text-2xl font-bold text-white">${raffle.ticketPrice}</span>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-400 text-sm">Total Boletos</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{raffle.totalTickets}</span>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-green-400" />
                      <span className="text-gray-400 text-sm">Fecha Límite</span>
                    </div>
                    <span className="text-lg font-bold text-white">
                      {new Date(raffle.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Trophy className="h-5 w-5 text-purple-400" />
                      <span className="text-gray-400 text-sm">Disponibles</span>
                    </div>
                    <span className="text-lg font-bold text-white">
                      {raffle.totalTickets - raffle.soldTickets}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progreso de ventas</span>
                    <span className="text-white">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-red-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{raffle.soldTickets} vendidos</span>
                    <span>{raffle.totalTickets} total</span>
                  </div>
                </div>

                {/* Action Button */}
                {isAvailable ? (
                  <button
                    onClick={handleContinueToTickets}
                    className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-black py-4 rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-red-600 transition-all"
                  >
                    Seleccionar Boletos
                  </button>
                ) : (
                  <div className="w-full bg-gray-700 text-gray-400 py-4 rounded-lg font-bold text-lg text-center">
                    Rifa Agotada
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 'tickets' && (
            <TicketSelector
              raffle={raffle}
              onBack={() => setCurrentStep('details')}
              onContinue={handleTicketSelection}
            />
          )}

          {currentStep === 'payment' && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-4">¡Próximamente!</h3>
              <p className="text-gray-400 mb-8">
                El sistema de pagos estará disponible pronto.
              </p>
              <button
                onClick={() => setCurrentStep('tickets')}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Volver a Selección
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
