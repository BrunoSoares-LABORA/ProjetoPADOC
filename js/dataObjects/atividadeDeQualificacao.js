function atividadeDeQualificacao ( serializedObject ) {
	var selfObject = this;
	
	try {
		this.tabela = serializedObject['tabela'];
		this.descricao = serializedObject['descricao'];
		this.cha = serializedObject['cha'];
		this.periodo = serializedObject['periodo'];
	} catch( e ){}
	
	this.toJSON = function () {
		jsonDict = {
			"tabela" : this.tabela,
			"descricao" : this.descricao,
			"cha" : this.cha,
			"periodo" : this.periodo
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getTableHeader = function() {
		var tableHeader = "<tr class='table_header'>" +
			"<td>Código da qualificação</td>" +
			"<td>Período</td>" +
			"<td>Descrição</td>" +
			"<td width='100px'>Carga horária</td>" +
			"<td width='100px'>Ações</td>" +
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
			"<td>" + descricao + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td></td>" +
		"</tr>";
		
		return formTableTr;
	}
}
