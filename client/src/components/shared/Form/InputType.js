import React from 'react'

const InputType = ({labelText,labelFor,inputType,value,onChange,name}) => {
  return (
    <>
        <div className="mb-1">
        <label htmlFor={labelFor} className="form-label">{labelText}</label>
        <input type={inputType} 
        className="form-control" 
        name={name}
        value={value}
        onChange={onChange}
        />
        </div>
    </>
  )
}

export default InputType

//for conversion into reusable form the values should be dynamically accessed using props
//so first we have to destructure props value, onChange,name cane be accesed dynamically
