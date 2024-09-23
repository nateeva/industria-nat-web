
const Select = ({ name, value, onChange, options, defaultOption, className}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 my-3 text-sm font-semibold border-b-2 appearance-none border-marron-200 bg-claro text-marron-200 font-inter ${className}`}
    >
      <option value="0">{defaultOption}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nombre}
        </option>
      ))}
    </select>
  );
};

export default Select;