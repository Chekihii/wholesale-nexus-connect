
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cheki-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Cheki Hii</h3>
            <p className="text-gray-300 mb-4">
              Connecting wholesalers to retailers. The premier B2B marketplace for 
              your business needs.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link></li>
              <li><Link to="/vendors" className="text-gray-300 hover:text-white">Vendors</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Businesses</h3>
            <ul className="space-y-2">
              <li><Link to="/vendor/register" className="text-gray-300 hover:text-white">Become a Vendor</Link></li>
              <li><Link to="/vendor/login" className="text-gray-300 hover:text-white">Vendor Login</Link></li>
              <li><Link to="/wholesale-guide" className="text-gray-300 hover:text-white">Wholesale Guide</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-2 h-5 w-5 text-cheki-400" />
                <span className="text-gray-300">Dynamic Mall - 3rd floor, ML 195<br />Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-cheki-400" />
                <span className="text-gray-300">+254 700 938630</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-cheki-400" />
                <span className="text-gray-300">chekihiiii@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Cheki Hii. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex space-x-4 text-sm">
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link></li>
              <li><Link to="/cookies" className="text-gray-300 hover:text-white">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
