function atividadeEmProjeto ( serializedObject ) {
	abstractActivity.call( this );
	var selfObject = this;
	
	this.activityType = "atividadeEmProjeto";
	try {
		this.tituloDoProjeto = serializedObject['titulo-do-projeto'];
		this.tabela = serializedObject['tabela'];
		this.unidadeResponsavel = serializedObject['unidade-responsavel'];
		this.tipo = serializedObject['tipo'];
		this.situacao = serializedObject['situacao'];
		this.funcao = serializedObject['funcao'];
		this.financiado = serializedObject['financiado'];
		this.cha = serializedObject['cha'];
		this.periodo = serializedObject['periodo'];
	} catch( e ){}
	
	this.toJSON = function () {
		jsonDict = {
			"activity-type" : this.activityType,
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
		
		return JSON.stringify( jsonDict );
	}
	
	this.getTableHeader = function() {
		var tableHeader = "<tr class='table_header'>" +
			"<td>Título do projeto</td>" +
			"<td width='200px'>Tipo</td>" +
			"<td width='100px'>Carga horária</td>" +
			"<td width='80px'>Ações</td>" +
		"</tr>";
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = "<tr>" +
			"<td>" + this.tituloDoProjeto + "</td>" +
			"<td>" + this.tipo + "</td>" +
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
		titleView.html( "Editar Atividade em Projeto" );
		editViewDiv.append( "<h4>" + this.tituloDoProjeto + "</h4>" ); 
	}
}
