
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, ShieldCheck, TrendingUp, Truck } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { VendorCard } from '@/components/vendors/VendorCard';
import { CategoryCard } from '@/components/category/CategoryCard';

// Temporary mocked data
const featuredCategories = [
  { id: 1, name: 'Electronics', icon: '💻', itemCount: 1240 },
  { id: 2, name: 'Apparel', icon: '👕', itemCount: 3560 },
  { id: 3, name: 'Home & Garden', icon: '🏠', itemCount: 1890 },
  { id: 4, name: 'Beauty & Health', icon: '💄', itemCount: 2150 },
  { id: 5, name: 'Toys & Games', icon: '🎮', itemCount: 1450 },
  { id: 6, name: 'Jewelry', icon: '💍', itemCount: 980 },
];

const featuredVendors = [
  { id: 1, name: 'TechPro Supplies', logo: '', rating: 4.8, productCount: 254, location: 'California, USA' },
  { id: 2, name: 'Fashion Wholesale Co.', logo: '', rating: 4.7, productCount: 312, location: 'New York, USA' },
  { id: 3, name: 'Global Home Goods', logo: '', rating: 4.9, productCount: 186, location: 'Ontario, Canada' },
  { id: 4, name: 'EliteWear Inc', logo: '', rating: 4.6, productCount: 423, location: 'London, UK' },
];

const featuredProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', image: '', price: 89.99, minOrder: 10, vendor: 'TechPro Supplies' },
  { id: 2, name: 'Premium Cotton T-Shirt (Pack of 5)', image: '', price: 45.50, minOrder: 20, vendor: 'Fashion Wholesale Co.' },
  { id: 3, name: 'Smart LED Desk Lamp', image: '', price: 32.99, minOrder: 15, vendor: 'Global Home Goods' },
  { id: 4, name: 'Stainless Steel Water Bottle', image: '', price: 18.75, minOrder: 30, vendor: 'EcoWare Solutions' },
  { id: 5, name: 'Designer Sunglasses', image: '', price: 120.00, minOrder: 5, vendor: 'EliteWear Inc' },
  { id: 6, name: 'Bluetooth Speaker', image: '', price: 65.99, minOrder: 10, vendor: 'TechPro Supplies' },
  { id: 7, name: 'Organic Hand Cream', image: '', price: 12.50, minOrder: 24, vendor: 'Natural Beauty Ltd.' },
  { id: 8, name: 'Professional Knife Set', image: '', price: 199.99, minOrder: 3, vendor: 'Global Home Goods' },
];

const Index: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-wholesale-800 to-wholesale-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Wholesale Connections Made Simple
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Connect with trusted wholesalers, order samples, and grow your retail business with our B2B marketplace.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-wholesale-700 hover:bg-gray-100" asChild>
                  <Link to="/categories">Browse Products</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-wholesale-700" asChild>
                  <Link to="/vendor/register">Become a Vendor</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Wholesale marketplace" 
                className="rounded-lg shadow-xl animate-fade-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose NexusConnect</h2>
            <p className="mt-4 text-xl text-gray-600">
              The premier B2B marketplace connecting retailers with trusted wholesalers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-wholesale-100 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <Package className="h-7 w-7 text-wholesale-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sample Orders</h3>
              <p className="text-gray-600">
                Try before you commit with our sample ordering option on any product.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-wholesale-100 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <ShieldCheck className="h-7 w-7 text-wholesale-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Vendors</h3>
              <p className="text-gray-600">
                All vendors are verified to ensure quality and reliability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-wholesale-100 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <Truck className="h-7 w-7 text-wholesale-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Shipping</h3>
              <p className="text-gray-600">
                Efficient shipping solutions for businesses of all sizes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-wholesale-100 w-14 h-14 flex items-center justify-center rounded-full mb-4">
                <TrendingUp className="h-7 w-7 text-wholesale-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Business Analytics</h3>
              <p className="text-gray-600">
                Gain insights with detailed analytics and reporting tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
            <Link to="/categories" className="text-wholesale-600 hover:text-wholesale-700 flex items-center">
              View All Categories <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" className="text-wholesale-600 hover:text-wholesale-700 flex items-center">
              View All Products <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Vendors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Top Vendors</h2>
            <Link to="/vendors" className="text-wholesale-600 hover:text-wholesale-700 flex items-center">
              View All Vendors <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-wholesale-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to grow your business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of retailers and wholesalers already using NexusConnect to streamline their B2B operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-wholesale-700 hover:bg-gray-100" asChild>
              <Link to="/register">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-wholesale-600" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
