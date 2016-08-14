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

$(document).ready().on("turbolinks:load", function() {
	//меняет фон и виделение текущей позиции для завершенных задач 	 	
	if ($("input[type='checkbox']:checked")){	
		var tr = $("input[type='checkbox']:checked").parents('tr');
		$(tr).addClass('success').css("background","#D6FFD6");
	}

	//выпадающее меню с названиями проектов
	$('.dropdown-toggle').dropdown('toggle');
	
	$(".dropdown-menu li a").bind('click', function(){
		var id = $(this).attr('data-p_id');
		// var current_project_tr = $(this).parents('tr');
  		// var project_th = $(this).parent().parent().siblings('div');
  		var project_tr = $(this).parents('.dropdown').children('div'); // <%= project.name %>
  // 		$.ajax({
		// 	url: '/projects/' + id,
		// 	type: "GET",
		// 	data: { project: { name } },
		// 	dataType: 'json',
		// 	success: function(data) {
		// 		var a = JSON.parse(data);
		// 		// $(project_tr).html(data);
		// 		console.log(a);			
		// 	}		
		// });

  	});
	
	
});




