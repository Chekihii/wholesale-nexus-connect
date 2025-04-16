
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, DollarSign, PackageCheck, Users, TrendingUp, TrendingDown, 
  ChevronRight, AlertTriangle, Check, X, Edit, Save, Plus,
  Search, Filter, ArrowDownUp
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

// Temporary mocked data
const recentOrders = [
  { id: 'ORD-3254', customer: 'Urban Retailers Inc.', date: '2023-04-10', status: 'Processing', total: 3450.99, items: 45 },
  { id: 'ORD-3253', customer: 'Downtown Styles', date: '2023-04-08', status: 'Shipped', total: 1728.50, items: 23 },
  { id: 'ORD-3252', customer: 'Metro Market', date: '2023-04-05', status: 'Delivered', total: 2492.75, items: 32 },
  { id: 'ORD-3251', customer: 'Fashion World', date: '2023-04-01', status: 'Delivered', total: 1543.20, items: 18 },
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

const VendorDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [productOpen, setProductOpen] = useState(false);
  const [moqDialogOpen, setMoqDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [editingMoq, setEditingMoq] = useState<number | null>(null);
  const [currentMoq, setCurrentMoq] = useState<number>(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Product Search",
      description: `Searching for: "${searchQuery}"`,
      duration: 3000,
    });
    // In a real app, this would filter the products
  };

  const handleOrderClick = (orderId: string) => {
    toast({
      title: "Order Details",
      description: `Viewing order ${orderId}`,
      duration: 3000,
    });
    // In a real app, this would navigate to the order details page
    navigate(`/vendor/orders/${orderId}`);
  };

  const handleProductClick = (productId: number) => {
    toast({
      title: "Product Details",
      description: `Viewing product #${productId}`,
      duration: 3000,
    });
    // In a real app, this would navigate to the product details page
    navigate(`/vendor/products/${productId}`);
  };

  const handleAddProduct = () => {
    setProductOpen(true);
  };

  const handleAddProductSubmit = () => {
    toast({
      title: "Product Added",
      description: "New product has been added to your inventory.",
      duration: 3000,
    });
    setProductOpen(false);
    // In a real app, this would add the product to the inventory
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
    // In a real app, this would update the product's MOQ
  };

  const handleRestock = (product: any) => {
    toast({
      title: "Restock Initiated",
      description: `Restocking ${product.name}`,
      duration: 3000,
    });
    // In a real app, this would navigate to the restock page
  };

  const handleFilterClick = (filterType: string) => {
    toast({
      title: "Filter Applied",
      description: `Products now filtered by: ${filterType}`,
      duration: 3000,
    });
    // In a real app, this would apply the filter
  };

  return (
    <DashboardLayout role="vendor" userName="Tech Supplies Inc.">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <Button 
            className="bg-wholesale-600 hover:bg-wholesale-700" 
            onClick={handleAddProduct}
          >
            <Plus size={16} className="mr-2" /> Add New Product
          </Button>
        </div>
        
        {/* Search bar */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
        
        {/* Stats Overview */}
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
                        <div className="flex justify-end">
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

      {/* Add Product Dialog */}
      <Dialog open={productOpen} onOpenChange={setProductOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory. Fill in all the required fields.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input id="name" placeholder="Product name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right">
                Price
              </label>
              <Input id="price" placeholder="0.00" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="stock" className="text-right">
                Stock
              </label>
              <Input id="stock" placeholder="0" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="moq" className="text-right">
                MOQ
              </label>
              <Input id="moq" placeholder="1" type="number" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProductSubmit}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Set MOQ Dialog */}
      <Dialog open={moqDialogOpen} onOpenChange={setMoqDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Minimum Order Quantity</DialogTitle>
            <DialogDescription>
              {selectedProduct ? `Update the minimum order quantity for ${selectedProduct.name}` : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="moq-value" className="text-right">
                MOQ
              </label>
              <Input 
                id="moq-value" 
                value={currentMoq} 
                onChange={handleMoqChange}
                type="number" 
                min="0"
                className="col-span-3" 
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
    </DashboardLayout>
  );
};

export default VendorDashboard;
