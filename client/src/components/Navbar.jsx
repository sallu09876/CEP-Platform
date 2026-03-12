import { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ title, onMenuClick }) => {
  const { user } = useAuth();
  const [hasNotif] = useState(true);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
      >
        <Menu size={20} />
      </button>

      {/* Page Title */}
      <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">{title}</h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <Search size={16} className="absolute left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
        />
      </div>

      {/* Notification Bell */}
      <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition">
        <Bell size={20} />
        {hasNotif && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {/* Avatar */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
          {initials}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user?.name || 'Admin'}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
