import React from "react"

const disabledClasses = "opacity-50 cursor-not-allowed"

export default function Input(props) {
  return (
    <div className="mb-4">
      <label
        className={`block text-grey-darker text-sm font-bold mb-2 ${props.disabled && disabledClasses}`}
        htmlFor={props.name}
        required
      >
        {props.label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline ${props.disabled && disabledClasses}`}
        id={props.name}
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.updateItem(event.target.value, props.name)}
        autoFocus={props.autoFocus}
      />
    </div>
  )
}
