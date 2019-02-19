defmodule Spairlines.Spreedly.Transaction do
  use Ecto.Schema
  import Ecto.Changeset
  alias Spairlines.{Repo}
  import Ecto.Query

  schema "spreedly_transactions" do
    field :amount, :integer
    field :email, :string
    field :owner, :string
    field :token, :string
    field :description, :string
    field :message, :string
    field :success, :boolean
    field :gateway_token, :string
    field :external, :boolean

    timestamps()
  end

  def all_by_date do
    Spairlines.Spreedly.Transaction |> order_by(desc: :updated_at) |> Repo.all
  end

  def spreedly_to_transaction(%{
    "transaction" => %{
      "token" => token,
      "succeeded" => success,
      "message" => message,
      "payment_method" => %{
        "email" => email,
        "full_name" => owner,
      }
    }
  }, description, external, amount) do
    %Spairlines.Spreedly.Transaction{
      amount: amount,
      owner: owner,
      token: token,
      email: email,
      description: description,
      success: success,
      message: message,
      external: external,
    }
  end

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:amount, :owner, :token, :email, :description, :success, :message, :gateway_token, :external])
    |> validate_required([:amount, :owner, :token, :email, :description, :success, :message, :gateway_token])
  end
end

