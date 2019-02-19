defmodule Spairlines.Repo.Migrations.AddReceiverTokenToSpreedlyConfig do
  use Ecto.Migration

  def change do
    alter table("spreedly_configs") do
      add :receiver_token, :string
    end
  end
end
