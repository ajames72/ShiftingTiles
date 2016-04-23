/*global define, jQuery, underscore, backbone  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', 'text!../templates/PictureTileDescriptionTemplate.html'], function($, _, Backbone, PictureTileDescriptionTemplate){
  var PictureTileDescriptionView = Backbone.View.extend({
    template: _.template(PictureTileDescriptionTemplate),
    tagName: 'div',
    className: 'ajmebc-shifting-tile-description',
    changeDescription: function(){
      //console.log(this.model.get('description'));
    },
    initialize: function(){
      this.model.on('change', this.changeDescription, this);
    },
    render: function(){
      this.$el.append(this.template({data: this.model.toJSON()}));
    }
  });

  return PictureTileDescriptionView;
});
