function atividadeDeOrientacao ( serializedObject ) {
	var selfObject = this;
					
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
			"<td width='100px'>Ações</td>" +
		"</tr>";
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = "<tr>" +
			"<td>" + this.tituloDoTrabalho + "</td>" +
			"<td>" + this.estudante + "</td>" +
			"<td>" + this.tipoOrientacao + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td></td>" +
		"</tr>";
		
		return formTableTr;
	}
}
