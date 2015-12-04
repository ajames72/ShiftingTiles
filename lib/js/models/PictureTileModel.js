/*global define, jQuery, underscore, backbone  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone'], function($, _, Backbone){
	var PictureTileModel = Backbone.Model.extend({
		defaults:{
			src: ''
		}
	});

	return PictureTileModel;
});
