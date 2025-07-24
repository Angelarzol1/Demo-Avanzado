export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Raffle {
  id: string;
  title: string;
  description: string;
  image: string;
  ticketPrice: number;
  totalTickets: number;
  soldTickets: number;
  availableNumbers: number[];
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  winnerId?: string;
  winningNumber?: number;
}

export interface Ticket {
  id: string;
  raffleId: string;
  userId: string;
  numbers: number[];
  purchaseDate: Date;
  paymentMethod: 'pago-movil' | 'transferencia' | 'zelle';
  paymentStatus: 'pending' | 'approved' | 'rejected';
  paymentProof?: string;
  totalAmount: number;
}

export interface Payment {
  id: string;
  ticketId: string;
  userId: string;
  method: 'pago-movil' | 'transferencia' | 'zelle';
  amount: number;
  reference?: string;
  phoneNumber?: string;
  accountNumber?: string;
  email?: string;
  proofImage?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  notes?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export type PaymentMethod = {
  id: 'pago-movil' | 'transferencia' | 'zelle';
  name: string;
  icon: string;
  description: string;
  fields: PaymentField[];
};

export type PaymentField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'file';
  required: boolean;
  placeholder?: string;
};
