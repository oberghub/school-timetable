import React from "react";

interface TextField {
  width: string | number;
  height: string | number;
  placeHolder: string;
  disabled: boolean;
  label: string;
  handleChange;
}
function NumberField({
  width = "auto",
  height = 'auto',
  placeHolder = "",
  disabled = false,
  label,
  handleChange,
}: TextField): JSX.Element {
  const numberFieldStyleProperty: object = {
    width: width,
    height: height,
    borderWidth: 1,
    borderColor: "#E0E1E8",
  };
  return (
    <div className="flex flex-col text-left gap-2">
      <label className="text-sm font-bold">{label}</label>
      <input
        className="rounded text-field px-[15px] py-[10px] text-sm placeholder:text-sm"
        type='number'
        style={numberFieldStyleProperty}
        placeholder={placeHolder}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}

export default NumberField;