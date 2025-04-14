
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onLogin: (email: string, password: string, asVendor: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [asVendor, setAsVendor] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Normally would validate and send to backend
    // For demo, we'll just simulate a login
    setTimeout(() => {
      onLogin(email, password, asVendor);
      setLoading(false);
      
      if (asVendor) {
        navigate('/vendor/dashboard');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link to="/forgot-password" className="text-sm text-wholesale-600 hover:text-wholesale-500">
            Forgot Password?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="vendor" checked={asVendor} onCheckedChange={() => setAsVendor(!asVendor)} />
        <Label htmlFor="vendor" className="text-sm">Login as a vendor</Label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-wholesale-600 hover:bg-wholesale-700"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
