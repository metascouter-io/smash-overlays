import React from 'react';

export function Checkbox({ label, name, type, checked, handleChange, placeholder }) {
  return(
    <div className="inputGroup">
      <label><span>{label}</span></label>
      <div className="input">
        <input name={name} type="checkbox" checked={checked} onChange={(e) => handleChange(e)} placeholder={placeholder} />
      </div>
    </div>
  )
}