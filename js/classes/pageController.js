function pageController ( vPageContent, vloading ) {
	var lastPage;
	var pageContent = $( vPageContent );
	var loading = $( vloading );

	this.loadPage = function ( pageName, checkTable ) {
		if( this.lastPage != pageName ) {
			this.lastPage = pageName;
			loading.show();
			
			if( checkTable ) {
				$( ".tab_selected" ).removeClass( "tab_selected" );
				$( checkTable ).addClass( "tab_selected" );
			}
			
			pageFile =  "pages/" + pageName + ".html";
			
			pageContent.load( pageFile, function( responseTxt, statusTxt, xhr ) {
				loading.hide();
				
				/*if( statusTxt == "error" ) {
					alert( "Error: " + xhr.status + ": " + xhr.statusText );
				}*/
			});
		}
	}
}
