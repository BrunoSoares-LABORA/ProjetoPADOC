function atividadeAdministrativa ( serializedObject ) {
	var selfObject = this;
	
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
			"<td>" + this.descricao + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td></td>" +
		"</tr>";
		
		return formTableTr;
	}
}
