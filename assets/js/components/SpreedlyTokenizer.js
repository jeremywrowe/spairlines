function persist(callback, amountInDollars, paymentMethodToken, description, storeCard, unload, external) {
  const body = {
    amount_in_cents: amountInDollars * 100,
    payment_method_token: paymentMethodToken,
    description: description,
    retain_on_success: !external && storeCard,
    external,
  }

  if (unload) {
    SpreedlyExpress.unload()
  }

  fetch("/api/purchases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  .then(response => {
    if (response.status === 200 || response.status === 201 || response.status === 422) {
      return response.json()
    }
  })
  .then(data => callback(data))
  .catch(error => console.error(error))
}

export default function SpreedlyTokenizer(spreedlyEnvironmentKey, callback, location, amountInDollars, name, email, description, storeCard, existingToken, external) {
  if (existingToken) {
    return persist(callback, amountInDollars, existingToken, description, false, false, external)
  }

  SpreedlyExpress.init(spreedlyEnvironmentKey, {
    "amount": `$${amountInDollars}`,
    "company_name": `Flight to ${location}`,
    "full_name": name,
    "sidebar_bottom_description": description,
  }, { "email": email })
  SpreedlyExpress.openView()
  SpreedlyExpress.onViewClose(() => callback(null, true))

  SpreedlyExpress.onPaymentMethod((paymentMethodToken) => persist(callback, amountInDollars, paymentMethodToken, description, storeCard, true, external))
}
