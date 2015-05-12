function abstractActivity () {
	var selfObject = this;
	
	this.activityType = "abstractActivity";
	
	this.getEditButton = function () {
		var editButton = "<a href='javascript:void(0)' onclick='(" + this.showEditView + ")(" + this.toJSON() + ")'>" +
				"<img src='images/edit_icon.png' />" +
			"</a>";
		
		return editButton;
	}
	
	this.showEditView = function ( serializedObject ) {
		var editViewDiv = $( "#activity_view" );
		var titleView = $( "#view_title" );
		
		var className = String( serializedObject["activity-type"] );
		var activity = new window[className]( serializedObject );		
		activity.createEditView( titleView, editViewDiv );
		
		$( "#activity_view_background" ).fadeToggle( "fast" );
	}
	
	this.createEditView = function( editViewDiv ) {}
}
