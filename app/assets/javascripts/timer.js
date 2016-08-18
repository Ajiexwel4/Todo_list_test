// таймер обратного отсчета (deadline)
$(document).ready().on("turbolinks:load", function() {
	var timer = function(id){ 

		var task_name_tr = $('.active').attr('data-task_id',id); //определение строк tr всех задач 
		var task_name = $(task_name_tr).children('.tasks_name');       //определение областей .tasks_name
		$(task_name, '#current_t').bind('click', function(){			
		var _this = $(this);
		//меню выбора даты из модального окна
		$("#datepicker").datepicker({
  			dateFormat: "yy/mm/dd",
  			altFormat: "yymmdd",
  			altField: "#alt-date"		
  			});
	
		// модальное окно
		$("#dialog-confirm").dialog({
	      	resizable: false,
	      	height: "auto",
	      	width: 400,
	      	modal: true,
	      	buttons: {
	        	"OK": function() {
			  			
			    var deadline = $("#datepicker").val();
			    
  				console.log(deadline);
          		
				var dl= deadline;
				var current_t = $(_this).parents('tr'); //определяем tr текущей задачи 
				var c_t_id = $(current_t).attr('data-task_id');
				$.ajax({
					url: "/tasks/"+c_t_id,
					type: 'PUT',
					data: {task: { deadline: dl}},
					success: function(data){
						$.ajax({
							url: "/tasks/"+c_t_id,
							type: 'GET',
							dataType: 'json',
							success: function(data, event){
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
									//console.log(this,current_t,deadline,c_t_id);
									//проверка вводимой даты со следующей за текущей датой
									var deadline = data.deadline;

									if (deadline === format_date_now) {
										//jquery-countdown плагин 
										$("#getting-started", current_t).countdown(deadline, function(event) {
											$(_this).text(event.strftime("%H %!H:hour,hours;"));
										});
									} else {	
										//jquery-countdown плагин
										$("#getting-started", current_t).countdown(deadline, function(event) {
											$("#getting-started",_this).text(event.strftime("%D %!D:day,days;"));
									  });
									} 
								} catch (e) { 
									alert('Check your deadline velue'); 
								  }	  	 							
							}
						});
					}
				});


          		$( this ).dialog( "close" );
           		},
          		Cancel: function() {
            		$( this ).dialog( "close" );
                }
            }
    	});   	
		   	
		   	
			
		});
	}
	timer();
	var all_timers = $("#getting-started").find('[data-task_deadline]', function(){
		condole.log(this);
	})
});