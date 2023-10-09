import React from 'react'

interface CheckBox {
    label: string;
    value: string;
    name: string;
    handleClick: Function;
    checked:boolean;
}
function CheckBox({
    label="Checkbox",
    value,
    name,
    handleClick,
    checked=false
}: CheckBox): JSX.Element {
  return (
    <div className='flex justify-center items-center gap-3 flex-row w-fit h-fit'>
      {checked 
      ?
      <input type='checkbox' className='outline-none' value={value} name={name} onClick={() => handleClick} checked disabled={checked}/>
      :
      <input type='checkbox' className='outline-none' value={value} name={name} onClick={() => handleClick} disabled={checked}/>
      }
      <label className='select-none text-gray-500'>{label}</label>
    </div>
  )
}

export default CheckBox
