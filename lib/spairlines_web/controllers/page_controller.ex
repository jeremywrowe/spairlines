defmodule SpairlinesWeb.PageController do
  use SpairlinesWeb, :controller
  alias Spairlines.{Airlines,Flights}

  def index(conn, _params) do
    conn
    |> assign(:airlines, Airlines.all)
    |> assign(:flights, Flights.all)
    |> render("index.html")
  end
end
