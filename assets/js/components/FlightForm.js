import React from "react"

import { cardType } from "./CreditCard"
import CreditCardPicker from "./CreditCardPicker"
import Input from "./Input"
import Select from "./Select"

class FlightForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pickingCard: false, token: null }
    this.submit = this.submit.bind(this)
    this.selectCard = this.selectCard.bind(this)
  }

  renderError(error) {
    if (error === null) {
      return null
    }

    return (
      <div className="bg-red-lightest border border-red-light text-red-dark px-4 py-3 rounded relative mb-8" role="alert">
        <strong className="font-bold pb-4">Calmly ask the flight attendant where the parachute is...</strong>
        <div className="block text-sm mt-4">{error}</div>
      </div>
    )
  }

  submit(event) {
    event.preventDefault()
    const { card } = this.state 
    this.props.onSubmit(card && card.token)
  }

  selectCard(card) {
    this.setState({ pickingCard: false, card: card })
  }

  render() {
    const {
      location,
      description,
      updateItem,
      name,
      email,
      wifi,
      checkedBag,
      storeCard,
      external,
      basePrice,
      addonsPrice,
      totalPrice,
      seatUpgradePrice,
      disabled,
      error,
      seatSelected,
    } = this.props
    const { pickingCard, card } = this.state

    const disabledClasses = "opacity-50 cursor-not-allowed"
    const submitDisabled = !seatSelected || name === "" || email === "" || disabled
    const containerClasses = "h-screen bg-white shadow-md px-8 pt-6 pb-8 w-2/5 p-12 shadow flight-container slideInLeft animated overflow-y-auto"

    if (pickingCard) {
      return (
        <div className={containerClasses}>
          <CreditCardPicker selectCard={this.selectCard} />
          <hr className="border-t border-grey my-4" />
          <a onClick={() => this.setState({ pickingCard: false })} className="no-underline bg-orange hover:bg-orange-dark text-white font-bold py-2 px-4 rounded my-8 cursor-pointer">Cancel</a>
        </div>
      )
    }

    return (
      <form
        className={containerClasses}
        onSubmit={this.submit}
        disabled={disabled}
      >
        {this.renderError(error)}
        <h2 className="pb-4">
          Flight to {location}
        </h2>
        <p className="pb-8 text-grey-dark text-sm">
          {description}
        </p>

        <Input name="name" label="Name" value={name} placeholder="Jane Smith" disabled={disabled} updateItem={updateItem} />
        <Input name="email" label="Email" value={email} placeholder="Jane.Smith@example.com" disabled={disabled} updateItem={updateItem} />
        <Select name="wifi" label="Wifi ($10)" yes={wifi} disabled={disabled} updateItem={updateItem} />
        <Select name="checkedBag" label="Checked Bag ($50)" yes={checkedBag} disabled={disabled} updateItem={updateItem} />
        <Select name="external" label="External Booking" yes={external} disabled={disabled} updateItem={updateItem} />
        {card || external ?  null : <Select name="storeCard" label="Store card for future flights" yes={storeCard} disabled={disabled} updateItem={updateItem} />}

        <div className={`w-full ${disabled && disabledClasses}`}>
          <div className="flex items-center justify-between p-2">
            <span className="">Flight Cost:</span>
            <span className="text-xl">${basePrice}</span>
          </div>
          <div className="flex items-center justify-between p-2 text-grey-dark">
            <span className="">Addons Cost:</span>
            <span className="text-xl">${addonsPrice}</span>
          </div>
          <div className="flex items-center justify-between p-2 text-grey-dark">
            <span className="">Seat Cost:</span>
            <span className="text-xl">${seatUpgradePrice}</span>
          </div>
          <hr className="border-t border-grey" />
          <div className="flex items-center justify-between p-2">
            <span className="">Total Cost:</span>
            <span className="text-2xl">${totalPrice}</span>
          </div>
        </div>
        <div className="flex content-between">
          {card ? (
            <React.Fragment>
              <button
                className={`w-full h-16 bg-blue mt-8 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4 ${submitDisabled ? disabledClasses : ""}`}
                type="button"
                disabled={submitDisabled || disabled}
                onClick={() => this.setState({ card: null })}
              >
                Clear selected card
              </button>
              <button
                className={`w-full h-16 bg-green mt-8 hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4 ${submitDisabled ? disabledClasses : ""}`}
                type="button"
                disabled={submitDisabled || disabled}
                onClick={this.submit}
              >
                {disabled ? "Please wait..." : `Pay with ${cardType(card.card_type)}`}
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                className={`w-full h-16 bg-blue mt-8 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4 ${submitDisabled ? disabledClasses : ""}`}
                type="button"
                disabled={submitDisabled || disabled}
                onClick={() => this.setState({ pickingCard: true })}
              >
                {disabled ? "Please wait..." : "Pay with existing card"}
              </button>
              <button
                className={`w-full h-16 bg-green mt-8 hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4 ${submitDisabled ? disabledClasses : ""}`}
                type="submit"
                disabled={submitDisabled || disabled}
              >
                {disabled ? "Please wait..." : "Pay with new card"}
              </button>
            </React.Fragment>
          )}
        </div>
        <div className="pt-10">
          <a href="/" className="no-underline text-orange">Back to dashboard</a>
        </div>
      </form>
    )
  }
}

export default FlightForm
