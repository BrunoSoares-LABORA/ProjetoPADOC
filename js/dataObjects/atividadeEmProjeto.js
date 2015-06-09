function atividadeEmProjeto ( activityId, location, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId, location );
	var selfObject = this;
	
	this.activityType = "atividadeEmProjeto";
	this.title = "Atividade em Projeto";
	this.isCopy = ( isCopy === true ) ? true : false;
	this.defineObjectCommonAttr( serializedObject );
	
	try {
		this.tituloDoProjeto = serializedObject['titulo-do-projeto'];
	} catch( e ) {
		this.tituloDoProjeto = null;
	}
	
	try {
		this.tabela = serializedObject['tabela'];
	} catch( e ) {
		this.tabela = null;
	}
	
	try {
		this.unidadeResponsavel = serializedObject['unidade-responsavel'];
	} catch( e ) {
		this.unidadeResponsavel = null;
	}
	
	try {
		this.tipo = serializedObject['tipo'];
	} catch( e ) {
		this.tipo = null;
	}
	
	try {
		this.situacao = serializedObject['situacao'];
	} catch( e ) {
		this.situacao = null;
	}
	
	try {
		this.funcao = serializedObject['funcao'];
	} catch( e ) {
		this.funcao = null;
	}
	
	try {
		this.financiado = serializedObject['financiado'];
	} catch( e ) {
		this.financiado = null;
	}
	
	try {
		this.cha = serializedObject['cha'];
	} catch( e ) {
		this.cha = null;
	}
	
	try {
		this.periodo = serializedObject['periodo'];
	} catch( e ){
		this.periodo = {
			'inicio' : null,
			'fim' : null
		}
	}
	
	this.toJSON = function ( fullSave ) {
		var jsonDict = {
			"titulo-do-projeto" : this.tituloDoProjeto,
			"tabela" : this.tabela,
			"unidade-responsavel" : this.unidadeResponsavel,
			"tipo" : this.tipo,
			"situacao" : this.situacao,
			"funcao" : this.funcao,
			"financiado" : this.financiado,
			"cha" : this.cha,
			"periodo" : this.periodo
		}
		
		if( fullSave === true ) {
			jsonDict["copy"] = JSON.parse( this.copy.toJSON( false ) );
			jsonDict["removed"] = this.removed;
			jsonDict["isNew"] = this.isNew;
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getTableHeader = function() {
		var tableHeader = $( "<tr class='table_header'>" +
			"<td>Título do projeto</td>" +
			"<td width='200px'>Tipo</td>" +
			"<td width='100px'>Carga horária</td>" +
			"<td width='80px'>Ações</td>" +
		"</tr>" );
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = $( "<tr activityId='" + this.id + "'>" +
			"<td>" + this.tituloDoProjeto + "</td>" +
			"<td>" + this.tipo + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td class='action_td'>" +
				this.getEditButton() +
				this.getDeleteButton() +
			"</td>" +
		"</tr>" );
		
		return formTableTr;
	}
	
	this.createEditView = function ( editViewDiv, editPage ) {
		editPage.find( "textarea[name='titulo_do_projeto']" ).val( this.tituloDoProjeto );
		editPage.find( "input[name='tabela']" ).attr( "value", this.tabela );
		editPage.find( "input[name='unidade_responsavel']" ).attr( "value", this.unidadeResponsavel );
		editPage.find( "input[name='tipo']" ).attr( "value", this.tipo );
		editPage.find( "input[name='situacao']" ).attr( "value", this.situacao );
		editPage.find( "input[name='funcao']" ).attr( "value", this.funcao );
		editPage.find( "input[name='financiado']" ).attr( "value", this.financiado );
		editPage.find( "input[name='cha']" ).attr( "value", this.cha );
		
		var periodoInicioInput = editPage.find( "input[name='periodo_inicio']" );
		periodoInicioInput.attr( "value", this.periodo['inicio'] );
		setDataInput( periodoInicioInput );
		
		var periodoFimInput = editPage.find( "input[name='periodo_fim']" );
		periodoFimInput.attr( "value", this.periodo['fim'] );
		setDataInput( periodoFimInput );
		
		editViewDiv.append( editPage );
	}
	
	this.save = function ( editPage ) {
		var newTituloDoProjeto		= editPage.find( "textarea[name='titulo_do_projeto']" ).val();
		var newTabela				= editPage.find( "input[name='tabela']" ).attr( "value" );
		var newUnidadeResponsavel	= editPage.find( "input[name='unidade_responsavel']" ).attr( "value" );
		var newTipo					= editPage.find( "input[name='tipo']" ).attr( "value" );
		var newSituacao				= editPage.find( "input[name='situacao']" ).attr( "value" );
		var newFuncao				= editPage.find( "input[name='funcao']" ).attr( "value" );
		var newFinanciado			= editPage.find( "input[name='financiado']" ).attr( "value" );
		var newCha					= parseInt( editPage.find( "input[name='cha']" ).attr( "value" ) ) || 0;
		var newPeriodo				= {
			'inicio' : editPage.find( "input[name='periodo_inicio']" ).attr( "value" ),
			'fim' : editPage.find( "input[name='periodo_fim']" ).attr( "value" )
		}
		
		this.tituloDoProjeto 		= newTituloDoProjeto;
		this.tabela 				= newTabela;
		this.unidadeResponsavel 	= newUnidadeResponsavel;
		this.tipo 					= newTipo;
		this.situacao 				= newSituacao;
		this.funcao 				= newFuncao;
		this.financiado 			= newFinanciado;
		this.cha 					= newCha;
		this.periodo 				= newPeriodo;
		
		this._save();
	}
}
