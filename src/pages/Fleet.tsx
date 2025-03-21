
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import StatusCard from '@/components/dashboard/StatusCard';
import { 
  Truck, 
  Filter, 
  Search, 
  SortDesc, 
  MoreVertical, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  PlusCircle
} from 'lucide-react';

// Sample fleet data
const vehicles = [
  { 
    id: 'v001', 
    name: 'Truck #1234', 
    driver: 'John Smith',
    type: 'Delivery Truck',
    status: 'active', 
    location: 'New York, NY',
    lastUpdate: '10 min ago',
    fuelLevel: 75,
    nextService: '2 days',
  },
  { 
    id: 'v002', 
    name: 'Van #5678', 
    driver: 'Maria Garcia',
    type: 'Cargo Van',
    status: 'active', 
    location: 'Boston, MA',
    lastUpdate: '5 min ago',
    fuelLevel: 45,
    nextService: '7 days',
  },
  { 
    id: 'v003', 
    name: 'Truck #9012', 
    driver: 'Robert Chen',
    type: 'Heavy Duty Truck',
    status: 'idle', 
    location: 'Chicago, IL',
    lastUpdate: '1 hour ago',
    fuelLevel: 92,
    nextService: '14 days',
  },
  { 
    id: 'v004', 
    name: 'Van #3456', 
    driver: 'Sarah Johnson',
    type: 'Cargo Van',
    status: 'maintenance', 
    location: 'Service Center',
    lastUpdate: '3 hours ago',
    fuelLevel: 10,
    nextService: 'In progress',
  },
  { 
    id: 'v005', 
    name: 'Truck #7890', 
    driver: 'James Wilson',
    type: 'Delivery Truck',
    status: 'idle', 
    location: 'Philadelphia, PA',
    lastUpdate: '30 min ago',
    fuelLevel: 65,
    nextService: '5 days',
  },
  { 
    id: 'v006', 
    name: 'Van #1122', 
    driver: 'Michael Brown',
    type: 'Cargo Van',
    status: 'active', 
    location: 'Washington DC',
    lastUpdate: '15 min ago',
    fuelLevel: 55,
    nextService: '10 days',
  },
];

const Fleet: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const activeCount = vehicles.filter(v => v.status === 'active').length;
  const idleCount = vehicles.filter(v => v.status === 'idle').length;
  const maintenanceCount = vehicles.filter(v => v.status === 'maintenance').length;
  
  const filteredVehicles = activeFilter === 'all' 
    ? vehicles 
    : vehicles.filter(v => v.status === activeFilter);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-logistics-success/10 text-logistics-success">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </span>
        );
      case 'idle':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-logistics-warning/10 text-logistics-warning">
            <Clock className="h-3 w-3 mr-1" />
            Idle
          </span>
        );
      case 'maintenance':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-logistics-danger/10 text-logistics-danger">
            <AlertCircle className="h-3 w-3 mr-1" />
            Maintenance
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-logistics-900">Fleet Management</h1>
        <p className="text-logistics-600 mt-1">
          Manage and monitor your entire vehicle fleet from one place.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatusCard 
          title="Active Vehicles"
          value={activeCount}
          icon={<Truck className="h-6 w-6 text-logistics-success" />}
          variant={activeFilter === 'active' ? 'success' : 'default'}
          className="cursor-pointer transition-all duration-300"
          onClick={() => setActiveFilter(activeFilter === 'active' ? 'all' : 'active')}
        />
        
        <StatusCard 
          title="Idle Vehicles"
          value={idleCount}
          icon={<Clock className="h-6 w-6 text-logistics-warning" />}
          variant={activeFilter === 'idle' ? 'warning' : 'default'}
          className="cursor-pointer transition-all duration-300"
          onClick={() => setActiveFilter(activeFilter === 'idle' ? 'all' : 'idle')}
        />
        
        <StatusCard 
          title="In Maintenance"
          value={maintenanceCount}
          icon={<AlertCircle className="h-6 w-6 text-logistics-danger" />}
          variant={activeFilter === 'maintenance' ? 'danger' : 'default'}
          className="cursor-pointer transition-all duration-300"
          onClick={() => setActiveFilter(activeFilter === 'maintenance' ? 'all' : 'maintenance')}
        />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-logistics-200 overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-lg font-medium text-logistics-900">Vehicle Fleet</h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-logistics-500" />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  className="pl-9 pr-4 py-2 border border-logistics-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-logistics-accent/50"
                />
              </div>
              
              <div className="flex gap-2">
                <button className="px-3 py-2 border border-logistics-200 rounded-md flex items-center text-logistics-700 hover:bg-logistics-50">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filter</span>
                </button>
                
                <button className="px-3 py-2 border border-logistics-200 rounded-md flex items-center text-logistics-700 hover:bg-logistics-50">
                  <SortDesc className="h-4 w-4 mr-2" />
                  <span>Sort</span>
                </button>
                
                <button className="px-3 py-2 bg-logistics-accent text-white rounded-md flex items-center hover:bg-logistics-accent/90">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-logistics-200">
                  <th className="text-left py-3 px-4 text-logistics-600 font-medium">Vehicle</th>
                  <th className="text-left py-3 px-4 text-logistics-600 font-medium">Driver</th>
                  <th className="text-left py-3 px-4 text-logistics-600 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-logistics-600 font-medium">Current Location</th>
                  <th className="text-left py-3 px-4 text-logistics-600 font-medium">Fuel</th>
                  <th className="text-left py-3 px-4 text-logistics-600 font-medium">Next Service</th>
                  <th className="text-right py-3 px-4 text-logistics-600 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr 
                    key={vehicle.id}
                    className="border-b border-logistics-200 hover:bg-logistics-50/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-md bg-logistics-100 mr-3">
                          <Truck className="h-5 w-5 text-logistics-700" />
                        </div>
                        <div>
                          <div className="font-medium text-logistics-900">{vehicle.name}</div>
                          <div className="text-sm text-logistics-600">{vehicle.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-logistics-900">{vehicle.driver}</td>
                    <td className="py-3 px-4">{getStatusBadge(vehicle.status)}</td>
                    <td className="py-3 px-4">
                      <div className="text-logistics-900">{vehicle.location}</div>
                      <div className="text-sm text-logistics-500">Updated {vehicle.lastUpdate}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-24">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-logistics-600">Fuel</span>
                          <span className="text-sm font-medium text-logistics-900">{vehicle.fuelLevel}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-logistics-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              vehicle.fuelLevel > 60 
                                ? 'bg-logistics-success' 
                                : vehicle.fuelLevel > 30 
                                  ? 'bg-logistics-warning' 
                                  : 'bg-logistics-danger'
                            }`}
                            style={{ width: `${vehicle.fuelLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-logistics-900">{vehicle.nextService}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="p-2 rounded-md hover:bg-logistics-100 transition-colors">
                        <MoreVertical className="h-5 w-5 text-logistics-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Fleet;
