'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Grid3X3, ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { Raffle } from '@/types';

interface TicketSelectorProps {
  raffle: Raffle;
  onBack: () => void;
  onContinue: (selectedNumbers: number[]) => void;
}

export default function TicketSelector({ raffle, onBack, onContinue }: TicketSelectorProps) {
  const [selectionMode, setSelectionMode] = useState<'manual' | 'random'>('manual');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [randomQuantity, setRandomQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const numbersPerPage = 100;
  const totalPages = Math.ceil(raffle.availableNumbers.length / numbersPerPage);
  const startIndex = currentPage * numbersPerPage;
  const endIndex = Math.min(startIndex + numbersPerPage, raffle.availableNumbers.length);
  const currentPageNumbers = raffle.availableNumbers.slice(startIndex, endIndex);

  const handleNumberToggle = (number: number) => {
    setSelectedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      } else {
        return [...prev, number];
      }
    });
  };

  const handleRandomSelection = () => {
    const availableNumbers = [...raffle.availableNumbers];
    const randomNumbers: number[] = [];
    
    for (let i = 0; i < randomQuantity && availableNumbers.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      randomNumbers.push(availableNumbers[randomIndex]);
      availableNumbers.splice(randomIndex, 1);
    }
    
    setSelectedNumbers(randomNumbers);
  };

  const totalAmount = selectedNumbers.length * raffle.ticketPrice;

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => {
            setSelectionMode('manual');
            setSelectedNumbers([]);
          }}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            selectionMode === 'manual'
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Grid3X3 className="h-5 w-5" />
          <span>Selección Manual</span>
        </button>
        
        <button
          onClick={() => {
            setSelectionMode('random');
            setSelectedNumbers([]);
          }}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            selectionMode === 'random'
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Shuffle className="h-5 w-5" />
          <span>Selección Aleatoria</span>
        </button>
      </div>

      {/* Manual Selection */}
      {selectionMode === 'manual' && (
        <div className="space-y-6">
          {/* Page Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Anterior</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Página</span>
                <span className="text-white font-medium">{currentPage + 1}</span>
                <span className="text-gray-400 text-sm">de {totalPages}</span>
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                <span>Siguiente</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Numbers Grid */}
          <div className="grid grid-cols-10 gap-2">
            {currentPageNumbers.map((number) => {
              const isSelected = selectedNumbers.includes(number);
              return (
                <motion.button
                  key={number}
                  onClick={() => handleNumberToggle(number)}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded-lg font-bold text-sm transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-yellow-400 to-red-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {number.toString().padStart(4, '0')}
                </motion.button>
              );
            })}
          </div>

          {/* Range Info */}
          <div className="text-center text-sm text-gray-400">
            Mostrando números {startIndex + 1} - {endIndex} de {raffle.availableNumbers.length} disponibles
          </div>
        </div>
      )}

      {/* Random Selection */}
      {selectionMode === 'random' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Selección Aleatoria</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cantidad de boletos
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setRandomQuantity(Math.max(1, randomQuantity - 1))}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <div className="flex-1 text-center">
                    <input
                      type="number"
                      min="1"
                      max={Math.min(50, raffle.availableNumbers.length)}
                      value={randomQuantity}
                      onChange={(e) => setRandomQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  
                  <button
                    onClick={() => setRandomQuantity(Math.min(50, raffle.availableNumbers.length, randomQuantity + 1))}
                    className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Máximo: {Math.min(50, raffle.availableNumbers.length)} boletos
                </p>
              </div>

              <button
                onClick={handleRandomSelection}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <Shuffle className="h-5 w-5 inline mr-2" />
                Generar Números Aleatorios
              </button>
            </div>
          </div>

          {/* Selected Random Numbers */}
          {selectedNumbers.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Números Seleccionados</h4>
              <div className="grid grid-cols-10 gap-2">
                {selectedNumbers.map((number) => (
                  <div
                    key={number}
                    className="aspect-square bg-gradient-to-r from-yellow-400 to-red-500 text-black rounded-lg font-bold text-sm flex items-center justify-center"
                  >
                    {number.toString().padStart(4, '0')}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary and Actions */}
      {selectedNumbers.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{selectedNumbers.length}</div>
              <div className="text-sm text-gray-400">Boletos Seleccionados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">${raffle.ticketPrice}</div>
              <div className="text-sm text-gray-400">Precio por Boleto</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">${totalAmount}</div>
              <div className="text-sm text-gray-400">Total a Pagar</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Volver
            </button>
            <button
              onClick={() => onContinue(selectedNumbers)}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-red-500 text-black py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition-all"
            >
              Continuar al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
