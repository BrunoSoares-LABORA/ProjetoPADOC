function serverRequest () {
	var selfObject = this;
	this.uri = "mockData/requestActivities.json";
	this.methodType = "GET";
	this.requestReturn = "";
	this.requestStatus = 200;
	
	this.exec = function () {
		var request = {
			url: this.uri,
			type: this.methodType,
			async: true,
			contentType: "application/json",
			accepts: "application/json",
			cache: false,
			dataType: 'json',
			data: this.toJSON(),
			error: function( xhr, status, error ) {
				selfObject.requestStatus = xhr.status;
			},
			success: function( result ){
				selfObject.requestReturn = result;
			}
		};
		
		var jqxhr = $.ajax( request );
		jqxhr.always( function() {
			selfObject.execDone();
		});
	}
	
	this.execDone = function () {}
	
	this.printRequest = function () {
		console.log( "-------------- Printing request --------------" );
		console.log( "Request Status: " + this.requestStatus );
		console.log( "Request Return: " + this.requestReturn );
		console.log( "----------------------------------------------" );
	}
	
	this.toJSON = function () {
		return "";
	}
}
