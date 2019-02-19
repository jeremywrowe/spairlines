defmodule Spairlines.Spreedly.CreditCard do
  use Ecto.Schema
  import Ecto.Changeset


  schema "spreedly_credit_cards" do
    field :card_type, :string
    field :full_name, :string
    field :last_four, :string
    field :month, :string
    field :token, :string
    field :year, :string
    field :email, :string

    timestamps()
  end

  def spreedly_to_credit_card(%{
    "transaction" => %{
      "payment_method" => %{
        "card_type" => card_type,
        "full_name" => full_name,
        "last_four_digits" => last_four,
        "month" => month,
        "token" => token,
        "year" => year,
        "email" => email,
      }
    }
  }) do
    %Spairlines.Spreedly.CreditCard{
      token: token,
      last_four: last_four,
      month: Integer.to_string(month),
      year: Integer.to_string(year),
      full_name: full_name,
      card_type: card_type,
      email: email,
    }
  end

  @doc false
  def changeset(credit_card, attrs) do
    credit_card
    |> cast(attrs, [:token, :last_four, :month, :year, :full_name, :card_type, :email])
    |> validate_required([:token, :last_four, :month, :year, :full_name, :card_type, :email])
  end
end
