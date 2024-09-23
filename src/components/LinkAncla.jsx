/* eslint-disable react/prop-types */
import { Link } from "react-scroll"

export const LinkAncla = ({children, ...props}) => {
  return (
    <Link 
        {...props}
        className="text-xl font-semibold transition duration-150 ease-in-out cursor-pointer font-ebGaramond text-marron-200 hover:text-verde-200">
        {children}
    </Link>
  )
}
