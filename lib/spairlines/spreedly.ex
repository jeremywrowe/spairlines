defmodule Spairlines.Spreedly do
  use HTTPoison.Base
  alias Spairlines.Spreedly.Config

  ## Public API

  def purchase(%{payment_method_token: payment_method_token, amount_in_cents: amount_in_cents, description: description, retain_on_success: retain_on_success}, spreedly_config = %Config{}) do
    body = %{
      "transaction" => %{
        "retain_on_success" => retain_on_success,
        "payment_method_token" => payment_method_token,
        "amount" => amount_in_cents,
        "currency_code" => "USD",
        "description" => description,
      }
    }

    post!("/gateways/#{spreedly_config.gateway_token}/purchase", body, [], spreedly_config)
  end

  def external_purchase(%{payment_method_token: payment_method_token, amount_in_cents: amount_in_cents, description: description}, spreedly_config = %Config{}) do
    encoded_body = Jason.encode!(%{amount_in_cents: amount_in_cents, description: description})
    body = %{
      "delivery" => %{
        "url" => "https://spreedly-echo.herokuapp.com",
        "payment_method_token" => payment_method_token,
        "headers" => "Content-Type: application/json; Spairlines-Awesome-Sauce: true",
        "body" => encoded_body,
      }
    }

    post!("/receivers/#{spreedly_config.receiver_token}/deliver", body, [], spreedly_config)
  end

  def list_receivers(spreedly_config = %Config{}) do
    case get("/receivers", [], spreedly_config) do
      {:ok, %HTTPoison.Response{body: %{"receivers" => receivers}}} ->
        receivers
      _ -> []
    end
  end

  def find_or_create_receiver(spreedly_config = %Config{}) do
    name = "Spreedly Spairlines Demo (#{spreedly_config.name})"
    receiver = find_receiver(spreedly_config, name)
    if receiver, do: receiver, else: create_receiver(spreedly_config, name)
  end

  def find_receiver(spreedly_config = %Config{}, name) do
    receivers = list_receivers(spreedly_config)
    receiver = Enum.find(receivers, fn(r) -> match?(%{"credentials" => [%{"value" => ^name}]}, r) end)
    if receiver, do: receiver["token"], else: nil
  end

  def create_receiver(spreedly_config = %Config{}, name) do
    body = %{
      "receiver" => %{
        "receiver_type" => "test",
        "hostnames" => "https://spreedly-echo.herokuapp.com",
        "credentials" => [
          %{
            "name" => "application-name",
            "value" => name,
            "safe" => true
          }
        ]
      }
    }

    case post("/receivers", body, [], spreedly_config) do
      {:ok, %HTTPoison.Response{body: %{"receiver" => %{"token" => token}}}} ->
        token
      _ -> nil
    end
  end

  ## Private API

  def process_request_url(url) do
    "https://core.spreedly.com/v1" <> url <> ".json"
  end

  def process_request_headers(_) do
    [{"Content-Type", "application/json"}]
  end

  def process_request_options(%Config{environment_key: spreedly_environment_key, access_secret: spreedly_access_secret}) do
    [hackney: [basic_auth: {spreedly_environment_key, spreedly_access_secret}]]
  end

  def process_request_body(body) when is_map(body) do
    Jason.encode!(body)
  end

  def process_request_body(body), do: body

  def process_response_body(body) do
    case Jason.decode(body) do
      {:error, %Jason.DecodeError{data: data}} ->
        %{ data:  data, message: "had trouble parsing JSON", error: true }
      {:ok, data} ->
        data
    end
  end
end
