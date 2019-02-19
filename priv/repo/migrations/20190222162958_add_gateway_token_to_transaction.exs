defmodule Spairlines.Repo.Migrations.AddGatewayTokenToTransaction do
  use Ecto.Migration

  def change do
    alter table(:spreedly_transactions) do
      add :gateway_token, :string
    end
  end
end
