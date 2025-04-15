
import React from 'react';
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
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  { name: 'Smartphone Bundle', sales: 845642.32, percentage: 26, growth: 12 },
  { name: 'Designer Apparel Collection', sales: 654321.45, percentage: 20, growth: 8 },
  { name: 'Home Appliance Set', sales: 524789.23, percentage: 16, growth: 15 },
  { name: 'Beauty Product Bundle', sales: 354128.67, percentage: 11, growth: 7 },
  { name: 'Sports Equipment Package', sales: 284536.12, percentage: 9, growth: 10 },
]

// Format currency in Kenyan Shillings
const formatCurrency = (amount: number) => {
  return `KSh ${amount.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`;
};

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout role="admin" userName="Admin User">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        
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
                  {formatCurrency(platformStats.totalRevenue)}
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
                    {formatCurrency(revenueData.thisMonth)}
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
                    {formatCurrency(revenueData.lastMonth)}
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
                          <Button size="sm" className="w-full bg-cheki-600 hover:bg-cheki-700">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
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
                <a href="/admin/vendors/approvals" className="text-cheki-600 hover:text-cheki-700 text-sm font-medium">
                  View All Vendor Applications
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Top Deals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Deals</CardTitle>
            <Button size="sm" variant="outline" className="text-cheki-600 border-cheki-600 hover:bg-cheki-50">
              View All
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
                        {formatCurrency(deal.sales)}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
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
              <Button size="sm" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-100">
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
