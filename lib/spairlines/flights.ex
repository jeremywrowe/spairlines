defmodule Spairlines.Flights do
  def tvc do
    description = "Traverse City is located in portions of both Grand Traverse County and Leelanau County within Northern Lower Michigan. Traverse City is situated on the shores of picturesque East Grand Traverse Bay and West Grand Traverse Bay, which both flow into Lake Michigan. While Traverse City’s official population is 14,572, and a daytime population of more than twice the official population, it is the hub of a Micropolitan Statistical Area of 143,372."
    %{
      id: 1,
      location: "Traverse City",
      iata: "tvc",
      price: 286,
      image: "http://sportsplanningguide.com/wp-content/uploads/2016/08/Scenery-Shot.jpeg",
      tags: [ "Beach", "Snow", "Dunes", "Trees" ],
      description: description,
    }
  end

  def ord do
    description = "Located on the shores of Lake Michigan, Chicago was incorporated as a city in 1837 near a portage between the Great Lakes and the Mississippi River watershed and grew rapidly in the mid-nineteenth century. After the Great Chicago Fire of 1871, which destroyed several square miles and left more than 100,000 homeless, the city made a concerted effort to rebuild. The construction boom accelerated population growth throughout the following decades, and by 1900 Chicago was one of the five largest cities in the world."
    %{
      id: 2,
      location: "Chicago",
      iata: "ord",
      price: 203,
      image: "https://www.visittheusa.com/sites/default/files/styles/1_1_680x680/public/images/facts_image/2017-03/CC_northave-beach-aerial_Web72DPI.jpg?itok=hDwz8aE0",
      tags: [ "Food", "Architecture", "Wind" ],
      description: description
    }
  end

  def ogg do
    description = "Maui, known also as “The Valley Isle,” is the second largest Hawaiian island. The island beloved for its world-famous beaches, the sacred Iao Valley, views of migrating humpback whales (during winter months), farm-to-table cuisine and the magnificent sunrise and sunset from Haleakala."
    %{
      id: 3,
      location: "Maui",
      iata: "ogg",
      price: 567,
      image: "https://www.speedishuttle.com/images/site/Kahului-View.jpg",
      tags: [ "Beach", "Vacation", "Food", "Whales" ],
      description: description
    }
  end

  def all do
    [tvc(), ord(), ogg()]
  end

  def find(id) when is_binary(id), do: find(String.to_integer(id))
  def find(id), do: Enum.find(all(), fn(flight) -> flight.id == id end)
end
