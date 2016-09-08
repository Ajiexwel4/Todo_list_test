# Task manager (test app for Ruby Garage)

## Deploy on Heroku - https://todolistrg.herokuapp.com
## Precondition data for testing: login- testuser@gmail.com, password- testuser
If you want to try this app, you should open it in heroku and sign up or sign in with precondition data for testing. 

In this app you can create/update/delete project, add tasks to your project, update/delete tasks, prioritize tasks into a project, click on name of task to choose deadline for your task, mark a task as 'done', click on name of project to hide and show tasks for this project.

## SQL Task

1: get all statuses, not repeating, alphabetically ordered
SQL: SELECT DISTINCT "tasks"."status", "tasks"."name" FROM "tasks" WHERE "tasks"."user_id" = $1 ORDER BY "tasks"."status" ASC
@tasks = Task.where(user_id: current_user.id).select(:status, :name).distinct.order(status: :asc)

2: get the count of all tasks in each project, order by tasks count descending
mySQL: SELECT projects.id, COUNT(tasks) AS t_counter FROM tasks RIGHT OUTER JOIN projects ON tasks.project_id = projects.id GROUP BY projects.id ORDER BY t_counter DESC

3: get the count of all tasks in each project, order by projects names
SQL: SELECT "projects".* FROM "projects" WHERE "projects"."user_id" = $1 ORDER BY "projects"."name" ASC
@projects = Project.where(user_id: current_user.id).order(name: :asc)

4:  get the tasks for all projects having the name beginning with “N” letter
SQL:  SELECT "tasks".* FROM "tasks" INNER JOIN "projects" ON "projects"."id" = "tasks"."project_id" WHERE "tasks"."user_id" = $1 AND (projects.name like 'N%')
@tasks = Task.where(user_id: current_user.id).joins(:project).where('projects.name like ?', 'N%')

5: get the list of all projects containing the ‘a’ letter in the middle of the name, and show the tasks count near each project. Mention that there can exist projects without tasks and tasks with project_id=NULL
SQL: SELECT "projects".* FROM "projects" WHERE "projects"."user_id" = $1 AND (name like '%a%') and SELECT COUNT(*) FROM "tasks" WHERE "tasks"."project_id" = $1 @projects = Project.where(user_id: current_user.id).where('name like ?', '%a%')

6: get the list of tasks with duplicate names. Order alphabetically
mySQL: SELECT id, name FROM tasks WHERE name IN (SELECT name FROM tasks GROUP BY name HAVING COUNT(*) >1) ORDER BY name

7: get the list of tasks having several exact matches of both name and status, from the project ‘Garage’.Order by matches count mySQL: SELECT tasks.name FROM tasks RIGHT OUTER JOIN projects ON tasks.projects_id = projects.id WHERE projects.name = 'Garage' GROUP BY tasks.name, tasks.status HAVING COUNT(tasks) >1 ORDER BY COUNT(tasks)

8: get the list of project names having more than 10 tasks in status ‘completed’. Order by project_id
mySQL: SELECT projects.name FROM tasks RIGTH OUTER JOIN projects ON tasks.projects_id = projects.id WHERE tasks.status = 'true' GROUP BY projects.id HAVING COUNT(tasks) >10 ORDER BY projects.id







