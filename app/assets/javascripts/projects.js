$(document).ready().on("turbolinks:load", function() {
	
	//отображение и ищезновение кнопок в строке названия проекта
	$('.table_head_pname')
	.bind('mouseenter', function(){
		$(this).attr('id','current_p');
		$('#current_p .switch').hide();
		$('#current_p .p_onlink').show();
	 	})
	.bind('mouseleave', function(){
		$(this).removeAttr('id','current_p');
		$('.p_onlink').hide();
		$('.switch').show();
	});

	//редактирование названия проекта
	$(".edit_p").on('click', function() {
		var p_name = prompt('Type a new name for this project:');
		var current_project_tr = $(this).parents('tr')[0];
		$.ajax({
			url: '/projects/' + $(current_project_tr).attr('data-project_id'),
			type: "PUT",
			data: { project: {name: p_name} },
			success: function(result) {
				console.log(result);
				return false;
			}		
		});
	});

	// удаление проекта
  	$('.delete_p').click(function(){
  		var current_project_tr = $(this).parents('tr')[0];
 		if(confirm("Do you want to delete this project?")) {
			$.ajax({
				url: '/projects/' + $(current_project_tr).attr('data-project_id'),
				type: 'POST',
				data: { _method: 'DELETE' },
				//при успешном действии выводит результат(result) в консоль
				success: function(result){
					$(current_project_tr).fadeOut(200);
					console.log(result);		
					return false;	
				}
			});  	
		}   
  	});

  	//добавление нового проекта 
	$("#add_project").on('click', function() {
		var p_name = prompt('Type a name for new project:');
		var us_id = $("user").attr('data-user_id'); 
		$.ajax({
			url: "/projects",
			type: "POST",
			data: { project: {name: p_name, user_id: us_id} },
			success: function(result) {
				console.log(result);
				return false;
			}		
		});
	});


});