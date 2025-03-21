
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import StatusCard from '@/components/dashboard/StatusCard';
import DeliveryStatus from '@/components/dashboard/DeliveryStatus';
import MapView from '@/components/dashboard/MapView';
import RouteOptimization from '@/components/dashboard/RouteOptimization';
import { Truck, Clock, DollarSign, PackageCheck } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-logistics-900">Dashboard</h1>
        <p className="text-logistics-600 mt-1">
          Welcome back. Here's what's happening with your shipments today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatusCard 
          title="Active Shipments"
          value={24}
          icon={<Truck className="h-6 w-6 text-logistics-accent" />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatusCard 
          title="On-Time Delivery"
          value="92%"
          icon={<Clock className="h-6 w-6 text-logistics-success" />}
          trend={{ value: 3, isPositive: true }}
        />
        
        <StatusCard 
          title="Avg. Delivery Cost"
          value="$128.50"
          icon={<DollarSign className="h-6 w-6 text-logistics-warning" />}
          trend={{ value: 2.4, isPositive: false }}
        />
        
        <StatusCard 
          title="Completed Today"
          value={18}
          icon={<PackageCheck className="h-6 w-6 text-logistics-600" />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <MapView />
        </div>
        
        <div className="space-y-6">
          <DeliveryStatus />
          <RouteOptimization />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
