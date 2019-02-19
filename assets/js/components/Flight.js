import React from "react"

import FlightSeat from "./FlightSeat"
import FlightForm from "./FlightForm"
import SpreedlyTokenizer from "./SpreedlyTokenizer"

class Flight extends React.Component {

  constructor(props) {
    super(props)
    this.state = { selectedLetter: null, selectedRow: null, name: "", email: "", checkedBag: false, wifi: false, busy: false, finished: false, storeCard: false, external: false, error: null } 
    this.toggleSeat = this.toggleSeat.bind(this)
    this.finishTransaction = this.finishTransaction.bind(this)
    this.submitPayment = this.submitPayment.bind(this)
  }

  demo() {
    this.setState({ name: "Jeremy Rowe", email: "jeremy@spreedly.com", wifi: true, storeCard: true, selectedLetter: "C", selectedRow: 3, external: false })
  }

  finishTransaction(data, canceled) {
    if (canceled) {
      return this.setState({ busy: false, error: null })
    }

    if (data.success === false) {
      return this.setState({ error: data.error, busy: false })
    }

    this.setState({ busy: false, finished: true, error: null })
  }

  submitPayment(totalPrice, token) {
    const { location, spreedlyEnvironmentKey } = this.props
    const { email, name, checkedBag, wifi, storeCard, external, selectedLetter, selectedRow } = this.state
    const seat = `${selectedLetter}${selectedRow}`
    let addons = []

    if (checkedBag) {
      addons.push("Checked Back")
    }

    if (wifi) {
      addons.push("Wifi")
    }

    let description = `Flight to ${location} on seat ${seat} with ${addons.length > 0 ? addons.join(" and ") : "no"} ${addons.length === 1 ? "addon" : "addons"}`
    this.setState({ busy: true, error: null }, () => SpreedlyTokenizer(spreedlyEnvironmentKey, this.finishTransaction, location, totalPrice, name, email, description, storeCard, token, external))
  }


  calculateSeatUpgradePrice(letter, row) {
    const { basePrice } = this.props

    let price = 0

    if (letter === null || row === null) {
      return price
    }

    if (letter === "A" || letter === "E") {
      price += 3
    }

    if (letter === "C" || letter === "D") {
      price += 1
    }

    if (row < 3) {
      price += (basePrice * .20) | 0
    }

    if (row > 2 &&  row < 7) {
      price += (basePrice * .05) | 0
    }

    return price
  }

  toggleSeat(selectedLetter, selectedRow) {
    return this.setState({ selectedLetter, selectedRow })
  }

  updateItem = (value, property) => this.setState({ [property]: value })

  renderSeatDivider() {
      return <hr className="border-t border-grey" />
  }

  renderSeatSection(start, end, selectedLetter, selectedRow) {
    const range = Array(end - start + 1).fill().map((_, i) => start + i)
    return range.map(row => this.renderSeatRow(row, selectedLetter, selectedRow))
  }

  renderSeatRow(row, selectedLetter, selectedRow) {
    return (
      <div className="container mx-auto" key={`row-${row}`}>
        <div className="inline-block ml-2">
          <FlightSeat letter="A" row={row} toggleSeat={this.toggleSeat} selectedLetter={selectedLetter} selectedRow={selectedRow} additionalCost={this.calculateSeatUpgradePrice("A", row)} />
          <FlightSeat letter="B" row={row} toggleSeat={this.toggleSeat} selectedLetter={selectedLetter} selectedRow={selectedRow} additionalCost={this.calculateSeatUpgradePrice("B", row)} />
        </div>

        <div className="inline-block ml-10">
          <FlightSeat letter="C" row={row} toggleSeat={this.toggleSeat} selectedLetter={selectedLetter} selectedRow={selectedRow} additionalCost={this.calculateSeatUpgradePrice("C", row)} />
          <FlightSeat letter="D" row={row} toggleSeat={this.toggleSeat} selectedLetter={selectedLetter} selectedRow={selectedRow} additionalCost={this.calculateSeatUpgradePrice("D", row)} />
          <FlightSeat letter="E" row={row} toggleSeat={this.toggleSeat} selectedLetter={selectedLetter} selectedRow={selectedRow} additionalCost={this.calculateSeatUpgradePrice("E", row)} />
        </div>
      </div>
    )
  }

  renderPlaneNose() {
    return (
      <React.Fragment>
        <div 
          title="Click me to autofill form"
          className="bg-black mx-auto rounded-t-full h-6 nose shadow-outline cursor-pointer"
          onClick={() => this.demo()}
        >
          &nbsp;
        </div>
        <div className="bg-grey-dark plane mx-auto rounded-t-full h-24 pt-4 pb-8">
          <div className="bg-yellow-light shadow w-1/4 mx-auto rounded-t-full h-24 p-4 w-5/6 shadow-outline">
            <div className="bg-yellow w-1/4 mx-auto rounded-t-full h-22 p-4 w-5/6">
              &nbsp;
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  render() {
    const { basePrice, location, description, spreedlyEnvironmentKey } = this.props
    const { selectedLetter, selectedRow, name, email, checkedBag, wifi, storeCard, external, busy, error, finished } = this.state
    const addonsPrice = (checkedBag ? 50 : 0) + (wifi ? 10 : 0)
    const seatUpgradePrice = this.calculateSeatUpgradePrice(selectedLetter, selectedRow)
    const totalPrice = basePrice + addonsPrice + seatUpgradePrice

    if (finished) {
      return (
        <div className="bg-repeat w-screen h-screen" style={{ backgroundImage: "url('/images/clouds.png')" }}>
          <div className="text-center pt-8">
            <h1>Thank you for purchasing a flight to {location}!!!</h1>
          </div>
          <div className="text-center pt-8">
            <p>
              You're more than welcome to book another flight for someone else if you'd wish.. Just click&nbsp;
              <a href="#" className="no-underline text-orange" onClick={() => this.setState({ finished: false, name: "", selectedLetter: null, email: "", wifi: false, checkedBag: false, external: false, error: null })}>
                this
              </a>
              .
            </p>
            <p>
              If you'd like to purchase another flight at another one of our prime locations click&nbsp;
              <a href="/" className="no-underline text-orange">
                here
              </a>.
            </p>
            <p className="mt-8">
              <a
                href="/purchases"
                className="w-full h-16 bg-blue mt-8 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline no-underline"
              >
                View Previous Purchases
              </a>
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-repeat w-full flex" style={{ backgroundImage: "url('/images/clouds.png')" }}>
        <FlightForm
          name={name}
          updateItem={this.updateItem}
          email={email}
          checkedBag={checkedBag}
          wifi={wifi}
          storeCard={storeCard}
          external={external}
          basePrice={basePrice}
          addonsPrice={addonsPrice}
          seatUpgradePrice={seatUpgradePrice}
          totalPrice={totalPrice}
          location={location}
          description={description}
          onSubmit={(token) => this.submitPayment(totalPrice, token)}
          disabled={busy}
          error={error}
          seatSelected={selectedLetter !== null && selectedRow !== null}
        />
        <div className={`mx-auto relative w-3/5 h-screen p-12 flight-container animated slideInUp ${busy && "slideOutDown"}`}>
          {this.renderPlaneNose()}
          <div className="bg-grey-dark plane mx-auto pt-4">
            {this.renderSeatSection(1, 2, selectedLetter, selectedRow)}
            {this.renderSeatDivider()}
            {this.renderSeatSection(3, 6, selectedLetter, selectedRow)}
            {this.renderSeatDivider()}
            {this.renderSeatSection(7, 14, selectedLetter, selectedRow)}
          </div>
          <div className="mx-auto plane border-b-4 border-grey plane-overflow bg-grey-dark">&nbsp;</div>
        </div>
      </div>
    )
  }
}

export default Flight
