/*global define, jQuery, underscore, backbone, console  */
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
		}
	});

	return PictureTileView;
});