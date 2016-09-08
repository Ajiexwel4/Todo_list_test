class QueryController < ApplicationController
	def statuses_report
		#1: get all statuses, not repeating, alphabetically ordered
		#SQL: SELECT DISTINCT "tasks"."status", "tasks"."name" FROM "tasks" WHERE "tasks"."user_id" = $1 ORDER BY "tasks"."status" ASC
		@tasks = Task.where(user_id: current_user.id).select(:status, :name).distinct.order(status: :asc)
	end

	def count_task_project_desc
		#2: get the count of all tasks in each project, order by tasks count descending
		@projects = Project.where(user_id: current_user.id).order(name: :desc)
	end

	def count_task_project_name
		#3: get the count of all tasks in each project, order by projects names
		#SQL: SELECT "projects".* FROM "projects" WHERE "projects"."user_id" = $1 ORDER BY "projects"."name" ASC
		@projects = Project.where(user_id: current_user.id).order(name: :asc)		
	end

	def task_having_n
		#4: get the tasks for all projects having the name beginning with “N” letter
		#SQL:  SELECT "tasks".* FROM "tasks" INNER JOIN "projects" ON "projects"."id" = "tasks"."project_id" WHERE "tasks"."user_id" = $1 AND (projects.name like 'N%')
		@tasks = Task.where(user_id: current_user.id).joins(:project).where('projects.name like ?', 'N%')
	end

	def contain_a_mid
		#5: get the list of all projects containing the ‘a’ letter in the middle of the name, and show the tasks count near each project. Mention that there can exist projects without tasks and tasks with project_id=NULL
		#SQL: SELECT "projects".* FROM "projects" WHERE "projects"."user_id" = $1 AND (name like '%a%') and SELECT COUNT(*) FROM "tasks" WHERE "tasks"."project_id" = $1 
		@projects = Project.where(user_id: current_user.id).where('name like ?', '%a%') 	
	end

	def duplicate_name_asc
		#6: get the list of tasks with duplicate names. Order alphabetically
		
	end	


	def matches_name_status
		#7: get the list of tasks having several exact matches of both name and status, from the project ‘Garage’. Order by matches count
	end

	def pname_more_10tasks_done
		#8: get the list of project names having more than 10 tasks in status ‘completed’. Order by project_id
	end

end
