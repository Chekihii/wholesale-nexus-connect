
import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { Bell, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'customer' | 'vendor' | 'admin';
  userName?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  role,
  userName = 'User'
}) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-cheki-700">
              Cheki Hii
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-cheki-100 text-cheki-700">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <Link to="/profile" className="flex-grow">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <Link to="/logout" className="flex-grow">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-grow overflow-hidden">
        <aside className="w-64 hidden md:block">
          <DashboardSidebar role={role} />
        </aside>
        <main className="flex-grow overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
