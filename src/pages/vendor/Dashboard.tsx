import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, 
  ChevronRight, AlertTriangle, Check, X, Edit, Save, Plus, Image, FileVideo,
  Search, ChartBar, LayoutDashboard, Package, Wallet, User, Bell, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatKES } from '@/utils/currency';
import { categories } from '@/data/categories';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Form,
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

const revenueStats = {
  totalRevenue: 1245678.45,
  pendingPayouts: 234567.89,
  totalOrders: 1245,
  totalProducts: 56,
};

const recentOrders = [
  { id: 'ORD-1234', customer: 'John Doe', date: '2023-04-12', total: 12500.00, status: 'Processing' },
  { id: 'ORD-1235', customer: 'Jane Smith', date: '2023-04-11', total: 8750.50, status: 'Shipped' },
  { id: 'ORD-1236', customer: 'Robert Johnson', date: '2023-04-10', total: 5400.75, status: 'Delivered' },
  { id: 'ORD-1237', customer: 'Emily Davis', date: '2023-04-09', total: 3200.25, status: 'Delivered' },
];

const products = [
  { id: 1, name: 'Bluetooth Earbuds', price: 2999.99, stock: 45, category: 'Electronics', status: 'Active' },
  { id: 2, name: 'Wireless Mouse', price: 1499.99, stock: 30, category: 'Electronics', status: 'Active' },
  { id: 3, name: 'USB-C Cable (2m)', price: 899.99, stock: 100, category: 'Accessories', status: 'Active' },
  { id: 4, name: 'Laptop Stand', price: 1999.99, stock: 15, category: 'Accessories', status: 'Active' },
  { id: 5, name: 'External SSD 1TB', price: 8999.99, stock: 8, category: 'Storage', status: 'Low Stock' },
  { id: 6, name: 'Mechanical Keyboard', price: 5499.99, stock: 0, category: 'Electronics', status: 'Out of Stock' },
];

const ordersByMonth = [
  { month: 'Jan', orders: 45 },
  { month: 'Feb', orders: 52 },
  { month: 'Mar', orders: 49 },
  { month: 'Apr', orders: 62 },
  { month: 'May', orders: 87 },
  { month: 'Jun', orders: 75 },
];

const VendorDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [editProductDialogOpen, setEditProductDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productVideo, setProductVideo] = useState<File | null>(null);
  const [productFeatured, setProductFeatured] = useState(false);
  const [date, setDate] = React.useState<Date>();
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Search Results",
      description: `Searching for: "${searchQuery}"`,
      duration: 3000,
    });
    // In a real app, this would filter the content
  };

  const handleAddProduct = () => {
    toast({
      title: "Product Added",
      description: `${productName} has been added to your inventory.`,
      duration: 3000,
    });
    setAddProductDialogOpen(false);
    // Reset form fields
    setProductName('');
    setProductPrice('');
    setProductStock('');
    setProductCategory('');
    setProductDescription('');
    setProductImages([]);
    setProductVideo(null);
    setProductFeatured(false);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setProductPrice(product.price.toString());
    setProductStock(product.stock.toString());
    setProductCategory(product.category);
    setProductDescription('Sample description for ' + product.name);
    setProductFeatured(false);
    setEditProductDialogOpen(true);
  };

  const handleUpdateProduct = () => {
    toast({
      title: "Product Updated",
      description: `${productName} has been updated.`,
      duration: 3000,
    });
    setEditProductDialogOpen(false);
  };

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    toast({
      title: "Product Deleted",
      description: `${selectedProduct.name} has been removed from your inventory.`,
      duration: 3000,
    });
    setDeleteDialogOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setProductImages(filesArray);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductVideo(e.target.files[0]);
    }
  };

  return (
    <DashboardLayout role="vendor" userName="Tech Supplies Inc.">
      <div className="flex flex-col h-full">
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center justify-center">
            <Button 
              variant="ghost" 
              onClick={() => setAddProductDialogOpen(true)}
              className="flex items-center space-x-1"
            >
              <Plus className="mr-1 h-4 w-4" />
              <span>Add New Product</span>
            </Button>
          </div>
        </div>

        <div className="relative z-30 mb-6">
          <ScrollArea orientation="horizontal" className="w-full px-1">
            <div className="flex space-x-2 pb-3">
              <Button
                variant={activeView === 'dashboard' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center shrink-0"
                onClick={() => setActiveView('dashboard')}
              >
                <LayoutDashboard className="mr-1 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={activeView === 'products' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center shrink-0"
                onClick={() => setActiveView('products')}
              >
                <Package className="mr-1 h-4 w-4" />
                Products
              </Button>
              <Button
                variant={activeView === 'orders' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center shrink-0"
                onClick={() => setActiveView('orders')}
              >
                <ShoppingBag className="mr-1 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeView === 'analytics' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center shrink-0"
                onClick={() => setActiveView('analytics')}
              >
                <ChartBar className="mr-1 h-4 w-4" />
                Analytics
              </Button>
              <Button
                variant={activeView === 'finances' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center shrink-0"
                onClick={() => setActiveView('finances')}
              >
                <Wallet className="mr-1 h-4 w-4" />
                Finances
              </Button>
              <Button
                variant={activeView === 'customers' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center shrink-0"
                onClick={() => setActiveView('customers')}
              >
                <User className="mr-1 h-4 w-4" />
                Customers
              </Button>
            </div>
          </ScrollArea>
        </div>

        {activeView === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-cheki-100 p-3 rounded-full">
                    <Wallet className="h-6 w-6 text-cheki-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {formatKES(revenueStats.totalRevenue)}
                    </h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-green-100 p-3 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {revenueStats.totalOrders.toLocaleString()}
                    </h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Products</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {revenueStats.totalProducts.toLocaleString()}
                    </h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Wallet className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pending Payouts</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {formatKES(revenueStats.pendingPayouts)}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-right py-3 px-4">Total</th>
                        <th className="text-center py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4 text-right">{formatKES(order.total)}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveView('orders')}
                  >
                    View All Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Order Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">Chart showing order trends would go here</p>
                </div>
                <div className="mt-4 grid grid-cols-6 gap-2">
                  {ordersByMonth.map((data) => (
                    <div key={data.month} className="flex flex-col items-center">
                      <div 
                        className="bg-cheki-100 w-full" 
                        style={{ height: `${data.orders}px` }}
                      ></div>
                      <span className="text-xs mt-1">{data.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Products</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-10 w-64" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                  />
                </div>
                <Button onClick={handleSearch}>Search</Button>
                <Button 
                  onClick={() => setAddProductDialogOpen(true)}
                  className="bg-cheki-600 hover:bg-cheki-700"
                >
                  <Plus size={16} className="mr-2" /> Add Product
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Product Name</th>
                        <th className="text-right py-3 px-4">Price</th>
                        <th className="text-right py-3 px-4">Stock</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-center py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4 text-right">{formatKES(product.price)}</td>
                          <td className="py-3 px-4 text-right">{product.stock}</td>
                          <td className="py-3 px-4">{product.category}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === 'Active' ? 'bg-green-100 text-green-800' : 
                              product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteProduct(product)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Orders</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search orders..." 
                    className="pl-10 w-64" 
                  />
                </div>
                <Button>Search</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Orders</DropdownMenuItem>
                    <DropdownMenuItem>Processing</DropdownMenuItem>
                    <DropdownMenuItem>Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Delivered</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-right py-3 px-4">Total</th>
                        <th className="text-center py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }, (_, i) => ({
                        id: `ORD-${1234 + i}`,
                        customer: `Customer ${i + 1}`,
                        date: `2023-04-${12 - i}`,
                        total: 5000 + (i * 1000),
                        status: i % 3 === 0 ? 'Processing' : i % 3 === 1 ? 'Shipped' : 'Delivered'
                      })).map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4 text-right">{formatKES(order.total)}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">Sales chart would go here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 5).map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            {index + 1}
                          </div>
                          <span>{product.name}</span>
                        </div>
                        <span>{formatKES(product.price * (10 - index))}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'finances' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Finances</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="bg-green-100 p-3 rounded-full mb-4">
                    <Wallet className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Available Balance</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {formatKES(revenueStats.totalRevenue - revenueStats.pendingPayouts)}
                  </h3>
                  <Button className="mt-4 w-full">Withdraw Funds</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Wallet className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Pending Payouts</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {formatKES(revenueStats.pendingPayouts)}
                  </h3>
                  <Button variant="outline" className="mt-4 w-full">View Details</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="bg-purple-100 p-3 rounded-full mb-4">
                    <Wallet className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {formatKES(revenueStats.totalRevenue)}
                  </h3>
                  <Button variant="outline" className="mt-4 w-full">View Reports</Button>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Transaction ID</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Description</th>
                        <th className="text-right py-3 px-4">Amount</th>
                        <th className="text-center py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 5 }, (_, i) => ({
                        id: `TRX-${10001 + i}`,
                        date: `2023-04-${12 - i}`,
                        description: i % 2 === 0 ? 'Order Payment' : 'Withdrawal',
                        amount: i % 2 === 0 ? 15000 + (i * 1000) : -(8000 + (i * 500)),
                        status: i % 3 === 0 ? 'Pending' : 'Completed'
                      })).map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{transaction.id}</td>
                          <td className="py-3 px-4">{transaction.date}</td>
                          <td className="py-3 px-4">{transaction.description}</td>
                          <td className={`py-3 px-4 text-right ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatKES(Math.abs(transaction.amount))}
                            {transaction.amount > 0 ? ' +' : ' -'}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customers</h2>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-right py-3 px-4">Orders</th>
                        <th className="text-right py-3 px-4">Total Spent</th>
                        <th className="text-center py-3 px-4">Last Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }, (_, i) => ({
                        id: i + 1,
                        name: `Customer ${i + 1}`,
                        email: `customer${i + 1}@example.com`,
                        orders: Math.floor(Math.random() * 10) + 1,
                        spent: Math.floor(Math.random() * 50000) + 5000,
                        lastOrder: `2023-04-${12 - (i % 10)}`
                      })).map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{customer.name}</td>
                          <td className="py-3 px-4">{customer.email}</td>
                          <td className="py-3 px-4 text-right">{customer.orders}</td>
                          <td className="py-3 px-4 text-right">{formatKES(customer.spent)}</td>
                          <td className="py-3 px-4 text-center">{customer.lastOrder}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Dialog open={addProductDialogOpen} onOpenChange={setAddProductDialogOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Product Name
                  </label>
                  <Input 
                    id="name" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price (KES)
                  </label>
                  <Input 
                    id="price" 
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="0.00" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="stock" className="text-sm font-medium">
                    Stock Quantity
                  </label>
                  <Input 
                    id="stock" 
                    type="number"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    placeholder="0" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <select 
                    id="category"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea 
                  id="description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    <Image className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag & drop product images here, or click to select files
                    </p>
                    <input 
                      type="file" 
                      multiple 
                      className="hidden" 
                      id="product-images"
                      onChange={handleImageUpload}
                    />
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => document.getElementById('product-images')?.click()}
                    >
                      Select Files
                    </Button>
                    {productImages.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        {productImages.length} {productImages.length === 1 ? 'file' : 'files'} selected
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Product Video (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    <FileVideo className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Upload a video showcasing your product
                    </p>
                    <input 
                      type="file" 
                      className="hidden" 
                      id="product-video"
                      accept="video/*"
                      onChange={handleVideoUpload}
                    />
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => document.getElementById('product-video')?.click()}
                    >
                      Select Video
                    </Button>
                    {productVideo && (
                      <p className="text-sm text-green-600 mt-2">
                        {productVideo.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={productFeatured}
                  onCheckedChange={(checked) => setProductFeatured(checked as boolean)}
                />
                <label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Feature this product on your store
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddProductDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={editProductDialogOpen} onOpenChange={setEditProductDialogOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Update the details for {selectedProduct?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">
                    Product Name
                  </label>
                  <Input 
                    id="edit-name" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-price" className="text-sm font-medium">
                    Price (KES)
                  </label>
                  <Input 
                    id="edit-price" 
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-stock" className="text-sm font-medium">
                    Stock Quantity
                  </label>
                  <Input 
                    id="edit-stock" 
                    type="number"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-category" className="text-sm font-medium">
                    Category
                  </label>
                  <select 
                    id="edit-category"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">
                  Description
                </label>
                <textarea 
                  id="edit-description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditProductDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateProduct}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedProduct?.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteProduct}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;
