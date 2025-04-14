
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Register: React.FC = () => {
  const handleRegister = (
    name: string, 
    email: string, 
    password: string, 
    accountType: 'customer' | 'vendor'
  ) => {
    // This would normally connect to a backend service
    // For demo purposes we'll just simulate a successful registration
    toast({
      title: "Registration Successful",
      description: `Your ${accountType} account has been created. Welcome to NexusConnect!`,
    });
  };
  
  return (
    <MainLayout>
      <AuthCard 
        title="Create your account" 
        footer={
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-wholesale-600 hover:text-wholesale-500 font-medium">
              Sign in
            </Link>
          </div>
        }
      >
        <RegisterForm onRegister={handleRegister} />
      </AuthCard>
    </MainLayout>
  );
};

export default Register;
