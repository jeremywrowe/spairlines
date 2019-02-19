defmodule SpairlinesWeb.CreditCardsView do
  use SpairlinesWeb, :view

  def render("index.json", %{credit_cards: credit_cards}) do
    %{credit_cards: credit_cards_json(credit_cards)}
  end

  def credit_cards_json(credit_cards), do: Enum.map(credit_cards, &credit_card_json/1)

  def credit_card_json(credit_card) do
    %{
      id: credit_card.id,
      token: credit_card.token,
      last_four: credit_card.last_four,
      month: credit_card.month,
      year: credit_card.year,
      full_name: credit_card.full_name,
      card_type: credit_card.card_type,
      email: credit_card.email,
    }
  end
end
