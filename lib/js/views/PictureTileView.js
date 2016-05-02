/*global define, jQuery, underscore, backbone, console, ajmebc  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', '../animations/Animations', 'text!../templates/PictureTileTemplate.html', '../API/FullscreenPositioner'], function($, _, Backbone, Animations, PictureTileTemplate, FullscreenPositioner){
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
			//console.log('anim end');
		},
		displayFullscreen: function(e){
			this.$el.trigger('displayFullscreenEvent', this.model);
		},
		changeImg: function(e){
			var imgProperties = {
				'height': this.model.get('imgProperties').height,
				'width': this.model.get('imgProperties').width,
				'margin': this.style['margin']
			};

			this.animation.animation(this.model.get('src'), this.slotIndex, imgProperties);
		},
		getAnimation: function(){
			var animation = ajmebc.ShiftingTiles.animation;
			if(typeof Animations[animation.name] === "undefined"){
				return new Animations["Basic"](animation);
			} else {
				return new Animations[animation.name](animation);
			}
		},
		initialize: function(){
			this.model.on('change', this.changeImg, this);
			this.animation = this.getAnimation();
		},
		render: function(slotIndex){
			this.slotIndex = slotIndex;
			this.$el.append(this.template({data: this.model.toJSON()}));

			/*
			for(var key in this.style){
				this.$el.children('img').css(key, this.style[key]);
			}
			*/

			if(typeof this.style['margin'] !== 'undefined') {
				var w = parseInt(this.$el.css('width'), 10);
				var h = parseInt(this.$el.css('height'), 10);
				var m = parseInt(this.style['margin'], 10);

				if((!isNaN(w)) && (!isNaN(h)) && (!isNaN(m))){

					w -= m;
					h -= m;

					this.$el.css({'width': w + 'px', 'height': h + 'px', 'margin-left': (m /2) + 'px', 'margin-right': (m /2) + 'px', 'margin-bottom': m + 'px'});

				}
			}

			this.animation.initialize({slotIndex: this.slotIndex, model: this.model});

			/*var FPF = new FullscreenPositioner(this.model.get('imgProperties').width, this.model.get('imgProperties').height, this.model.get('imgProperties').margin, this.model.get('imgProperties').margin, this.animation.cells.first.imgElement);
			FPF.fitCenter(this.animation.cells.first.imgElement);*/
			/*var FPS = new FullscreenPositioner(this.model.get('imgProperties').width, this.model.get('imgProperties').height, this.model.get('imgProperties').margin, this.model.get('imgProperties').margin, this.animation.cells.second.imgElement);
			FPS.fitCenter(this.animation.cells.second.imgElement);*/
		}
	});

	return PictureTileView;
});
