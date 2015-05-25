function instructor ( serializedObject ) {
	var selfObject = this;
	
	try {
		this.siape				= serializedObject['siape'];
		this.ufgIngressDate		= serializedObject['data-ingresso-na-ufg'];
		this.psIngressDate		= serializedObject['data-ingresso-servico-publico'];
	} catch( e ){}
	
	try {
		var dadosDoDocente = serializedObject['periodos'][0]['dados-do-docente'];
		
		this.name				= dadosDoDocente['nome'];
		this.unit				= dadosDoDocente['unidade'];
		this.titration			= dadosDoDocente['titulacao'];
		this.workRegime			= dadosDoDocente['regime-de-trabalho'];
		this.class				= dadosDoDocente['classe'];
		this.level				= dadosDoDocente['nivel'];
		this.hiredWorkload		= dadosDoDocente['ch-contratada'];
		this.performedWorkload	= dadosDoDocente['ch-executada'];
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
			"ch-executada"			: this.performedWorkload,
			"email"					: this.email
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getViewTable = function ( callback ) {
		ajaxOpt = {
			url: "view/instructor/view.html",
			dataType: "text",
			context: document.body,
			success: function( response ) {
				var page = $( response );
				
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
				page.find( "span[data='performed_workload']" ).text( selfObject.performedWorkload );
				page.find( "span[data='email']" ).text( selfObject.email );
				
				callback( page );
			}
		}
		
		$.ajax( ajaxOpt );
	}
}
