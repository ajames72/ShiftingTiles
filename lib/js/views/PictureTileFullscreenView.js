/*global define, jQuery, underscore, backbone  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', 'text!../templates/PictureTileFullscreenTemplate.html', '../API/FullscreenPositioner'], function($, _, Backbone, PictureTileFullscreenTemplate, FullscreenPositioner){
  var PictureTileFullscreenView = Backbone.View.extend({
    /**
		 * @property template
		 * @description
		 * @type {}
		 * @default
		 */
		template: _.template(PictureTileFullscreenTemplate),
    tagName: 'div',
    id: 'ajmebc-st-fullscreen',
    className: 'ajmebc-fullscreen-container',
    attributes: {
			/*'margin-horizontal': '',
      'margin-vertical': ''*/
		},
    fp: undefined,
    events: {
      'click #ajmebc-shifting-tile-fullscreen-close': 'closeFullscreen'
    },
    closeFullscreen: function(e){
      this.$el.trigger('closeFullscreenEvent', this.model);
    },
		initialize: function(){
      var imgProps = this.model.get('imgProperties');
      this.fp = new FullscreenPositioner(imgProps.width, imgProps.height, this.attributes['margin-horizontal'], this.attributes['margin-vertical'], this.attributes['margin-container']);
      this.fp.setWindowDimensions();
      this.fp.setFullscreenViewDimensions();
		},
		render: function(){
      this.$el.append(this.template({data: this.model.toJSON(), width: this.fp.maxWidth, height: this.fp.maxHeight}));
		},
    remove: function(){
      this.undelegateEvents();
      this.$el.remove();
    }
  });

  return PictureTileFullscreenView;
});
