import React from 'react';
import clsx from 'clsx';

export default function Button({ ...props }) {
  const { children, onClick, className, loading, primary, secondary, danger } = props;
  
  return (
    <button
      className={clsx(`${className} rounded-md text-white py-2 px-5`, {
        'cursor-wait': loading,
        'bg-red-700': danger,
        'bg-blue-700': primary && !loading,
        'bg-gray-300': secondary || loading,
        'text-gray-900': secondary && !loading,
        'text-gray-400': loading
      })}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
