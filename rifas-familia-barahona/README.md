# 🎯 Rifas Familia Barahona

Una aplicación web moderna para rifas y sorteos, desarrollada con Next.js 15 y diseño minimalista.

## 🌟 Demo en Vivo

🚀 **[Ver Demo](https://rifas-familia-barahona.vercel.app)**

## 🎮 Características

- 🎯 **Sistema de Rifas**: Catálogo completo con productos premium
- 👤 **Autenticación**: Sistema de login/registro de usuarios
- 💳 **Pagos Múltiples**: Pago Móvil, Transferencia y Zelle
- 🛡️ **Admin Panel**: Gestión completa de rifas y pagos
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- ⚡ **Moderno**: Next.js 15 con Tailwind CSS y animaciones
- 🖼️ **Optimizado**: Imágenes optimizadas y rendimiento mejorado

## 🔑 Credenciales de Prueba

### Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin`

### Usuarios Normales
- Cualquier email y contraseña funciona para testing

## 🛠️ Tecnologías

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React
- **Notificaciones**: React Hot Toast

## 🚀 Instalación Local

```bash
# Clonar el repositorio
git clone [repository-url]
cd rifas-familia-barahona

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout principal
│   ├── admin/page.tsx    # Panel de administración
│   ├── admin-simple/     # Panel admin simplificado
│   ├── payment/page.tsx  # Procesamiento de pagos
│   └── not-found.tsx     # Página 404 personalizada
├── components/
│   ├── Header.tsx        # Navegación principal
│   ├── Footer.tsx        # Pie de página
│   ├── AuthModal.tsx     # Modal de autenticación
│   ├── RaffleModal.tsx   # Modal de detalles de rifa
│   ├── TicketSelector.tsx # Selector de números
│   └── TermsModal.tsx    # Términos y condiciones
├── hooks/
│   └── useAuth.tsx       # Hook de autenticación
├── types/
│   └── index.ts          # Definiciones TypeScript
└── data/
    └── mockData.ts       # Datos de ejemplo
```

## 🌐 Rutas Disponibles

- `/` - Página principal con catálogo de rifas
- `/admin` - Panel de administración completo
- `/admin-simple` - Panel de administración simplificado
- `/payment` - Procesamiento de pagos
- `/test` - Página de pruebas y diagnóstico

## 🎯 Funcionalidades del Demo

### Para Usuarios
1. **Explorar Rifas**: Catálogo con 6 productos premium
2. **Registro/Login**: Sistema de autenticación completo
3. **Selección de Números**: Manual o aleatoria
4. **Proceso de Pago**: Múltiples métodos de pago
5. **Términos y Condiciones**: Conforme a CONALOT

### Para Administradores
1. **Dashboard**: Estadísticas en tiempo real
2. **Gestión de Rifas**: CRUD completo de rifas
3. **Aprobación de Pagos**: Sistema de validación
4. **Gestión de Usuarios**: Administración de participantes

## 🔧 Deploy en Vercel

1. **Fork este repositorio**
2. **Conectar con Vercel**
3. **Configurar variables de entorno** (opcional)
4. **Deploy automático** ✅

## 📞 Información de Contacto

- **Empresa**: Familia Barahona
- **Descripción**: Rifas Exclusivas
- **Regulación**: CONALOT

## 📝 Notas para Producción

- Las imágenes de productos son de demostración
- Los datos de pago son de ejemplo
- Sistema preparado para integración con APIs reales
- Base de datos mock (localStorage)

## 🤝 Contribuciones

Este es un proyecto de demostración. Para uso en producción, considerar:

- Integración con base de datos real
- Sistema de pagos real
- Autenticación robusta
- Imágenes optimizadas de productos reales

---

🎉 **Demo listo para presentación y testing completo**
