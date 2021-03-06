/*global define, jQuery, underscore, backbone, ajmebc  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', '../collections/PictureTileCollection', 'text!../templates/PictureTileContainerTemplate.html'], function($, _, Backbone, PictureTileCollection, PictureTileContainerTemplate){
	var PictureTileContainerView = Backbone.View.extend({
		events: {},
		eventFuction: function(e){
			//Event function template
		},
		el: $("#app"),
		initialize: function(){
			this.collection = new PictureTileCollection();
			//This is relying on a url being set in the document page
			this.collection.url = ajmebc.ShiftingTiles.url;
		},
		template: _.template(PictureTileContainerTemplate),
		render: function(){
			const self = this;

			this.$el.append(this.template());
			//Set the collection elemenet to add child views to this view
			this.collection.el = this.$('.pictureTileContainer');

			this.collection.fetch().done(function(){
				//When fetch is complete, load the images
				var p = self.collection.load();
				//When the images have loaded, hide the timer and render the dsiplay
				p.done(function(){
					$('div#loading').fadeOut( 250, function(){
						self.collection.render();
					});
				});
			});
		}
	});

	return PictureTileContainerView;
});
