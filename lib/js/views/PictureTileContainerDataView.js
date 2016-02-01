/*global define, jQuery, underscore, backbone, ajmebc  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', '../collections/PictureTileCollection', 'text!../templates/PictureTileContainerTemplate.html'], function($, _, Backbone, PictureTileCollection, PictureTileContainerTemplate){
	var PictureTileContainerDataView = Backbone.View.extend({
		options: {},
		events: {
			/*
			 * leaving this in for reference
			 */
			'containerEvent': 'eventFunction'
		},
		eventFunction: function(e){
			//this event is triggered by the child view
		},
		el: $("#app"),
		initialize: function(){
			this.options = ajmebc.ShiftingTiles || {};

			this.collection = new PictureTileCollection();
			this.collection.setRows(parseInt(this.options.rows, 10));
			this.collection.setColumns(parseInt(this.options.columns, 10));
			this.collection.setLoading(this.options.loading);
			this.collection.setViewSize();
		},
		template: _.template(PictureTileContainerTemplate),
		render: function(){
			$('div#loading').fadeOut( 250, function(){

			});

			const self = this;

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
