import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, DollarSign, PackageCheck, Users, TrendingUp, TrendingDown, 
  ChevronRight, AlertTriangle, Check, X, Edit, Save, Plus, Image, FileVideo,
  Search, Filter, ArrowDownUp, CalendarIcon
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
  
  const [orderActionDialog, setOrderActionDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [declineReason, setDeclineReason] = useState('');
  
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
    }
    setOrderActionDialog(false);
    setDeclineReason('');
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

      <Dialog open={productOpen} onOpenChange={setProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update product information in your inventory"
                : "Add a new product to your inventory. Fill in all the required fields."}
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
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Input id="description" placeholder="Product description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right">
                Price
              </label>
              <Input id="price" placeholder="0.00" type="number" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="sample-price" className="text-right">
                Sample Price
              </label>
              <Input id="sample-price" placeholder="0.00" type="number" className="col-span-3" />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="unit" className="text-right">
                Unit
              </label>
              <select 
                id="unit" 
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                value={productUnit}
                onChange={(e) => setProductUnit(e.target.value)}
              >
                <option value="">Select unit...</option>
                {productUnits.map(unit => (
                  <option key={unit.value} value={unit.value}>{unit.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right">
                Category
              </label>
              <select 
                id="category" 
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                value={productCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select category...</option>
                {productCategories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subcategory" className="text-right">
                Sub-Category
              </label>
              <select 
                id="subcategory" 
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                value={productSubCategory}
                onChange={(e) => setProductSubCategory(e.target.value)}
                disabled={!productCategory}
              >
                <option value="">Select sub-category...</option>
                {productCategory && productSubCategories[productCategory]?.map(subcategory => (
                  <option key={subcategory.value} value={subcategory.value}>{subcategory.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">
                Product Image
              </label>
              <div className="col-span-3">
                <div className="flex items-center space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById('product-image')?.click()}
                  >
                    <Image size={16} /> Upload Image
                  </Button>
                  <input 
                    type="file" 
                    id="product-image" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'image')} 
                  />
                  {(productImage || viewImagePreview) && (
                    <div className="relative">
                      <img 
                        src={viewImagePreview || ''} 
                        alt="Product preview" 
                        className="h-12 w-12 object-cover rounded-md"
                      />
                      <button 
                        type="button" 
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        onClick={() => {
                          setProductImage(null);
                          setViewImagePreview(null);
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">Max. file size: 5MB. Formats: JPG, PNG</p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">
                Product Video
              </label>
              <div className="col-span-3">
                <div className="flex items-center space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => document.getElementById('product-video')?.click()}
                  >
                    <FileVideo size={16} /> Upload Video
                  </Button>
                  <input 
                    type="file" 
                    id="product-video" 
                    className="hidden" 
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, 'video')} 
                  />
                  {productVideo && (
                    <span className="text-sm text-green-600">
                      Video selected: {productVideo.name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">Max. file size: 30MB. Formats: MP4, MOV</p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">Discount</div>
              <div className="flex items-center space-x-2 col-span-3">
                <Checkbox
                  id="discount"
                  checked={offerDiscount}
                  onCheckedChange={(checked) => setOfferDiscount(checked === true)}
                />
                <label
                  htmlFor="discount"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Offer discount on this product
                </label>
              </div>
            </div>
            {offerDiscount && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="discount-percentage" className="text-right">
                    Discount %
                  </label>
                  <Input 
                    id="discount-percentage" 
                    placeholder="0" 
                    type="number" 
                    className="col-span-3"
                    value={discountPercentage || ''}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 0 && value <= 100) {
                        setDiscountPercentage(value);
                      }
                    }}
                    min="0"
                    max="100"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">
                    Start Date
                  </label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left",
                            !discountStartDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {discountStartDate ? format(discountStartDate, "PPP") : <span>Pick start date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={discountStartDate}
                          onSelect={(date) => setDiscountStartDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right">
                    End Date
                  </label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left",
                            !discountEndDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {discountEndDate ? format(discountEndDate, "PPP") : <span>Pick end date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={discountEndDate}
                          onSelect={(date) => setDiscountEndDate(date)}
                          disabled={(date) => 
                            discountStartDate ? date < discountStartDate : false
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProductSubmit}>
              {isEditMode ? "Update" : "Add"} Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

      <Dialog open={orderActionDialog} onOpenChange={setOrderActionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Review Order #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Review and decide whether to accept or decline this order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="font-medium">Customer:</div>
              <div className="col-span-2">{selectedOrder?.customer}</div>
              
              <div className="font-medium">Date:</div>
              <div className="col-span-2">{selectedOrder?.date}</div>
              
              <div className="font-medium">Items:</div>
              <div className="col-span-2">{selectedOrder?.items}</div>
              
              <div className="font-medium">Total:</div>
              <div className="col-span-2">{selectedOrder && formatKES(selectedOrder.total)}</div>
            </div>
            
            <div className="border-t pt-4 mt-2">
              <div className="font-medium mb-2">If declining, please state reason:</div>
              <Input
                placeholder="Reason for declining (optional for acceptance)"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                This information will be shared with the customer and admin.
              </p>
            </div>
          </div>
          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={() => setOrderActionDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleOrderAction('decline')}
            >
              <X className="mr-2 h-4 w-4" /> Decline Order
            </Button>
            <Button 
              onClick={() => handleOrderAction('accept')}
            >
              <Check className="mr-2 h-4 w-4" /> Accept Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default VendorDashboard;
