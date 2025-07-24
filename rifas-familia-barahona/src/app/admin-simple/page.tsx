'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Para simplificar, establecemos directamente como admin
    const adminUser = {
      id: 'admin',
      email: 'admin@familiabarahona.com',
      name: 'Administrador',
      role: 'admin',
      createdAt: new Date()
    };
    setUser(adminUser);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🛡️ Panel de Administración</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Bienvenido, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">📊 Estadísticas</h3>
            <p className="text-3xl font-bold text-yellow-400">6</p>
            <p className="text-gray-400">Rifas Activas</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">👥 Usuarios</h3>
            <p className="text-3xl font-bold text-blue-400">2,547</p>
            <p className="text-gray-400">Registrados</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">💰 Ingresos</h3>
            <p className="text-3xl font-bold text-green-400">$15,430</p>
            <p className="text-gray-400">Este mes</p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🎯 Gestión de Rifas</h2>
          <p className="text-gray-400 mb-4">Aquí puedes gestionar todas las rifas activas</p>
          
          <div className="space-y-4">
            {['iPhone 15 Pro Max', 'MacBook Pro M3', 'PlayStation 5', 'Smart TV 65"', 'Moto Bajaj', 'Electrodomésticos'].map((item, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{item}</h4>
                  <p className="text-gray-400 text-sm">Activa • {Math.floor(Math.random() * 100)}% vendida</p>
                </div>
                <div className="space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Editar
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                    Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-500 hover:to-red-600 transition-all inline-block"
          >
            🏠 Volver a la Página Principal
          </a>
        </div>
      </div>
    </div>
  );
}
