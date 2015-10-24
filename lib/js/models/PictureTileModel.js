/*global define, jQuery, underscore, backbone  */
define(['jQuery', 'underscore', 'backbone'], function($, _, Backbone){
	var PictureTileModel = Backbone.Model.extend({
		defaults:{
			src: ''
		}
	});

	return PictureTileModel;
});