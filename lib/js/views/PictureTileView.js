/*global define, jQuery, underscore, backbone, console, ajmebc  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', '../animations/Animations', 'text!../templates/PictureTileTemplate.html'], function($, _, Backbone, Animations, PictureTileTemplate){
	var PictureTileView = Backbone.View.extend({
		/**
		 * @property template
		 * @description
		 * @type {}
		 * @default
		 */
		template: _.template(PictureTileTemplate),
		tagName: 'div',
		className: 'ajmebc-shifting-tile ajmebc-shifting-tile-col',
		attributes: {
			'data-attr': ''
		},
		/**
		 * @property animation
		 * @description
		 * @type {object}
		 * @default
		 */
		animation: {},
		style: {
			//margin: '10px'
		},
		events: {
			//'animationend': 'animEnd',
			'click': 'displayFullscreen'
		},
		animEnd: function(e){
			/*
			 * leaving this in for reference
			 * triggers the event in the parent view
			 */
			//this.$el.trigger('containerEvent');

		},
		displayFullscreen: function(e){
			this.$el.trigger('displayFullscreenEvent', this.model);
		},
		changeImg: function(e){
			this.animation.animation(this.model.get('src'), this.slotIndex);
		},
		getAnimation: function(){
			var animation = ajmebc.ShiftingTiles.animation;
			if(typeof Animations[animation] === "undefined"){
				return new Animations["Basic"]();
			} else {
				return new Animations[animation]();
			}
		},
		initialize: function(){
			this.model.on('change', this.changeImg, this);
			this.animation = this.getAnimation();
		},
		render: function(slotIndex){
			this.slotIndex = slotIndex;
			this.$el.append(this.template({data: this.model.toJSON()}));
			for(var key in this.style){
				this.$el.children('img').css(key, this.style[key]);
			}
			this.animation.initialize({slotIndex: this.slotIndex});
		}
	});

	return PictureTileView;
});
