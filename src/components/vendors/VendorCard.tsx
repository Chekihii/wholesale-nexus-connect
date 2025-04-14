
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Star, Package, MapPin } from 'lucide-react';

interface Vendor {
  id: number;
  name: string;
  logo: string;
  rating: number;
  productCount: number;
  location: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <Link to={`/vendor/${vendor.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-wholesale-100 w-12 h-12 rounded-full flex items-center justify-center text-wholesale-600 text-lg font-bold">
              {vendor.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium text-lg text-gray-900">{vendor.name}</h3>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-700">{vendor.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Package className="h-4 w-4 mr-2 text-gray-400" />
              <span>{vendor.productCount} Products</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span>{vendor.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
