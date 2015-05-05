function pageController ( vPageContent, vloading ) {
	this.lastPage = null;
	
	var pageContent = $( vPageContent );
	var loading = $( vloading );

	this.loadPage = function ( pageName, checkTable ) {
		if( this.lastPage != pageName ) {
			loading.show();
			this.lastPage = pageName;
			
			if( checkTable ) {
				$( ".tab_selected" ).removeClass( "tab_selected" );
				$( checkTable ).addClass( "tab_selected" );
			}
			
			pageFile =  "pages/" + pageName + ".html";
			
			pageContent.load( pageFile, function( responseTxt, statusTxt, xhr ) {
				loading.hide();
			});
		}
	}
}
