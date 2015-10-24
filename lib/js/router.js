/*global define, require, requirejs, window, jQuery, underscore, backbone, PictureTileContainerView  */
define(['jQuery', 'underscore', 'backbone', 'views/PictureTileContainerView'], function($, _, Backbone, PictureTileContainerView){

		var ApplicationRouter = Backbone.Router.extend({
			routes: {
				"" : "index",
			},
			initialize: function(){
				// Code uglies:
				// In try/catch block so can be unit tested
				try{
					Backbone.history.start();
				} catch(exception) {

				}
			},
			index: function(){
				var pictureTileContainerView = new PictureTileContainerView();

				pictureTileContainerView.render();
				/*
				var pictureTileCollection = new PictureTileCollection();

				pictureTileCollection.fetch().done(function(){
					pictureTileCollection.render();
				});
				*/
			}
		});

		return ApplicationRouter;
});