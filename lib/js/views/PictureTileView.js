/*global define, jQuery, underscore, backbone, console, ajmebc  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', '../animations/Animations', 'text!../templates/PictureTileTemplate.html'], function($, _, Backbone, Animations, PictureTileTemplate){
	var PictureTileView = Backbone.View.extend({
		width: '0%',
		events: {
			'animationend': 'animEnd',
		},
		animEnd: function(e){
			/*
			 * leaving this in for reference
			 * triggers the event in the parent view
			 */
			//this.$el.trigger('containerEvent');
			
		},
		changeImg: function(e){
			this.animation.setSrc(this.model.get('src'));
			this.animation.cells.first = $('div[data-attr="'+this.slotIndex+'"] img:nth-child(1)');
			this.animation.cells.second = $('div[data-attr="'+this.slotIndex+'"] img:nth-child(2)');
			this.animation.animation();
		},
		getAnimation: function(){
			var animation = ajmebc.ShiftingTiles.animation;
			console.log(animation);
			if(typeof Animations[animation] === "undefined"){
				console.log('default basic');
				return new Animations["Basic"]();
			} else {
				console.log("1");
				return new Animations[animation]();
			}
		},
		initialize: function(){
			this.model.on('change', this.changeImg, this);
			this.animation = this.getAnimation();
		},
		template: _.template(PictureTileTemplate),
		//Maps to the index of the image in the data source
		/**
		 * @property index
		 * @description Maps to the index of the image in the data source
		 * @type {int}
		 * @default 0
		 */
		animation: {},
		render: function(slotIndex){
			this.slotIndex = slotIndex;
			this.$el.append(this.template({data: this.model.toJSON(), index: this.slotIndex, width: this.width}));
			this.animation.initialize({slotIndex: this.slotIndex});
		}
	});

	return PictureTileView;
});
