import React, { useState } from 'react'

export const CustomSelect = ({ value, onChange }) => {

  const estados = [
    { value: 'en proceso', color: 'gray' },
    { value: 'enviado', color: 'blue' },
    { value: 'entregado', color: 'green' },
    { value: 'cancelado', color: 'red' }
  ];
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (newValue) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-1 ml-2 border rounded"
      >
        <span
          className="inline-block w-3 h-3 mr-2 rounded-full"
          style={{ backgroundColor: estados.find(e => e.value === value)?.color || 'transparent' }}
        />
        {value}
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 bg-white border border-gray-300 rounded shadow-lg">
          {estados.map((estado) => (
            <div
              key={estado.value}
              onClick={() => handleOptionClick(estado.value)}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
            >
              <span
                className="inline-block w-3 h-3 mr-2 rounded-full"
                style={{ backgroundColor: estado.color }}
              />
              {estado.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
