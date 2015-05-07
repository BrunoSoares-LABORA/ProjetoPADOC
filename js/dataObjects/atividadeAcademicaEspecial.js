function atividadeAcademicaEspecial ( serializedObject ) {
	var selfObject = this;
	
	try {
		this.tabela = serializedObject['tabela'];
		this.cha = serializedObject['cha'];
		this.periodo = serializedObject['periodo'];
		this.descricao = serializedObject['descricao'];
		this.clientela = serializedObject['clientela'];
	} catch( e ){}
	
	this.toJSON = function () {
		jsonDict = {
			"tabela" : this.tabela,
			"cha" : this.cha,
			"periodo" : this.periodo,
			"descricao" : this.descricao,
			"clientela" : this.clientela
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getTableHeader = function() {
		var tableHeader = "<tr class='table_header'>" +
			"<td>Código da atividade</td>" +
			"<td>Período</td>" +
			"<td>Clientela</td>" +
			"<td width='100px'>Carga horária</td>" +
			"<td width='100px'>Ações</td>" +
		"</tr>";
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = "<tr>" +
			"<td>" + this.tabela + "</td>" +
			"<td>" + this.periodo['inicio'] + "-" + this.periodo['fim'] + "</td>" +
			"<td>" + this.clientela + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td></td>" +
		"</tr>";
		
		return formTableTr;
	}
}
