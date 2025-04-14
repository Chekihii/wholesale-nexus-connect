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
                Connect with trusted wholesalers through Cheki Hii, order samples, and grow your retail business.
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

      {/* CTA Section */}
      <section className="bg-wholesale-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to grow your business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of retailers and wholesalers already using Cheki Hii to streamline their B2B operations.
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
