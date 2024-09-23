/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export const LinkComponent = ({children, ...props}) => {
  return (
    <Link 
        {...props}
        className="text-xl font-semibold transition duration-150 ease-in-out cursor-pointer font-ebGaramond text-marron-200 hover:text-verde-200">
        {children}
    </Link>
  )
}
