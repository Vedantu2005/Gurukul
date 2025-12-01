import React, { useState, useEffect } from 'react';
import { Dice5, Lightbulb, Gamepad2, Smartphone, BookOpen } from 'lucide-react';
import AdminSidebar from './Sidebar';

const AdminDashboard = ({ setIsAdminLoggedIn }) => {
  const [stats, setStats] = useState({
    bettingSites: 0,
    bettingTips: 0,
    cricketBookmakers: 0,
    iplApps: 0,
    blogs: 0,
  });

  useEffect(() => {
    // Simulate fetching stats from localStorage or API
    const sites = JSON.parse(localStorage.getItem('bettingSites') || '[]');
    const tips = JSON.parse(localStorage.getItem('bettingTips') || '[]');
    const bookmakers = JSON.parse(localStorage.getItem('cricketBookmakers') || '[]');
    const apps = JSON.parse(localStorage.getItem('iplBettingApps') || '[]');
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');

    setStats({
      bettingSites: sites.length,
      bettingTips: tips.length,
      cricketBookmakers: bookmakers.length,
      iplApps: apps.length,
      blogs: blogs.length,
    });
  }, []);

  const statCards = [
    { title: 'Betting Sites', count: stats.bettingSites, icon: Dice5, color: 'bg-blue-500' },
    { title: 'Betting Tips', count: stats.bettingTips, icon: Lightbulb, color: 'bg-yellow-500' },
    { title: 'Cricket Bookmakers', count: stats.cricketBookmakers, icon: Gamepad2, color: 'bg-green-500' },
    { title: 'IPL Betting Apps', count: stats.iplApps, icon: Smartphone, color: 'bg-purple-500' },
    { title: 'Blog Posts', count: stats.blogs, icon: BookOpen, color: 'bg-red-500' },
  ];

  return (
    <div className="flex">
      <AdminSidebar setIsAdminLoggedIn={setIsAdminLoggedIn} />
      
      <div className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to the Admin Panel</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {statCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{card.count}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/admin/betting-sites"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <Dice5 size={20} />
                Manage Betting Sites
              </a>
              <a
                href="/admin/betting-tips"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <Lightbulb size={20} />
                Manage Betting Tips
              </a>
              <a
                href="/admin/cricket-bookmakers"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <Gamepad2 size={20} />
                Manage Cricket Bookmakers
              </a>
              <a
                href="/admin/ipl-betting-apps"
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <Smartphone size={20} />
                Manage IPL Betting Apps
              </a>
              <a
                href="/admin/blog"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <BookOpen size={20} />
                Manage Blog Posts
              </a>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-3">Welcome to Admin Panel!</h2>
            <p className="mb-4">
              Use the sidebar to navigate through different management sections. You can add, edit, or delete items from any category.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Manage betting sites and their details</li>
              <li>Create and publish betting tips</li>
              <li>Add cricket bookmakers information</li>
              <li>List IPL betting applications</li>
              <li>Write and manage blog posts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;