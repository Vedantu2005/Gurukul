import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, BookOpen, Book, ScrollText, FileText } from 'lucide-react'; // Import FileText

const AdminSidebar = ({ setIsAdminLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/blog', label: 'Blog', icon: BookOpen },
    { path: '/admin/course', label: 'Course', icon: Book },
    { path: '/admin/research', label: 'Research', icon: ScrollText },
    // ADD THIS LINE BELOW
    { path: '/admin/articles', label: 'Articles', icon: FileText },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    navigate('/admin');
  };

  return (
    <div className={`fixed left-0 top-0 h-screen bg-[#561C24] text-white transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-20'} shadow-lg`}>
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-white border-opacity-10">
        {isOpen && <h2 className="text-lg font-bold whitespace-nowrap">Admin Panel</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 cursor-pointer hover:bg-white/10 hover:bg-opacity-20 rounded transition-colors text-lg"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-4 transition-all border-l-4 ${
                isActive
                  ? 'bg-white/10 bg-opacity-20 border-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-white font-semibold'
                  : 'text-white text-opacity-80 border-transparent hover:bg-white/5'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-5 border-t border-white border-opacity-10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 cursor-pointer bg-opacity-15 hover:bg-opacity-25 border border-white border-opacity-30 rounded-lg font-semibold text-sm transition-all"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;