
import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  icon: string;
  itemCount: number;
}

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-300">
        <div className="text-3xl mb-2">{category.icon}</div>
        <h3 className="font-medium text-gray-900">{category.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{category.itemCount} items</p>
      </div>
    </Link>
  );
};
