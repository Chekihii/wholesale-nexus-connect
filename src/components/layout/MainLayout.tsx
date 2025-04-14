
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: 'customer' | 'vendor' | 'admin';
  cartItems?: number;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  userRole,
  cartItems = 0
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header userRole={userRole} cartItems={cartItems} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
