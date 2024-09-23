import React from 'react'

const Radio = ({ type, id, name, value, onChange, htmlFor, title, checked }) => {
  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={id} className="ml-2 font-semibold text-marron-200">{title}</label>
    </>

  )
}

export default Radio
