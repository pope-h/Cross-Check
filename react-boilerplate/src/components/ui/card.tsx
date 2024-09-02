import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h2 className="text-xl font-bold mb-4">{title}</h2>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mt-2">
      {children}
    </div>
  );
};