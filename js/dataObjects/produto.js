function produto ( activityId, location, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId, location );
	var selfObject = this;
	
	this.activityType = "produto";
	this.title = "Produto";
	this.isCopy = ( isCopy === true ) ? true : false;
	this.defineObjectCommonAttr( serializedObject );
	
	try {
		this.descricao = serializedObject['descricao'];
	} catch( e ){
		this.descricao = null;
	}
	
	try {
		this.titulo = serializedObject['titulo'];
	} catch( e ){
		this.titulo = null;
	}
	
	try {
		this.autoria = serializedObject['autoria'];
	} catch( e ){
		this.autoria = null;
	}
	
	try {
		this.associacaoDoProduto = serializedObject['associacao-do-produto'];
	} catch( e ){
		this.associacaoDoProduto = null;
	}
	
	try {
		this.projetoAssociado = serializedObject['projeto-associado'];
	} catch( e ){
		this.projetoAssociado = null;
	}
	
	try {
		this.veiculacao = serializedObject['veiculacao'];
	} catch( e ){
		this.veiculacao = null;
	}
	
	try {
		this.local = serializedObject['local'];
	} catch( e ){
		this.local = null;
	}
	
	try {
		this.data = serializedObject['data'];
	} catch( e ){
		this.data = null;
	}
	
	try {
		this.anoDaPublicacao = serializedObject['ano-da-publicacao'];
	} catch( e ){
		this.anoDaPublicacao = null;
	}
	
	try {
		this.paginaInicial = serializedObject['pagina-inicial'];
	} catch( e ){
		this.paginaInicial = null;
	}
	
	try {
		this.paginaFinal = serializedObject['pagina-final'];
	} catch( e ){
		this.paginaFinal = null;
	}
	
	try {
		this.numeroDePaginas = serializedObject['numero-de-paginas'];
	} catch( e ){
		this.numeroDePaginas = null;
	}
	
	try {
		this.numeroDaPatente = serializedObject['numero-da-patente'];
	} catch( e ){
		this.numeroDaPatente = null;
	}
	
	try {
		this.editora = serializedObject['editora'];
	} catch( e ){
		this.editora = null;
	}
	
	this.toJSON = function ( fullSave ) {
		var jsonDict = {
			"descricao" : this.descricao,
			"titulo" : this.titulo,
			"autoria" : this.autoria,
			"associacao-do-produto" : this.associacaoDoProduto,
			"projeto-associado" : this.projetoAssociado,
			"veiculacao" : this.veiculacao,
			"local" : this.local,
			"data" : this.data,
			"ano-da-publicacao" : this.anoDaPublicacao,
			"pagina-inicial" : this.paginaInicial,
			"pagina-final" : this.paginaFinal,
			"numero-de-paginas" : this.numeroDePaginas,
			"numero-da-patente" : this.numeroDaPatente,
			"editora" : this.editora
		}
		
		if( fullSave === true ) {
			jsonDict["copy"] = JSON.parse( this.copy.toJSON( false ) );
			jsonDict["removed"] = this.removed;
			jsonDict["isNew"] = this.isNew;
		}
		
		return JSON.stringify( jsonDict );
	}
	
	this.getTableHeader = function() {
		var tableHeader = $( "<tr class='table_header'>" +
			"<td>Título</td>" +
			"<td>Projeto associado</td>" +
			"<td>Local</td>" +
			"<td>Data</td>" +
			"<td width='80px'>Ações</td>" +
		"</tr>" );
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = $( "<tr activityId='" + this.id + "'>" +
			"<td>" + this.titulo + "</td>" +
			"<td>" + this.projetoAssociado + "</td>" +
			"<td>" + this.local + "</td>" +
			"<td>" + this.data + "</td>" +
			"<td class='action_td'>" +
				this.getEditButton() +
				this.getDeleteButton() +
			"</td>" +
		"</tr>" );
		
		return formTableTr;
	}
	
	this.createEditView = function ( editViewDiv, editPage ) {						
		editPage.find( "textarea[name='descricao']" ).val( this.descricao );
		editPage.find( "input[name='titulo']" ).attr( "value", this.titulo );
		editPage.find( "input[name='autoria']" ).attr( "value", this.autoria );
		editPage.find( "input[name='associacao_do_produto']" ).attr( "value", this.associacaoDoProduto );
		editPage.find( "textarea[name='projeto_associado']" ).val( this.projetoAssociado );
		editPage.find( "textarea[name='veiculacao']" ).val( this.veiculacao );
		editPage.find( "input[name='local']" ).attr( "value", this.local );
		
		var dataInput = editPage.find( "input[name='data']" );
		dataInput.attr( "value", this.data );
		setDataInput( dataInput );
		
		editPage.find( "input[name='ano_da_publicacao']" ).attr( "value", this.anoDaPublicacao );
		editPage.find( "input[name='pagina_inicial']" ).attr( "value", this.paginaInicial );
		editPage.find( "input[name='pagina_final']" ).attr( "value", this.paginaFinal );
		editPage.find( "input[name='numero_de_paginas']" ).attr( "value", this.numeroDePaginas );
		editPage.find( "input[name='numero_da_patente']" ).attr( "value", this.numeroDaPatente );
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
		this.associacaoDoProduto = newAssociacaoDoProduto;
		this.projetoAssociado = newProjetoAssociado;
		this.veiculacao = newVeiculacao;
		this.local = newLocal;
		this.data = newData;
		this.anoDaPublicacao = newAnoDaPublicacao;
		this.paginaInicial = newPaginaInicial;
		this.paginaFinal = newPaginaFinal;
		this.numeroDePaginas = newNumeroDePaginas;
		this.numeroDaPatente = newNumeroDaPatente;
		this.editora = newEditora;
		
		this._save();
	}
}
