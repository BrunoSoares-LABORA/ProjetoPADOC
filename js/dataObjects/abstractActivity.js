function abstractActivity ( activityId, location ) {
	var selfObject = this;
	
	this.id = activityId;
	this.displayId = parseInt( this.id ) + 1;
	this.location = location;
	this.removed = false;
	
	this.getActivityJsonName = function () {
		var activityType;
		for (var activity_name in  activities_name ) {
			if( activities_name[activity_name] === this.activityType ) {
				activityType = activity_name;
				break;
			}
		}
		
		return activityType;
	}
	
	this.defineObjectCommonAttr = function ( serializedObject ) {
		try {
			if ( this.isCopy === false ) {
				var className = String( this.activityType );
				var copySerializedData = serializedObject;
				if( typeof serializedObject['copy'] === 'object' ) {
					copySerializedData = serializedObject['copy'];
				}
				
				this.copy = new window[className]( this.id, this.location, copySerializedData, true );
			} else {
				this.copy = null;
			}
		} catch( e ) {}
		
		try {
			if( this.isCopy === false ) {
				if( typeof serializedObject['removed'] === 'boolean' ) {
					this.removed = serializedObject['removed'];
				}
			}
		} catch( e ) {}
	}
	
	this.getEditButton = function () {
		var activityType = this.getActivityJsonName();
		
		var editButton = "<a href='javascript:void(0)' " +
			"onclick='showEditView(\"" + activityType + "\", " + this.id + ")'>" +
				"<img src='images/edit_icon.png' />" +
			"</a>";
		
		return editButton;
	}
	
	this.getDeleteButton = function () {
		var activityType = this.getActivityJsonName();
		
		var deleteButton = "<a href='javascript:void(0)' " +
			"onclick='deleteActivity(\"" + activityType + "\", " + this.id + ")'>" +
				"<img src='images/delete_icon.png' />" +
			"</a>";
		
		return deleteButton;
	}
	
	this.getDiff = function() {
		var notAttr = [
			'activityType', 'id', 'location', 'removed', 'getEditButton', 'showEditView', 'getDiff', 'copy',
			'toJSON', 'getTableHeader', 'getOverviewTableTr', 'createEditView', 'save', '_save', '_update',
			'_delete', 'getDeleteButton', 'getActivityJsonName', 'defineObjectCommonAttr', 'isCopy'
		];
		
		var changes = []
		for( var key in this ) {
			if( notAttr.indexOf( key ) == -1 && ( this.copy[ key ] != this[ key ] ) ) {
				change = {
					'attribute' : key,
					'original' : this.copy[ key ],
					'latestVersion' : this[key]
				}
				changes.push( change );
			}
		}
			
		var diff = {
			'activityType' : this.getActivityJsonName(),
			'id' : this.id,
			'removed' : this.removed,
			'changes' : changes
		}
		
		return diff;
	}
	
	this._update = function () {
		var activityType = this.getActivityJsonName();
		var newActivity = JSON.parse( this.toJSON( true ) );
		
		siape_docente['periodos'][ this.location['period'] ][ activityType ][ this.location['activity'] ] = newActivity;
		sessionStorage.setItem( "siape_docente", JSON.stringify( siape_docente ) );
	}
	
	this._save = function () {
		this._update();
		
		// Update activity relatory row, if necessary.
		try {
			var activityType = this.getActivityJsonName();
			$( "#" + activityType ).find( "tr[activityId='" + this.id + "']" ).replaceWith( this.getOverviewTableTr() );
		} catch( e ) {}
		
		// Close activity view.
		$( "#activity_view_background" ).fadeToggle( "fast", function() {
			$( "#view_title" ).html( '' );
			$( "#activity_view" ).html( '' );
		});
	}
	
	this._delete = function() {
		this._update();
		
		// Update activity relatory wor, if necessary.
		try {
			var activityType = this.getActivityJsonName();
			$( "#" + activityType ).find( "tr[activityId='" + this.id + "']" ).remove();
		} catch( e ) {}
	}
}

function showEditView ( activityType, activityId ) {
	var activity = periods_activities[ activityType ][ activityId ];
	
	ajaxOpt = {
		url: "view/activities/" + activity.activityType + "/edit.html",
		dataType: "text",
		context: document.body,
		success: function( response ) {
			var editViewDiv = $( "#activity_view" );
			var editPage = $( response );
			
			$( "#view_title" ).html( "Editar " + activity.title + " #" + activity.displayId + "" );
			
			activity.createEditView( editViewDiv, editPage );
			
			$( "#btn_save_activity" ).unbind();
			$( "#btn_save_activity" ).click( function( e ) {
				activity.save( editPage );
			});
			
			$( "#activity_view_background" ).fadeToggle( "fast" );
		}
	}
	
	$.ajax( ajaxOpt );
}

function deleteActivity ( activityType, activityId ) {
	var activity = periods_activities[ activityType ][ activityId ];
	var confirmDelete = confirm( "Você tem certeza de que deseja remover esta atividade?" );
	
	if( confirmDelete === true ) {
		activity.removed = true;
		activity._delete();
	}
}

function printDiff ( activityDiff ) {
	if( activityDiff['changes'].length == 0 ) {
		return;
	}
	
	var activity = periods_activities[ activityDiff['activityType'] ][ activityDiff['id'] ];
	
	var htmlDiff = "<table class='diff change'>" +
		"<tr>" +
			"<td colspan='3'>" + activity.title + " #" + activity.displayId + "</td>" +
		"</tr>" +
		"<tr>" +
			"<td>Nome do atributo</td>" +
			"<td>Valor original</td>" +
			"<td>Valor atual</td>" +
		"</tr>";
	
	activityDiff['changes'].forEach( function( diff ) {
		htmlDiff += "<tr>" +
			"<td>" + diff['attribute'] + "</td>" +
			"<td>" + diff['original'] + "</td>" +
			"<td>" + diff['latestVersion'] + "</td>" +
		"</tr>";
	});
	
	htmlDiff += "</table>";
	
	return htmlDiff;
}
