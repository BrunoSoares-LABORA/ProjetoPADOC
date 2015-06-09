function atividadeDeExtensao ( activityId, location, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId, location );
	var selfObject = this;
	
	this.activityType = "atividadeDeExtensao";
	this.title = "Atividade de Extensão";
	this.isCopy = ( isCopy === true ) ? true : false;
	this.defineObjectCommonAttr( serializedObject );
	
	try {
		this.tabela = serializedObject['tabela'];
	} catch( e ){
		this.tabela = null;
	}
	
	try {
		this.cha = serializedObject['cha'];
	} catch( e ){
		this.cha = null;
	}
	
	try {
		this.descricao = serializedObject['descricao'];
	} catch( e ){
		this.descricao = null;
	}
	
	try {
		this.clientela = serializedObject['clientela'];
	} catch( e ){
		this.clientela = null;
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
			"tabela" : this.tabela,
			"cha" : this.cha,
			"periodo" : this.periodo,
			"descricao" : this.descricao,
			"clientela" : this.clientela
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
			"<td>Código da extensão</td>" +
			"<td>Clientela</td>" +
			"<td width='100px'>Carga horária</td>" +
			"<td width='80px'>Ações</td>" +
		"</tr>" );
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = $( "<tr activityId='" + this.id + "'>" +
			"<td>" + this.tabela + "</td>" +
			"<td>" + this.clientela + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td class='action_td'>" +
				this.getEditButton() +
				this.getDeleteButton() +
			"</td>" +
		"</tr>" );
		
		return formTableTr;
	}
	
	this.createEditView = function ( editViewDiv, editPage ) {
		editPage.find( "textarea[name='descricao']" ).val( this.descricao );
		editPage.find( "input[name='tabela']" ).attr( "value", this.tabela );
		editPage.find( "input[name='clientela']" ).attr( "value", this.clientela );
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
		var newDescricao	= editPage.find( "textarea[name='descricao']" ).val();
		var newTabela		= editPage.find( "input[name='tabela']" ).attr( "value" );
		var newClientela	= editPage.find( "input[name='clientela']" ).attr( "value" );
		var newCha			= parseInt( editPage.find( "input[name='cha']" ).attr( "value" ) ) || 0;
		var newPeriodo		= {
			'inicio' : editPage.find( "input[name='periodo_inicio']" ).attr( "value" ),
			'fim' : editPage.find( "input[name='periodo_fim']" ).attr( "value" )
		}
		
		this.descricao	= newDescricao;
		this.tabela		= newTabela;
		this.clientela	= newClientela;
		this.cha		= newCha;
		this.periodo	= newPeriodo;
		
		this._save();
	}
}
