defmodule Spairlines.Repo.Migrations.CreateSpreedlyTransactions do
  use Ecto.Migration

  def change do
    create table(:spreedly_transactions) do
      add :amount, :integer
      add :owner, :string
      add :token, :string
      add :last_four, :string
      add :email, :string
      add :month, :string
      add :year, :string

      timestamps()
    end

  end
end
