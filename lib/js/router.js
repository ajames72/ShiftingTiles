/*global define, require, requirejs, window, jQuery, underscore, backbone, PictureTileContainerView  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', 'views/PictureTileContainerView', 'views/PictureTileContainerDataView'], function($, _, Backbone, PictureTileContainerView, PictureTileContainerDataView){

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
				/*
				 * This view should use JSON file as a data source
				*/
				/*
				var pictureTileContainerView = new PictureTileContainerView();

				pictureTileContainerView.render();
				*/


				/*
				 * This view should use embeded JSON data as a data source
				*/
				/*
				var pictureTileContainerDataView = new PictureTileContainerDataView();

				pictureTileContainerDataView.render();
				*/
			}
		});

		return ApplicationRouter;
});
