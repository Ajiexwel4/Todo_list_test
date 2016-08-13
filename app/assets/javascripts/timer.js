// таймер обратного отсчета (deadline)
	var timer = function(){ 
		
		var current_task_name = $('#current_t').children('td')[2]; //определяем ДОМ .task_name  
		$(current_task_name).bind('click', function(){
			var deadline = prompt('Enter your deadline, for exemple:', '2016/12/31');
			try {
				var current_t = $(this).parents('tr'); //определяем ДОМ #current_t (текущей задачи)
				
				//jquery-countdown плагин
				$("#getting-started", current_t).countdown(deadline, function(event) {
					$(this).text(event.strftime("%D %!D:day,days;"));
				});
			} catch (e) { 
			  	alert('Check your deadline velue'); 
			}
		});
	}

