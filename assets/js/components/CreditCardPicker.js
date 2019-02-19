import React from "react"

import CreditCard from "./CreditCard"

class CreditCardPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loading: true, creditCards: [] }
    fetch("/api/credit-cards", { headers: { "Content-Type": "application/json" } })
      .then(response => response.json())
      .then(data => this.setState({ loading: false, creditCards: data.credit_cards }))
  }

  removeCard(card) {
    this.setState({ loading: true }, () => (
      fetch(`/api/credit-cards/${card.id}`, { method: "DELETE", headers: { "Content-Type": "application/json" } })
        .then(response => response.json())
        .then(data => this.setState({ loading: false, creditCards: data.credit_cards }))
    ))
  }

  render() {
    const { creditCards } = this.state
    const { selectCard } = this.props

    if (creditCards.length === 0) {
      return (
        <p className="py-8 text-grey-dark text-sm">
          You currently don't have any credit cards stored. Make a purchase while storing a credit card to have them show up here!
        </p>
      )
    }

    return creditCards.map(card => (
      <div key={card.token} className="mb-8 cursor-pointer">
        <div className="relative card mx-auto">
          <span className="absolute pin-card-close z-20" onClick={() => this.removeCard(card)}>
            <svg className="fill-current h-6 w-6 text-red bg-red-lightest border-2 border-red-light rounded-full" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Remove card</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
          <CreditCard {...card} onClick={() => selectCard(card)} />
        </div>
      </div>
    ))
  }
}

export default CreditCardPicker
