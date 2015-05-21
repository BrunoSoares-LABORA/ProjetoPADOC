function atividadeAdministrativa ( activityId, location, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId, location );
	var selfObject = this;
	
	this.activityType = "atividadeAdministrativa";
	
	if ( isCopy != true ) {
		this.copy = new atividadeAdministrativa( activityId, location, serializedObject, true );
	} else {
		this.copy = null;
	}
	
	try {
		this.tabela = serializedObject['tabela'];
		this.cha = serializedObject['cha'];
		this.periodo = serializedObject['periodo'];
		this.descricao = serializedObject['descricao'];
		this.emissor = serializedObject['emissor'];
		this.orgaoServido = serializedObject['orgao-servido'];
		this.portaria = serializedObject['portaria'];
	} catch( e ){}
	
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
			jsonDict["activity-type"] = this.activityType;
			jsonDict["copy"] = JSON.parse( this.copy.toJSON( false ) );
			jsonDict["removed"] = this.removed;
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
		
		var formTableTr = "<tr>" +
			"<td>" + this.tabela + "</td>" +
			"<td>" + this.periodo['inicio'] + "-" + this.periodo['fim'] + "</td>" +
			"<td>" + this.descricao + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td class='action_td'>" +
				this.getEditButton() +
				"<a href='javascript:void(0)'>" +
					"<img src='images/delete_icon.png' />" +
				"</a>" +
			"</td>" +
		"</tr>";
		
		return formTableTr;
	}
	
	this.createEditView = function ( titleView, editViewDiv, editPage ) {
		var displayProductId = parseInt( this.id ) + 1;
		titleView.html( "Editar Atividade Administrativa #" + displayProductId + "" );
		
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
		
		abstractActivity.prototype.save.call( this )
	}
}
