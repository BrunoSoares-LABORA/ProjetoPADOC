function atividadeDeEnsino ( serializedObject ) {
	var selfObject = this;
		
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
			"<td>Curso</td>" +
			"<td>Disciplina</td>" +
			"<td>Carga horária</td>" +
			"<td>Ano/Semestre</td>" +
			"<td>Número de alunos</td>" +
			"<td>Ações</td>" +
		"</tr>";
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = "<tr>" +
			"<td>" + this.curso + "</td>" +
			"<td>" + this.disciplina + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td>" + this.ano + "/" + this.sem + "</td>" +
			"<td>" + this.numero_alunos + "</td>" +
			"<td></td>" +
		"</tr>";
		
		return formTableTr;
	}
}
