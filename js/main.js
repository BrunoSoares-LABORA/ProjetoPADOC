$( document ).ready( function() { 
	loadStoredItens();
	pageController = new pageController( "#pages_content", "#loading" );
	pageController.loadCurrentPage();
	
	$("#activity_view_background").click( function( e ) {
		var senderElement = e.target;
		var close_elem = [ 'close_view' ];
		if( close_elem.indexOf( senderElement.id ) >= 0 ) {
			$("#activity_view_background").fadeToggle( "fast", function() {
				$("#activity_view").html( '' );
			});
		}
	});
});

function loadStoredItens() {
	storedKeys = [ "siape_docente", "last_page" ];
	
	storedKeys.forEach( function( key ) {
		try {
			this[key] = JSON.parse( localStorage.getItem( key ) );
		} catch( e ){}
	});
}

function closeSearch() {
	localStorage.removeItem( "siape_docente" );
	delete siape_docente;
	$( ".vertical_menu a:first-child" ).trigger( "click" );
}
