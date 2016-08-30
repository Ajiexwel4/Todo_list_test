$(document).ready().on("turbolinks:load", function() {
	

	//отображение и ищезновение кнопок в строке задач
	$('.active')
	.bind('mouseenter', function(){
		$(this).attr('id','current_t');
		$('#current_t .switch').hide();
		$('#current_t .t_onlink').show();
		// set_priority();  //фича не по заданию
	 	})
	.bind('mouseleave', function(){
		$(this).removeAttr('id','current_t');
		$('.t_onlink').hide();
		$('.switch').show();
	});

	//добавление новой задачи к текущему проекту
	$(".btn-success").on('click', function() {
		var project_tr = $(this).parents('tr').siblings()[0];
		var current_project = $(project_tr).attr('data-project_id');
		var t_input = $(project_tr).siblings().children().children('input');
		var t_name = t_input.val();
		 
		if( t_name.length != 0) {		
			$.ajax({
				url: "/tasks",
				type: "POST",
				data: { task: {name: t_name, status: false, project_id: current_project } },
				success: function(result) {
					console.log(result);
					return false;
				}		
			})		
		$('t_input').text(''); //очищение поля input
		} else { return false; }
	});

	//редактирование названия задачи
	$(".edit_t").on('click', function() {
		var t_name = prompt('Type a new name for this task:');		
		var current_task_tr = $(this).parents('tr')[0]; //определение текущей задачи
		var project_tr = $(this).parents('tbody').siblings('thead').children('tr')[0]; 	//определение текущего проекта
		var current_project = $(project_tr).attr('data-project_id');

		$.ajax({
			url: '/tasks/' + $(current_task_tr).attr('data-task_id'),
			type: "PUT",
			data: { task: {name: t_name, status: false, project_id: current_project } },
			success: function(result) {
				console.log(result);
				return false;
			}		
		});
	});

	//удаление задачи 
  	$('.delete_t').click(function(){
	  	var current_task_tr = $(this).parents('tr')[0];
	 	if(confirm("Do you want to delete this task?")) {
			$.ajax({
				url: '/tasks/' + $(current_task_tr).attr('data-task_id'),
				type: 'POST',
				data: { _method: 'DELETE' },
				//при успешном действии выводит результат(result) в консоль
				success: function(result){
					$(current_task_tr).fadeOut(200);
					console.log(result);
					return false;
				}
			});  	
		}    
	});

	// добавление статуса задачи через чекбокс в бд
	$("input[type='checkbox']").on('click', function(){
		var current_task_tr = $(this).parents('tr')[0];
		if($(this).is(':checked')){	
			$.ajax({
				url: '/tasks/' + $(current_task_tr).attr('data-task_id'),
				type: "PUT",
				data: { task: { status: true } },
				success: function(result) {
					console.log(result);
					return false;
				}					
			});	

		} else {
			var current_task_tr = $(this).parents('tr')[0];	
			$.ajax({
				url: '/tasks/' + $(current_task_tr).attr('data-task_id'),
				type: "PUT",
				data: { task: { status: false } },
				success: function(result) {
					console.log(result);
					return false;
				}		
			})		  
		}
	});

	// приоритeт задач
	var up_down = function(){	

	// перемещение между задачами вверх
		$('.up').on('click', function(){
			var current = $('#current_t');
			var prev_task = $(current).prev()[0];
			// var first_t = $('.active').siblings()[0];
			console.log( prev_task);
			if (prev_task) {
				$(prev_task).before($(current).removeAttr('id','current_t'));
				$('.switch').show(); $('.t_onlink').hide();				
			}

		});

		// перемещение между задачами ввниз			
		$('.down').on('click', function(){
			var current = $('#current_t');
			var next_task = $('#current_t').next()[0];
			var not_t = $('.active').siblings('.not_t');
			console.log(not_t, next_task);
			if ((not_t[0] == next_task) || (not_t[1] == next_task)) {
			} else {
				$('.switch').show(); $('.t_onlink').hide();
				$(next_task).after($(current).removeAttr('id','current_t'));		
			}
		});
	}
	up_down();
});