
import React from 'react';
import { X, AlertTriangle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample notification data
const notifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Delivery Delayed',
    message: 'Truck #1234 is delayed due to traffic congestion on I-95',
    time: '5 min ago',
  },
  {
    id: 2,
    type: 'info',
    title: 'ETA Update',
    message: 'Estimated delivery time for order #56789 updated to 2:30 PM',
    time: '15 min ago',
  },
  {
    id: 3,
    type: 'success',
    title: 'Delivery Completed',
    message: 'Order #45678 successfully delivered to customer',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'warning',
    title: 'Weather Alert',
    message: 'Heavy rain expected in the Boston area, potential delivery delays',
    time: '2 hours ago',
  },
];

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-logistics-warning" />;
      case 'info':
        return <Clock className="h-5 w-5 text-logistics-accent" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-logistics-success" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-logistics-warning" />;
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:bg-transparent md:backdrop-blur-none"
          onClick={onClose}
        />
      )}
      
      {/* Notification Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg border-l border-logistics-200 z-50 transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-logistics-200 flex items-center justify-between">
            <h2 className="text-lg font-medium text-logistics-900">Notifications</h2>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-logistics-100 transition-colors"
            >
              <X className="h-5 w-5 text-logistics-700" />
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="bg-white border border-logistics-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer animate-slide-up"
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-logistics-900">{notification.title}</h3>
                      <p className="text-sm text-logistics-600 mt-1">{notification.message}</p>
                      <span className="text-xs text-logistics-500 mt-2 block">{notification.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-logistics-200">
            <button className="flex items-center justify-center w-full py-2 px-4 bg-logistics-50 text-logistics-700 hover:bg-logistics-100 transition-colors rounded-md">
              <span>View all notifications</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;
