function dataRequest () {
	serverRequest.call( this );
	
	var selfObject = this;
	this.username;
	this.password;
	this.siape;
	this.periods;
	this.error = false;
	
	this.formatDate = function ( date ) {
		return $.datepicker.formatDate( 'dd/mm/yy', date );
	}
	
	this.setUsername = function() {
		this.username = $( "input[name=username]" ).first().val() || "";
	}
	
	this.setPassword = function() {
		this.password = $( "input[name=password]" ).first().val() || "";
	}
	
	this.setSiape = function() {
		this.siape = $( "input[name=siape]" ).first().val() || "";
	}
	
	this.setPeriods = function() {
		this.periods = [];
		
		FormStartDates = $( "input[name=start_date]" );
		FormEndDates = $( "input[name=end_date]" );
		
		startDates = [];
		FormStartDates.each( function( index ) {
			date = $( this ).datepicker('getDate');
			startDates.push( selfObject.formatDate( date ) );
		});
		
		endDates = [];
		FormEndDates.each( function( index ) {
			date = $( this ).datepicker('getDate');
			endDates.push( selfObject.formatDate( date ) );
		});
		
		for( i = 0; i < startDates.length; i++ ) {
			period = {
				"inicio" : startDates[i],
				"fim" : endDates[i]
			}
			this.periods.push( period );
		}
	}
	
	this.updateData = function() {
		try {
			this.setUsername();
			this.setPassword();
			this.setSiape();
			this.setPeriods();
		} catch( error ) {
			this.error = true;
		}
	}
	
	this.execDone = function () {
		if( this.requestStatus == 200 ) {
			storeReturn = JSON.stringify( this.requestReturn );
			localStorage.setItem( "siape_docente", storeReturn );
			
			siape_docente = this.requestReturn;
			
			$( ".vertical_menu a:nth-child(2)" ).trigger( "click" );
		}
	}
	
	this.toJSON = function () {
		this.updateData();
		
		jsonDict = {
			"usuario" : this.username,
			"senha" : this.password,
			"siape" : this.siape,
			"periodos" : this.periods
		}
		
		return JSON.stringify( jsonDict );
	}
}
