import React from "react"

const CARD_COLOR_MAP = {
  visa: "blue",
  master: "red",
  discover: "orange",
  american_express: "indigo",
  carnet: "white",
  jcb: "green",
}

const CARD_TYPE_MAP = {
  visa: "Visa",
  master: "MasterCard",
  discover: "Discover",
  american_express: "American Express",
  carnet: "Carnet",
  diners_club: "Diners Club",
  jcb: "JCB",
}

function cardColor(cardType) {
  return CARD_COLOR_MAP[cardType] || "grey"
}

export function cardType(cardType) {
  return CARD_TYPE_MAP[cardType] || cardType
}

class CreditCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = { active: false }
    this.handleHover = this.handleHover.bind(this)
  }

  handleHover(active) {
    return this.setState({ active })
  }

  render() {
    const { token, full_name, year, month, last_four, card_type, onClick } = this.props
    const { active } = this.state
    const color = cardColor(card_type)
    const type = cardType(card_type)
    const animatedClasses = active ? "animated pulse faster" : ""
    const textColor = color === "white" || color === "grey" ? "grey-darker" : "white"


    return (
      <div
        style={{ backgroundImage: "url('/images/card-background.png')" }}
        className={`flex flex-col justify-between card shadow rounded p-4 mx-auto hover:shadow hover:border-${color}-dark bg-${color}-light border-4 border-${color} text-${textColor} ${animatedClasses}`}
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
        onClick={onClick}
      >
        <div className="flex justify-between relative">
          <div className="bg-yellow-light rounded border-2 border-yellow-dark h-8 w-12">
            <div className="bg-yellow-dark w-4/5 h-1 my-1 mx-1">&nbsp;</div>
            <div className="bg-yellow-dark w-4/5 h-1 my-1 mx-1">&nbsp;</div>
            <div className="bg-yellow-dark w-4/5 h-1 my-1 mx-1">&nbsp;</div>
          </div>
          <div className="uppercase">
            {type}
          </div>
        </div>
        <div className="flex justify-between text-xl">
          <div>* * * *</div>
          <div>* * * *</div>
          <div>* * * *</div>
          <div>{last_four}</div>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="uppercase text-xs pb-2">
              card holder
            </div>
            <div className="uppercase text-lg">
              {full_name}
            </div>
          </div>
          <div>
            <div className="uppercase text-xs pb-2 text-right">
              expires
            </div>
            <div className="uppercase text-lg">
              {month}/{year}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreditCard
