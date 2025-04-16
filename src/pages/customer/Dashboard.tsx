
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, Package, Clock, Calendar, TrendingUp, TrendingDown, 
  Grid2x2, List, Tag, Home, Tv, Shirt, Heart, Wrench, Book, Carrot, Wine,
  Search, Settings, ArrowDownUp, MapPin, Star, CheckCircle, Filter,
  ChevronRight
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
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ScrollArea } from '@/components/ui/scroll-area';

// Temporary mocked data
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

// Chart data for monthly spending by category
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

  return (
    <DashboardLayout role="customer" userName="John Retailer">
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search products..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                <Filter size={16} className="mr-2" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <ArrowDownUp size={16} className="mr-2" /> Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowDownUp size={16} className="mr-2 rotate-180" /> Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <MapPin size={16} className="mr-2" /> Within 30 KM
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Package size={16} className="mr-2" /> Lowest MOQ First
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package size={16} className="mr-2" /> Highest MOQ First
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Star size={16} className="mr-2" /> Highest Rated
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <CheckCircle size={16} className="mr-2" /> Verified Vendors
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Stats Overview */}
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

        {/* Categories Section - Now at the top */}
        <div>
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
                {selectedCategory.subcategories.map((subcategory, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex flex-col items-center p-4">
                      <h3 className="text-sm font-medium text-gray-900 text-center">{subcategory}</h3>
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
                        <span>{category.subcategories.length} subcategories</span> 
                        <ChevronRight size={14} className="ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Recently Viewed Products - Horizontal Scroll */}
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
        
        {/* Recent Orders */}
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
              <a href="/orders" className="text-wholesale-600 hover:text-wholesale-700 text-sm font-medium">
                View All Orders
              </a>
            </div>
          </CardContent>
        </Card>
        
        {/* Monthly Spending - Now at the bottom with actual chart */}
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
                  <Tooltip 
                    content={(props) => (
                      <ChartTooltipContent 
                        {...props} 
                        formatter={(value) => formatKES(Number(value))} 
                      />
                    )} 
                  />
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
      </div>
      
      {/* Fixed Taskbar at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 md:hidden">
        <div className="flex justify-around items-center h-16">
          <Button variant="ghost" className="flex flex-col items-center justify-center h-full rounded-none">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center h-full rounded-none">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Cart</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center h-full rounded-none">
            <Grid2x2 className="h-5 w-5" />
            <span className="text-xs mt-1">Categories</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center h-full rounded-none">
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center justify-center h-full rounded-none">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
