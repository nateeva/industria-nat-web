/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from 'react';

export const Input = forwardRef(({ label, hayError, className, onChange, value, name, textarea, ...props }, ref) => {
  // Propiedades comunes para input y textarea
  const commonProps = {
    ...props,
    ref,
    className: `block py-2.5 px-0 w-full text-sm text-marron-200 bg-transparent border-0 border-b-2 border-marron-200 appearance-none focus:outline-none focus:ring-0 peer ${className}`,
    placeholder: " ",
    name,
    value,
    onChange
  };

  return (
    <div className={`relative z-0 mt-2 mb-5 group w-full ${className}`}>
      {textarea ? (
        <textarea
          {...commonProps}
          rows={4}  // Ajusta el número de filas según sea necesario
          className={`resize-none py-5 ${commonProps.className}`}
        />
      ) : (
        <input
          {...commonProps}
          className={`block py-2.5 px-0 w-full text-sm text-marron-200 bg-transparent border-0 border-b-2 border-marron-200 appearance-none focus:outline-none focus:ring-0 peer ${className}`}
        />
      )}
      <label
        className={`peer-focus:font-medium absolute text-sm ${hayError ? 'text-red-500' : 'text-marron-200'} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                peer-focus:left-0 peer-focus:text-marron-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-semibold`}
      >
        {label}
      </label>
    </div>
  );
});
