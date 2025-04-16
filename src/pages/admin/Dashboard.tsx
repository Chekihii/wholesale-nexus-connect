
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, 
  CreditCard, 
  Store, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Truck,
  Award,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  Users,
  ShoppingCart,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatKES } from '@/utils/currency';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Temporary mocked data
const platformStats = {
  totalRevenue: 3245893.45,
  totalOrders: 54892,
  vendorsCount: 1245,
  customersCount: 12458,
}

const orderStats = {
  total: 54892,
  readyForPickup: 245,
  dispatched: 356,
  delivered: 52845,
}

const revenueData = {
  thisMonth: 428954.32,
  lastMonth: 392045.67,
  growth: 9.4,
}

const newVendors = [
  { id: 1, name: 'EcoTech Solutions', date: '2023-04-10', status: 'Pending Approval' },
  { id: 2, name: 'Global Textiles Ltd', date: '2023-04-09', status: 'Approved' },
  { id: 3, name: 'Smart Living Inc', date: '2023-04-08', status: 'Approved' },
]

const topDeals = [
  { id: 1, name: 'Smartphone Bundle', sales: 845642.32, percentage: 26, growth: 12, featured: true },
  { id: 2, name: 'Designer Apparel Collection', sales: 654321.45, percentage: 20, growth: 8, featured: true },
  { id: 3, name: 'Home Appliance Set', sales: 524789.23, percentage: 16, growth: 15, featured: false },
  { id: 4, name: 'Beauty Product Bundle', sales: 354128.67, percentage: 11, growth: 7, featured: true },
  { id: 5, name: 'Sports Equipment Package', sales: 284536.12, percentage: 9, growth: 10, featured: false },
]

// Vendor products
const vendorProducts = [
  { id: 101, name: 'Bluetooth Earbuds', vendor: 'AudioTech Inc', price: 2999.99, category: 'Electronics', status: 'Active' },
  { id: 102, name: 'Cotton T-Shirts (5-pack)', vendor: 'Fashion World', price: 1499.99, category: 'Fashion', status: 'Active' },
  { id: 103, name: 'Stainless Steel Water Bottle', vendor: 'EcoWare Solutions', price: 899.99, category: 'Home', status: 'Under Review' },
  { id: 104, name: 'Smart Watch', vendor: 'TechGadgets Ltd', price: 5999.99, category: 'Electronics', status: 'Active' },
  { id: 105, name: 'Organic Face Cream', vendor: 'Natural Beauty', price: 1299.99, category: 'Beauty', status: 'Inactive' },
]

// Customer orders
const customerOrders = [
  { id: 'ORD-5678', customer: 'Jane Doe', vendor: 'TechGadgets Ltd', items: 3, total: 8999.97, date: '2023-04-12', status: 'Processing' },
  { id: 'ORD-5679', customer: 'John Smith', vendor: 'Fashion World', items: 2, total: 2999.98, date: '2023-04-11', status: 'Shipped' },
  { id: 'ORD-5680', customer: 'Alice Johnson', vendor: 'Multiple Vendors', items: 5, total: 12499.95, date: '2023-04-10', status: 'Delivered' },
  { id: 'ORD-5681', customer: 'Bob Brown', vendor: 'EcoWare Solutions', items: 1, total: 899.99, date: '2023-04-09', status: 'Delivered' },
]

const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dealDialogOpen, setDealDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<any>(null);
  const [vendorApprovalOpen, setVendorApprovalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Search Results",
      description: `Searching for: "${searchQuery}"`,
      duration: 3000,
    });
    // In a real app, this would filter the content
  };

  const handleAddDeal = () => {
    setEditingDeal(null);
    setDealDialogOpen(true);
  };

  const handleEditDeal = (deal: any) => {
    setEditingDeal(deal);
    setDealDialogOpen(true);
  };

  const handleSaveDeal = () => {
    toast({
      title: editingDeal ? "Deal Updated" : "Deal Added",
      description: editingDeal 
        ? `"${editingDeal.name}" has been updated.`
        : "New top deal has been added to the platform.",
      duration: 3000,
    });
    setDealDialogOpen(false);
    // In a real app, this would save the deal
  };

  const handleDeleteDeal = (deal: any) => {
    toast({
      title: "Deal Removed",
      description: `"${deal.name}" has been removed from top deals.`,
      duration: 3000,
    });
    // In a real app, this would remove the deal
  };

  const handleApproveVendor = (vendor: any) => {
    toast({
      title: "Vendor Approved",
      description: `${vendor.name} has been approved.`,
      duration: 3000,
    });
    // In a real app, this would approve the vendor
  };

  const handleRejectVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setVendorApprovalOpen(true);
  };

  const confirmRejectVendor = () => {
    toast({
      title: "Vendor Rejected",
      description: `${selectedVendor.name} has been rejected.`,
      duration: 3000,
    });
    setVendorApprovalOpen(false);
    // In a real app, this would reject the vendor
  };

  const handleViewAlerts = () => {
    toast({
      title: "System Alerts",
      description: "Navigating to system alerts page",
      duration: 3000,
    });
    // In a real app, this would navigate to alerts page
    navigate('/admin/alerts');
  };

  const handleViewAllDeals = () => {
    toast({
      title: "Top Deals",
      description: "Navigating to all deals page",
      duration: 3000,
    });
    // In a real app, this would navigate to deals page
    navigate('/admin/deals');
  };

  const handleProductAction = (product: any, action: string) => {
    toast({
      title: `Product ${action}`,
      description: `${action} action performed on "${product.name}"`,
      duration: 3000,
    });
    // In a real app, this would perform the action on the product
  };

  const handleOrderAction = (order: any, action: string) => {
    toast({
      title: `Order ${action}`,
      description: `${action} action performed on order ${order.id}`,
      duration: 3000,
    });
    // In a real app, this would perform the action on the order
  };

  return (
    <DashboardLayout role="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-64" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vendors">Vendors & Deals</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-cheki-100 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-cheki-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Platform Revenue</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {formatKES(platformStats.totalRevenue)}
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
                      {orderStats.total.toLocaleString()}
                    </h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Store className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Vendors</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {platformStats.vendorsCount.toLocaleString()}
                    </h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Products</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {(platformStats.customersCount * 2).toLocaleString()}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Order Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Ready for Pickup</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {orderStats.readyForPickup.toLocaleString()}
                    </h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Dispatched</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {orderStats.dispatched.toLocaleString()}
                    </h3>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Delivered</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {orderStats.delivered.toLocaleString()}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Revenue Overview & Vendor Approvals */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Finances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500">Chart showing revenue trends would go here</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-6 w-6 text-cheki-600 mr-2" />
                        <span className="text-sm font-medium">This Month</span>
                      </div>
                      <p className="text-2xl font-bold mt-2">
                        {formatKES(revenueData.thisMonth)}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        +{revenueData.growth}% from last month
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-6 w-6 text-gray-600 mr-2" />
                        <span className="text-sm font-medium">Last Month</span>
                      </div>
                      <p className="text-2xl font-bold mt-2">
                        {formatKES(revenueData.lastMonth)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Final revenue
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Vendor Approvals */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Vendor Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newVendors.map((vendor) => (
                      <div 
                        key={vendor.id} 
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{vendor.name}</h4>
                          <p className="text-sm text-gray-500">Applied on {vendor.date}</p>
                        </div>
                        <div>
                          {vendor.status === 'Pending Approval' ? (
                            <div className="space-y-2">
                              <Button 
                                size="sm" 
                                className="w-full bg-cheki-600 hover:bg-cheki-700"
                                onClick={() => handleApproveVendor(vendor)}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="w-full"
                                onClick={() => handleRejectVendor(vendor)}
                              >
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {vendor.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="/admin/vendors/approvals" className="text-cheki-600 hover:text-cheki-700 text-sm font-medium">
                      View All Vendor Applications
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* System Alerts */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-700 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-amber-800">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Payment gateway reported 3 failed transactions in the last hour. Check system logs.
                  </li>
                  <li className="flex items-center text-sm text-amber-800">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    5 vendors have not updated their inventory in over 30 days.
                  </li>
                  <li className="flex items-center text-sm text-amber-800">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    Server load reached 85% capacity at 2:15 PM today.
                  </li>
                </ul>
                <div className="mt-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-amber-600 text-amber-600 hover:bg-amber-100"
                    onClick={handleViewAlerts}
                  >
                    View All Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            {/* Top Deals Management */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 text-amber-500 mr-2" /> Top Deals Management
                </CardTitle>
                <Button 
                  size="sm" 
                  onClick={handleAddDeal}
                  className="bg-cheki-600 hover:bg-cheki-700"
                >
                  <Plus size={16} className="mr-2" /> Add Deal
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Deal Name</th>
                        <th className="text-right py-3 px-4">Sales</th>
                        <th className="text-right py-3 px-4">%</th>
                        <th className="text-right py-3 px-4">Growth</th>
                        <th className="text-center py-3 px-4">Featured</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topDeals.map((deal, index) => (
                        <tr key={deal.name} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full mr-3 bg-cheki-${600 - index * 100}`}></div>
                              {deal.name}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {formatKES(deal.sales)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {deal.percentage}%
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center text-green-600">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              {deal.growth}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {deal.featured ? 
                              <CheckCircle className="h-5 w-5 text-green-600 inline-block" /> : 
                              <AlertTriangle className="h-5 w-5 text-gray-400 inline-block" />
                            }
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditDeal(deal)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteDeal(deal)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    className="text-cheki-600 border-cheki-600 hover:bg-cheki-50"
                    onClick={handleViewAllDeals}
                  >
                    View All Deals
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Store className="h-5 w-5 mr-2" /> Vendor Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Vendor</th>
                        <th className="text-right py-3 px-4">Products</th>
                        <th className="text-right py-3 px-4">Revenue</th>
                        <th className="text-right py-3 px-4">Last Active</th>
                        <th className="text-right py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({length: 5}, (_, i) => ({
                        id: i + 1,
                        name: `Vendor ${i + 1}`,
                        products: Math.floor(Math.random() * 100) + 10,
                        revenue: Math.floor(Math.random() * 1000000) + 100000,
                        lastActive: '2023-04-' + (10 - i),
                        status: i === 0 ? 'Pending' : 'Active'
                      })).map((vendor) => (
                        <tr key={vendor.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-cheki-100 text-cheki-700">
                                  {vendor.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {vendor.name}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">{vendor.products}</td>
                          <td className="py-3 px-4 text-right">{formatKES(vendor.revenue)}</td>
                          <td className="py-3 px-4 text-right">{vendor.lastActive}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {vendor.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {/* Products Management */}
            <Card>
              <CardHeader>
                <CardTitle>Products Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Product</th>
                        <th className="text-left py-3 px-4">Vendor</th>
                        <th className="text-right py-3 px-4">Price</th>
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-center py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{product.name}</td>
                          <td className="py-3 px-4">{product.vendor}</td>
                          <td className="py-3 px-4 text-right">{formatKES(product.price)}</td>
                          <td className="py-3 px-4">{product.category}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === 'Active' ? 'bg-green-100 text-green-800' : 
                              product.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleProductAction(product, 'View')}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleProductAction(product, 'Approve')}>
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleProductAction(product, 'Feature')}>
                                    Feature in Deals
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleProductAction(product, 'Remove')}
                                    className="text-red-600"
                                  >
                                    Remove Product
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            {/* Customer Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" /> Customer Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Vendor</th>
                        <th className="text-right py-3 px-4">Items</th>
                        <th className="text-right py-3 px-4">Total</th>
                        <th className="text-center py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.vendor}</td>
                          <td className="py-3 px-4 text-right">{order.items}</td>
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
                          <td className="py-3 px-4">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleOrderAction(order, 'View')}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleOrderAction(order, 'Track')}>
                                    Track Order
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleOrderAction(order, 'Contact Customer')}>
                                    Contact Customer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleOrderAction(order, 'Contact Vendor')}>
                                    Contact Vendor
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Link to="/admin/orders" className="text-cheki-600 hover:text-cheki-700 text-sm font-medium">
                    View All Orders
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Deal Dialog */}
      <Dialog open={dealDialogOpen} onOpenChange={setDealDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingDeal ? 'Edit Deal' : 'Add New Deal'}</DialogTitle>
            <DialogDescription>
              {editingDeal 
                ? `Edit details for "${editingDeal.name}"`
                : 'Create a new featured deal to display on the customer dashboard.'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Deal Name
              </label>
              <Input 
                id="name" 
                defaultValue={editingDeal?.name || ''}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="discount" className="text-right">
                Discount %
              </label>
              <Input 
                id="discount" 
                type="number"
                defaultValue={editingDeal?.percentage || ''}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="featured" className="text-right">
                Featured
              </label>
              <div className="flex items-center col-span-3">
                <input 
                  type="checkbox" 
                  id="featured" 
                  defaultChecked={editingDeal?.featured || false}
                  className="h-4 w-4 rounded border-gray-300 text-wholesale-600 focus:ring-wholesale-500" 
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDealDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDeal}>
              {editingDeal ? 'Save Changes' : 'Add Deal'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vendor Rejection Dialog */}
      <Dialog open={vendorApprovalOpen} onOpenChange={setVendorApprovalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Vendor</DialogTitle>
            <DialogDescription>
              {selectedVendor ? `Are you sure you want to reject ${selectedVendor.name}?` : ''}
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="reason" className="text-right">
                Reason
              </label>
              <Input id="reason" placeholder="Provide rejection reason" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVendorApprovalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRejectVendor}>
              Reject Vendor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminDashboard;
