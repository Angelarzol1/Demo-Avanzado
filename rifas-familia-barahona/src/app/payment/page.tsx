'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, CreditCard, Smartphone, Building2, Check, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { paymentMethods, companyPaymentInfo } from '@/data/mockData';
import type { PaymentMethod } from '@/types';
import toast from 'react-hot-toast';

// Esquemas de validación
const pagoMovilSchema = z.object({
  phoneNumber: z.string().min(1, 'Teléfono requerido'),
  cedula: z.string().min(1, 'Cédula requerida'),
  bankCode: z.string().min(1, 'Código del banco requerido'),
  reference: z.string().min(1, 'Referencia requerida'),
  proofImage: z.any().refine((files) => files?.length > 0, 'Comprobante requerido')
});

const transferenciaSchema = z.object({
  accountNumber: z.string().min(1, 'Número de cuenta requerido'),
  accountType: z.string().min(1, 'Tipo de cuenta requerido'),
  bankName: z.string().min(1, 'Banco requerido'),
  reference: z.string().min(1, 'Referencia requerida'),
  proofImage: z.any().refine((files) => files?.length > 0, 'Comprobante requerido')
});

const zelleSchema = z.object({
  email: z.string().email('Email inválido'),
  fullName: z.string().min(1, 'Nombre completo requerido'),
  reference: z.string().min(1, 'ID de transacción requerido'),
  proofImage: z.any().refine((files) => files?.length > 0, 'Comprobante requerido')
});

// Tipo unión para todos los formularios
type PaymentFormData = z.infer<typeof pagoMovilSchema> | z.infer<typeof transferenciaSchema> | z.infer<typeof zelleSchema>;

interface PaymentPageProps {
  searchParams: {
    raffle?: string;
    tickets?: string;
    amount?: string;
  };
}

export default function PaymentPage({ searchParams }: PaymentPageProps) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Datos del pago (normalmente vendrían de la URL o estado global)
  const paymentData = {
    raffleTitle: searchParams.raffle || 'iPhone 15 Pro Max',
    ticketCount: parseInt(searchParams.tickets || '5'),
    amount: parseFloat(searchParams.amount || '50')
  };

  const getValidationSchema = () => {
    if (!selectedMethod) return z.object({});
    switch (selectedMethod.id) {
      case 'pago-movil': return pagoMovilSchema;
      case 'transferencia': return transferenciaSchema;
      case 'zelle': return zelleSchema;
      default: return z.object({});
    }
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<any>({
    resolver: zodResolver(getValidationSchema())
  });

  const onSubmit = async (data: any) => {
    if (!selectedMethod) return;

    setIsSubmitting(true);
    
    try {
      // Simular envío del pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentComplete(true);
      toast.success('¡Pago enviado exitosamente!');
      
      // Redirigir después de mostrar el éxito
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (error) {
      toast.error('Error al procesar el pago');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    reset();
  };

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">¡Pago Enviado!</h1>
          <p className="text-gray-400 mb-6">
            Tu pago ha sido enviado exitosamente. En breve recibirás un correo con tus boletos 
            una vez que se apruebe el pago.
          </p>
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-400 mb-2">Resumen del pago:</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Rifa:</span>
                <span>{paymentData.raffleTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>Boletos:</span>
                <span>{paymentData.ticketCount}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${paymentData.amount}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition-all"
          >
            Volver al Inicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-6">
        <div className="container mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver</span>
          </button>
          <h1 className="text-3xl font-bold">Realizar Pago</h1>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Payment Summary */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{paymentData.raffleTitle}</div>
                <div className="text-sm text-gray-400">Rifa Seleccionada</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{paymentData.ticketCount}</div>
                <div className="text-sm text-gray-400">Boletos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">${paymentData.amount}</div>
                <div className="text-sm text-gray-400">Total a Pagar</div>
              </div>
            </div>
          </div>

          {!selectedMethod ? (
            /* Method Selection */
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Selecciona tu Método de Pago</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => handleMethodSelect(method)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-all border-2 border-transparent hover:border-yellow-400"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{method.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            /* Payment Form */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Company Info */}
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    {selectedMethod.id === 'pago-movil' && <Smartphone className="h-5 w-5 mr-2" />}
                    {selectedMethod.id === 'transferencia' && <Building2 className="h-5 w-5 mr-2" />}
                    {selectedMethod.id === 'zelle' && <CreditCard className="h-5 w-5 mr-2" />}
                    Datos para {selectedMethod.name}
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    {selectedMethod.id === 'pago-movil' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Teléfono:</span>
                          <span className="font-mono">{companyPaymentInfo['pago-movil'].phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Cédula:</span>
                          <span className="font-mono">{companyPaymentInfo['pago-movil'].cedula}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Banco:</span>
                          <span>{companyPaymentInfo['pago-movil'].bank}</span>
                        </div>
                      </>
                    )}
                    
                    {selectedMethod.id === 'transferencia' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Cuenta:</span>
                          <span className="font-mono">{companyPaymentInfo.transferencia.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tipo:</span>
                          <span>{companyPaymentInfo.transferencia.accountType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Banco:</span>
                          <span>{companyPaymentInfo.transferencia.bank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">RIF:</span>
                          <span className="font-mono">{companyPaymentInfo.transferencia.rif}</span>
                        </div>
                      </>
                    )}
                    
                    {selectedMethod.id === 'zelle' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Email:</span>
                          <span className="font-mono">{companyPaymentInfo.zelle.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Nombre:</span>
                          <span>{companyPaymentInfo.zelle.name}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
                      <p className="text-yellow-400 text-sm">
                        Monto exacto a transferir: <strong>${paymentData.amount}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Confirmar Pago</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {selectedMethod.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {field.label} {field.required && <span className="text-red-400">*</span>}
                      </label>
                      
                      {field.type === 'file' ? (
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <input
                            type="file"
                            accept="image/*"
                            {...register(field.name as any)}
                            className="hidden"
                            id={field.name}
                          />
                          <label
                            htmlFor={field.name}
                            className="cursor-pointer text-yellow-400 hover:text-yellow-300"
                          >
                            Subir comprobante de pago
                          </label>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 5MB</p>
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          {...register(field.name as any)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
                        />
                      )}
                      
                      {errors[field.name] && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors[field.name]?.message as string}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod(null)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Cambiar Método
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-red-500 text-black py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-red-600 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Enviando...' : 'Confirmar Pago'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
