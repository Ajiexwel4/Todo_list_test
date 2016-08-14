//установка приоритета по клику 
var set_priority = function(){ 
	var current_priority = $('#current_t').children('td')[1]; // путь к ДОМ .prioryty  
	var priority_box = $(current_priority).children('div');   // дочерний элемент .prioryty  
	$(priority_box).bind('click', function(){
		$(this).addClass('set_priority');						
		$(this).bind('click', function(){
			$(this).removeClass('set_priority');
		});
	});		
}
