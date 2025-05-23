import { ShoppingBag, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Menu, X } from 'lucide-react';
const categories = [
  { name: 'Clothing', path: '/category/clothing' },
  { name: 'Shoes', path: '/category/shoes' },
  { name: 'Accessories & Jewelry', path: '/category/accessories-jewelry' },
  { name: 'Bath & Beauty', path: '/category/bath-beauty' },
  { name: 'Bags & Purses', path: '/category/bags-purses' },
  { name: 'Art & Wall decor', path: '/category/art-wall-decor' },
];

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("userData")) ||
      JSON.parse(sessionStorage.getItem("userData"));

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSellClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.gender?.toLowerCase() === "female") {
      navigate("/seller-dashboard");
    } else {
      toast.error("Only women sellers can post products.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const matchedCategory = categories.find(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (matchedCategory) {
        navigate(matchedCategory.path);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      const matchedCategories = categories.filter(category => 
        category.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matchedCategories);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (category) => {
    setSearchQuery(category.name);
    setShowSuggestions(false);
    navigate(category.path);
  };

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="bg-orange-600 text-white text-center py-2 px-4 text-base font-semibold">
          ✨ Supporting Women Entrepreneurs Worldwide.✨
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between border-b-2 border-gray-200 px-4 md:px-10 py-5 gap-4">
          <Link to="/" className="text-orange-600 flex items-center font-bold text-3xl">
            <ShoppingBag size={28} className="mr-2" />
            <span className="hidden sm:inline">CraftedByHer</span>
          </Link>

          <div className="relative w-full md:w-1/2">
            <form onSubmit={handleSearch} className="flex rounded-full shadow-sm border overflow-hidden bg-white px-3 py-1">
              <input
                type="text"
                placeholder="Search products or categories..."
                className="flex-grow text-sm bg-transparent border-0 focus:ring-0 focus:outline-none"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <button type="submit" className="bg-orange-500 p-2 rounded-full text-white">
                <Search size={18} />
              </button>
            </form>
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {suggestions.map((category, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(category)}
                  >
                    <div className="font-medium text-gray-800">{category.name}</div>
                    <div className="text-xs text-gray-500">Category</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSellClick}
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded hover:shadow-md transition-all"
            >
              Sell on CraftedByHer
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="">
                  <button className="hidden md:block px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded hover:shadow-md transition-all">
                    Welcome {user.firstName || user.email}
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2 py-2 text-sm border rounded-full transition"
                >
                  <User size={25} strokeWidth={1.25} />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded hover:shadow-md transition-all">
                  <User size={16} /> Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;