defmodule Spairlines.Repo do
  use Ecto.Repo,
    otp_app: :spairlines,
    adapter: Ecto.Adapters.Postgres
end
