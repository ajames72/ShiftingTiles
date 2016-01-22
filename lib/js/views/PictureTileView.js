/*global define, jQuery, underscore, backbone, console  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', 'text!../templates/PictureTileTemplate.html'], function($, _, Backbone, PictureTileTemplate){
	var PictureTileView = Backbone.View.extend({
		width: '0%',
		events: {
			//'animationstart': 'animStart',
			//'animationend': 'animEnd'
		},
		animStart: function(e){
			//Event function template
			console.log('animStart');
		},
		animEnd: function(e){
			console.log('animEnd');
		},
		initialize: function(){

		},
		template: _.template(PictureTileTemplate),
		render: function(index){
			this.$el.append(this.template({data: this.model.toJSON(), index: index, width: this.width}));
		},
		renderNext: function(index){
			const self = this;

			this.$el.find('img').fadeOut( 1000, function() {
				self.$el.replaceWith(self.template({data: self.model.toJSON(), index: index, width: self.width}));
			});
		}
	});

	return PictureTileView;
});
