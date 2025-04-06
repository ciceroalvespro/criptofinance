import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CriptoFinance - Análise de Mercado Cripto",
  description: "Acompanhe o mercado de criptomoedas em tempo real com análises detalhadas e dados atualizados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
