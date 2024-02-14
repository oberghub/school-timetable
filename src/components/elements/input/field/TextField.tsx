import React from "react";

interface TextField {
  width: string | number;
  height: string | number;
  placeHolder: string;
  disabled: boolean;
  label: string;
  handleChange;
  value: string;
  borderColor:string;
}
function TextField({
  width = "auto",
  height = 'auto',
  placeHolder = "",
  disabled = false,
  label,
  handleChange,
  value,
  borderColor=""
}: TextField): JSX.Element {
  const textFieldStyleProperty: object = {
    width: width,
    height: height,
    borderWidth: 1,
    borderColor: `${borderColor}`,
  };
  return (
    <div className="flex flex-col text-left">
      <label className="text-sm font-bold">{label}</label>
      <input
        className="rounded text-field px-[15px] py-[10px] text-sm placeholder:text-sm"
        type='text'
        style={textFieldStyleProperty}
        placeholder={placeHolder}
        onChange={handleChange}
        disabled={disabled}
        value={value}
      />
    </div>
  );
}

export default TextField;
