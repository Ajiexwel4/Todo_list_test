 Rails.application.routes.draw do
  devise_for :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :tasks
  resources :projects
  post 'projects/new'
  post 'tasks/new'
  root 'tasks#index'
end
