
import React, { useEffect, useRef, useState } from 'react';
import { Truck, Navigation, AlertTriangle, RefreshCw } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  status: 'moving' | 'stopped' | 'issue';
  position: { lat: number; lng: number };
}

// Sample vehicle data
const sampleVehicles: Vehicle[] = [
  { id: 'v1', name: 'Truck #1234', status: 'moving', position: { lat: 40.7128, lng: -74.0060 } },
  { id: 'v2', name: 'Van #5678', status: 'moving', position: { lat: 40.7282, lng: -73.9942 } },
  { id: 'v3', name: 'Truck #9012', status: 'stopped', position: { lat: 40.7112, lng: -74.0134 } },
  { id: 'v4', name: 'Delivery #3456', status: 'issue', position: { lat: 40.7218, lng: -73.9882 } },
];

const MapView: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'moving':
        return <Truck className="h-5 w-5 text-logistics-accent" />;
      case 'stopped':
        return <Navigation className="h-5 w-5 text-logistics-warning" />;
      case 'issue':
        return <AlertTriangle className="h-5 w-5 text-logistics-danger" />;
      default:
        return <Truck className="h-5 w-5 text-logistics-accent" />;
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-logistics-200 overflow-hidden">
      <div className="absolute inset-0 z-10">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-logistics-100/50">
            <div className="flex flex-col items-center">
              <RefreshCw className="h-8 w-8 text-logistics-500 animate-spin" />
              <p className="mt-2 text-logistics-700">Loading map...</p>
            </div>
          </div>
        ) : (
          <div 
            ref={mapContainerRef} 
            className="h-full w-full bg-logistics-200"
            style={{
              backgroundImage: "url('https://i.imgur.com/8OgZSfQ.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
      </div>
      
      <div className="relative z-20 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-logistics-900">Live Tracking</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md hover:bg-logistics-100 transition-colors">
              <RefreshCw className="h-4 w-4 text-logistics-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-logistics-200 z-20">
        <div className="p-4">
          <h3 className="text-sm font-medium text-logistics-700 mb-3">Active Vehicles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {sampleVehicles.map((vehicle) => (
              <button 
                key={vehicle.id}
                className={`flex items-center p-2 rounded-md text-left transition-colors ${
                  selectedVehicle?.id === vehicle.id 
                    ? 'bg-logistics-accent/10 border-logistics-accent/30' 
                    : 'hover:bg-logistics-100 border-transparent'
                } border`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <div className="mr-2">
                  {getStatusIcon(vehicle.status)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-medium text-logistics-800 truncate">{vehicle.name}</div>
                  <div className="text-xs text-logistics-600">
                    {vehicle.status === 'moving' ? 'In transit' : vehicle.status === 'stopped' ? 'Stopped' : 'Issue reported'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
