function atividadeDeOrientacao ( activityId, location, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId, location );
	var selfObject = this;
	
	this.activityType = "atividadeDeOrientacao";
	this.title = "Atividade de Orientação";
	this.isCopy = ( isCopy === true ) ? true : false;
	this.defineObjectCommonAttr( serializedObject );
	
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
	
	this.toJSON = function ( fullSave ) {
		var jsonDict = {
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
		
		if( fullSave === true ) {
			jsonDict["copy"] = JSON.parse( this.copy.toJSON( false ) );
			jsonDict["removed"] = this.removed;
			jsonDict["isNew"] = this.isNew;
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
		var formTableTr = "<tr activityId='" + this.id + "'>" +
			"<td>" + this.tituloDoTrabalho + "</td>" +
			"<td>" + this.estudante + "</td>" +
			"<td>" + this.tipoOrientacao + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td class='action_td'>" +
				this.getEditButton() +
				this.getDeleteButton() +
			"</td>" +
		"</tr>";
		
		return formTableTr;
	}
	
	this.createEditView = function ( editViewDiv, editPage ) {
		editPage.find( "textarea[name='titulo_do_trabalho']" ).val( this.tituloDoTrabalho );
		editPage.find( "input[name='tabela']" ).attr( "value", this.tabela );
		editPage.find( "input[name='estudante']" ).attr( "value", this.estudante );
		editPage.find( "input[name='matricula']" ).attr( "value", this.matricula );
		editPage.find( "input[name='funcao_do_docente']" ).attr( "value", this.funcaoDoDocente );
		editPage.find( "input[name='nivel']" ).attr( "value", this.nivel );
		editPage.find( "input[name='curso']" ).attr( "value", this.curso );
		editPage.find( "input[name='ies']" ).attr( "value", this.ies );
		editPage.find( "input[name='cha']" ).attr( "value", this.cha );
		editPage.find( "input[name='tipo_orientacao']" ).attr( "value", this.tipoOrientacao );
		editPage.find( "input[name='periodo_inicio']" ).attr( "value", this.periodo['inicio'] );
		editPage.find( "input[name='periodo_fim']" ).attr( "value", this.periodo['fim'] );
		editViewDiv.append( editPage );
	}
	
	this.save = function ( editPage ) {
		var newTituloDoTrabalho	= editPage.find( "textarea[name='titulo_do_trabalho']" ).val();
		var newTabela			= editPage.find( "input[name='tabela']" ).attr( "value" );
		var newEstudante		= editPage.find( "input[name='estudante']" ).attr( "value" );
		var newMatricula		= editPage.find( "input[name='matricula']" ).attr( "value" );
		var newFuncaoDoDocente	= editPage.find( "input[name='funcao_do_docente']" ).attr( "value" );
		var newNivel			= editPage.find( "input[name='nivel']" ).attr( "value" );
		var newCurso			= editPage.find( "input[name='curso']" ).attr( "value" );
		var newIes				= editPage.find( "input[name='ies']" ).attr( "value" );
		var newCha				= editPage.find( "input[name='cha']" ).attr( "value" );
		var newTipoOrientacao	= editPage.find( "input[name='tipo_orientacao']" ).attr( "value" );
		var newPeriodo			= {
			'inicio' : editPage.find( "input[name='periodo_inicio']" ).attr( "value" ),
			'fim' : editPage.find( "input[name='periodo_fim']" ).attr( "value" )
		}
		
		this.tituloDoTrabalho	= newTituloDoTrabalho;
		this.tabela				= newTabela;
		this.estudante			= newEstudante;
		this.matricula			= newMatricula;
		this.funcaoDoDocente	= newFuncaoDoDocente;
		this.nivel				= newNivel;
		this.curso				= newCurso;
		this.ies				= newIes;
		this.cha				= newCha;
		this.periodo			= newPeriodo;
		this.tipoOrientacao		= newTipoOrientacao;
		
		this._save();
	}
}
