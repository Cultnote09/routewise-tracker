
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { 
  Search as SearchIcon, 
  Filter, 
  MapPin, 
  Truck, 
  Ship, 
  Plane, 
  CalendarIcon, 
  Clock, 
  ArrowRightCircle, 
  MoreHorizontal, 
  CheckCircle2, 
  Clock as ClockIcon, 
  AlertTriangle,
  SlidersHorizontal
} from 'lucide-react';

// Sample search result data
const searchResults = [
  { 
    id: 'r001', 
    from: 'New York, NY', 
    to: 'Boston, MA', 
    mode: 'road', 
    distance: '215 miles', 
    estimatedTime: '4h 30m', 
    status: 'active',
    price: '$350',
    shipmentId: 'SH-12345',
    driver: 'John Smith',
    vehicle: 'Truck #1234',
    departureTime: '08:00 AM',
    arrivalTime: '12:30 PM',
    lastUpdate: '10 min ago'
  },
  { 
    id: 'r002', 
    from: 'Chicago, IL', 
    to: 'Detroit, MI', 
    mode: 'road', 
    distance: '282 miles', 
    estimatedTime: '4h 15m', 
    status: 'completed',
    price: '$420',
    shipmentId: 'SH-23456',
    driver: 'Maria Garcia',
    vehicle: 'Truck #5678',
    departureTime: '09:15 AM',
    arrivalTime: '01:30 PM',
    lastUpdate: '2 hours ago'
  },
  { 
    id: 'r003', 
    from: 'Los Angeles, CA', 
    to: 'New York, NY', 
    mode: 'air', 
    distance: '2,445 miles', 
    estimatedTime: '5h 45m', 
    status: 'delayed',
    price: '$1,250',
    shipmentId: 'SH-34567',
    vehicle: 'Flight AA198',
    departureTime: '11:00 AM',
    arrivalTime: '07:45 PM',
    lastUpdate: '30 min ago'
  },
  { 
    id: 'r004', 
    from: 'Miami, FL', 
    to: 'Havana, Cuba', 
    mode: 'sea', 
    distance: '230 miles', 
    estimatedTime: '12h 30m', 
    status: 'active',
    price: '$800',
    shipmentId: 'SH-45678',
    vehicle: 'Cargo Ship MS Harmony',
    departureTime: '06:00 AM',
    arrivalTime: '06:30 PM',
    lastUpdate: '1 hour ago'
  },
];

// Filter options
const filterOptions = {
  modes: ['road', 'air', 'sea'],
  status: ['active', 'completed', 'delayed'],
  dateRange: ['Today', 'This Week', 'This Month', 'Custom'],
};

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    modes: [] as string[],
    status: [] as string[],
    dateRange: 'This Week',
  });
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  
  const toggleFilter = (category: 'modes' | 'status', value: string) => {
    setActiveFilters(prev => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);
      
      if (index > -1) {
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(value);
      }
      
      return {
        ...prev,
        [category]: currentFilters,
      };
    });
  };
  
  const toggleDateRange = (value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      dateRange: value,
    }));
  };
  
  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'road':
        return <Truck className="h-5 w-5 text-logistics-accent" />;
      case 'air':
        return <Plane className="h-5 w-5 text-logistics-success" />;
      case 'sea':
        return <Ship className="h-5 w-5 text-logistics-warning" />;
      default:
        return <Truck className="h-5 w-5 text-logistics-accent" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-logistics-success/10 text-logistics-success">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Active
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-logistics-accent/10 text-logistics-accent">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </span>
        );
      case 'delayed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-logistics-warning/10 text-logistics-warning">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Delayed
          </span>
        );
      default:
        return null;
    }
  };
  
  const filteredResults = searchResults.filter(result => {
    // Apply filters
    const modeMatch = activeFilters.modes.length === 0 || activeFilters.modes.includes(result.mode);
    const statusMatch = activeFilters.status.length === 0 || activeFilters.status.includes(result.status);
    
    // Apply search query
    const searchMatch = searchQuery.trim() === '' ||
      result.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.shipmentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    return modeMatch && statusMatch && searchMatch;
  });
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-logistics-900">Search & Filters</h1>
        <p className="text-logistics-600 mt-1">
          Find optimal routes and track deliveries with powerful search.
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-logistics-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:flex-1 relative">
            <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-logistics-500" />
            <input
              type="text"
              placeholder="Search by location, shipment ID, or destination..."
              className="pl-10 pr-4 py-2.5 border border-logistics-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-logistics-accent/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className="px-4 py-2.5 bg-logistics-accent text-white rounded-md flex items-center justify-center hover:bg-logistics-accent/90">
            <SearchIcon className="h-5 w-5 mr-2" />
            <span>Search</span>
          </button>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-logistics-700 mr-2" />
            <h3 className="text-sm font-medium text-logistics-900">Filters</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="p-2 bg-logistics-50 rounded-md">
              <h4 className="text-xs text-logistics-600 mb-2">Transport Mode</h4>
              <div className="flex gap-2">
                {filterOptions.modes.map((mode) => (
                  <button
                    key={mode}
                    className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                      activeFilters.modes.includes(mode)
                        ? 'bg-logistics-accent/10 text-logistics-accent border-logistics-accent/30'
                        : 'border border-logistics-200 text-logistics-700 hover:bg-logistics-100'
                    } border`}
                    onClick={() => toggleFilter('modes', mode)}
                  >
                    {getModeIcon(mode)}
                    <span className="ml-1.5 capitalize">{mode}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-2 bg-logistics-50 rounded-md">
              <h4 className="text-xs text-logistics-600 mb-2">Status</h4>
              <div className="flex gap-2">
                {filterOptions.status.map((status) => (
                  <button
                    key={status}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      activeFilters.status.includes(status)
                        ? 'bg-logistics-accent/10 text-logistics-accent border-logistics-accent/30'
                        : 'border border-logistics-200 text-logistics-700 hover:bg-logistics-100'
                    } border`}
                    onClick={() => toggleFilter('status', status)}
                  >
                    <span className="capitalize">{status}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-2 bg-logistics-50 rounded-md">
              <h4 className="text-xs text-logistics-600 mb-2">Date Range</h4>
              <div className="flex gap-2">
                {filterOptions.dateRange.map((range) => (
                  <button
                    key={range}
                    className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
                      activeFilters.dateRange === range
                        ? 'bg-logistics-accent/10 text-logistics-accent border-logistics-accent/30'
                        : 'border border-logistics-200 text-logistics-700 hover:bg-logistics-100'
                    } border`}
                    onClick={() => toggleDateRange(range)}
                  >
                    {range === 'Custom' ? (
                      <CalendarIcon className="h-4 w-4 mr-1.5" />
                    ) : null}
                    <span>{range}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button className="p-2 rounded-md text-logistics-700 hover:bg-logistics-100 border border-logistics-200 flex items-center">
              <SlidersHorizontal className="h-5 w-5 mr-1.5" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-logistics-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-logistics-900 mb-6">Search Results ({filteredResults.length})</h2>
              
              {filteredResults.length === 0 ? (
                <div className="text-center py-12">
                  <SearchIcon className="h-12 w-12 text-logistics-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-logistics-900 mb-1">No results found</h3>
                  <p className="text-logistics-600 max-w-md mx-auto">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredResults.map((result) => (
                    <div 
                      key={result.id}
                      className={`border ${
                        selectedResult === result.id 
                          ? 'border-logistics-accent bg-logistics-accent/5' 
                          : 'border-logistics-200 hover:border-logistics-300'
                      } rounded-lg p-4 transition-all duration-200 cursor-pointer`}
                      onClick={() => setSelectedResult(result.id === selectedResult ? null : result.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 p-2 rounded-md bg-logistics-100">
                            {getModeIcon(result.mode)}
                          </div>
                          <div>
                            <div className="font-medium text-logistics-900">{result.shipmentId}</div>
                            <div className="text-sm text-logistics-600 capitalize">{result.mode} Transport</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          {getStatusBadge(result.status)}
                          <button className="ml-2 p-1 text-logistics-500 hover:text-logistics-700 transition-colors">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-logistics-600 mb-1">From</div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-logistics-500 mr-1" />
                            <span className="text-logistics-900">{result.from}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-logistics-600 mb-1">To</div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-logistics-500 mr-1" />
                            <span className="text-logistics-900">{result.to}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-logistics-600 mb-1">Est. Time</div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-logistics-500 mr-1" />
                            <span className="text-logistics-900">{result.estimatedTime}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-logistics-600 mb-1">Price</div>
                          <div className="font-medium text-logistics-900">{result.price}</div>
                        </div>
                      </div>
                      
                      {selectedResult === result.id && (
                        <div className="mt-4 pt-4 border-t border-logistics-200 grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in">
                          <div>
                            <div className="text-sm text-logistics-600 mb-1">Vehicle</div>
                            <div className="text-logistics-900">{result.vehicle}</div>
                          </div>
                          
                          {result.driver && (
                            <div>
                              <div className="text-sm text-logistics-600 mb-1">Driver</div>
                              <div className="text-logistics-900">{result.driver}</div>
                            </div>
                          )}
                          
                          <div>
                            <div className="text-sm text-logistics-600 mb-1">Last Update</div>
                            <div className="text-logistics-900">{result.lastUpdate}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-logistics-600 mb-1">Departure</div>
                            <div className="text-logistics-900">{result.departureTime}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-logistics-600 mb-1">Arrival</div>
                            <div className="text-logistics-900">{result.arrivalTime}</div>
                          </div>
                          
                          <div className="lg:col-span-1 lg:text-right">
                            <button className="px-3 py-2 mt-2 bg-logistics-accent text-white rounded-md flex items-center hover:bg-logistics-accent/90">
                              <ArrowRightCircle className="h-4 w-4 mr-1.5" />
                              <span>View Details</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-logistics-200 p-6 h-full">
            <h2 className="text-lg font-medium text-logistics-900 mb-6">AI-Optimized Routes</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-logistics-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-logistics-900">New York to Boston</h3>
                  <span className="text-sm text-logistics-success font-medium">Save 18%</span>
                </div>
                
                <div className="grid grid-cols-12 gap-2 mb-3">
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-logistics-600 mr-1" />
                      <span className="text-sm text-logistics-700 truncate">New York, NY</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-center">
                    <ArrowRightCircle className="h-4 w-4 text-logistics-500" />
                  </div>
                  
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-logistics-600 mr-1" />
                      <span className="text-sm text-logistics-700 truncate">Boston, MA</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-logistics-600">
                  <div>Current: 4h 30m</div>
                  <div>Optimized: <span className="font-medium text-logistics-900">3h 45m</span></div>
                </div>
                
                <button className="w-full mt-4 py-2 border border-logistics-accent text-logistics-accent rounded-md hover:bg-logistics-accent/5 transition-colors">
                  Apply This Route
                </button>
              </div>
              
              <div className="p-4 border border-logistics-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-logistics-900">Chicago to Detroit</h3>
                  <span className="text-sm text-logistics-success font-medium">Save 12%</span>
                </div>
                
                <div className="grid grid-cols-12 gap-2 mb-3">
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-logistics-600 mr-1" />
                      <span className="text-sm text-logistics-700 truncate">Chicago, IL</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-center">
                    <ArrowRightCircle className="h-4 w-4 text-logistics-500" />
                  </div>
                  
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-logistics-600 mr-1" />
                      <span className="text-sm text-logistics-700 truncate">Detroit, MI</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-logistics-600">
                  <div>Current: 4h 15m</div>
                  <div>Optimized: <span className="font-medium text-logistics-900">3h 45m</span></div>
                </div>
                
                <button className="w-full mt-4 py-2 border border-logistics-accent text-logistics-accent rounded-md hover:bg-logistics-accent/5 transition-colors">
                  Apply This Route
                </button>
              </div>
              
              <div className="p-4 border border-logistics-accent rounded-lg bg-logistics-accent/5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-logistics-900">Los Angeles to San Diego</h3>
                  <span className="text-sm text-logistics-success font-medium">Save 23%</span>
                </div>
                
                <div className="grid grid-cols-12 gap-2 mb-3">
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-logistics-600 mr-1" />
                      <span className="text-sm text-logistics-700 truncate">Los Angeles, CA</span>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center justify-center">
                    <ArrowRightCircle className="h-4 w-4 text-logistics-500" />
                  </div>
                  
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-logistics-600 mr-1" />
                      <span className="text-sm text-logistics-700 truncate">San Diego, CA</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-logistics-600">
                  <div>Current: 2h 45m</div>
                  <div>Optimized: <span className="font-medium text-logistics-900">2h 10m</span></div>
                </div>
                
                <div className="p-3 bg-white rounded-md mt-4 text-sm text-logistics-700">
                  <ClockIcon className="h-4 w-4 text-logistics-accent inline-block mr-1" />
                  <span>Avoid I-5 between 3-6 PM due to heavy traffic</span>
                </div>
                
                <button className="w-full mt-4 py-2 bg-logistics-accent text-white rounded-md hover:bg-logistics-accent/90 transition-colors">
                  Apply This Route
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
