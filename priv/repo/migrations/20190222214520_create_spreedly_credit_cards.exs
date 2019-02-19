defmodule Spairlines.Repo.Migrations.CreateSpreedlyCreditCards do
  use Ecto.Migration

  def change do
    create table(:spreedly_credit_cards) do
      add :token, :string
      add :last_four, :string
      add :month, :string
      add :year, :string
      add :full_name, :string
      add :card_type, :string
      add :email, :string

      timestamps()
    end

  end
end
