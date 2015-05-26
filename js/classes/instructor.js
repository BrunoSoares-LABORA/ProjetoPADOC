function instructor ( serializedObject, periodIndex ) {
	var selfObject = this;
	
	try {
		this.siape				= serializedObject['siape'];
		this.ufgIngressDate		= serializedObject['data-ingresso-na-ufg'];
		this.psIngressDate		= serializedObject['data-ingresso-servico-publico'];
	} catch( e ){}
	
	try {
		var dadosDoDocente = serializedObject['periodos'][periodIndex]['dados-do-docente'];
		
		this.name				= dadosDoDocente['nome'];
		this.unit				= dadosDoDocente['unidade'];
		this.titration			= dadosDoDocente['titulacao'];
		this.workRegime			= dadosDoDocente['regime-de-trabalho'];
		this.class				= dadosDoDocente['classe'];
		this.level				= dadosDoDocente['nivel'];
		this.hiredWorkload		= dadosDoDocente['ch-contratada'];
		this.email				= dadosDoDocente['email'];
	} catch( e ){}
	
	this.toJSON = function () {
		var jsonDict = {
			"nome"					: this.name,
			"unidade"				: this.unit,
			"titulacao"				: this.titration,
			"regime-de-trabalho"	: this.workRegime,
			"classe"				: this.class,
			"nivel"					: this.level,
			"ch-contratada"			: this.hiredWorkload,
			"ch-executada"			: this.getPerformedWorkload(),
			"email"					: this.email
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getPerformedWorkload = function () {
		var performedWorkload = 0;
		for( group in periods_activities ) {
			periods_activities[group].forEach( function( activity ) {
				if( activity.removed === false ) {
					try {
						if( typeof activity.cha != 'undefined' ) {
							var sumcha = parseInt( activity.cha );
							if( sumcha > 0 ) {
								performedWorkload += sumcha;
							}
						}
					} catch( e ) {}
					
					try {
						if( typeof activity.chac != 'undefined' ) {
							var sumchac = parseInt( activity.chac );
							if( sumchac > 0 ) {
								performedWorkload += sumchac;
							}
						}
					} catch( e ) {}
				}
			});
		}
		
		return performedWorkload;
	}
	
	this.updatePerformedWorkload = function () {
		try {
			var performedWl = this.getPerformedWorkload();
			
			if( performedWl < this.hiredWorkload ) {
				$( "#instructor_data" ).find( "span[data='performed_workload']" )
					.removeClass( "green_text" ).addClass( "red_text" );
			} else {
				$( "#instructor_data" ).find( "span[data='performed_workload']" )
					.removeClass( "red_text" ).addClass( "green_text" );
			}
			
			$( "#instructor_data" ).find( "span[data='performed_workload']" ).text( performedWl );
		} catch( e ) {}
	}
	
	this.getViewTable = function ( callback ) {
		ajaxOpt = {
			url: "view/instructor/view.html",
			dataType: "text",
			context: document.body,
			success: function( response ) {
				var page = $( response );
				
				var performedWl = selfObject.getPerformedWorkload();
				page.find( "span[data='siape']" ).text( selfObject.siape );				
				page.find( "span[data='ufg_ingress_date']" ).text( selfObject.ufgIngressDate );
				page.find( "span[data='ps_ingress_date']" ).text( selfObject.psIngressDate );
				page.find( "span[data='name']" ).text( selfObject.name );
				page.find( "span[data='unit']" ).text( selfObject.unit );
				page.find( "span[data='titration']" ).text( selfObject.titration );
				page.find( "span[data='work_regime']" ).text( selfObject.workRegime );
				page.find( "span[data='class']" ).text( selfObject.class );
				page.find( "span[data='level']" ).text( selfObject.level );
				page.find( "span[data='hired_workload']" ).text( selfObject.hiredWorkload );
				page.find( "span[data='performed_workload']" ).text( performedWl );
				page.find( "span[data='email']" ).text( selfObject.email );
				
				if( performedWl < selfObject.hiredWorkload ) {
					page.find( "span[data='performed_workload']" ).removeClass( "green_text" ).addClass( "red_text" );
				} else {
					page.find( "span[data='performed_workload']" ).removeClass( "red_text" ).addClass( "green_text" );
				}
				
				callback( page );
			}
		}
		
		$.ajax( ajaxOpt );
	}
}
