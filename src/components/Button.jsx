/* eslint-disable react/prop-types */
export const Button = ({children, className, ...props}) => {
  return (
    <button 
        {...props}
        className={`transition ease-in-out duration-150 inline-flex items-center justify-center text-sm text-white font-medium px-10 py-2  tracking-wider text-center ${className}`}
    >{children || 'text'} </button>
  )
}
