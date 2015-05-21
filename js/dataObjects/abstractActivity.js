function abstractActivity ( activityId ) {
	var selfObject = this;
	
	this.activityType = "abstractActivity";
	this.id = activityId;
	
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
}
