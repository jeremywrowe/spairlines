defmodule SpairlinesWeb.SetupController do
  use SpairlinesWeb, :controller
  alias Spairlines.{Repo,Spreedly,Spreedly.Config}

  def show(conn, _) do
    changeset = Config.first_or_build |> Config.changeset(%{})

    conn
    |> assign(:changeset, changeset)
    |> render("show.html")
  end

  def create(conn, %{"config" => config_params}) do
    updated_changeset = Config.first_or_build |> Config.changeset(config_params)

    case updated_changeset |> Repo.insert_or_update do
      {:ok, config} ->
        receiver_token = Spreedly.find_or_create_receiver(config)
        config |> Config.changeset(%{receiver_token: receiver_token}) |> Repo.update

        conn
        |> put_flash(:info, "Great! Everything is ready to rock!")
        |> redirect(to: "/")
      {:error, failed_changeset} ->
        conn
        |> put_flash(:error, "One or more of the fields was blank and can not be.")
        |> assign(:changeset, failed_changeset)
        |> render("show.html")
    end
  end

  def update(conn, params), do: create(conn, params)
end
