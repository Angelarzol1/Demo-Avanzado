import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "react-hot-toast";

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
  description: "Participa en nuestras rifas exclusivas y gana premios increíbles. Rifas transparentes y legales reguladas por CONALOT.",
  keywords: "rifas, sorteos, premios, venezuela, familia barahona, conalot",
  authors: [{ name: "Familia Barahona" }],
  openGraph: {
    title: "Familia Barahona - Rifas Exclusivas",
    description: "Participa en nuestras rifas exclusivas y gana premios increíbles",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1F2937',
                color: '#FFFFFF',
                border: '1px solid #374151',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
