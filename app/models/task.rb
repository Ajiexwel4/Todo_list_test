class Task < ApplicationRecord
	belongs_to :project
	belongs_to :user
	validates :name, presence: true

	# scope :task_status, -> {@tasks = @tasks.order('status DESC')}
	# scope :task_count_desc, -> {where('project_id = ?', project_id).order('name DESC')}
	# scope :task_count_pname, -> {where('poject_id = ?', project_id)} &&  scope :pname, -> {where('name = ?', Project[name])}
	# scope :task_all_N, -> {find('name = ?', 'N%')}
	# scope :project_include_a, -> {find('name = ?', '%\a%')}
	# scope :task_duplic, -> {where('name = ?'), @tasks.name}
	# scope :task_matches, -> {where('name = ?'), @tasks.status}
	# scope :project_name, -> {find(10).where('status = ?', @tasks.status['true'])}





end
