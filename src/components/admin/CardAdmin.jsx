export const CardAdmin = ({ title, backgroundImage }) => {
  return (
    <div
      className="relative flex items-center justify-center w-full h-48 text-xl font-bold text-white transition-colors duration-100 ease-in-out bg-center bg-cover rounded cursor-pointer"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 transition-opacity duration-300 opacity-70 bg-marron-200 hover:opacity-20"></div>
      <span className="relative z-10">{title}</span>
    </div>
  );
};
