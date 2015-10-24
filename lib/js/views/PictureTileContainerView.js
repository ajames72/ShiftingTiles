/*global define, jQuery, underscore, backbone  */
define(['jQuery', 'underscore', 'backbone', '../collections/PictureTileCollection', 'text!../templates/PictureTileContainerTemplate.html'], function($, _, Backbone, PictureTileCollection, PictureTileContainerTemplate){
	var PictureTileContainerView = Backbone.View.extend({
		events: {},
		eventFuction: function(e){
			//Event function template
		},
		el: $("#app"),
		initialize: function(){
			this.collection = new PictureTileCollection();
		},
		template: _.template(PictureTileContainerTemplate),
		render: function(){
			var self = this;

			this.$el.append(this.template());
			//Set the collection elemenet to add child views to this view
			this.collection.el = this.$('.pictureTileContainer');
			this.collection.fetch().done(function(){
				self.collection.addAll();
				self.collection.initializeSlots();
				self.collection.render();
			});
		}
	});

	return PictureTileContainerView;
});
