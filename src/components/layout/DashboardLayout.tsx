
import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { Bell, User, LogOut, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

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
  const [logoDialogOpen, setLogoDialogOpen] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { toast } = useToast();

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleLogoUpload = () => {
    // In a real application, this would upload the logo to a server
    toast({
      title: "Logo uploaded",
      description: "Your store logo has been updated successfully.",
      duration: 3000,
    });
    setLogoDialogOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (!notificationsOpen) {
      toast({
        title: "Notifications",
        description: `You have new notifications`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b border-gray-200 z-30">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-cheki-700">
              Cheki Hii
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            {role === 'vendor' && (
              <div className="flex items-center">
                <Avatar className="h-10 w-10 cursor-pointer" onClick={() => setLogoDialogOpen(true)}>
                  {logoPreview ? (
                    <AvatarImage src={logoPreview} />
                  ) : (
                    <AvatarFallback className="bg-cheki-100 text-cheki-700">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            )}
            <button 
              className="p-2 text-gray-500 hover:text-gray-700 relative"
              onClick={toggleNotifications}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                <DropdownMenuLabel>
                  <span className="text-sm">{userName}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <Link to="/profile" className="flex-grow">Profile</Link>
                </DropdownMenuItem>
                {role === 'vendor' && (
                  <DropdownMenuItem onClick={() => setLogoDialogOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    <span className="flex-grow">Update Store Logo</span>
                  </DropdownMenuItem>
                )}
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
          {notificationsOpen && (
            <div className="fixed top-16 right-4 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                  <p className="font-medium text-sm">New Order</p>
                  <p className="text-sm text-gray-500">Order #12345 has been placed</p>
                  <p className="text-xs text-gray-400 mt-1">30 minutes ago</p>
                </div>
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                  <p className="font-medium text-sm">Payment Confirmed</p>
                  <p className="text-sm text-gray-500">Payment for order #12340 received</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50">
                  <p className="font-medium text-sm">Product Stock Alert</p>
                  <p className="text-sm text-gray-500">Bluetooth Earbuds are running low</p>
                  <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </div>
              <div className="p-2 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="w-full text-sm">
                  View all notifications
                </Button>
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
      
      {/* Logo Upload Dialog */}
      <Dialog open={logoDialogOpen} onOpenChange={setLogoDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Store Logo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              {logoPreview ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={logoPreview} 
                    alt="Store logo preview" 
                    className="h-24 w-24 object-cover rounded-full border-2 border-gray-200"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      setLogoFile(null);
                      setLogoPreview(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div 
                    className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Upload className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Click to select an image
                  </p>
                </div>
              )}
              <Input 
                type="file" 
                id="logo-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleLogoChange} 
              />
              <p className="text-xs text-gray-500 text-center">
                Recommended size: 500x500 pixels. Max file size: 2MB.<br/>
                Formats: JPG, PNG
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogoUpload} disabled={!logoFile}>
              Save Logo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
