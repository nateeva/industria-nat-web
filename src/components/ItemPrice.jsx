/* eslint-disable react/prop-types */
import { formatPriceToARS } from "./utils/utils"

export const ItemPrice = ({className, price, title}) => {
  return (
    <div className={`font-bold text-marron-200 flex justify-between ${className}`}>
        <p>{title}</p>
        <p>{formatPriceToARS(price)}</p>
    </div>
  )
}
