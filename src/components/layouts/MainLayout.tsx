
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Truck, 
  BarChart3, 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  LogOut,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import NotificationCenter from '../dashboard/NotificationCenter';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const routes = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/fleet', label: 'Fleet Management', icon: <Truck className="w-5 h-5" /> },
    { path: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/search', label: 'Search', icon: <Search className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

  return (
    <div className="flex h-screen bg-logistics-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-logistics-200 transition-transform duration-300 ease-in-out transform",
          isMobile && (isSidebarOpen ? "translate-x-0" : "-translate-x-full"),
          !isMobile && "translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-8">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-logistics-accent rounded-md flex items-center justify-center">
                <Truck className="text-white h-5 w-5" />
              </div>
              <span className="ml-3 text-xl font-semibold text-logistics-900">RouteWise</span>
            </div>
          </div>
          
          <nav className="flex-1 px-4 pb-4">
            <ul className="space-y-1">
              {routes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className={cn(
                      "nav-link",
                      location.pathname === route.path && "active"
                    )}
                  >
                    {route.icon}
                    <span>{route.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-logistics-200">
            <Link to="/settings" className="nav-link">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <button className="nav-link w-full mt-2">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content area */}
      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300",
        !isMobile && "ml-64"
      )}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-logistics-200 flex items-center justify-between px-4 sticky top-0 z-10">
          {isMobile && (
            <button onClick={toggleSidebar} className="p-2 -ml-1 rounded-md">
              {isSidebarOpen ? (
                <X className="h-5 w-5 text-logistics-700" />
              ) : (
                <Menu className="h-5 w-5 text-logistics-700" />
              )}
            </button>
          )}

          <div className="flex items-center ml-auto">
            <button 
              onClick={toggleNotifications}
              className="relative p-2 rounded-full hover:bg-logistics-100 transition-colors"
            >
              <Bell className="h-5 w-5 text-logistics-700" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-logistics-danger rounded-full"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-logistics-200 flex items-center justify-center ml-3">
              <User className="h-4 w-4 text-logistics-600" />
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 animate-enter">
          {children}
        </main>
      </div>

      {/* Notification panel */}
      <NotificationCenter 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </div>
  );
};

export default MainLayout;
