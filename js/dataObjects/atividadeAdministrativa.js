function atividadeAdministrativa ( activityId, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId );
	var selfObject = this;
	
	this.activityType = "atividadeAdministrativa";
	
	if ( isCopy != true ) {
		this.copy = new atividadeAdministrativa( activityId, serializedObject, true );
	} else {
		this.copy = null;
	}
	
	try {
		this.tabela = serializedObject['tabela'];
		this.cha = serializedObject['cha'];
		this.periodo = serializedObject['periodo'];
		this.descricao = serializedObject['descricao'];
		this.emissor = serializedObject['emissor'];
		this.orgao_servido = serializedObject['orgao-servido'];
		this.portaria = serializedObject['portaria'];
	} catch( e ){}
	
	this.toJSON = function () {
		jsonDict = {
			"activity-type" : this.activityType,
			"tabela" : this.tabela,
			"cha" : this.cha,
			"periodo" : this.periodo,
			"descricao" : this.descricao,
			"emissor" : this.emissor,
			"orgao-servido" : this.orgao_servido,
			"portaria" : this.portaria
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
	
	this.createEditView = function ( titleView, editViewDiv ) {
		titleView.html( "Editar Atividade Administrativa" );
		editViewDiv.append( "<h4>" + this.tabela + "</h4>" ); 
	}
}
