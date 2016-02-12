/*global define, jQuery, underscore, backbone, ajmebc, console  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', '../collections/PictureTileCollection', 'views/PictureTileFullscreenView', 'text!../templates/PictureTileContainerTemplate.html'], function($, _, Backbone, PictureTileCollection, PictureTileFullscreenView, PictureTileContainerTemplate){
	var PictureTileContainerDataView = Backbone.View.extend({
		options: {},
		pictureTileFullscreenView: undefined,
		events: {
			'displayFullscreenEvent': 'displayFullscreen',
			'closeFullscreenEvent': 'closeFullscreen'
		},
		displayFullscreen: function(e, _model){
			this.pictureTileFullscreenView = new PictureTileFullscreenView({model: _model});
			this.pictureTileFullscreenView.render();
			this.$el.append(this.pictureTileFullscreenView.el);
		},
		closeFullscreen: function(e){
			//destroy fullscreen
			this.pictureTileFullscreenView.remove();
		},
		el: $("#ajmebcShiftingTilesApp"),
		initialize: function(){
			//@TODO: put in some error handling
			this.options = ajmebc.ShiftingTiles || {};

			this.collection = new PictureTileCollection();
			this.collection.setRows(parseInt(this.options.rows, 10));
			this.collection.setColumns(parseInt(this.options.columns, 10));
			this.collection.setLoading(this.options.loading);
			this.collection.setViewSize();
			this.collection.style = this.options.style;
			for(var key in this.options.style){
				console.log(key + "  " + this.options.style[key]);
			}
			/*console.log(Object.keys(this.options.style));
			Object.keys(this.options.style).forEach(function(key, index, value){
				console.log(key);
				console.log(index);
				console.log(value);
			});*/
		},
		template: _.template(PictureTileContainerTemplate),
		render: function(){
			var self = this;

			this.$el.append(this.template());
			//Set the collection elemenet to add child views to this view
			this.collection.el = this.$('.pictureTileContainer');

			this.collection.add(ajmebc.ShiftingTiles.data.pictures);

			var p = this.collection.load();

			//When the images have loaded, hide the timer and render the dsiplay
			p.done(function(){
				$('div#loading').fadeOut( 250, function(){
					self.collection.render();
				});
			});
		}
	});

	return PictureTileContainerDataView;
});
