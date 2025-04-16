
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  userRole?: 'customer' | 'vendor' | 'admin';
  cartItems?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  userRole = undefined, 
  cartItems = 0 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock notifications
  const notifications = [
    { id: 1, message: 'Your order ORD-1234 has been shipped', time: '10 minutes ago', isNew: true },
    { id: 2, message: 'New product recommendation based on your purchase history', time: '1 hour ago', isNew: true },
    { id: 3, message: 'Price drop on items in your wishlist', time: '5 hours ago', isNew: false },
    { id: 4, message: 'Your order ORD-1233 has been delivered', time: '1 day ago', isNew: false },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!searchQuery.trim()) return;
    
    toast({
      title: "Search",
      description: `Searching for: "${searchQuery}"`,
      duration: 3000,
    });
    
    // In a real app, this would navigate to search results page
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleNotificationClick = (notificationId: number) => {
    toast({
      title: "Notification",
      description: "Viewing notification details",
      duration: 3000,
    });
    // In a real app, this would mark notification as read and navigate if needed
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-wholesale-700">
                Cheki Hii
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="nav-link-active">
                Home
              </Link>
              <Link to="/categories" className="nav-link">
                Categories
              </Link>
              <Link to="/vendors" className="nav-link">
                Vendors
              </Link>
              {userRole === 'vendor' && (
                <Link to="/vendor/dashboard" className="nav-link">
                  Vendor Dashboard
                </Link>
              )}
              {userRole === 'admin' && (
                <Link to="/admin/dashboard" className="nav-link">
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-wholesale-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </button>
            </form>
            
            {!userRole ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-wholesale-600 hover:bg-wholesale-700">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Notifications dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative p-2">
                      <Bell className="h-5 w-5 text-gray-600" />
                      {notifications.filter(n => n.isNew).length > 0 && (
                        <Badge className="absolute -top-1 -right-1 bg-red-500 h-4 w-4 flex items-center justify-center p-0">
                          {notifications.filter(n => n.isNew).length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel className="flex justify-between">
                      <span>Notifications</span>
                      <Link to="/notifications" className="text-xs text-wholesale-600 hover:underline">
                        View All
                      </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem 
                          key={notification.id}
                          className={`p-3 ${notification.isNew ? 'bg-blue-50' : ''}`}
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <div className="flex flex-col w-full">
                            <p className="text-sm font-medium">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {userRole === 'customer' && (
                  <Link to="/cart" className="relative">
                    <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-wholesale-600" />
                    {cartItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-wholesale-600">{cartItems}</Badge>
                    )}
                  </Link>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-wholesale-100 text-wholesale-700">
                        {userRole?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="flex w-full">Profile</Link>
                    </DropdownMenuItem>
                    {userRole === 'customer' && (
                      <DropdownMenuItem>
                        <Link to="/orders" className="flex w-full">Orders</Link>
                      </DropdownMenuItem>
                    )}
                    {(userRole === 'vendor' || userRole === 'admin') && (
                      <DropdownMenuItem>
                        <Link to={`/${userRole}/dashboard`} className="flex w-full">Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/logout" className="flex w-full text-red-500">Logout</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block pl-3 pr-4 py-2 border-l-4 border-wholesale-600 text-base font-medium text-wholesale-700 bg-wholesale-50"
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Categories
            </Link>
            <Link 
              to="/vendors" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Vendors
            </Link>
            {userRole === 'vendor' && (
              <Link 
                to="/vendor/dashboard" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Vendor Dashboard
              </Link>
            )}
            {userRole === 'admin' && (
              <Link 
                to="/admin/dashboard" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
          
          <form onSubmit={handleSearch} className="px-4 pt-2 pb-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-wholesale-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </button>
            </div>
          </form>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {!userRole ? (
              <div className="flex items-center px-4 space-x-2">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-wholesale-600 hover:bg-wholesale-700 w-full">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
                >
                  Profile
                </Link>
                {userRole === 'customer' && (
                  <>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/cart"
                      className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
                    >
                      Cart {cartItems > 0 && `(${cartItems})`}
                    </Link>
                  </>
                )}
                <Link
                  to="/notifications"
                  className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100"
                >
                  Notifications
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-base font-medium text-red-500 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
