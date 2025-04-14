
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, DollarSign, PackageCheck, Users, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Temporary mocked data
const recentOrders = [
  { id: 'ORD-3254', customer: 'Urban Retailers Inc.', date: '2023-04-10', status: 'Processing', total: 3450.99, items: 45 },
  { id: 'ORD-3253', customer: 'Downtown Styles', date: '2023-04-08', status: 'Shipped', total: 1728.50, items: 23 },
  { id: 'ORD-3252', customer: 'Metro Market', date: '2023-04-05', status: 'Delivered', total: 2492.75, items: 32 },
  { id: 'ORD-3251', customer: 'Fashion World', date: '2023-04-01', status: 'Delivered', total: 1543.20, items: 18 },
];

const topProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', sold: 238, revenue: 21419.62 },
  { id: 2, name: 'Premium Cotton T-Shirt (Pack of 5)', sold: 192, revenue: 8736.00 },
  { id: 3, name: 'Smart LED Desk Lamp', sold: 147, revenue: 4849.53 },
  { id: 4, name: 'Stainless Steel Water Bottle', sold: 125, revenue: 2343.75 },
];

const lowStockProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', stock: 8, minStock: 10 },
  { id: 2, name: 'Designer Sunglasses', stock: 3, minStock: 5 },
  { id: 3, name: 'Bluetooth Speaker', stock: 7, minStock: 10 },
];

const VendorDashboard: React.FC = () => {
  return (
    <DashboardLayout role="vendor" userName="Tech Supplies Inc.">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <Button className="bg-wholesale-600 hover:bg-wholesale-700" asChild>
            <Link to="/vendor/products/new">Add New Product</Link>
          </Button>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="bg-wholesale-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-wholesale-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">$124,563.82</h3>
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
        
        {/* Sales Overview */}
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
                  <p className="text-2xl font-bold mt-2">$24,512.65</p>
                  <p className="text-sm text-green-600 mt-1">+18.2% from last month</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <TrendingDown className="h-6 w-6 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium">Last Month</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">$20,739.13</p>
                  <p className="text-sm text-yellow-600 mt-1">-5.4% from previous</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <a href={`/vendor/orders/${order.id}`} className="text-wholesale-600 hover:underline">
                            {order.id}
                          </a>
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
                        <td className="py-3 px-4 text-right">${order.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <a href="/vendor/orders" className="text-wholesale-600 hover:text-wholesale-700 text-sm font-medium">
                  View All Orders
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Product Name</th>
                    <th className="text-right py-3 px-4">Units Sold</th>
                    <th className="text-right py-3 px-4">Revenue</th>
                    <th className="text-right py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <a href={`/vendor/products/${product.id}`} className="text-gray-900 hover:text-wholesale-600">
                          {product.name}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-right">{product.sold}</td>
                      <td className="py-3 px-4 text-right">${product.revenue.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">
                        <a href={`/vendor/products/${product.id}`} className="text-wholesale-600">
                          <ChevronRight className="h-5 w-5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <a href="/vendor/products" className="text-wholesale-600 hover:text-wholesale-700 text-sm font-medium">
                View All Products
              </a>
            </div>
          </CardContent>
        </Card>
        
        {/* Low Stock Alert */}
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
                    <th className="text-right py-3 px-4 text-red-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((product) => (
                    <tr key={product.id} className="border-b border-red-200 hover:bg-red-100">
                      <td className="py-3 px-4 text-red-700">
                        <a href={`/vendor/products/${product.id}`} className="hover:text-red-900">
                          {product.name}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-right text-red-700">{product.stock}</td>
                      <td className="py-3 px-4 text-right text-red-700">{product.minStock}</td>
                      <td className="py-3 px-4 text-right">
                        <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-100">
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
    </DashboardLayout>
  );
};

export default VendorDashboard;
