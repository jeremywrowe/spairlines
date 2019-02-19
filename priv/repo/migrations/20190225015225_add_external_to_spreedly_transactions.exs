defmodule Spairlines.Repo.Migrations.AddExternalToSpreedlyTransactions do
  use Ecto.Migration

  def change do
    alter table(:spreedly_transactions) do
      add :external, :boolean, default: false, null: false
    end
  end
end
