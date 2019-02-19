defmodule SpairlinesWeb.FlightsController do
  use SpairlinesWeb, :controller
  alias Spairlines.{Flights, Airlines}

  def show(conn, %{ "id" => id }) do
    flight = Flights.find(id)
    airline = Airlines.find_by_iata(flight.iata)

    conn
    |> assign(:airline, airline)
    |> assign(:flight, flight)
    |> render("show.html")
  end
end

