# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Project.delete_all
Task.delete_all

Project.create(id: 1, name: 'Complate the task for Ruby Garage')
Task.create(id: 1, name: 'Open this mock-up in Adobe Fireworks', status: true, project_id: 1)
Task.create(id: 2, name: 'Attentively check the file', status: false, project_id: 1)
Task.create(id: 3, name: 'Write HTML & CSS', status: false, project_id: 1)
Task.create(id: 4, name: 'Add Javascript to implement adding / editing / removing for todo items
  and lists taking into account as more use cases as posible', status: false, project_id: 1)

Project.create(id: 2, name: 'For Home')
Task.create(id: 5, name: 'Buy a milk', status: false, project_id: 2)
Task.create(id: 6, name: 'Call Mam', status: false, project_id: 2)
Task.create(id: 7, name: 'Clean the room', status: false, project_id: 2)
Task.create(id: 8, name: 'Repair the DVD Playe', status: false, project_id: 2)