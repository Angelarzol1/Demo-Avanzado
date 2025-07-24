'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  Trophy, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Check,
  X,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { mockRaffles } from '@/data/mockData';
import type { Raffle, Payment } from '@/types';
import Image from 'next/image';

export default function AdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'raffles' | 'payments' | 'users'>('overview');
  const [raffles, setRaffles] = useState<Raffle[]>(mockRaffles);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRaffle, setEditingRaffle] = useState<Raffle | null>(null);

  // Mock payments data
  const [payments] = useState<Payment[]>([
    {
      id: '1',
      ticketId: 'ticket-1',
      userId: 'user-1',
      method: 'pago-movil',
      amount: 50,
      reference: '123456789',
      phoneNumber: '0414-1234567',
      status: 'pending',
      createdAt: new Date('2025-01-20'),
      proofImage: '/images/proof1.jpg'
    },
    {
      id: '2',
      ticketId: 'ticket-2',
      userId: 'user-2',
      method: 'transferencia',
      amount: 80,
      reference: '987654321',
      accountNumber: '01020123456789012345',
      status: 'pending',
      createdAt: new Date('2025-01-21'),
      proofImage: '/images/proof2.jpg'
    }
  ]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/?showAuth=true&adminRequired=true');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-lg p-8 max-w-md mx-4"
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h2>
              <p className="text-gray-400">
                Necesitas credenciales de administrador para acceder a esta página.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-white mb-2">Credenciales de Admin:</h3>
              <p className="text-sm text-gray-300">Usuario: <span className="text-yellow-400">admin</span></p>
              <p className="text-sm text-gray-300">Contraseña: <span className="text-yellow-400">admin</span></p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-black py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition-all"
            >
              Volver al Inicio
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const handleDeleteRaffle = (raffleId: string) => {
    setRaffles(prev => prev.filter(r => r.id !== raffleId));
  };

  const totalRevenue = raffles.reduce((sum, raffle) => 
    sum + (raffle.soldTickets * raffle.ticketPrice), 0
  );

  const totalSoldTickets = raffles.reduce((sum, raffle) => 
    sum + raffle.soldTickets, 0
  );

  const pendingPayments = payments.filter(p => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">FB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Panel de Administración</h1>
                <p className="text-sm text-gray-400">Familia Barahona</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Bienvenido, {user.name}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-900 min-h-screen p-6">
          <div className="space-y-2">
            {[
              { id: 'overview', label: 'Resumen', icon: BarChart3 },
              { id: 'raffles', label: 'Rifas', icon: Trophy },
              { id: 'payments', label: 'Pagos', icon: DollarSign },
              { id: 'users', label: 'Usuarios', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Resumen General</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-8 w-8 text-yellow-400" />
                    <div>
                      <div className="text-2xl font-bold">{raffles.length}</div>
                      <div className="text-gray-400">Rifas Activas</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-8 w-8 text-green-400" />
                    <div>
                      <div className="text-2xl font-bold">${totalRevenue}</div>
                      <div className="text-gray-400">Ingresos Total</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold">{totalSoldTickets}</div>
                      <div className="text-gray-400">Boletos Vendidos</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-8 w-8 text-purple-400" />
                    <div>
                      <div className="text-2xl font-bold">{pendingPayments}</div>
                      <div className="text-gray-400">Pagos Pendientes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Actividad Reciente</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="font-medium">Pago recibido - $50</div>
                      <div className="text-sm text-gray-400">Hace 2 horas</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <div>
                      <div className="font-medium">Nueva rifa creada - iPhone 15</div>
                      <div className="text-sm text-gray-400">Hace 5 horas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'raffles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Gestión de Rifas</h2>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition-all flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Nueva Rifa</span>
                </button>
              </div>

              {/* Raffles Table */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Rifa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Progreso
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {raffles.map((raffle) => {
                        const progress = (raffle.soldTickets / raffle.totalTickets) * 100;
                        return (
                          <tr key={raffle.id}>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                  <Image
                                    src={raffle.image}
                                    alt={raffle.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-white">{raffle.title}</div>
                                  <div className="text-sm text-gray-400">#{raffle.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-white">${raffle.ticketPrice}</td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">{raffle.soldTickets}/{raffle.totalTickets}</span>
                                  <span className="text-white">{progress.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                raffle.status === 'active' 
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                {raffle.status === 'active' ? 'Activa' : 'Inactiva'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => setEditingRaffle(raffle)}
                                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteRaffle(raffle.id)}
                                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Gestión de Pagos</h2>
              
              {/* Payments Table */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Método
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Monto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Referencia
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 text-white">Usuario #{payment.userId}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                              {payment.method === 'pago-movil' ? 'Pago Móvil' :
                               payment.method === 'transferencia' ? 'Transferencia' : 'Zelle'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-white font-medium">${payment.amount}</td>
                          <td className="px-6 py-4 text-gray-400">{payment.reference}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === 'pending' 
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : payment.status === 'approved'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {payment.status === 'pending' ? 'Pendiente' :
                               payment.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {payment.status === 'pending' && (
                              <div className="flex items-center space-x-2">
                                <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                                  <Check className="h-4 w-4" />
                                </button>
                                <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                                  <X className="h-4 w-4" />
                                </button>
                                <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Gestión de Usuarios</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-400 text-center py-8">
                  Próximamente: Gestión completa de usuarios registrados
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
