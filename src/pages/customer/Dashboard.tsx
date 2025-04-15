
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, Package, Clock, Calendar, TrendingUp, TrendingDown, 
  Grid2x2, List, Tag, Home, Tv, Shirt, Heart, Wrench, Book, Carrot, Wine 
} from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { categories, Category } from '@/data/categories';

// Temporary mocked data
const recentOrders = [
  { id: 'ORD-1234', date: '2023-04-10', status: 'Delivered', total: 1245.99 },
  { id: 'ORD-1235', date: '2023-04-05', status: 'Shipped', total: 568.50 },
  { id: 'ORD-1236', date: '2023-03-29', status: 'Processing', total: 892.75 },
];

const recentlyViewed = [
  { id: 1, name: 'Wireless Earbuds Pro', image: '', price: 89.99, minOrder: 10, vendor: 'TechPro Supplies' },
  { id: 2, name: 'Premium Cotton T-Shirt (Pack of 5)', image: '', price: 45.50, minOrder: 20, vendor: 'Fashion Wholesale Co.' },
  { id: 3, name: 'Smart LED Desk Lamp', image: '', price: 32.99, minOrder: 15, vendor: 'Global Home Goods' },
  { id: 4, name: 'Stainless Steel Water Bottle', image: '', price: 18.75, minOrder: 30, vendor: 'EcoWare Solutions' },
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
  return (
    <DashboardLayout role="customer" userName="John Retailer">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
        
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
                <h3 className="text-2xl font-bold text-gray-900">$15,240</h3>
              </div>
            </CardContent>
          </Card>
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
                      <td className="py-3 px-4 text-right">${order.total.toFixed(2)}</td>
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
        
        {/* Recently Viewed Products */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recently Viewed Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentlyViewed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        {/* Monthly Spending */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart showing monthly spending trends would go here</p>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="mr-4">
                  <TrendingUp className="h-10 w-10 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-2xl font-bold">$2,845.38</p>
                  <p className="text-sm text-green-600">+12.5% from last month</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="mr-4">
                  <TrendingDown className="h-10 w-10 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Month</p>
                  <p className="text-2xl font-bold">$2,528.32</p>
                  <p className="text-sm text-yellow-600">-3.2% from previous</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Categories Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category: Category) => {
              const CategoryIcon = getCategoryIcon(category.name);
              return (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="flex flex-col items-center p-4">
                    <div className="bg-cheki-100 p-3 rounded-full mb-2">
                      <CategoryIcon className="h-6 w-6 text-cheki-600" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 text-center">{category.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {category.subcategories.length} subcategories
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
