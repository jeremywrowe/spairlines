defmodule Spairlines.Repo.Migrations.CreateSpreedlyConfigs do
  use Ecto.Migration

  def change do
    create table(:spreedly_configs) do
      add :organization, :string
      add :environment_key, :string
      add :gateway_token, :string
      add :access_secret, :string
      add :name, :string

      timestamps()
    end

  end
end
