import React from 'react';

export function Input({ label, name, type, value, handleChange, placeholder, disabled }) {
  return(
    <div className="inputGroup">
      <label><span>{label}</span></label>
      <div className="input">
        <input name={name} type={type} value={value} onChange={(e) => handleChange(e)} placeholder={placeholder} disabled={disabled} />
      </div>
    </div>
  )
}