defmodule Spairlines.Spreedly.Config do
  use Ecto.Schema
  import Ecto.Changeset
  alias Spairlines.{Repo,Spreedly.Config}

  schema "spreedly_configs" do
    field :access_secret, :string
    field :environment_key, :string
    field :gateway_token, :string
    field :name, :string
    field :organization, :string
    field :receiver_token, :string

    timestamps()
  end

  def first do
    Config |> Repo.one 
  end

  def first_or_build do
    Config.first || %Config{}
  end

  @doc false
  def changeset(config, attrs) do
    config
    |> cast(attrs, [:organization, :environment_key, :gateway_token, :access_secret, :name, :receiver_token])
    |> validate_required([:organization, :environment_key, :gateway_token, :access_secret, :name])
  end
end
