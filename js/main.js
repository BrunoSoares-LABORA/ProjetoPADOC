$( document ).ready( function() {
	reloadData();
	pageController = new pageController( "#pages_content", "#loading" );
	pageController.loadCurrentPage();
	
	$( "#activity_view_background" ).click( function( e ) {
		var senderElement = e.target;
		var close_elem = [ 'close_view' ];
		if( close_elem.indexOf( senderElement.id ) >= 0 ) {
			$( "#activity_view_background" ).fadeToggle( "fast", function() {
				$( "#view_title" ).html( '' );
				$( "#activity_view" ).html( '' );
			});
		}
	});
	
	$( "select[name='selected_period']" ).change( function( e ) {
		var selectedPeriod = $( "select[name='selected_period'] option:selected" ).val();
		
		sessionStorage.setItem( "period_index", JSON.stringify( selectedPeriod ) );	
		reloadData();
		
		pageController.loadCurrentPage();
	});
	
	$( ".hidden_menu a" ).click( function( e ) {
		$( ".top_menu a" ).removeClass( "top_menu_oppened" );
		$( ".hidden_menu" ).hide();
	});
});

function reloadData() {
	loadStoredItens();
	definePeriod();
	loadInstructor();
	loadActivities();
}

function showLoadedInstructorContainers( show ) {
	if( show === true ) {
		$( ".top_menu" ).show();
		$( "#header" ).css( "margin-bottom", "0" );
		$( ".vertical_menu a" ).show();
		$( ".vertical_menu a:first-child" ).hide();
	} else {
		$( ".top_menu" ).hide();
		$( "#header" ).css( "margin-bottom", "10px" );
		$( ".vertical_menu a" ).hide();
		$( ".vertical_menu a:first-child" ).show();
	}
}

function loadStoredItens() {
	storedKeys = [ "siape_docente", "last_page", "period_index" ];
	
	storedKeys.forEach( function( key ) {
		try {
			this[key] = JSON.parse( sessionStorage.getItem( key ) );
		} catch( e ){}
	});
}

function definePeriod() {
	if( typeof period_index == 'object' || typeof period_index == 'undefined' ) {
		this["period_index"] = 0;
	}
	
	try {
		var periods = siape_docente['periodos'];
	} catch( e ) {
		return;
	}
	
	$( "select[name='selected_period']" ).find( "option" ).remove().end();
	var periodId = 0;
	periods.forEach( function( period ) {
		var optionData = { 
			value: periodId,
			text : period['periodo']['inicio'] + " - " + period['periodo']['fim']
		}
		
		var option = $("<option>", optionData );
		if( periodId == period_index ) {
			option.attr( 'selected', 'selected' );
		}
		$( "select[name='selected_period']" ).append( option );
		periodId++;
	});
}

function loadInstructor() {
	this["current_instructor"] = new instructor( siape_docente, period_index );
}

function loadActivities() {
	try {
		var period = siape_docente['periodos'][period_index];
	} catch( e ) {
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
		try {
			var activityItens = period[activity];
			activityItens.forEach( function( item ) {
				try {
					var location = {
						'period' : period_index,
						'activity' : activityItemId
					}
					
					var tempItem = new window[className]( activityItemId, location, item );
					periods_activities[activity].push( tempItem );
				} catch( e2 ) {
					jsonItem = JSON.stringify( item );
					console.log( "Não foi possível criar um objeto do item " + className + "." + jsonItem );
				}
				activityItemId++;
			});
		} catch( e ) {
			console.log( e );
			console.log( "Atividade não encontrada no período do docente: " + activity );
		}
	}
	
	showLoadedInstructorContainers( true );
}

function displayHiddenMenu( menuId ) {
	var id = parseInt( menuId ) - 1;
	$( ".hidden_menu:eq( " + id + ")" ).toggle();
	
	$( ".top_menu a" ).removeClass( "top_menu_oppened" );
	var visible = $( ".hidden_menu:eq( " + id + ")" ).is(':visible');
	if( visible == true ) {
		$( ".top_menu a:eq( " + id + ")" ).addClass( "top_menu_oppened" );
	}
}

function closeSearch() {
	sessionStorage.removeItem( "siape_docente" );
	delete siape_docente;
	
	sessionStorage.setItem( "period_index", JSON.stringify( 0 ) );
	this["period_index"] = 0;
	
	showLoadedInstructorContainers( false );
	$( ".vertical_menu a:first-child" ).trigger( "click" );
}

function setDataInput( dataObject ) {
	dataObject.datepicker( {
		dateFormat: "dd/mm/yy",
		showButtonPanel: true,
		currentText: "Hoje",
		closeText: "Fechar",
		dayNamesMin: [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab" ],
		monthNames: [
			"Janeiro",
			"Fevereiro",
			"Março",
			"Abril",
			"Maio",
			"Junho",
			"Julho",
			"Agosto",
			"Setembro",
			"Outubro",
			"Novembro",
			"Dezembro"
		]
	} );
		
	dataObject.mask("99/99/9999");
}