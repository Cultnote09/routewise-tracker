
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Calendar, BarChart3, PieChart as PieChartIcon, ArrowRight, Clock, Download } from 'lucide-react';

// Sample data for charts
const deliveryData = [
  { name: 'Jan', road: 65, air: 35, sea: 20 },
  { name: 'Feb', road: 59, air: 28, sea: 40 },
  { name: 'Mar', road: 80, air: 50, sea: 35 },
  { name: 'Apr', road: 81, air: 40, sea: 25 },
  { name: 'May', road: 56, air: 45, sea: 40 },
  { name: 'Jun', road: 55, air: 30, sea: 45 },
  { name: 'Jul', road: 72, air: 32, sea: 35 },
];

const fuelEfficiencyData = [
  { name: 'Truck A', efficiency: 12.3 },
  { name: 'Truck B', efficiency: 9.8 },
  { name: 'Truck C', efficiency: 14.1 },
  { name: 'Truck D', efficiency: 11.5 },
  { name: 'Truck E', efficiency: 10.2 },
];

const transportModeData = [
  { name: 'Road', value: 65, color: '#4DABF7' },
  { name: 'Air', value: 20, color: '#51CF66' },
  { name: 'Sea', value: 15, color: '#FCC419' },
];

const timeRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 12 months'];

const Analytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 30 days');
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-logistics-900">Analytics</h1>
        <p className="text-logistics-600 mt-1">
          Track performance metrics and optimize your logistics operations.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="lg:w-3/4 bg-white rounded-xl shadow-sm border border-logistics-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="p-2 rounded-md bg-logistics-accent/10 mr-3">
                <BarChart3 className="h-5 w-5 text-logistics-accent" />
              </div>
              <h2 className="text-lg font-medium text-logistics-900">Delivery Volume by Transport Mode</h2>
            </div>
            
            <div className="flex items-center">
              <div className="relative">
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="appearance-none bg-logistics-50 border border-logistics-200 text-logistics-900 py-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-logistics-accent/50"
                >
                  {timeRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-logistics-500" />
              </div>
              
              <button className="ml-2 p-2 border border-logistics-200 rounded-md hover:bg-logistics-50 transition-colors">
                <Download className="h-5 w-5 text-logistics-600" />
              </button>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={deliveryData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" />
                <XAxis dataKey="name" stroke="#ADB5BD" />
                <YAxis stroke="#ADB5BD" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #DEE2E6',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="road" 
                  stackId="1" 
                  stroke="#4DABF7" 
                  fill="#4DABF7" 
                  fillOpacity={0.8} 
                />
                <Area 
                  type="monotone" 
                  dataKey="air" 
                  stackId="1" 
                  stroke="#51CF66" 
                  fill="#51CF66" 
                  fillOpacity={0.8} 
                />
                <Area 
                  type="monotone" 
                  dataKey="sea" 
                  stackId="1" 
                  stroke="#FCC419" 
                  fill="#FCC419" 
                  fillOpacity={0.8} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center mr-6">
              <div className="w-3 h-3 bg-logistics-accent rounded-full mr-2"></div>
              <span className="text-sm text-logistics-700">Road</span>
            </div>
            <div className="flex items-center mr-6">
              <div className="w-3 h-3 bg-logistics-success rounded-full mr-2"></div>
              <span className="text-sm text-logistics-700">Air</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-logistics-warning rounded-full mr-2"></div>
              <span className="text-sm text-logistics-700">Sea</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/4 bg-white rounded-xl shadow-sm border border-logistics-200 p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-md bg-logistics-warning/10 mr-3">
              <Clock className="h-5 w-5 text-logistics-warning" />
            </div>
            <h2 className="text-lg font-medium text-logistics-900">Delivery Time Trends</h2>
          </div>
          
          <div className="text-center mb-4">
            <div className="text-3xl font-semibold text-logistics-900">-12%</div>
            <div className="text-logistics-600 text-sm">Average delivery time</div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-logistics-600">Road Transport</span>
                <span className="text-sm font-medium text-logistics-900">-8%</span>
              </div>
              <div className="w-full h-1.5 bg-logistics-100 rounded-full overflow-hidden">
                <div 
                  className="bg-logistics-accent h-full rounded-full"
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-logistics-600">Air Transport</span>
                <span className="text-sm font-medium text-logistics-900">-15%</span>
              </div>
              <div className="w-full h-1.5 bg-logistics-100 rounded-full overflow-hidden">
                <div 
                  className="bg-logistics-success h-full rounded-full"
                  style={{ width: '80%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-logistics-600">Sea Transport</span>
                <span className="text-sm font-medium text-logistics-900">-5%</span>
              </div>
              <div className="w-full h-1.5 bg-logistics-100 rounded-full overflow-hidden">
                <div 
                  className="bg-logistics-warning h-full rounded-full"
                  style={{ width: '40%' }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="w-full py-2 text-center text-logistics-accent hover:text-logistics-800 flex items-center justify-center transition-colors">
              <span>View detailed report</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-logistics-200 p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-md bg-logistics-success/10 mr-3">
              <BarChart3 className="h-5 w-5 text-logistics-success" />
            </div>
            <h2 className="text-lg font-medium text-logistics-900">Fuel Efficiency by Vehicle</h2>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F5" />
                <XAxis dataKey="name" stroke="#ADB5BD" />
                <YAxis stroke="#ADB5BD" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #DEE2E6',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  formatter={(value) => [`${value} mpg`, 'Efficiency']}
                />
                <Bar dataKey="efficiency" fill="#51CF66" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-logistics-200 p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 rounded-md bg-logistics-danger/10 mr-3">
              <PieChartIcon className="h-5 w-5 text-logistics-danger" />
            </div>
            <h2 className="text-lg font-medium text-logistics-900">Transport Mode Distribution</h2>
          </div>
          
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transportModeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {transportModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #DEE2E6',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
