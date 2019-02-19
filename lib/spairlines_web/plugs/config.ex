defmodule SpairlinesWeb.Plugs.Config do
  import Plug.Conn

  use Phoenix.Controller

  alias Spairlines.Spreedly.Config

  def init(default), do: default

  def call(conn, _) do
    config = Config.first

    if config do
      conn
      |> assign(:spreedly_config, config)
    else
      conn
      |> redirect(to: "/setup")
      |> halt
    end
  end
end
