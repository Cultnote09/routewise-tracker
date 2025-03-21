
import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Truck } from 'lucide-react';

// Data for delivery status
const deliveryStatus = [
  { status: 'completed', count: 24, label: 'Completed', icon: CheckCircle2, color: 'text-logistics-success' },
  { status: 'inProgress', count: 12, label: 'In Progress', icon: Truck, color: 'text-logistics-accent' },
  { status: 'delayed', count: 5, label: 'Delayed', icon: Clock, color: 'text-logistics-warning' },
  { status: 'issues', count: 2, label: 'Issues', icon: AlertTriangle, color: 'text-logistics-danger' },
];

const DeliveryStatus: React.FC = () => {
  const total = deliveryStatus.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-logistics-200 p-6">
      <h2 className="text-lg font-medium text-logistics-900 mb-4">Delivery Status</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {deliveryStatus.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.status}
              className="flex items-center p-3 border border-logistics-100 rounded-lg"
            >
              <div className={`p-2 rounded-md bg-opacity-10 mr-3 ${item.color.replace('text', 'bg')}`}>
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div>
                <div className="text-sm text-logistics-600">{item.label}</div>
                <div className="text-lg font-semibold text-logistics-900">{item.count}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-2">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm text-logistics-600">Completion Rate</span>
          <span className="text-sm font-medium text-logistics-900">
            {Math.round((deliveryStatus[0].count / total) * 100)}%
          </span>
        </div>
        <div className="w-full bg-logistics-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-logistics-accent h-full rounded-full transition-all duration-500"
            style={{ width: `${(deliveryStatus[0].count / total) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryStatus;
