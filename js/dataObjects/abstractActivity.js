function abstractActivity ( activityId, location ) {
	var selfObject = this;
	
	this.id = activityId;
	this.displayId = parseInt( this.id ) + 1;
	this.location = location;
	this.removed = false;
	this.isNew = ( this.id % 2 == 0 );
	
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
			if( notAttr.indexOf( key ) == -1 ) {
				var originalKey = serializeAttr( this.copy[ key ] );
				var latestKey = serializeAttr( this[ key ] );
				
				if( originalKey != latestKey ) {
					change = {
						'attribute' : key,
						'original' : this.copy[ key ],
						'latestVersion' : this[ key ]
					}
					changes.push( change );
				}
			}
		}
			
		var diff = {
			'activityType' : this.getActivityJsonName(),
			'id' : this.id,
			'removed' : this.removed,
			'isNew' : this.isNew,
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
	var activity = periods_activities[ activityDiff['activityType'] ][ activityDiff['id'] ];
	
	var htmlDiff = "";
	if( activityDiff['removed'] === true ) {
		htmlDiff += "<div class='deleted'>" +
			"<span class='diff_tag delete_tag'>REMOVIDO</span>" +
			activity.title + " #" + activity.displayId +
		"</div>";
	} else if( activityDiff['changes'].length > 0 ) {
		var isNew = activityDiff['isNew'];
		var colspan = ( isNew ) ? 2 : 3;
		var tag = ( isNew ) ? "ADICIONADO" : "MODIFICADO";
		var oldLabel = ( isNew ) ? "" : "<td width='375px'>Valor antigo</td>";
		var newLabel = ( isNew ) ? "<td>Valor</td>" : "<td>Novo valor</td>";
		var tagClass = ( isNew ) ? "add_tag" : "modify_tag";
		
		htmlDiff += "<table class='diff'>" +
			"<tr>" +
				"<td colspan='" + colspan + "'>" +
					"<span class='diff_tag " + tagClass + "'>" + tag + "</span>" +
					activity.title + " #" + activity.displayId +
				"</td>" +
			"</tr>" +
			"<tr>" +
				"<td width='150px'>Atributo</td>" +
				oldLabel +
				newLabel +
			"</tr>";
		
		activityDiff['changes'].forEach( function( diff ) {
			var original = serializeAttr( diff['original'] );
			var latestVersion = serializeAttr( diff['latestVersion'] );
			var oldValueTd = ( isNew ) ? "" : "<td class='old'>" + original + "</td>";
			
			htmlDiff += "<tr>" +
				"<td class='attribute'>" + diff['attribute'] + "</td>" +
				oldValueTd +
				"<td class='new'>" + latestVersion + "</td>" +
			"</tr>";
		});
		
		htmlDiff += "</table>";
	}
	
	return htmlDiff;
}

function serializeAttr( dict ) {
	if( typeof dict === 'object' ) {
		var tmpDict = "";
		for( var key in dict ) {
			tmpDict += key + ": " + dict[key] + "<br>";
		}
		dict = tmpDict;
	}
	
	return dict;
}
