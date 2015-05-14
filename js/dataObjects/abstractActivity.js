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
		var editViewDiv = $( "#activity_view" );
		var titleView = $( "#view_title" );
		
		var activity = periods_activities[activityType][activityId];		
		activity.createEditView( titleView, editViewDiv );
		
		$( "#activity_view_background" ).fadeToggle( "fast" );
	}
}
