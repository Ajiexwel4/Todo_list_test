// таймер обратного отсчета (deadline)
$(document).ready().on("turbolinks:load", function() {
	var timer = function(id){ 

		var task_name_tr = $('.active').attr('data-task_id',id); //определение строк tr всех задач 
		var task_name = task_name_tr.children('.tasks_name');       //определение областей .tasks_name
		$(task_name, '#current').bind('click', function(){			
		   	var deadline = prompt('Enter your deadline, for exemple:', '2016/12/31');
			
			//преобразование текущего системного времени +1 день в формат 'yyyy/mm/dd'
			var date_now = new Date();
			var current_date = date_now.getDate()+1;
				if (current_date < 10) { current_date = "0"+current_date; };
			var current_month = date_now.getMonth()+1;
				if (current_month < 10) { current_month = "0"+current_month; };
			var current_year = date_now.getFullYear();
			var format_date_now = (current_year + "/" + current_month + "/" + current_date);

			//тестировка и выполнение входящих данных		
			try {
				var current_t = $(this).parents('tr'); //определяем tr текущей задачи 
				
				//проверка вводимой даты со следующей за текущей датой
				if (deadline === format_date_now) {
					//jquery-countdown плагин 
					$("#getting-started", current_t).countdown(deadline, function(event) {
						$(this).text(event.strftime("%H %!H:hour,hours;"));
					});
				} else {	
					//jquery-countdown плагин
					$("#getting-started", current_t).countdown(deadline, function(event) {
						$(this).text(event.strftime("%D %!D:day,days;"));
				  });
				} 
			} catch (e) { 
				alert('Check your deadline velue'); 
			  }	  	 	
		});
	}
timer();
});