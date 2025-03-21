
import React from 'react';
import { BarChart3, ArrowRight, MapPin } from 'lucide-react';

// Sample route optimization data
const routes = [
  { 
    id: 1, 
    name: 'NYC to Boston', 
    currentTime: '4h 30m', 
    optimizedTime: '3h 45m', 
    saving: 15, 
    from: 'New York, NY',
    to: 'Boston, MA',
  },
  { 
    id: 2, 
    name: 'LA to San Diego', 
    currentTime: '2h 45m', 
    optimizedTime: '2h 10m', 
    saving: 21, 
    from: 'Los Angeles, CA',
    to: 'San Diego, CA',
  },
  { 
    id: 3, 
    name: 'Chicago to Detroit', 
    currentTime: '4h 15m', 
    optimizedTime: '3h 50m', 
    saving: 10, 
    from: 'Chicago, IL',
    to: 'Detroit, MI',
  },
];

const RouteOptimization: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-logistics-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-logistics-accent/10 rounded-md mr-3">
            <BarChart3 className="h-5 w-5 text-logistics-accent" />
          </div>
          <h2 className="text-lg font-medium text-logistics-900">AI Route Optimization</h2>
        </div>
        <button className="text-sm text-logistics-accent hover:text-logistics-800 flex items-center transition-colors">
          <span>View all</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        {routes.map((route) => (
          <div 
            key={route.id}
            className="p-4 rounded-lg border border-logistics-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-logistics-900">{route.name}</h3>
              <div className="px-2 py-1 text-xs font-medium bg-logistics-success/10 text-logistics-success rounded-full">
                Save {route.saving}%
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-12 gap-2">
              <div className="col-span-5">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-logistics-600 mr-1" />
                  <span className="text-sm text-logistics-700 truncate">{route.from}</span>
                </div>
              </div>
              
              <div className="col-span-2 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-logistics-500" />
              </div>
              
              <div className="col-span-5">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-logistics-600 mr-1" />
                  <span className="text-sm text-logistics-700 truncate">{route.to}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center">
              <div className="text-sm text-logistics-700 flex flex-col mr-4">
                <span className="text-xs text-logistics-500">Current</span>
                <span>{route.currentTime}</span>
              </div>
              <div className="flex-1">
                <div className="h-1.5 w-full bg-logistics-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-logistics-accent h-full rounded-full"
                    style={{ width: `${100 - route.saving}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-logistics-700 flex flex-col ml-4">
                <span className="text-xs text-logistics-500">Optimized</span>
                <span className="font-medium">{route.optimizedTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteOptimization;
