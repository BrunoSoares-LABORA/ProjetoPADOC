function atividadeAdministrativa ( activityId, location, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId, location );
	var selfObject = this;
	
	this.activityType = "atividadeAdministrativa";
	this.title = "Atividade Administrativa";
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
		this.emissor = serializedObject['emissor'];
	} catch( e ){
		this.emissor = null;
	}
	
	try {
		this.orgaoServido = serializedObject['orgao-servido'];
	} catch( e ){
		this.orgaoServido = null;
	}
	
	try {
		this.portaria = serializedObject['portaria'];
	} catch( e ){
		this.portaria = null;
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
			"emissor" : this.emissor,
			"orgao-servido" : this.orgaoServido,
			"portaria" : this.portaria
		}
		
		if( fullSave === true ) {
			jsonDict["copy"] = JSON.parse( this.copy.toJSON( false ) );
			jsonDict["removed"] = this.removed;
			jsonDict["isNew"] = this.isNew;
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getTableHeader = function() {
		var tableHeader = "<tr class='table_header'>" +
			"<td>Código da atividade</td>" +
			"<td>Período</td>" +
			"<td>Descrição</td>" +
			"<td width='100px'>Carga horária</td>" +
			"<td width='80px'>Ações</td>" +
		"</tr>";
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var descricao = this.descricao.substr( 0, 50 );
		if( descricao.length != this.descricao.length ) {
			descricao += "...";
		}
		
		var formTableTr = "<tr activityId='" + this.id + "'>" +
			"<td>" + this.tabela + "</td>" +
			"<td>" + this.periodo['inicio'] + "-" + this.periodo['fim'] + "</td>" +
			"<td>" + this.descricao + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td class='action_td'>" +
				this.getEditButton() +
				this.getDeleteButton() +
			"</td>" +
		"</tr>";
		
		return formTableTr;
	}
	
	this.createEditView = function ( editViewDiv, editPage ) {
		editPage.find( "textarea[name='descricao']" ).val( this.descricao );
		editPage.find( "input[name='tabela']" ).attr( "value", this.tabela );
		editPage.find( "input[name='emissor']" ).attr( "value", this.emissor );
		editPage.find( "input[name='orgao_servido']" ).attr( "value", this.orgaoServido );
		editPage.find( "input[name='portaria']" ).attr( "value", this.portaria );
		editPage.find( "input[name='cha']" ).attr( "value", this.cha );
		editPage.find( "input[name='periodo_inicio']" ).attr( "value", this.periodo['inicio'] );
		editPage.find( "input[name='periodo_fim']" ).attr( "value", this.periodo['fim'] );
		editViewDiv.append( editPage );
	}
	
	this.save = function ( editPage ) {
		var newDescricao	= editPage.find( "textarea[name='descricao']" ).val();
		var newTabela		= editPage.find( "input[name='tabela']" ).attr( "value" );
		var newEmissor		= editPage.find( "input[name='emissor']" ).attr( "value" );
		var newOrgaoServido	= editPage.find( "input[name='orgao_servido']" ).attr( "value" );
		var newPortaria		= editPage.find( "input[name='portaria']" ).attr( "value" );
		var newCha			= editPage.find( "input[name='cha']" ).attr( "value" );
		var newPeriodo		= {
			'inicio' : editPage.find( "input[name='periodo_inicio']" ).attr( "value" ),
			'fim' : editPage.find( "input[name='periodo_fim']" ).attr( "value" )
		}
		
		this.descricao		= newDescricao;
		this.tabela			= newTabela;
		this.emissor		= newEmissor;
		this.orgaoServido	= newOrgaoServido;
		this.portaria		= newPortaria;
		this.cha			= newCha;
		this.periodo		= newPeriodo;
		
		this._save();
	}
}
