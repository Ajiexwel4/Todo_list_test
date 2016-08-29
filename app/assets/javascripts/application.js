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
	//убирает с экрана сообщение о действии
	$('.alert').fadeOut(3000);

	//меняет фон и виделение текущей позиции для завершенных задач 	 	
	if ($("input[type='checkbox']:checked")){	
		var tr = $("input[type='checkbox']:checked").parents('tr');
		$(tr).addClass('success').css("background","#D6FFD6");
	}
	
	//скрытие области введения даты в меню выбора даты 
	$("#dialog-confirm").hide();

	//клик на название проекта скрывает задачи этого проэкта
	$('.pname').click(function(){
		var tasks = $(this).parents('thead').siblings('tbody');
		$(tasks).animate({height: 'toggle'});
	});	

	//отображение переключателя страниц с задачами при наведении курсора
	// $('.row_paginate')
	// .bind('mouseenter', function(){
	// 	var pagin_div = $(this).children('div').show();		
	// 	})
	// .bind('mouseleave', function(){
	// 	$(this).children('div').hide();				
	// });
	
	//отображение пареключения странис с проэктами
	// $('.will_paginate_projects').show();
});




