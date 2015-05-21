function abstractActivity ( activityId, location ) {
	var selfObject = this;
	
	this.activityType = "abstractActivity";
	this.id = activityId;
	this.location = location;
	this.removed = false;
	
	this.getEditButton = function () {
		var activityType = "";
		for ( var activity in activities_name ) {
			if ( activities_name[activity] == this.activityType ) {
				activityType = activity;
			}
		}
		
		var editButton = "<a href='javascript:void(0)' " +
			"onclick='(" + this.showEditView + ")(\"" + activityType + "\", " + this.id + ")'>" +
				"<img src='images/edit_icon.png' />" +
			"</a>";
		
		return editButton;
	}
	
	this.showEditView = function ( activityType, activityId ) {
		var activity = periods_activities[activityType][activityId];
		
		ajaxOpt = {
			url: "view/activities/" + activity.activityType + "/edit.html",
			dataType: "text",
			context: document.body,
			success: function( response ) {
				var editViewDiv = $( "#activity_view" );
				var titleView = $( "#view_title" );
				var editPage = $( response );
				
				activity.createEditView( titleView, editViewDiv, editPage );
				
				$( "#btn_save_activity" ).unbind();
				$( "#btn_save_activity" ).click( function( e ) {
					activity.save( editPage );
				});
				
				$( "#activity_view_background" ).fadeToggle( "fast" );
			}
		}
		
		$.ajax( ajaxOpt );
	}
	
	this.getDiff = function() {
		var notAttr = [
			'activityType', 'id', 'location', 'removed', 'getEditButton', 'showEditView', 'getDiff', 'copy', 'toJSON',
			'getTableHeader', 'getOverviewTableTr', 'createEditView', 'save'
		];
		
		var changes = []
		for( var key in this ) {
			if( notAttr.indexOf( key ) == -1 && ( this.copy[ key ] != this[ key ] ) ) {
				change = {
					'activityType' : this.activityType,
					'id' : this.id,
					'attribute' : key,
					'original' : this.copy[ key ],
					'latestVersion' : this[key]
				}
				changes.push( change );
			}
		}
		
		return changes;
	}
	
	this.save = function() {
		abstractActivity.prototype.save.call( this );
	}
}

abstractActivity.prototype.save = function() {
	var activityType;
	for (var activity_name in  activities_name ) {
	  if( activities_name[activity_name] === this.activityType ) {
		  activityType = activity_name;
		  break;
	  }
	}
	
	var oldActivity = siape_docente['periodos'][ this.location['period'] ][ activityType ][ this.location['activity'] ];
	var newActivity = JSON.parse( this.toJSON( true ) );
	
	siape_docente['periodos'][ this.location['period'] ][ activityType ][ this.location['activity'] ] = newActivity;
	sessionStorage.setItem( "siape_docente", JSON.stringify( siape_docente ) );
	
	$( "#activity_view_background" ).fadeToggle( "fast", function() {
		$( "#view_title" ).html( '' );
		$( "#activity_view" ).html( '' );
	});
}
