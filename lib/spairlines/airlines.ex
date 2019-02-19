defmodule Spairlines.Airlines do
  def tvc do
    %{
      id: 1,
      name: "TVC",
      iata: "tvc",
    }
  end

  def ord do
    %{
      id: 2,
      name: "ORD",
      iata: "ord",
    }
  end

  def ogg do
    %{
      id: 3,
      name: "OGG",
      iata: "ogg",
    }
  end

  def all do
    [tvc(), ord(), ogg()]
  end

  def find(id) when is_binary(id), do: find(String.to_integer(id))
  def find(id), do: Enum.find(all(), fn(airline) -> airline.id == id end)
  def find_by_iata(iata), do: Enum.find(all(), fn(%{ iata: value }) -> value == iata end)
end

