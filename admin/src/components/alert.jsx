// components/Alert.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';

const Alert = ({ type, message, onClose }) => {
  const alertClasses = {
    success: 'bg-green-50 border-green-500 text-green-700',
    error: 'bg-red-50 border-red-500 text-red-700',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
    info: 'bg-blue-50 border-blue-500 text-blue-700',
  };

  return (
    <div className={`mb-6 border-l-4 p-4 ${alertClasses[type]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert;