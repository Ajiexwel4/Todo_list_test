class TasksController < ApplicationController
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.all          #.paginate(:page => params[:tasks_page], per_page: 8)  <---для постраничного вывода задач гемом will_paginate
    @projects = Project.where(user_id: current_user.id).all    #.paginate(:page => params[:page], per_page: 2)        #<---для постраничного вывода проектов гемом will_paginate

    #query1
    if params[:status]
      @tasks = @tasks.where(:status => (params[:status])).order('status ASC')
    end
    #query2
    if params[:id]
      @tasks = @tasks.where(:id => (params[:id])).order('id DESC')      
    end
    #query3
    if params[:project_id]
      @tasks = @tasks.where(:project_id => (params[:project_id]))
      @projects = @projects.order("name DESC")  
    end

  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)

    respond_to do |format|
      if @task.save
        flash[:success] = 'Task was successfully created.'
        format.html { redirect_to tasks_url }
        format.json { render :show, status: :created, location: @task }
       
      else
        flash[:danger] = 'There was a problem creating the Task.'
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        flash[:success] = 'Task was successfully updated.'
        format.html { redirect_to root_path }
        format.json { render :show, status: :ok, location: @task }
        
      else
        flash[:danger] = 'There was a problem updating the Task.'
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    respond_to do |format|
      flash[:success] = 'Task was successfully destroyed.'
      format.html { redirect_to tasks_url }
      format.json { head :no_content }
      
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def task_params
      params.require(:task).permit(:name, :status, :project_id, :deadline)
    end
   
end
