defmodule SpairlinesWeb.CreditCardsController do
  use SpairlinesWeb, :controller
  alias Spairlines.{Repo,Spreedly.CreditCard}

  def index(conn, _) do
    render(conn, "index.json", %{credit_cards: Repo.all(CreditCard)})
  end

  def delete(conn, %{ "id" => id }) do
    credit_card = Repo.get(CreditCard, id)
    Repo.delete(credit_card)

    render(conn, "index.json", %{credit_cards: Repo.all(CreditCard)})
  end
end
