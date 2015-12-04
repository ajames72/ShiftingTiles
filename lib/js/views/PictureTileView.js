/*global define, jQuery, underscore, backbone, console  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', 'text!../templates/PictureTileTemplate.html'], function($, _, Backbone, PictureTileTemplate){
	var PictureTileView = Backbone.View.extend({
		events: {},
		eventFuction: function(e){
			//Event function template
		},
		initialize: function(){

		},
		template: _.template(PictureTileTemplate),
		render: function(index){
			this.$el.append(this.template({data: this.model.toJSON(), index: index}));
		},
		renderNext: function(index){
			const self = this;
			this.$el.find('img').fadeOut( 1000, function() {
				self.$el.replaceWith(self.template({data: self.model.toJSON(), index: index}));
			});
		}
	});

	return PictureTileView;
});
