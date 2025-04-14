
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthCard } from '@/components/auth/AuthCard';
import { LoginForm } from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const handleLogin = (email: string, password: string, asVendor: boolean) => {
    // This would normally connect to a backend service
    // For demo purposes we'll just simulate a successful login
    toast({
      title: "Login Successful",
      description: `Welcome back ${asVendor ? 'Vendor' : 'Customer'}!`,
    });
  };
  
  return (
    <MainLayout>
      <AuthCard 
        title="Login to your account" 
        footer={
          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-wholesale-600 hover:text-wholesale-500 font-medium">
              Sign up
            </Link>
          </div>
        }
      >
        <LoginForm onLogin={handleLogin} />
      </AuthCard>
    </MainLayout>
  );
};

export default Login;
