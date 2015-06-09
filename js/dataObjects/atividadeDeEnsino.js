function atividadeDeEnsino ( activityId, location, serializedObject, isCopy ) {
	abstractActivity.call( this, activityId, location );
	var selfObject = this;
	
	this.activityType = "atividadeDeEnsino";
	this.title = "Atividade de Ensino";
	this.isCopy = ( isCopy === true ) ? true : false;
	this.defineObjectCommonAttr( serializedObject );
	
	try {
		this.curso = serializedObject['curso'];
	} catch( e ){
		this.curso = null;
	}
	
	try {
		this.disciplina = serializedObject['disciplina'];
	} catch( e ){
		this.disciplina = null;
	}
	
	try {
		this.cha = serializedObject['cha'];
	} catch( e ){
		this.cha = null;
	}
	
	try {
		this.ano = serializedObject['ano'];
	} catch( e ){
		this.ano = null;
	}
	
	try {
		this.sem = serializedObject['sem'];
	} catch( e ){
		this.sem = null;
	}
	
	try {
		this.turma = serializedObject['turma'];
	} catch( e ){
		this.turma = null;
	}
	
	try {
		this.sub = serializedObject['sub'];
	} catch( e ){
		this.sub = null;
	}
	
	try {
		this.numeroAlunos = serializedObject['numero-alunos'];
	} catch( e ){
		this.numeroAlunos = null;
	}
	
	try {
		this.numeroSub = serializedObject['numero-sub'];
	} catch( e ){
		this.numeroSub = null;
	}
	
	try {
		this.cht = serializedObject['cht'];
	} catch( e ){
		this.cht = null;
	}
	
	try {
		this.chp = serializedObject['chp'];
	} catch( e ){
		this.chp = null;
	}
	
	try {
		this.chac = serializedObject['chac'];
	} catch( e ){
		this.chac = null;
	}
	
	try {
		this.conjugada = serializedObject['conjugada'];
	} catch( e ){
		this.conjugada = null;
	}
	
	this.toJSON = function ( fullSave ) {
		var jsonDict = {
			"curso" : this.curso,
			"disciplina" : this.disciplina,
			"cha" : this.cha,
			"ano" : this.ano,
			"sem" : this.sem,
			"turma" : this.turma,
			"sub" : this.sub,
			"numero-alunos" : this.numeroAlunos,
			"numero-sub" : this.numeroSub,
			"cht" : this.cht,
			"chp" : this.chp,
			"chac" : this.chac,
			"conjugada" : this.conjugada
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
			"<td width='190px'>Curso</td>" +
			"<td>Disciplina</td>" +
			"<td>Ano/Semestre</td>" +
			"<td>Número de alunos</td>" +
			"<td width='100px'>Carga horária</td>" +
			"<td width='80px'>Ações</td>" +
		"</tr>" );
		
		return tableHeader;
	}
	
	this.getOverviewTableTr = function () {
		var formTableTr = $( "<tr activityId='" + this.id + "'>" +
			"<td>" + this.curso + "</td>" +
			"<td>" + this.disciplina + "</td>" +
			"<td>" + this.ano + "/" + this.sem + "</td>" +
			"<td>" + this.numeroAlunos + "</td>" +
			"<td>" + this.cha + "</td>" +
			"<td class='action_td'>" +
				this.getEditButton() +
				this.getDeleteButton() +
			"</td>" +
		"</tr>" );
		
		return formTableTr;
	}
	
	this.createEditView = function ( editViewDiv, editPage ) {
		editPage.find( "input[name='curso']" ).attr( "value", this.curso );
		editPage.find( "input[name='disciplina']" ).attr( "value", this.disciplina );
		editPage.find( "input[name='cha']" ).attr( "value", this.cha );
		editPage.find( "input[name='ano']" ).attr( "value", this.ano );
		editPage.find( "input[name='sem']" ).attr( "value", this.sem );
		editPage.find( "input[name='turma']" ).attr( "value", this.turma );
		editPage.find( "input[name='sub']" ).attr( "value", this.sub );
		editPage.find( "input[name='numero_alunos']" ).attr( "value", this.numeroAlunos );
		editPage.find( "input[name='numero_sub']" ).attr( "value", this.numeroSub );
		editPage.find( "input[name='cht']" ).attr( "value", this.cht );
		editPage.find( "input[name='chp']" ).attr( "value", this.chp );
		editPage.find( "input[name='chac']" ).attr( "value", this.chac );
		editPage.find( "input[name='conjugada']" ).prop( "checked", this.conjugada );
		editViewDiv.append( editPage );
	}
	
	this.save = function ( editPage ) {
		var newCurso		= editPage.find( "input[name='curso']" ).attr( "value" );
		var newDisciplina	= editPage.find( "input[name='disciplina']" ).attr( "value" );
		var newCha			= parseInt( editPage.find( "input[name='cha']" ).attr( "value" ) ) || 0;
		var newAno			= editPage.find( "input[name='ano']" ).attr( "value" );
		var newSem			= editPage.find( "input[name='sem']" ).attr( "value" );
		var newTurma		= editPage.find( "input[name='turma']" ).attr( "value" );
		var newSub			= editPage.find( "input[name='sub']" ).attr( "value" );
		var newNumeroAlunos	= parseInt( editPage.find( "input[name='numero_alunos']" ).attr( "value" ) ) || 0;
		var newNumeroSub	= parseInt( editPage.find( "input[name='numero_sub']" ).attr( "value" ) ) || 0;
		var newCht			= parseInt( editPage.find( "input[name='cht']" ).attr( "value" ) ) || 0;
		var newChp			= parseInt( editPage.find( "input[name='chp']" ).attr( "value" ) ) || 0;
		var newChac			= parseInt( editPage.find( "input[name='chac']" ).attr( "value" ) ) || 0;
		var newConjugada	= editPage.find( "input[name='conjugada']" ).prop( 'checked' );
		
		this.curso			= newCurso;
		this.disciplina		= newDisciplina;
		this.cha			= newCha;
		this.ano			= newAno;
		this.sem			= newSem;
		this.turma			= newTurma;
		this.sub			= newSub;
		this.numeroAlunos	= newNumeroAlunos;
		this.numeroSub		= newNumeroSub;
		this.cht			= newCht;
		this.chp			= newChp;
		this.chac			= newChac;
		this.conjugada		= newConjugada;
				
		this._save();
	}
}
