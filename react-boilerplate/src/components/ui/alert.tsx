import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AlertProps {
  message: string;
  type: 'error' | 'success';
}

export const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const alertStyle =
    type === 'error' ? 'bg-red-100 text-red-800' : 'bg-teal-100 text-teal-800';

  return (
    <div className={`flex items-center p-4 rounded ${alertStyle}`}>
      <AlertCircle className="h-4 w-4 mr-2" />
      <div>
        <h3 className="font-semibold">{type === 'error' ? 'Error' : 'Success'}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};