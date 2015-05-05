$( document ).ready( function() { 
	pageController = new pageController( "#pages_content", "#loading" );
	$( ".vertical_menu a:first-child" ).trigger( "click" );
	
	loadStoredItens();
});

function loadStoredItens() {
	storedKeys = [ "siape_docente" ];
	
	storedKeys.forEach( function( key ) {
		try {
			this[key] = JSON.parse( localStorage.getItem( key ) );
		} catch( e ){}
	});
}
