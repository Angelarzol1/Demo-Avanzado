import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Familia Barahona - Rifas Exclusivas",
  description: "Participa en nuestras rifas exclusivas y gana premios increíbles como iPhone 15 Pro Max, MacBook Pro, PlayStation 5 y más. Sistema transparente y seguro.",
  keywords: "rifas, sorteos, premios, iPhone, MacBook, PlayStation, Venezuela, familia barahona",
  authors: [{ name: "Familia Barahona" }],
  creator: "Familia Barahona",
  publisher: "Familia Barahona",
  metadataBase: new URL('https://rifas-familia-barahona.vercel.app'),
  openGraph: {
    title: "Familia Barahona - Rifas Exclusivas",
    description: "Rifas transparentes con los mejores premios. iPhone 15 Pro Max, MacBook Pro, PlayStation 5 y más.",
    url: 'https://rifas-familia-barahona.vercel.app',
    siteName: 'Familia Barahona',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Familia Barahona - Rifas Exclusivas',
      },
    ],
    locale: 'es_VE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Familia Barahona - Rifas Exclusivas',
    description: 'Rifas transparentes con premios increíbles',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151'
              }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
