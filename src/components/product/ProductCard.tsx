
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, Phone } from 'lucide-react';
import { formatKES } from '@/utils/currency';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  minOrder: number;
  vendor: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  
  const handleCallInquiry = () => {
    window.location.href = "tel:+254700938630";
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
    // In a real app, this would add the product to cart
  };

  return (
    <Card className="overflow-hidden card-hover">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-48"
          />
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-100">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Link 
          to={`/product/${product.id}`}
          className="font-medium text-lg text-gray-900 hover:text-wholesale-600 line-clamp-2 h-14"
        >
          {product.name}
        </Link>
        <div className="mt-2 text-sm text-gray-500">
          by <Link to={`/vendor/${product.vendor}`} className="text-wholesale-600 hover:underline">{product.vendor}</Link>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <span className="font-bold text-lg">{formatKES(product.price)}</span>
            <p className="text-xs text-gray-500">Min. Order: {product.minOrder} units</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-wholesale-600 border-wholesale-600" 
          asChild
        >
          <Link to={`/product/${product.id}/sample`}>
            Buy Sample
          </Link>
        </Button>
        <Button 
          size="sm" 
          className="flex-1 bg-wholesale-600 hover:bg-wholesale-700"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-1" /> Add
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 text-green-600 border-green-600 hover:bg-green-50"
          onClick={handleCallInquiry}
        >
          <Phone className="h-4 w-4 mr-1" /> Call to Inquire
        </Button>
      </CardFooter>
    </Card>
  );
};
