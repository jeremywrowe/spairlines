import React from "react"

const BASE_CLASSNAMES = "inline-block h-8 w-8 bg-white m-2 text-center shadow hover:cursor-pointer hover:shadow-outline rounded"

class FlightSeat extends React.Component {
  render() {
    const { letter, row, selectedLetter, selectedRow, toggleSeat, additionalCost } = this.props
    const selectedClassNames = letter === selectedLetter && row === selectedRow ? "bg-blue-light text-white" : null
    const message = additionalCost > 0 ? `Seat has an upcharge of $${additionalCost}` : "No additional cost (it's a bad seat)"


    return (
      <button
        className={`${BASE_CLASSNAMES} ${selectedClassNames}`}
        onClick={() => toggleSeat(letter, row)}
        title={message}
      >
        {letter}{row}
      </button>
    )
  }
}

export default FlightSeat
