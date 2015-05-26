function pageController ( vPageContent, vloading ) {
	var selfObject = this;
	
	try {
		this.lastPage = last_page;
	} catch( e ) {
		this.lastPage = null;
	}
	this.firstLoad = true;
	this.pageContent = $( vPageContent ) || null;
	this.loading = $( vloading ) || null;

	this.loadPage = function ( pageName, checkTable ) {
		this.loading.show();
		this.setLastPage( pageName );
		
		if( checkTable ) {
			$( ".tab_selected" ).removeClass( "tab_selected" );
			$( checkTable ).addClass( "tab_selected" );
		}
		
		pageFile =  "pages/" + pageName + ".html";
		
		this.pageContent.load( pageFile, function( responseTxt, statusTxt, xhr ) {
			selfObject.loading.hide();
		});
	}
	
	this.setLastPage = function ( pageName ) {
		storeReturn = JSON.stringify( pageName );
		sessionStorage.setItem( "last_page", storeReturn );
		this.lastPage = pageName;
		this.firstLoad = false;
	}
	
	this.loadCurrentPage = function () {
		var pages = [ 
			"consulta_docente",
			"visualiza_relatorio",
			"ver_modificacoes"
		];
		
		var pageFounded = false;
		for( var page in pages ) {
			if( pages[page] == this.lastPage ) {
				var index = parseInt( page ) + 1;
				var buttonElement = ".vertical_menu a:nth-child(" + index + ")";
				
				$( buttonElement ).trigger( "click" );
				pageFounded = true;
			}
		}
		
		if( pageFounded == false ) {
			$( ".vertical_menu a:first-child" ).trigger( "click" );
		}
	}
}
