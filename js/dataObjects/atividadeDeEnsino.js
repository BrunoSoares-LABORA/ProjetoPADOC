function atividadeDeEnsino ( activityId, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId );
	var selfObject = this;
	
	this.activityType = "atividadeDeEnsino";
	
	if ( isCopy != true ) {
		this.copy = new atividadeDeEnsino( activityId, serializedObject, true );
	} else {
		this.copy = null;
	}
	
	try {
		this.curso = serializedObject['curso'];
		this.disciplina = serializedObject['disciplina'];
		this.cha = serializedObject['cha'];
		this.ano = serializedObject['ano'];
		this.sem = serializedObject['sem'];
		this.turma = serializedObject['turma'];
		this.sub = serializedObject['sub'];
		this.numero_alunos = serializedObject['numero-alunos'];
		this.numero_sub = serializedObject['numero-sub'];
		this.cht = serializedObject['cht'];
		this.chp = serializedObject['chp'];
		this.chac = serializedObject['chac'];
		this.conjugada = serializedObject['conjugada'];
	} catch( e ){}
	
	this.toJSON = function () {
		jsonDict = {
			"activity-type" : this.activityType,
			"curso" : this.curso,
			"disciplina" : this.disciplina,
			"cha" : this.cha,
			"ano" : this.ano,
			"sem" : this.sem,
			"turma" : this.turma,
			"sub" : this.sub,
			"numero-alunos" : this.numero_alunos,
			"numero-sub" : this.numero_sub,
			"cht" : this.cht,
			"chp" : this.chp,
			"chac" : this.chac,
			"conjugada" : this.conjugada
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getTableHeader = function() {
		var tableHeader = "<tr class='table_header'>" +
			"<td width='190px'>Curso</td>" +
			"<td>Disciplina</td>" +
			"<td>Ano/Semestre</td>" +
			"<td>Número de alunos</td>" +
			"<td width='100px'>Carga horária</td>" +
			"<td width='80px'>Ações</td>" +
		"</tr>";
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = "<tr>" +
			"<td>" + this.curso + "</td>" +
			"<td>" + this.disciplina + "</td>" +
			"<td>" + this.ano + "/" + this.sem + "</td>" +
			"<td>" + this.numero_alunos + "</td>" +
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
		titleView.html( "Editar Atividade de Ensino" );
		editViewDiv.append( "<h4>Curso: " + this.curso + "</h4>" );
		editViewDiv.append( "<h4>Disciplina: " + this.disciplina + "</h4>" ); 
	}
}
