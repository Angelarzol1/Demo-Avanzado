import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Familia Barahona - Rifas Exclusivas",
  description: "Participa en nuestras rifas exclusivas y gana premios increíbles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
