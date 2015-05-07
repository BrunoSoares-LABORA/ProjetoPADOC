function produto ( serializedObject ) {
	var selfObject = this;
	
	try {
		this.descricao = serializedObject['descricao'];
		this.titulo = serializedObject['titulo'];
		this.autoria = serializedObject['autoria'];
		this.associacao_do_produto = serializedObject['associacao-do-produto'];
		this.projeto_associado = serializedObject['projeto-associado'];
		this.veiculacao = serializedObject['veiculacao'];
		this.local = serializedObject['local'];
		this.data = serializedObject['data'];
		this.ano_da_publicacao = serializedObject['ano-da-publicacao'];
		this.pagina_inicial = serializedObject['pagina-inicial'];
		this.pagina_final = serializedObject['pagina-final'];
		this.numero_de_paginas = serializedObject['numero-de-paginas'];
		this.numero_da_patente = serializedObject['numero-da-patente'];
		this.editora = serializedObject['editora'];
	} catch( e ){}
	
	this.toJSON = function () {
		jsonDict = {
			"descricao" : this.descricao,
			"titulo" : this.titulo,
			"autoria" : this.autoria,
			"associacao-do-produto" : this.associacao_do_produto,
			"projeto-associado" : this.projeto_associado,
			"veiculacao" : this.veiculacao,
			"local" : this.local,
			"data" : this.data,
			"ano-da-publicacao" : this.ano_da_publicacao,
			"pagina-inicial" : this.pagina_inicial,
			"pagina-final" : this.pagina_final,
			"numero-de-paginas" : this.numero_de_paginas,
			"numero-da-patente" : this.numero_da_patente,
			"editora" : this.editora
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getTableHeader = function() {
		var tableHeader = "<tr class='table_header'>" +
			"<td>Título</td>" +
			"<td>Projeto associado</td>" +
			"<td>Local</td>" +
			"<td>Data</td>" +
			"<td width='100px'>Ações</td>" +
		"</tr>";
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = "<tr>" +
			"<td>" + this.titulo + "</td>" +
			"<td>" + this.projeto_associado + "</td>" +
			"<td>" + this.local + "</td>" +
			"<td>" + this.data + "</td>" +
			"<td></td>" +
		"</tr>";
		
		return formTableTr;
	}
}
