import React, {MouseEvent} from 'react';
import clsx from 'clsx';

export default function Button({ ...props }) {
  const { children, onClick, className, loading, primary, secondary, danger } = props;
  
  /**
   * Método executado a cada clique no botão.
   * @param e Evento de clique.
   */
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick(e);
  }
  
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
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
