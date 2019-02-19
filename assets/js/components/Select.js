import React from "react"

const disabledClasses = "opacity-50 cursor-not-allowed"

export default function Select(props) {
  return (
    <div className="mb-4">
      <label
        className={`block text-grey-darker text-sm font-bold mb-2 ${props.disabled && disabledClasses}`}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <div className="relative">
        <select
          className={`block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey ${props.disabled && disabledClasses}`}
          id={props.name}
          value={props.yes ? "Yes" : "No"}
          onChange={(event) => props.updateItem(event.target.value === "Yes", props.name)}
        >
          <option>No</option>
          <option>Yes</option>
        </select>
        <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
