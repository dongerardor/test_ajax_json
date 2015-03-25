$(function(){

	var db = [];

	function recuperarDatos (){
		$.ajax({
			url: "data.json.txt",
		}).done(function( datos ) {
			var datos = jQuery.parseJSON( datos );
			buildDB(datos);
			showDB();
		});
	}

	function buildDB(datos){
		for (var i = 0; i<datos.length; i++){
			var objItem = {};
			objItem.name = datos[i].name.first + datos[i].name.last;
			objItem.date = datos[i].registered;
			db.push ( objItem );
		}
	}


	function showDB(){

		var table = $("#table");
		table.find("tr").remove();
		for (var i in db){
			table.append("<tr class='tupla'><td class='name'>" + db[i].name + "</td><td class='date'>" + db[i].date + "</td></tr>");
		}
	}

/*	function daysInMonth(month,year) {
		var date = new Date(year, month, 0).getDate();
		console.log(date);
   		return date;
	}*/

	function getDaysInMonth(month, year) {
    	var date = new Date(year, month, 1);
    	var days = [];
    	while (date.getMonth() === month) {
    	   days.push(new Date(date));
    	   date.setDate(date.getDate() + 1);
    	}
     return days.length;
	}

	$('body').on('click', '.date', function(event) {
		var date = new Date (this.innerHTML);
		var month = date.getMonth();
		var year = date.getYear();
		var numbersOfMonthDays = getDaysInMonth(month, year);
		$("#displayNumbersOfDays").text(numbersOfMonthDays, date);
	});

	$("#btnNombre").click(function(evt){
		resetTable();

		var nombreTextField = $("#nombre").val();
		var tableRow = $( "td:contains('" + nombreTextField + "')" ).parent();
		var strDate = $( "td:contains('" + nombreTextField + "')" ).parent().find(".date").text();
		var date = new Date(strDate);
		tableRow.addClass("resalte");

		var differenceOfDays = getDifferenceOfDays(nombreTextField, date);
	});

	function getDifferenceOfDays(nombrePersona, date){
		var now = new Date();
		var then = date;
		var difference = now - then;
		var hours=parseInt(difference/(1000*60*60*24));
	}

	function orderTableAsc (){
		db.sort(function(a, b){
		    if(a.name < b.name) return -1;
		    if(a.name > b.name) return 1;
	    return 0;
		})
	}

	function resetTable(){
		$("tr").removeClass("resalte");
	}

	$("#ordenar").click(function(evt){
		orderTableAsc();
		showDB();
	})

	recuperarDatos();

})