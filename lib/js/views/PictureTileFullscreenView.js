/*global define, jQuery, underscore, backbone  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', 'text!../templates/PictureTileFullscreenTemplate.html'], function($, _, Backbone, PictureTileFullscreenTemplate){
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
    events: {
      'click': 'closeFullscreen'
    },
    closeFullscreen: function(e){
      this.$el.trigger('closeFullscreenEvent', this.model);
    },
		initialize: function(){
		},
		render: function(){
      this.$el.append(this.template({data: this.model.toJSON()}));
		},
    remove: function(){
      this.undelegateEvents();
      this.$el.remove();
    }
  });

  return PictureTileFullscreenView;
});
