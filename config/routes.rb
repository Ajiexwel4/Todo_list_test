 Rails.application.routes.draw do
  devise_for :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :tasks
  resources :projects
  post 'projects/new'
  post 'tasks/new'
  root 'tasks#index'

  #Query
  get 'query/statuses_report'
  get 'query/count_task_project_desc'
  get 'query/count_task_project_name'
  get 'query/task_having_n'
  get 'query/contain_a_mid'
  get 'query/duplicate_name_asc'
  get 'query/matches_name_status'
  get 'query/pname_more_10tasks_done'

end
