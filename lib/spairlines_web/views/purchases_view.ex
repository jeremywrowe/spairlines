defmodule SpairlinesWeb.PurchasesView do
  use SpairlinesWeb, :view

  @transaction_column_class "p-4 border-t border-grey-light font-mono text-xs whitespace-pre"

  def render("create.json", %{transaction: transaction}) do
    %{transaction: transaction_json(transaction)}
  end

  def transaction_column_class(transaction) do
    colored_text = if (transaction.success), do: "text-green bg-green-lightest", else: "text-red bg-red-lightest"
    "#{@transaction_column_class} #{colored_text}"
  end

  def spreedly_transaction_location(conn, transaction) do
    spreedly_config = conn.assigns.spreedly_config
    base_url = "https://dashboard.spreedly.com/organizations"
    "#{base_url}/#{spreedly_config.organization}/environments/#{spreedly_config.environment_key}/transactions/#{transaction.token}"
  end

  def amount_to_display(transaction) do
    "$#{transaction.amount / 100}"
  end

  def external_message(transaction) do
    if transaction.external, do: "Yes", else: "No"
  end

  def transaction_json(transaction) do
    %{
      id: transaction.id,
      owner: transaction.owner,
      token: transaction.token,
      email: transaction.email,
      amount: transaction.amount,
      description: transaction.description,
      success: transaction.success,
      message: transaction.message,
      external: transaction.external,
    }
  end
end
