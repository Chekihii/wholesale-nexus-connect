
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, Package, Clock, Calendar, TrendingUp, TrendingDown, 
  Grid2x2, List, Tag, Home, Tv, Shirt, Heart, Wrench, Book, Carrot, Wine,
  Search, Settings, ArrowDownUp, MapPin, Star, CheckCircle, Filter,
  ChevronRight, Bell, RefreshCw, Repeat, Flame, Sparkles, Truck, User, X
} from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { categories, Category } from '@/data/categories';
import { formatKES } from '@/utils/currency';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { useToast } from '@/components/ui/use-toast';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate, Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

const recentOrders = [
  { id: 'ORD-1234', date: '2023-04-10', status: 'Delivered', total: 12459.99 },
  { id: 'ORD-1235', date: '2023-04-05', status: 'Shipped', total: 5685.50 },
  { id: 'ORD-1236', date: '2023-03-29', status: 'Processing', total: 8927.75 },
];

const recentlyViewed = [
  { id: 1, name: 'Wireless Earbuds Pro', image: '', price: 8999, minOrder: 10, vendor: 'TechPro Supplies' },
  { id: 2, name: 'Premium Cotton T-Shirt (Pack of 5)', image: '', price: 4550, minOrder: 20, vendor: 'Fashion Wholesale Co.' },
  { id: 3, name: 'Smart LED Desk Lamp', image: '', price: 3299, minOrder: 15, vendor: 'Global Home Goods' },
  { id: 4, name: 'Stainless Steel Water Bottle', image: '', price: 1875, minOrder: 30, vendor: 'EcoWare Solutions' },
  { id: 5, name: 'Bluetooth Speaker', image: '', price: 6500, minOrder: 5, vendor: 'Audio Solutions Ltd' },
  { id: 6, name: 'Office Chair', image: '', price: 12000, minOrder: 2, vendor: 'Office Depot Kenya' },
];

const topDeals = [
  { id: 7, name: 'Premium Bluetooth Headphones', image: '', price: 7500, minOrder: 5, vendor: 'Audio Tech Ltd', discount: '20%' },
  { id: 8, name: 'Ergonomic Office Chair', image: '', price: 15000, minOrder: 2, vendor: 'Office Solutions', discount: '15%' },
  { id: 9, name: 'Smart Home Security System', image: '', price: 22000, minOrder: 1, vendor: 'SecureTech', discount: '25%' },
  { id: 10, name: 'Professional Blender Set', image: '', price: 8500, minOrder: 3, vendor: 'Kitchen Essentials', discount: '10%' },
];

const monthlySpendingData = [
  { name: 'Jan', Electronics: 15000, Fashion: 8000, Home: 5000, Beauty: 3000 },
  { name: 'Feb', Electronics: 12000, Fashion: 9500, Home: 4500, Beauty: 2800 },
  { name: 'Mar', Electronics: 18000, Fashion: 7200, Home: 6800, Beauty: 3600 },
  { name: 'Apr', Electronics: 22000, Fashion: 10500, Home: 8200, Beauty: 4100 },
];

const getCategoryIcon = (categoryName: string) => {
  const iconMap = {
    'Electronics': Tv,
    'Home': Home,
    'Fashion': Shirt,
    'Beauty': Heart,
    'Textile, Fabrics & Yarns': List,
    'Motor & Bicycle Spare Parts': Wrench,
    'Construction': Tag,
    'Electricals': Grid2x2,
    'Juakali': Wrench,
    'Office & School Supplies': Book,
    'Packaging': Package,
    'Farm Produce': Carrot,
    'Beverage': Wine,
    'Machinery & Tools': Wrench,
    'Shop Supplies': Tag,
    'Pharmaceuticals': Heart,
    'Agro-vet': Carrot
  };

  return iconMap[categoryName] || Tag;
};

const CustomerDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchType, setSearchType] = useState<'products' | 'vendors'>('products');
  const [orderToTrack, setOrderToTrack] = useState('');
  const [trackingDetails, setTrackingDetails] = useState<any>(null);
  const [showCartItems, setShowCartItems] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Wireless Earbuds Pro', price: 8999, quantity: 2, image: '' },
    { id: 2, name: 'Premium Cotton T-Shirt', price: 4550, quantity: 1, image: '' }
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const CustomTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      return <ChartTooltipContent {...props} formatter={(value: number) => formatKES(value)} />;
    }
    return null;
  };

  const handleRepeatOrder = (orderId: string) => {
    toast({
      title: "Order Being Repeated",
      description: `Adding items from order ${orderId} to your cart.`,
      duration: 3000,
    });
    // Email notification would be sent to chekihiiii@gmail.com in a real implementation
    // Also notify vendor and admin dashboards
    setShowCartItems(true);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    toast({
      title: `Searching for ${searchType}`,
      description: `Results for: "${searchQuery}"`,
      duration: 3000,
    });
    // In a real app, this would redirect to search results page
  };

  const handleFilterClick = (filterType: string) => {
    toast({
      title: "Filter Applied",
      description: `Products now sorted by: ${filterType}`,
      duration: 3000,
    });
    // In a real app, this would apply the filter
  };

  const handleTrackOrder = () => {
    if (!orderToTrack.trim()) {
      toast({
        title: "Order ID Required",
        description: "Please enter an order ID to track.",
        duration: 3000,
      });
      return;
    }
    
    const mockTrackingDetails = {
      orderId: orderToTrack,
      status: "Shipped",
      lastUpdate: "2023-04-12",
      location: "Nairobi Distribution Center",
      estimatedDelivery: "2023-04-15",
      steps: [
        { status: "Order Received", date: "2023-04-05", completed: true },
        { status: "Processing", date: "2023-04-07", completed: true },
        { status: "Shipped", date: "2023-04-12", completed: true },
        { status: "Out for Delivery", date: "Pending", completed: false },
        { status: "Delivered", date: "Pending", completed: false }
      ]
    };
    
    setTrackingDetails(mockTrackingDetails);
    
    toast({
      title: "Order Tracked",
      description: `Retrieved status for order ${orderToTrack}`,
      duration: 3000,
    });
  };

  const handleTaskbarClick = (action: string) => {
    switch (action) {
      case 'home':
        navigate('/');
        break;
      case 'cart':
        setShowCartItems(true);
        break;
      case 'categories':
        window.scrollTo({
          top: document.querySelector('.categories-section')?.getBoundingClientRect().top || 0,
          behavior: 'smooth'
        });
        break;
      case 'search':
        const searchInput = document.querySelector('input[placeholder="Search products..."]');
        if (searchInput instanceof HTMLInputElement) {
          searchInput.focus();
        }
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      duration: 3000,
    });
  };

  const checkoutCart = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to checkout page",
      duration: 3000,
    });
    // Would send email to chekihiiii@gmail.com in a real implementation
    // Would update vendor and admin notifications
    navigate('/checkout');
  };

  return (
    <DashboardLayout role="customer" userName="John Retailer">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  {searchType === 'products' ? 'Products' : 'Vendors'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSearchType('products')}>
                  Products
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchType('vendors')}>
                  Vendors
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="default" 
              className="bg-wholesale-600 hover:bg-wholesale-700"
              onClick={handleSearch}
            >
              <Search size={16} className="mr-2" /> Search
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter size={16} className="mr-2" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => handleFilterClick('Price: Low to High')}>
                    <ArrowDownUp size={16} className="mr-2" /> Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterClick('Price: High to Low')}>
                    <ArrowDownUp size={16} className="mr-2 rotate-180" /> Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleFilterClick('Within 30 KM')}>
                    <MapPin size={16} className="mr-2" /> Within 30 KM
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleFilterClick('Lowest MOQ First')}>
                    <Package size={16} className="mr-2" /> Lowest MOQ First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterClick('Highest MOQ First')}>
                    <Package size={16} className="mr-2" /> Highest MOQ First
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleFilterClick('Highest Rated Vendor')}>
                    <Star size={16} className="mr-2" /> Highest Rated Vendor
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterClick('Highest Rated Product')}>
                    <Star size={16} className="mr-2" /> Highest Rated Product
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleFilterClick('Verified Vendors')}>
                    <CheckCircle size={16} className="mr-2" /> Verified Vendors
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Categories Section - Moved to top as requested */}
        <div className="categories-section">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Browse Categories</h2>
          </div>
          
          {selectedCategory ? (
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedCategory(null)}
                  className="text-wholesale-600 p-0 mr-2"
                >
                  Back to Categories
                </Button>
                <span className="text-lg font-medium">{selectedCategory.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedCategory.subcategories.map((subcategory) => (
                  <Card 
                    key={subcategory.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Subcategory Selected",
                        description: `Browsing products in ${subcategory.name}`,
                        duration: 3000,
                      });
                      // In a real app, this would navigate to subcategory page
                    }}
                  >
                    <CardContent className="flex flex-col items-center p-4">
                      <h3 className="text-sm font-medium text-gray-900 text-center">{subcategory.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category: Category) => {
                const CategoryIcon = getCategoryIcon(category.name);
                return (
                  <Card 
                    key={category.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <CardContent className="flex flex-col items-center p-4">
                      <div className="bg-cheki-100 p-3 rounded-full mb-2">
                        <CategoryIcon className="h-6 w-6 text-cheki-600" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 text-center">{category.name}</h3>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{category.subcategories.length}</span> 
                        <ChevronRight size={14} className="ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-wholesale-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-wholesale-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold text-gray-900">24</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Orders</p>
                <h3 className="text-2xl font-bold text-gray-900">5</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                <h3 className="text-2xl font-bold text-gray-900">3</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Spent</p>
                <h3 className="text-2xl font-bold text-gray-900">{formatKES(152400)}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2" /> Top Deals
            </h2>
            <Link to="/deals" className="text-wholesale-600 hover:underline text-sm font-medium">
              View All Deals
            </Link>
          </div>
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {topDeals.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="relative">
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                      {product.discount} OFF
                    </div>
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-2">
              <CarouselPrevious className="static translate-y-0 ml-0" />
              <CarouselNext className="static translate-y-0 mr-0" />
            </div>
          </Carousel>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recently Viewed Products</h2>
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {recentlyViewed.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-2">
              <CarouselPrevious className="static translate-y-0 ml-0" />
              <CarouselNext className="static translate-y-0 mr-0" />
            </div>
          </Carousel>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <a href={`/order/${order.id}`} className="text-wholesale-600 hover:underline">
                            {order.id}
                          </a>
                        </td>
                        <td className="py-3 px-4">{order.date}</td>
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
                <Link to="/orders" className="text-wholesale-600 hover:text-wholesale-700 text-sm font-medium">
                  View All Orders
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Repeat className="h-5 w-5 mr-2 text-wholesale-600" /> Repeat Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Quickly reorder items from your previous orders without having to search for products again.
              </p>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-md mr-3 flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date} • {formatKES(order.total)}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleRepeatOrder(order.id)}
                        className="bg-wholesale-600 hover:bg-wholesale-700"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Repeat
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              className="h-72" 
              config={{
                Electronics: { color: "#4338CA" },
                Fashion: { color: "#0EA5E9" },
                Home: { color: "#10B981" },
                Beauty: { color: "#F59E0B" }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySpendingData}>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value/1000}K`} />
                  <Tooltip content={CustomTooltip} />
                  <Legend />
                  <Bar dataKey="Electronics" fill="#4338CA" name="Electronics" />
                  <Bar dataKey="Fashion" fill="#0EA5E9" name="Fashion" />
                  <Bar dataKey="Home" fill="#10B981" name="Home" />
                  <Bar dataKey="Beauty" fill="#F59E0B" name="Beauty" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="mr-4">
                  <TrendingUp className="h-10 w-10 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-2xl font-bold">{formatKES(28453)}</p>
                  <p className="text-sm text-green-600">+12.5% from last month</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="mr-4">
                  <TrendingDown className="h-10 w-10 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Month</p>
                  <p className="text-2xl font-bold">{formatKES(25283)}</p>
                  <p className="text-sm text-yellow-600">-3.2% from previous</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button className="bg-wholesale-600 hover:bg-wholesale-700" onClick={() => navigate('/notifications')}>
            <Bell className="h-4 w-4 mr-2" /> View Notifications
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-wholesale-600 hover:bg-wholesale-700">
                <Truck className="h-4 w-4 mr-2" /> Track Your Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Track Your Order</DialogTitle>
                <DialogDescription>
                  Enter your order ID to see its current status and delivery progress.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Enter Order ID (e.g., ORD-1234)"
                    value={orderToTrack}
                    onChange={(e) => setOrderToTrack(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleTrackOrder}>Track</Button>
                </div>
                {trackingDetails && (
                  <div className="border rounded-lg p-4 mt-2">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-bold text-lg">Order #{trackingDetails.orderId}</h4>
                        <p className="text-gray-500">Last updated: {trackingDetails.lastUpdate}</p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {trackingDetails.status}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Current Location</span>
                        <span className="text-sm font-medium">{trackingDetails.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Estimated Delivery</span>
                        <span className="text-sm font-medium">{trackingDetails.estimatedDelivery}</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute left-2 inset-y-0 w-0.5 bg-gray-200"></div>
                      <div className="space-y-6 relative">
                        {trackingDetails.steps.map((step: any, index: number) => (
                          <div key={index} className="flex gap-3">
                            <div className={`w-4 h-4 rounded-full mt-1 ${
                              step.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                            <div className="flex-1">
                              <p className="font-medium">{step.status}</p>
                              <p className="text-sm text-gray-500">
                                {step.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogTrigger asChild>
                  <Button variant="outline">Close</Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Dialog open={showCartItems} onOpenChange={setShowCartItems}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Cart</DialogTitle>
            <DialogDescription>
              Review items in your cart before proceeding to checkout.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                        ) : (
                          <Package className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{formatKES(item.price)} × {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatKES(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0))}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCartItems(false)}>
              Continue Shopping
            </Button>
            <Button 
              onClick={checkoutCart}
              disabled={cartItems.length === 0}
              className="bg-wholesale-600 hover:bg-wholesale-700"
            >
              Checkout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around items-center h-16">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center h-full rounded-none"
            onClick={() => handleTaskbarClick('home')}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center h-full rounded-none"
            onClick={() => handleTaskbarClick('cart')}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Cart</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center h-full rounded-none"
            onClick={() => handleTaskbarClick('categories')}
          >
            <Grid2x2 className="h-5 w-5" />
            <span className="text-xs mt-1">Categories</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center h-full rounded-none"
            onClick={() => handleTaskbarClick('search')}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center justify-center h-full rounded-none"
            onClick={() => handleTaskbarClick('profile')}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
