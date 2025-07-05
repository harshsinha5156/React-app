
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay } from 'react-icons/fa';

const Footer = ({ onNavigate }) => {
  const handleSocialClick = (platform) => {
    alert(`This would navigate to our ${platform} page in a real application`);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Shop<span className="text-orange-500">Ease</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for quality products at competitive prices. We deliver happiness to your doorstep.
            </p>
            <div className="flex space-x-4">
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => handleSocialClick('Facebook')}
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => handleSocialClick('Twitter')}
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => handleSocialClick('Instagram')}
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => handleSocialClick('LinkedIn')}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => onNavigate('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => onNavigate('about')}
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => onNavigate('products')}
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => alert('Special offers page would open')}
                >
                  Special Offers
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => alert('New arrivals page would open')}
                >
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => onNavigate('contact')}
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => alert('FAQs page would open')}
                >
                  FAQs
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => alert('Shipping policy page would open')}
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => alert('Returns page would open')}
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors w-full text-left"
                  onClick={() => alert('Privacy policy page would open')}
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          
          
          
        </div>
        
        
        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;