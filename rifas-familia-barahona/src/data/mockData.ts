import { Raffle, PaymentMethod } from '@/types';

export const mockRaffles: Raffle[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    description: 'Último modelo de iPhone con 256GB de almacenamiento, cámara profesional y diseño premium en titanio.',
    image: '/images/iphone15.jpg',
    ticketPrice: 10,
    totalTickets: 1000,
    soldTickets: 750,
    availableNumbers: Array.from({length: 250}, (_, i) => i + 751),
    endDate: '2025-02-15',
    status: 'active'
  },
  {
    id: '2',
    title: 'PlayStation 5 + Accesorios',
    description: 'Consola PlayStation 5 con control adicional, auriculares gaming y 3 juegos incluidos.',
    image: '/images/ps5.jpg',
    ticketPrice: 8,
    totalTickets: 800,
    soldTickets: 520,
    availableNumbers: Array.from({length: 280}, (_, i) => i + 521),
    endDate: '2025-02-20',
    status: 'active'
  },
  {
    id: '3',
    title: 'MacBook Air M3',
    description: 'MacBook Air con chip M3, 16GB RAM, 512GB SSD. Perfecta para trabajo y estudios.',
    image: '/images/macbook.jpg',
    ticketPrice: 15,
    totalTickets: 500,
    soldTickets: 380,
    availableNumbers: Array.from({length: 120}, (_, i) => i + 381),
    endDate: '2025-02-25',
    status: 'active'
  },
  {
    id: '4',
    title: 'Smart TV 65" Samsung QLED',
    description: 'Televisor Samsung QLED 65 pulgadas 4K, HDR, Smart TV con todas las aplicaciones.',
    image: '/images/tv.jpg',
    ticketPrice: 12,
    totalTickets: 600,
    soldTickets: 450,
    availableNumbers: Array.from({length: 150}, (_, i) => i + 451),
    endDate: '2025-03-01',
    status: 'active'
  },
  {
    id: '5',
    title: 'Motocicleta Honda CB160F',
    description: 'Motocicleta Honda CB160F nuevo modelo, incluye casco, guantes y seguro por 6 meses.',
    image: '/images/moto.jpg',
    ticketPrice: 25,
    totalTickets: 2000,
    soldTickets: 1200,
    availableNumbers: Array.from({length: 800}, (_, i) => i + 1201),
    endDate: '2025-03-15',
    status: 'active'
  },
  {
    id: '6',
    title: 'Set de Electrodomésticos',
    description: 'Refrigerador, lavadora, microondas y licuadora. Todo lo necesario para equipar tu hogar.',
    image: '/images/electrodomesticos.jpg',
    ticketPrice: 20,
    totalTickets: 400,
    soldTickets: 400,
    availableNumbers: [],
    endDate: '2025-01-30',
    status: 'active'
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'pago-movil',
    name: 'Pago Móvil',
    icon: '📱',
    description: 'Transfiere desde tu banco con Pago Móvil',
    fields: [
      { name: 'phoneNumber', label: 'Teléfono', type: 'tel', required: true, placeholder: '04XX-XXXXXXX' },
      { name: 'cedula', label: 'Cédula', type: 'text', required: true, placeholder: 'V-XXXXXXXX' },
      { name: 'bankCode', label: 'Código del Banco', type: 'text', required: true, placeholder: '0XXX' },
      { name: 'reference', label: 'Número de Referencia', type: 'text', required: true, placeholder: 'Referencia de la transferencia' },
      { name: 'proofImage', label: 'Comprobante', type: 'file', required: true }
    ]
  },
  {
    id: 'transferencia',
    name: 'Transferencia Bancaria',
    icon: '🏦',
    description: 'Transferencia bancaria tradicional',
    fields: [
      { name: 'accountNumber', label: 'Número de Cuenta', type: 'text', required: true, placeholder: 'Número de cuenta destino' },
      { name: 'accountType', label: 'Tipo de Cuenta', type: 'text', required: true, placeholder: 'Corriente/Ahorro' },
      { name: 'bankName', label: 'Banco', type: 'text', required: true, placeholder: 'Nombre del banco' },
      { name: 'reference', label: 'Referencia', type: 'text', required: true, placeholder: 'Número de referencia' },
      { name: 'proofImage', label: 'Comprobante', type: 'file', required: true }
    ]
  },
  {
    id: 'zelle',
    name: 'Zelle',
    icon: '💳',
    description: 'Pago internacional con Zelle',
    fields: [
      { name: 'email', label: 'Email de Zelle', type: 'email', required: true, placeholder: 'tu-email@ejemplo.com' },
      { name: 'fullName', label: 'Nombre Completo', type: 'text', required: true, placeholder: 'Como aparece en tu cuenta' },
      { name: 'reference', label: 'ID de Transacción', type: 'text', required: true, placeholder: 'ID de la transacción Zelle' },
      { name: 'proofImage', label: 'Comprobante', type: 'file', required: true }
    ]
  }
];

// Datos de la empresa para los métodos de pago
export const companyPaymentInfo = {
  'pago-movil': {
    phone: '0414-1234567',
    cedula: 'V-12345678',
    bank: 'Banco de Venezuela (0102)'
  },
  'transferencia': {
    accountNumber: '01020123456789012345',
    accountType: 'Corriente',
    bank: 'Banco de Venezuela',
    rif: 'J-123456789'
  },
  'zelle': {
    email: 'pagos@familiabarahona.com',
    name: 'Familia Barahona Rifas C.A.'
  }
};
