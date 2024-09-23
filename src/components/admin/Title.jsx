import React from 'react'

export const Title = ({ text, className }) => {
  return (
    <div className={`${className} text-white text-sm font-bold`}>{text}</div>
  )
}
