function atividadeDeOrientacao ( activityId, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId );
	var selfObject = this;
	
	this.activityType = "atividadeDeOrientacao";
	
	if ( isCopy != true ) {
		this.copy = new atividadeDeOrientacao( activityId, serializedObject, true );
	} else {
		this.copy = null;
	}
	
	try {
		this.tituloDoTrabalho = serializedObject['titulo-do-trabalho'];
		this.tabela = serializedObject['tabela'];
		this.estudante = serializedObject['estudante'];
		this.matricula = serializedObject['matricula'];
		this.funcaoDoDocente = serializedObject['funcao-do-docente'];
		this.nivel = serializedObject['nivel'];
		this.curso = serializedObject['curso'];
		this.ies = serializedObject['ies'];
		this.cha = serializedObject['cha'];
		this.periodo = serializedObject['periodo'];
		this.tipoOrientacao = serializedObject['tipo-orientacao'];
	} catch( e ){}
	
	this.toJSON = function () {
		jsonDict = {
			"activity-type" : this.activityType,
			"titulo-do-trabalho" : this.tituloDoTrabalho,
			"tabela" : this.tabela,
			"estudante" : this.estudante,
			"matricula" : this.matricula,
			"funcao-do-docente" : this.funcaoDoDocente,
			"nivel" : this.nivel,
			"curso" : this.curso,
			"ies" : this.ies,
			"cha" : this.cha,
			"periodo" : this.periodo,
			"tipo-orientacao" : this.tipoOrientacao
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getTableHeader = function() {
		var tableHeader = "<tr class='table_header'>" +
			"<td>Título do trabalho</td>" +
			"<td width='200px'>Estudante</td>" +
			"<td>Tipo da orientação</td>" +
			"<td width='100px'>Carga horária</td>" +
			"<td width='80px'>Ações</td>" +
		"</tr>";
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = "<tr>" +
			"<td>" + this.tituloDoTrabalho + "</td>" +
			"<td>" + this.estudante + "</td>" +
			"<td>" + this.tipoOrientacao + "</td>" +
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
		titleView.html( "Editar Atividade de Orientação" );
		editViewDiv.append( "<h4>" + this.tituloDoTrabalho + "</h4>" ); 
	}
}
