defmodule Spairlines.Repo.Migrations.AddPaymentMethodTokenToTransaction do
  use Ecto.Migration

  def change do
    alter table(:spreedly_transactions) do
      add :payment_method_token, :string
      add :description, :text
    end
  end
end
