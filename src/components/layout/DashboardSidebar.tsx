
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, ShoppingBag, 
  Settings, CreditCard, BarChart3, Store, 
  FileText, Tags, Truck, MessageSquare
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, active }) => {
  const activeClass = active 
    ? "bg-wholesale-100 text-wholesale-700" 
    : "text-gray-600 hover:bg-wholesale-50 hover:text-wholesale-700";
  
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeClass}`}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </Link>
  );
};

interface DashboardSidebarProps {
  role: 'customer' | 'vendor' | 'admin';
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const getLinks = () => {
    switch (role) {
      case 'vendor':
        return [
          { to: '/vendor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/vendor/products', icon: Package, label: 'Products' },
          { to: '/vendor/orders', icon: ShoppingBag, label: 'Orders' },
          { to: '/vendor/store', icon: Store, label: 'My Store' },
          { to: '/vendor/analytics', icon: BarChart3, label: 'Analytics' },
          { to: '/vendor/settings', icon: Settings, label: 'Settings' },
        ];
      case 'admin':
        return [
          { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/admin/vendors', icon: Store, label: 'Vendors' },
          { to: '/admin/customers', icon: Users, label: 'Customers' },
          { to: '/admin/products', icon: Package, label: 'Products' },
          { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
          { to: '/admin/categories', icon: Tags, label: 'Categories' },
          { to: '/admin/reports', icon: FileText, label: 'Reports' },
          { to: '/admin/settings', icon: Settings, label: 'Settings' },
        ];
      case 'customer':
      default:
        return [
          { to: '/customer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/customer/orders', icon: ShoppingBag, label: 'Orders' },
          { to: '/customer/wishlist', icon: Package, label: 'Wishlist' },
          { to: '/customer/messages', icon: MessageSquare, label: 'Messages' },
          { to: '/customer/payment', icon: CreditCard, label: 'Payment Methods' },
          { to: '/customer/shipping', icon: Truck, label: 'Shipping Info' },
          { to: '/customer/settings', icon: Settings, label: 'Settings' },
        ];
    }
  };
  
  const links = getLinks();
  
  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-xl font-bold text-wholesale-700">
          {role === 'vendor' ? 'Vendor Portal' : role === 'admin' ? 'Admin Portal' : 'Customer Portal'}
        </h2>
      </div>
      <nav className="mt-4 px-2 space-y-1">
        {links.map((link) => (
          <SidebarLink 
            key={link.to} 
            to={link.to} 
            icon={link.icon} 
            label={link.label}
            active={currentPath === link.to}
          />
        ))}
      </nav>
    </div>
  );
};
