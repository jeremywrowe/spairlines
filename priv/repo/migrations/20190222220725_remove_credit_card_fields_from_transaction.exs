defmodule Spairlines.Repo.Migrations.RemoveCreditCardFieldsFromTransaction do
  use Ecto.Migration

  def up do
    alter table(:spreedly_transactions) do
      remove :payment_method_token
      remove :last_four
      remove :month
      remove :year
    end
  end

  def down do
  end
end
