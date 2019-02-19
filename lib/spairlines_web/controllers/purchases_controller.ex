defmodule SpairlinesWeb.PurchasesController do
  use SpairlinesWeb, :controller
  alias Spairlines.{Repo,Spreedly,Spreedly.Transaction,Spreedly.CreditCard}

  def index(conn, _) do
    transactions = Transaction.all_by_date

    conn
    |> assign(:transactions, Enum.map(transactions, &SpairlinesWeb.PurchasesView.transaction_json/1))
    |> render("index.html")
  end

  def create(conn, %{"payment_method_token" => payment_method_token, "amount_in_cents" => amount_in_cents, "description" => description, "retain_on_success" => retain_on_success, "external" => external}) do
    spreedly_values = %{payment_method_token: payment_method_token, amount_in_cents: amount_in_cents, description: description, retain_on_success: retain_on_success}
    spreedly_config = conn.assigns.spreedly_config
    purchase_result = if external, do: Spreedly.external_purchase(spreedly_values, spreedly_config), else: Spreedly.purchase(spreedly_values, spreedly_config)

    case purchase_result do
      %HTTPoison.Response{status_code: 200, body: body} ->
        render conn, "create.json", transaction: process_spreedly_response(body, description, retain_on_success, external, amount_in_cents)
      %HTTPoison.Response{status_code: 422, body: body} ->
        %{"transaction" => %{"message" => error_message}} = body
        process_spreedly_response(body, description, false, external, amount_in_cents)
        conn
        |> put_status(422)
        |> json(%{ error: error_message, success: false })
    end
  end

  def create(conn, _) do
    json(conn, %{ success: false, error: "missing params" })
  end

  defp process_spreedly_response(body, description, retain_on_success, external, amount_in_cents) do
    {:ok, transaction} = body
      |> Transaction.spreedly_to_transaction(description, external, amount_in_cents)
      |> Repo.insert

    if (retain_on_success) do
      {:ok, _} = body
        |> CreditCard.spreedly_to_credit_card
        |> Repo.insert
    end

    transaction
  end
end
