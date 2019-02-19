defmodule Spairlines.Repo.Migrations.AddSuccessAndMessageToTransaction do
  use Ecto.Migration

  def change do
    alter table(:spreedly_transactions) do
      add :success, :boolean, default: false
      add :message, :text
    end
  end
end
