Rails.application.routes.draw do



  get 'friendship/user_id:integer'

  get 'friendship/friend_id:integer'

  get 'friendship/create'

  get 'friendship/destroy'

  resources :password_resets, only: [:edit, :create, :update, :new]
  resources :user_sessions, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show] do 
    resources :comments, only: [:create, :destroy]
  end
  resources :landing, only:[:index]
  resources :rules, only: [:show, :index]
  resources :leaderboard, only: [:index, :show]
  resources :games, only: [:new, :show]
  get "signup" => "users#new", :as => :signup
  get "games/:id/play" => "games#play"
  get 'login' => 'user_sessions#new', :as => :login
  post 'logout' => 'user_sessions#destroy', :as => :logout
  root 'landing#index'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
