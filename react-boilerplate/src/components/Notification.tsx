import React from 'react';
import { Alert } from './ui/alert';

interface NotificationProps {
  message: string;
  type: 'error' | 'success';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return <Alert message={message} type={type} />;
};

export default Notification;