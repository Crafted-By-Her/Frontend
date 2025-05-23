import React, { useState } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Clothes', path: '/category/Clothes' },
  { name: 'Shoes', path: '/category/shoes' },
  { name: 'Accessories & Jewelry', path: '/category/accessories-jewelry' },
  { name: 'Bath & Beauty', path: '/category/bath-beauty' },
  { name: 'Bags & Purses', path: '/category/bags-purses' },
  { name: 'Art & Wall decor', path: '/category/art-wall-decor' },
];

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="border-b-2 border-gray-200 px-4 mb-2 py-2">
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-700 text-lg hover:text-gray-900 focus:outline-none"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:justify-center md:items-center mt-3 md:mt-4`}>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 lg:space-x-6 text-ls font-semibold text-gray-800">
          {categories.map((category) => (
           <Link
           key={category.path}
           to={category.path}
           className="my-1 md:my-0 whitespace-nowrap transition duration-200 ease-in-out hover:underline hover:decoration-orange-500"
         >
           {category.name}
         </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
