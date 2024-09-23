import React from 'react'

export const Item = ({className, title, item}) => {
  return (
    <div className={`flex border-b text-start lg:border-b-transparent ${className}`}>
      <div className="w-[35%] font-bold lg:hidden bg-marron-200 text-white p-2 text-sm">{title}</div>
      <div className="p-2 text-sm lg:w-full text-marron-200 lg:p-0 lg:py-2 w-[68%]">
        {item || "-"}
      </div>
    </div>
  )
}
