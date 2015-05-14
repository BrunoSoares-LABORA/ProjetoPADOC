$( document ).ready( function() { 
	loadStoredItens();
	pageController = new pageController( "#pages_content", "#loading" );
	pageController.loadCurrentPage();
	
	loadActivities();
	
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

function loadActivities() {
	try {
		var periods = siape_docente['periodos'];
	} catch( e ) {
		console.log( "Docente não informado.." );
		return;
	}
	
	this["activities_name"] = {
		"atividades-de-ensino" : "atividadeDeEnsino",
		"atividades-de-orientacao" : "atividadeDeOrientacao",
		"atividades-em-projetos" : "atividadeEmProjeto",
		"atividades-de-extensao" : "atividadeDeExtensao",
		"atividades-de-qualificacao" : "atividadeDeQualificacao",
		"atividades-academicas-especiais" : "atividadeAcademicaEspecial",
		"atividades-administrativas" : "atividadeAdministrativa",
		"produtos" : "produto"
	};
	
	this["periods_activities"] = {}
	for ( var activity in activities_name ) {
		var className = String( activities_name[activity] );
		periods_activities[activity] = [];
		var activityItemId = 0;
		
		periods.forEach( function( period ) {
			try {
				var activityItens = period[activity];
				
				activityItens.forEach( function( item ) {
					try {
						var tempItem = new window[className]( activityItemId, item );
						periods_activities[activity].push( tempItem );
					} catch( e2 ) {
						jsonItem = JSON.stringify( item );
						console.log( "Não foi possível criar um objeto do item " + className + "." + jsonItem );
					}
					activityItemId++;
				});
			} catch( e ) {
				console.log( "Atividade não encontrada no período do docente: " + activity );
			}
		});
	}
}

function closeSearch() {
	localStorage.removeItem( "siape_docente" );
	delete siape_docente;
	$( ".vertical_menu a:first-child" ).trigger( "click" );
}
