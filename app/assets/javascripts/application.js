// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require jquery-ui
//= require_tree .

jQuery(function($){

	//отображение и ищезновение кнопок в строке задач
	$('.active')
	.bind('mouseenter', function(){
		$(this).attr('id','current_t');
		$('#current_t .switch').hide();
		$('#current_t .t_onlink').show();
	 	})
	.bind('mouseleave', function(){
		$(this).removeAttr('id','current_t');
		$('.t_onlink').hide();
		$('.switch').show();
	});
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
	 	
	//выпадающее меню для выбора проекта
	// $('.table_head_pname .dropdown-toggle').click(function() {
	// $('.table_head_pname .dropdown-menu').toggle();
	// });

});

//ajax запросы в новой функции-обертке
$(document).ready(function(){
  
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
	
	//определение текущей задачи
	var current_task_tr = $(this).parents('tr')[0];
	
	//определение текущего проекта
	var project_tr = $(this).parents('tbody').siblings('thead').children('tr')[0];
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

//добавление нового проекта 
$(".btn-primary").on('click', function() {
	var p_name = prompt('Type a name for new project:');
	$.ajax({
		url: "/projects",
		type: "POST",
		data: { project: {name: p_name} },
		success: function(result) {
			console.log(result);
			return false;
		}		
	});
});

//добавление статуса чекбокса в бд
$("input[type='checkbox']").on('click', function(){ 
	var current_task_tr = $(this).parents('tr')[0];	
	
	$.ajax({
		url: '/tasks/' + $(current_task_tr).attr('data-task_id'),
		type: "PUT",
		data: { task: { status: true } },
		success: function(result) {
			console.log(result);
			return false;
		}		
	});	
}).on('click', function(){
	var current_task_tr = $(this).parents('tr')[0];	
		
	$.ajax({
		url: '/tasks/' + $(current_task_tr).attr('data-task_id'),
		type: "PUT",
		data: { task: { status: false } },
		success: function(result) {
			console.log(result);
			return false;
		}		
	});
});


});