
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, DollarSign, PackageCheck, Users, TrendingUp, TrendingDown, 
  ChevronRight, AlertTriangle, Check, X, Edit, Save, Plus, Image, FileVideo,
  Search, Filter, ArrowDownUp, CalendarIcon, ChartBar,
  LayoutDashboard, Package, Wallet, User, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatKES } from '@/utils/currency';
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
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ScrollArea } from '@/components/ui/scroll-area';

const recentOrders = [
  { id: 'ORD-3254', customer: 'Urban Retailers Inc.', date: '2023-04-10', status: 'Processing', total: 3450.99, items: 45 },
  { id: 'ORD-3253', customer: 'Downtown Styles', date: '2023-04-08', status: 'Shipped', total: 1728.50, items: 23 },
  { id: 'ORD-3252', customer: 'Metro Market', date: '2023-04-05', status: 'Delivered', total: 2492.75, items: 32 },
  { id: 'ORD-3251', customer: 'Fashion World', date: '2023-04-01', status: 'Delivered', total: 1543.20, items: 18 },
];

const pendingOrders = [
  { id: 'ORD-3255', customer: 'City Electronics', date: '2023-04-12', total: 4320.75, items: 37 },
  { id: 'ORD-3256', customer: 'Urban Retail Solutions', date: '2023-04-12', total: 2895.25, items: 26 },
  { id: 'ORD-3257', customer: 'Modern Home Supplies', date: '2023-04-11', total: 1562.50, items: 18 },
];

const topProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', sold: 238, revenue: 21419.62, moq: 10 },
  { id: 2, name: 'Premium Cotton T-Shirt (Pack of 5)', sold: 192, revenue: 8736.00, moq: 5 },
  { id: 3, name: 'Smart LED Desk Lamp', sold: 147, revenue: 4849.53, moq: 3 },
  { id: 4, name: 'Stainless Steel Water Bottle', sold: 125, revenue: 2343.75, moq: 8 },
];

const lowStockProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', stock: 8, minStock: 10 },
  { id: 2, name: 'Designer Sunglasses', stock: 3, minStock: 5 },
  { id: 3, name: 'Bluetooth Speaker', stock: 7, minStock: 10 },
];

const productCategories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing & Apparel" },
  { value: "home", label: "Home & Kitchen" },
  { value: "construction", label: "Construction Materials" },
  { value: "textiles", label: "Textiles, Fabrics & Yarns" },
  { value: "health", label: "Health & Beauty" }
];

const productSubCategories: Record<string, { value: string, label: string }[]> = {
  electronics: [
    { value: "smartphones", label: "Smartphones & Accessories" },
    { value: "computers", label: "Computers & Laptops" },
    { value: "audio", label: "Audio Equipment" }
  ],
  clothing: [
    { value: "men", label: "Men's Clothing" },
    { value: "women", label: "Women's Clothing" },
    { value: "children", label: "Children's Clothing" }
  ],
  home: [
    { value: "furniture", label: "Furniture" },
    { value: "appliances", label: "Appliances" },
    { value: "decor", label: "Home Decor" }
  ],
  construction: [
    { value: "sanitary", label: "Sanitary" },
    { value: "fittings", label: "Fittings & Accessories" },
    { value: "building", label: "Building Blocks, Sand & Ballast" }
  ],
  textiles: [
    { value: "cloth", label: "Cloth Fabrics, Garments & Accessories" },
    { value: "yarn", label: "Yarns & Threads" }
  ],
  health: [
    { value: "skincare", label: "Skincare" },
    { value: "healthcare", label: "Healthcare Products" }
  ]
};

const productUnits = [
  { value: "piece", label: "Piece" },
  { value: "set", label: "Set" },
  { value: "kg", label: "Kilogram (kg)" },
  { value: "g", label: "Gram (g)" },
  { value: "l", label: "Liter (L)" },
  { value: "ml", label: "Milliliter (mL)" },
  { value: "m", label: "Meter (m)" },
  { value: "cm", label: "Centimeter (cm)" },
  { value: "dozen", label: "Dozen" },
  { value: "box", label: "Box" }
];

const VendorDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [productOpen, setProductOpen] = useState(false);
  const [moqDialogOpen, setMoqDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editingMoq, setEditingMoq] = useState<number | null>(null);
  const [currentMoq, setCurrentMoq] = useState<number>(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');
  const [productUnit, setProductUnit] = useState('');
  const [offerDiscount, setOfferDiscount] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [discountStartDate, setDiscountStartDate] = useState<Date | undefined>(undefined);
  const [discountEndDate, setDiscountEndDate] = useState<Date | undefined>(undefined);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productVideo, setProductVideo] = useState<File | null>(null);
  const [viewImagePreview, setViewImagePreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orderActionDialog, setOrderActionDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [declineReason, setDeclineReason] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received (ORD-3257)", time: "10 minutes ago", read: false },
    { id: 2, message: "Your product 'Wireless Earbuds Pro' is low in stock", time: "1 hour ago", read: false },
    { id: 3, message: "Payment confirmed for order ORD-3254", time: "3 hours ago", read: true }
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Product Search",
      description: `Searching for: "${searchQuery}"`,
      duration: 3000,
    });
  };

  const handleOrderClick = (orderId: string) => {
    toast({
      title: "Order Details",
      description: `Viewing order ${orderId}`,
      duration: 3000,
    });
    navigate(`/vendor/orders/${orderId}`);
  };

  const handleProductClick = (productId: number) => {
    toast({
      title: "Product Details",
      description: `Viewing product #${productId}`,
      duration: 3000,
    });
    navigate(`/vendor/products/${productId}`);
  };

  const handleAddProduct = () => {
    setIsEditMode(false);
    setProductCategory('');
    setProductSubCategory('');
    setProductUnit('');
    setOfferDiscount(false);
    setDiscountPercentage(0);
    setDiscountStartDate(undefined);
    setDiscountEndDate(undefined);
    setProductImage(null);
    setProductVideo(null);
    setProductOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setProductCategory('electronics');
    setProductSubCategory('audio');
    setProductUnit('piece');
    setOfferDiscount(false);
    setDiscountPercentage(0);
    setDiscountStartDate(undefined);
    setDiscountEndDate(undefined);
    setProductOpen(true);
  };

  const handleAddProductSubmit = () => {
    const action = isEditMode ? "updated" : "added";
    
    // Send email notification to chekihiiii@gmail.com in a real implementation
    toast({
      title: `Product ${action}`,
      description: `Product has been ${action} to your inventory.`,
      duration: 3000,
    });
    setProductOpen(false);
  };

  const handleSetMoq = (product: any) => {
    setSelectedProduct(product);
    setCurrentMoq(product.moq);
    setMoqDialogOpen(true);
  };

  const handleMoqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setCurrentMoq(value);
    }
  };

  const handleMoqSubmit = () => {
    toast({
      title: "MOQ Updated",
      description: `${selectedProduct.name} now has a minimum order quantity of ${currentMoq}.`,
      duration: 3000,
    });
    setMoqDialogOpen(false);
  };

  const handleRestock = (product: any) => {
    toast({
      title: "Restock Initiated",
      description: `Restocking ${product.name}`,
      duration: 3000,
    });
  };

  const handleFilterClick = (filterType: string) => {
    toast({
      title: "Filter Applied",
      description: `Products now filtered by: ${filterType}`,
      duration: 3000,
    });
  };

  const handlePendingOrderClick = (order: any) => {
    setSelectedOrder(order);
    setOrderActionDialog(true);
  };

  const handleOrderAction = (action: 'accept' | 'decline') => {
    if (action === 'accept') {
      toast({
        title: "Order Accepted",
        description: `Order ${selectedOrder.id} has been accepted.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Order Declined",
        description: `Order ${selectedOrder.id} has been declined. Customer and admin have been notified.`,
        duration: 3000,
      });
      // Would send email to chekihiiii@gmail.com in a real implementation
    }
    setOrderActionDialog(false);
    setDeclineReason('');
  };

  const handleTaskbarClick = (tab: string) => {
    setActiveTab(tab);
    
    switch (tab) {
      case 'analytics':
        toast({
          title: "Analytics",
          description: "Viewing sales analytics and reports",
          duration: 3000,
        });
        break;
      case 'orders':
        toast({
          title: "Orders",
          description: "Managing your customer orders",
          duration: 3000,
        });
        navigate('/vendor/orders');
        break;
      case 'stock':
        toast({
          title: "Stock Management",
          description: "Managing your product inventory",
          duration: 3000,
        });
        navigate('/vendor/products');
        break;
      case 'finances':
        toast({
          title: "Finances",
          description: "Viewing financial reports and statements",
          duration: 3000,
        });
        navigate('/vendor/finances');
        break;
      case 'account':
        toast({
          title: "Account Settings",
          description: "Managing your vendor account",
          duration: 3000,
        });
        navigate('/vendor/account');
        break;
      default:
        break;
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'video'
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (type === 'image') {
        setProductImage(file);
        setViewImagePreview(URL.createObjectURL(file));
      } else {
        setProductVideo(file);
      }
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setProductCategory(category);
    setProductSubCategory('');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              size={18} 
            />
            <Input 
              placeholder="Search products..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSearch}>
              Search
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter size={16} className="mr-2" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => handleFilterClick('Newest First')}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterClick('Oldest First')}>
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterClick('Price: Low to High')}>
                  <ArrowDownUp size={16} className="mr-2" /> Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterClick('Price: High to Low')}>
                  <ArrowDownUp size={16} className="mr-2 rotate-180" /> Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterClick('Best Selling')}>
                  Best Selling
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterClick('Low Stock')}>
                  Low Stock
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-wholesale-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-wholesale-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">{formatKES(124563.82)}</h3>
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
                <h3 className="text-2xl font-bold text-gray-900">1,243</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <PackageCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Products</p>
                <h3 className="text-2xl font-bold text-gray-900">156</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Customers</p>
                <h3 className="text-2xl font-bold text-gray-900">287</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-700 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-200">
                    <th className="text-left py-3 px-4 text-yellow-700">Order ID</th>
                    <th className="text-left py-3 px-4 text-yellow-700">Customer</th>
                    <th className="text-right py-3 px-4 text-yellow-700">Items</th>
                    <th className="text-right py-3 px-4 text-yellow-700">Total</th>
                    <th className="text-right py-3 px-4 text-yellow-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrders.map((order) => (
                    <tr key={order.id} className="border-b border-yellow-200 hover:bg-yellow-100">
                      <td 
                        className="py-3 px-4 text-yellow-700 cursor-pointer hover:text-yellow-900"
                      >
                        {order.id}
                      </td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4 text-right">{order.items}</td>
                      <td className="py-3 px-4 text-right">{formatKES(order.total)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-green-500 text-green-500 hover:bg-green-100"
                            onClick={() => handlePendingOrderClick(order)}
                          >
                            Review
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">Chart showing sales trends would go here</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-sm font-medium">This Month</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">{formatKES(24512.65)}</p>
                  <p className="text-sm text-green-600 mt-1">+18.2% from last month</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingDown className="h-6 w-6 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium">Last Month</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">{formatKES(20739.13)}</p>
                  <p className="text-sm text-yellow-600 mt-1">-5.4% from previous</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr 
                        key={order.id} 
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleOrderClick(order.id)}
                      >
                        <td className="py-3 px-4 text-wholesale-600">
                          {order.id}
                        </td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">{formatKES(order.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Link to="/vendor/orders" className="text-wholesale-600 hover:text-wholesale-700 text-sm font-medium">
                  View All Orders
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Top Selling Products</CardTitle>
              <Button 
                className="bg-wholesale-600 hover:bg-wholesale-700" 
                onClick={handleAddProduct}
              >
                <Plus size={16} className="mr-2" /> Add New Product
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Product Name</th>
                    <th className="text-center py-3 px-4">MOQ</th>
                    <th className="text-right py-3 px-4">Units Sold</th>
                    <th className="text-right py-3 px-4">Revenue</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr 
                      key={product.id} 
                      className="border-b hover:bg-gray-50"
                    >
                      <td 
                        className="py-3 px-4 text-gray-900 hover:text-wholesale-600 cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.name}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <span>{product.moq}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetMoq(product);
                            }}
                            className="ml-2 h-6 w-6 p-0"
                          >
                            <Edit size={14} className="text-gray-500 hover:text-wholesale-600" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">{product.sold}</td>
                      <td className="py-3 px-4 text-right">{formatKES(product.revenue)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProduct(product);
                            }}
                          >
                            <Edit className="h-4 w-4 text-wholesale-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleProductClick(product.id)}
                          >
                            <ChevronRight className="h-5 w-5 text-wholesale-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Link to="/vendor/products" className="text-wholesale-600 hover:text-wholesale-700 text-sm font-medium">
                View All Products
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-700">Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-red-200">
                    <th className="text-left py-3 px-4 text-red-700">Product Name</th>
                    <th className="text-right py-3 px-4 text-red-700">Current Stock</th>
                    <th className="text-right py-3 px-4 text-red-700">Min. Stock</th>
                    <th className="text-right py-3 px-4 text-red-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((product) => (
                    <tr key={product.id} className="border-b border-red-200 hover:bg-red-100">
                      <td 
                        className="py-3 px-4 text-red-700 cursor-pointer hover:text-red-900"
                        onClick={() => handleProductClick(product.id)}
                      >
                        {product.name}
                      </td>
                      <td className="py-3 px-4 text-right text-red-700">{product.stock}</td>
                      <td className="py-3 px-4 text-right text-red-700">{product.minStock}</td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-500 text-red-500 hover:bg-red-100"
                          onClick={() => handleRestock(product)}
                        >
                          Restock
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
    );
  };

  return (
    <DashboardLayout role="vendor" userName="Tech Supplies Inc.">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-3">
              <PackageCheck className="h-6 w-6 text-wholesale-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Tech Supplies Inc.</h1>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setNotificationsOpen(true)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-600"></span>
              )}
            </Button>
            <Button 
              className="bg-wholesale-600 hover:bg-wholesale-700 ml-2" 
              onClick={handleAddProduct}
            >
              <Plus size={16} className="mr-2" /> Add New Product
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'outline'}
            className={`${activeTab === 'dashboard' ? 'bg-wholesale-600 hover:bg-wholesale-700' : ''}`}
            onClick={() => handleTaskbarClick('dashboard')}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'outline'}
            className={`${activeTab === 'analytics' ? 'bg-wholesale-600 hover:bg-wholesale-700' : ''}`}
            onClick={() => handleTaskbarClick('analytics')}
          >
            <ChartBar className="h-4 w-4 mr-2" /> Analytics
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            className={`${activeTab === 'orders' ? 'bg-wholesale-600 hover:bg-wholesale-700' : ''}`}
            onClick={() => handleTaskbarClick('orders')}
          >
            <ShoppingBag className="h-4 w-4 mr-2" /> Orders
          </Button>
          <Button
            variant={activeTab === 'stock' ? 'default' : 'outline'}
            className={`${activeTab === 'stock' ? 'bg-wholesale-600 hover:bg-wholesale-700' : ''}`}
            onClick={() => handleTaskbarClick('stock')}
          >
            <Package className="h-4 w-4 mr-2" /> Stock
          </Button>
          <Button
            variant={activeTab === 'finances' ? 'default' : 'outline'}
            className={`${activeTab === 'finances' ? 'bg-wholesale-600 hover:bg-wholesale-700' : ''}`}
            onClick={() => handleTaskbarClick('finances')}
          >
            <Wallet className="h-4 w-4 mr-2" /> Finances
          </Button>
          <Button
            variant={activeTab === 'account' ? 'default' : 'outline'}
            className={`${activeTab === 'account' ? 'bg-wholesale-600 hover:bg-wholesale-700' : ''}`}
            onClick={() => handleTaskbarClick('account')}
          >
            <User className="h-4 w-4 mr-2" /> Account
          </Button>
        </div>

        {renderContent()}

        {/* Add Product Dialog */}
        <Dialog open={productOpen} onOpenChange={setProductOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? 'Update your product details below.'
                  : 'Fill in the product details to add it to your inventory.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="product-name">Product Name</FormLabel>
                  <Input 
                    id="product-name" 
                    defaultValue={isEditMode ? selectedProduct?.name : ''} 
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="product-sku">SKU</FormLabel>
                  <Input 
                    id="product-sku" 
                    defaultValue={isEditMode ? 'SKU-' + selectedProduct?.id : 'SKU-'} 
                    placeholder="Enter product SKU"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="product-category">Category</FormLabel>
                  <select 
                    id="product-category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={productCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="" disabled>Select Category</option>
                    {productCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="product-subcategory">Subcategory</FormLabel>
                  <select 
                    id="product-subcategory"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={productSubCategory}
                    onChange={(e) => setProductSubCategory(e.target.value)}
                    disabled={!productCategory}
                  >
                    <option value="" disabled>Select Subcategory</option>
                    {productCategory && productSubCategories[productCategory]?.map((subCategory) => (
                      <option key={subCategory.value} value={subCategory.value}>
                        {subCategory.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="product-price">Unit Price (KES)</FormLabel>
                  <Input 
                    id="product-price" 
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={isEditMode ? '1000' : ''}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="product-moq">Minimum Order Quantity</FormLabel>
                  <Input 
                    id="product-moq" 
                    type="number"
                    min="1"
                    step="1"
                    defaultValue={isEditMode ? selectedProduct?.moq : '1'}
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="product-stock">Stock Quantity</FormLabel>
                  <Input 
                    id="product-stock" 
                    type="number"
                    min="0"
                    defaultValue={isEditMode ? '50' : ''}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel htmlFor="product-unit">Unit Type</FormLabel>
                  <select 
                    id="product-unit"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={productUnit}
                    onChange={(e) => setProductUnit(e.target.value)}
                  >
                    <option value="" disabled>Select Unit</option>
                    {productUnits.map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="product-description">Product Description</FormLabel>
                <textarea 
                  id="product-description"
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={isEditMode ? 'High quality product with excellent durability and performance.' : ''}
                  placeholder="Describe your product..."
                ></textarea>
              </div>

              <div className="space-y-2">
                <FormLabel>Product Images</FormLabel>
                <div className="flex gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center w-40 h-40 relative">
                    {viewImagePreview ? (
                      <>
                        <img 
                          src={viewImagePreview} 
                          alt="Product preview" 
                          className="object-contain max-h-32"
                        />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-1 right-1 h-6 w-6 p-0" 
                          onClick={() => setViewImagePreview(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Image className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Main Image</p>
                        <Input 
                          type="file"
                          id="product-image"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, 'image')}
                          accept="image/*"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => document.getElementById('product-image')?.click()}
                        >
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <div className="border rounded-md p-4 flex flex-col items-center justify-center w-40 h-40">
                    <FileVideo className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Product Video</p>
                    <Input 
                      type="file"
                      id="product-video"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, 'video')}
                      accept="video/*"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => document.getElementById('product-video')?.click()}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="offer-discount"
                    checked={offerDiscount}
                    onCheckedChange={(checked) => setOfferDiscount(checked === true)}
                  />
                  <label
                    htmlFor="offer-discount"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Offer Special Discount
                  </label>
                </div>
              </div>

              {offerDiscount && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel htmlFor="discount-percentage">Discount Percentage (%)</FormLabel>
                      <Input 
                        id="discount-percentage"
                        type="number"
                        min="0"
                        max="100"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel htmlFor="discount-start-date">Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="discount-start-date"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {discountStartDate ? (
                              format(discountStartDate, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={discountStartDate}
                            onSelect={setDiscountStartDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel htmlFor="discount-end-date">End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="discount-end-date"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {discountEndDate ? (
                              format(discountEndDate, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={discountEndDate}
                            onSelect={setDiscountEndDate}
                            disabled={(date) => 
                              date < new Date() || 
                              (discountStartDate ? date < discountStartDate : false)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setProductOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProductSubmit}>
                {isEditMode ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* MOQ Dialog */}
        <Dialog open={moqDialogOpen} onOpenChange={setMoqDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Set Minimum Order Quantity</DialogTitle>
              <DialogDescription>
                Update the minimum order quantity for {selectedProduct?.name}. 
                Customers will not be able to purchase below this quantity.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-2">
                <FormLabel htmlFor="moq-input">MOQ</FormLabel>
                <Input 
                  id="moq-input"
                  type="number"
                  min="1"
                  value={currentMoq}
                  onChange={handleMoqChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMoqDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleMoqSubmit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Order Action Dialog */}
        <Dialog open={orderActionDialog} onOpenChange={setOrderActionDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Order {selectedOrder?.id}</DialogTitle>
              <DialogDescription>
                Review the order details before accepting or declining.
              </DialogDescription>
            </DialogHeader>
            {selectedOrder && (
              <div className="py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">
                      <div className="font-medium text-gray-500">Customer</div>
                      <div>{selectedOrder.customer}</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-500">Order Date</div>
                      <div>{selectedOrder.date}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm">
                      <div className="font-medium text-gray-500">Items</div>
                      <div>{selectedOrder.items} items</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-500">Total Amount</div>
                      <div className="font-bold">{formatKES(selectedOrder.total)}</div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-500 mb-2">Decline Reason (optional)</div>
                      <textarea
                        className="w-full border rounded-md p-2 text-sm"
                        rows={3}
                        placeholder="Enter reason for declining the order..."
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="flex justify-between">
              <Button variant="destructive" onClick={() => handleOrderAction('decline')}>
                <X className="h-4 w-4 mr-2" /> Decline Order
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700" 
                onClick={() => handleOrderAction('accept')}
              >
                <Check className="h-4 w-4 mr-2" /> Accept Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Notifications Dialog */}
        <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-100'}`}
                  >
                    <div className="text-sm font-medium">
                      {notification.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setNotifications(notifications.map(n => ({ ...n, read: true })));
                  setNotificationsOpen(false);
                }}
                className="w-full"
              >
                Mark all as read
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;
