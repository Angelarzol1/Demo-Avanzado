'use client';

import { useAuth } from '@/hooks/useAuth';

export default function TestPage() {
  const { user, isAuthenticated, loading, login, logout } = useAuth();

  const handleAdminLogin = async () => {
    const success = await login('admin', 'admin');
    console.log('Login result:', success);
    if (success) {
      window.location.href = '/admin';
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Cargando...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">🔧 Test de Autenticación</h1>
      
      <div className="space-y-4 bg-gray-900 p-6 rounded-lg">
        <p>Estado de autenticación: {isAuthenticated ? '✅ Autenticado' : '❌ No autenticado'}</p>
        <p>Usuario: {user ? `${user.name} (${user.role})` : 'Ninguno'}</p>
        <p>Loading: {loading ? 'Sí' : 'No'}</p>
        
        <div className="space-x-4 pt-4">
          <button 
            onClick={handleAdminLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            🔑 Login como Admin
          </button>
          
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            🚪 Logout
          </button>
        </div>
        
        <div className="mt-4 space-x-4">
          <a 
            href="/admin" 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded inline-block"
          >
            🛡️ Ir al Panel Admin
          </a>
          
          <a 
            href="/" 
            className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-4 py-2 rounded inline-block"
          >
            🏠 Página Principal
          </a>
        </div>
      </div>
    </div>
  );
}
