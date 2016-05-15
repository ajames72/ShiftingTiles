/*global define, jQuery, underscore, backbone, ajmebc, console  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', 'ssm', '../collections/PictureTileCollection', 'views/PictureTileFullscreenView', 'text!../templates/PictureTileContainerTemplate.html'], function($, _, Backbone, ssm, PictureTileCollection, PictureTileFullscreenView, PictureTileContainerTemplate){

	var PictureTileContainerDataView = Backbone.View.extend({
		options: {},
		pictureTileFullscreenView: undefined,
		display: undefined,
		events: {
			'displayFullscreenEvent': 'displayFullscreen',
			'closeFullscreenEvent': 'closeFullscreen'
		},
		displayFullscreen: function(e, _model){
			var attrs;

			if((this.options.style[this.display].fullscreen !== undefined) && (this.options.style[this.display].fullscreen.margin !== undefined)) {
				attrs = this.options.style[this.display].fullscreen.margin;
			} else {
				attrs = {
					'margin-horizontal': '0',
		      'margin-vertical': '0'
				};
			}

			this.pictureTileFullscreenView = new PictureTileFullscreenView({model: _model, attributes: attrs });
			this.pictureTileFullscreenView.render();
			this.$el.append(this.pictureTileFullscreenView.el);
		},
		closeFullscreen: function(e){
			//destroy fullscreen
			this.pictureTileFullscreenView.remove();
		},
		setContainerTemplate: function(heightParam, widthParam){
			var height = parseInt(heightParam, 10);
			var width = parseInt(widthParam, 10);

			//Set the default height and width values
			var heightParamStr = '300px';
			var widthParamStr = '100%';

			if(!isNaN(height)){
				heightParamStr = height + 'px';
			}

			if(!isNaN(width)){
				if(width > 0){
					widthParamStr = width + 'px';
				}
			}

			this.$el.css({ 'height': heightParamStr, 'width': widthParamStr });
		},
		setCollectionProperties: function(state){
			this.display = state;
			this.collection.setRows(parseInt(this.options.style[this.display].rows, 10));
			this.collection.setColumns(parseInt(this.options.style[this.display].columns, 10));
			this.collection.style = {
				tile: this.options.style[this.display].frameStyle || {},
			};
			//this.$el.css({'height': this.options.style[this.display].height + 'px', 'width': this.options.style[this.display].width + 'px'});
			this.setContainerTemplate(this.options.style[this.display].height, this.options.style[this.display].width);
			this.collection.setLoading(this.options.loading);
			this.collection.setViewSize();
			this.collection.setTransitionTime(this.options.timer);
		},
		el: $("#ajmebcShiftingTilesApp"),
		addState: function(key){
			var self = this;
			ssm.addState({
				id: key,
				query: self.options.style[key].query,
				onEnter: function(){
					self.setCollectionProperties(key);
				},
				onResize: function(){
					self.setCollectionProperties(key);
				}
			});
		},
		initialize: function(){
			//@TODO: put in some error handling
			this.options = ajmebc.ShiftingTiles || {};

			this.collection = new PictureTileCollection();

			var self = this;

			for(var key in this.options.style){
				self.addState(key);
			}
		},
		template: _.template(PictureTileContainerTemplate),
		render: function(){
			var self = this;

			if((typeof ajmebc.ShiftingTiles.data.pictures !== 'undefined') && (ajmebc.ShiftingTiles.data.pictures.length > 0)) {
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
			} else {
				console.log("AJMEBC ERROR: no data found. Loading Stopped.");
			}
		}
	});

	return PictureTileContainerDataView;
});
