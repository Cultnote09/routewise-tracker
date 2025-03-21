
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusCardVariants = cva(
  "relative p-6 rounded-xl transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white border border-logistics-200 shadow-sm hover:shadow-md",
        glass: "glass-card",
        accent: "bg-logistics-accent/10 border border-logistics-accent/30",
        success: "bg-logistics-success/10 border border-logistics-success/30",
        warning: "bg-logistics-warning/10 border border-logistics-warning/30",
        danger: "bg-logistics-danger/10 border border-logistics-danger/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatusCardProps extends VariantProps<typeof statusCardVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  children?: React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  trend,
  variant,
  className,
  children,
}) => {
  return (
    <div className={cn(statusCardVariants({ variant }), className)}>
      <div className="flex items-start justify-between">
        {icon && <div className="mb-4">{icon}</div>}
        
        {trend && (
          <div className={cn(
            "text-sm flex items-center rounded-full px-2 py-0.5",
            trend.isPositive 
              ? "text-logistics-success bg-logistics-success/10" 
              : "text-logistics-danger bg-logistics-danger/10"
          )}>
            <span className="mr-1">{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <h3 className="text-sm font-medium text-logistics-600 mb-1">{title}</h3>
      <div className="text-2xl font-semibold text-logistics-900">{value}</div>
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default StatusCard;
