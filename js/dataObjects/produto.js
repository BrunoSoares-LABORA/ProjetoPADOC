function produto ( activityId, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId );
	var selfObject = this;
	
	this.activityType = "produto";
	
	if ( isCopy != true ) {
		this.copy = new produto( activityId, serializedObject, true );
	} else {
		this.copy = null;
	}
	
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
			"activity-type" : this.activityType,
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
			"<td width='80px'>Ações</td>" +
		"</tr>";
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = $( "<tr>" +
			"<td>" + this.titulo + "</td>" +
			"<td>" + this.projeto_associado + "</td>" +
			"<td>" + this.local + "</td>" +
			"<td>" + this.data + "</td>" +
			"<td class='action_td'>" +
				this.getEditButton() +
				"<a href='javascript:void(0)'>" +
					"<img src='images/delete_icon.png' />" +
				"</a>" +
			"</td>" +
		"</tr>" );
		
		return formTableTr;
	}
	
	this.createEditView = function ( titleView, editViewDiv, editPage ) {		
		var displayProductId = parseInt( this.id ) + 1;
		titleView.html( "Editar Produto #" + displayProductId + "" );
				
		editPage.find( "textarea[name='descricao']" ).val( this.descricao );
		editPage.find( "input[name='titulo']" ).attr( "value", this.titulo );
		editPage.find( "input[name='autoria']" ).attr( "value", this.autoria );
		editPage.find( "input[name='associacao_do_produto']" ).attr( "value", this.associacao_do_produto );
		editPage.find( "textarea[name='projeto_associado']" ).val( this.projeto_associado );
		editPage.find( "textarea[name='veiculacao']" ).val( this.veiculacao );
		editPage.find( "input[name='local']" ).attr( "value", this.local );
		editPage.find( "input[name='data']" ).attr( "value", this.data );
		editPage.find( "input[name='ano_da_publicacao']" ).attr( "value", this.ano_da_publicacao );
		editPage.find( "input[name='pagina_inicial']" ).attr( "value", this.pagina_inicial );
		editPage.find( "input[name='pagina_final']" ).attr( "value", this.pagina_final );
		editPage.find( "input[name='numero_de_paginas']" ).attr( "value", this.numero_de_paginas );
		editPage.find( "input[name='numero_da_patente']" ).attr( "value", this.numero_da_patente );
		editPage.find( "input[name='editora']" ).attr( "value", this.editora );
		editViewDiv.append( editPage );
	}
	
	this.save = function ( editPage ) {
		var newDescricao			= editPage.find( "textarea[name='descricao']" ).val();
		var newTitulo				= editPage.find( "input[name='titulo']" ).attr( "value" );
		var newAutoria				= editPage.find( "input[name='autoria']" ).attr( "value" );
		var newAssociacaoDoProduto	= editPage.find( "input[name='associacao_do_produto']" ).attr( "value" );
		var newProjetoAssociado		= editPage.find( "textarea[name='projeto_associado']" ).val();
		var newVeiculacao			= editPage.find( "textarea[name='veiculacao']" ).val();
		var newLocal				= editPage.find( "input[name='local']" ).attr( "value" );
		var newData					= editPage.find( "input[name='data']" ).attr( "value" );
		var newAnoDaPublicacao		= editPage.find( "input[name='ano_da_publicacao']" ).attr( "value" );
		var newPaginaInicial		= editPage.find( "input[name='pagina_inicial']" ).attr( "value" );
		var newPaginaFinal			= editPage.find( "input[name='pagina_final']" ).attr( "value" );
		var newNumeroDePaginas		= editPage.find( "input[name='numero_de_paginas']" ).attr( "value" );
		var newNumeroDaPatente		= editPage.find( "input[name='numero_da_patente']" ).attr( "value" );
		var newEditora				= editPage.find( "input[name='editora']" ).attr( "value" );
		
		this.descricao = newDescricao;
		this.titulo = newTitulo;
		this.autoria = newAutoria;
		this.associacao_do_produto = newAssociacaoDoProduto;
		this.projeto_associado = newProjetoAssociado;
		this.veiculacao = newVeiculacao;
		this.local = newLocal;
		this.data = newData;
		this.ano_da_publicacao = newAnoDaPublicacao;
		this.pagina_inicial = newPaginaInicial;
		this.pagina_final = newPaginaFinal;
		this.numero_de_paginas = newNumeroDePaginas;
		this.numero_da_patente = newNumeroDaPatente;
		this.editora = newEditora;
	}
}
