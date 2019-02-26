defmodule SpairlinesWeb.Router do
  use SpairlinesWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :setup do
    plug BasicAuth, use_config: {:spairlines, :setup_auth_config}
  end

  pipeline :config do
    plug SpairlinesWeb.Plugs.Config
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/setup", SpairlinesWeb do
    pipe_through :browser
    pipe_through :setup

    get "/", SetupController, :show
    post "/", SetupController, :create
    put "/", SetupController, :update
  end

  scope "/", SpairlinesWeb do
    pipe_through :browser
    pipe_through :config

    get "/", PageController, :index
    get "/flights/:id", FlightsController, :show
    get "/purchases", PurchasesController, :index
  end

  scope "/api", SpairlinesWeb do
    pipe_through :api
    pipe_through :config

    post "/purchases", PurchasesController, :create
    get "/credit-cards", CreditCardsController, :index
    delete "/credit-cards/:id", CreditCardsController, :delete
  end
end
