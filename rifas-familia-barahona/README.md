# Rifas Familia Barahona

Una aplicación web moderna para rifas y sorteos, desarrollada con Next.js 15 y diseño minimalista.

## Características

- 🎯 **Sistema de Rifas**: Catálogo completo con productos premium
- 👤 **Autenticación**: Sistema de login/registro de usuarios
- 💳 **Pagos Múltiples**: Pago Móvil, Transferencia y Zelle
- 🛡️ **Admin Panel**: Gestión completa de rifas y pagos
- 📱 **Responsive**: Diseño adaptativo para todos los dispositivos
- ⚡ **Moderno**: Next.js 15 con Tailwind CSS y animaciones

## Credenciales de Administrador

- **Usuario**: `admin`
- **Contraseña**: `admin`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout principal
│   ├── admin/page.tsx    # Panel de administración
│   └── payment/page.tsx  # Procesamiento de pagos
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

## Rutas Disponibles

- `/` - Página principal con catálogo de rifas
- `/admin` - Panel de administración (requiere login)
- `/payment` - Procesamiento de pagos

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
