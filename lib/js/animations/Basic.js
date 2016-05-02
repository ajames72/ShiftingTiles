/*global define */
/*jshint esnext: true */
define(['jQuery', 'animations/Base', '../API/FullscreenPositioner'], function($, $B, FullscreenPositioner){
  /*
  var Basic = function(){
    this.base = $B;
    this.base();
  };
  Basic.prototype = new $B;
  */
  var Basic = function(options){
    this.options = options;
  };
  Basic.prototype = Object.create($B.prototype);
  Basic.prototype.constructor = Basic;

  Basic.prototype.initialize = function(settings){
    this.setCells(settings['slotIndex']);
    $(this.cells.second.container).css({'display': 'none'});
    var FPF = new FullscreenPositioner(settings['model'].get('imgProperties').width, settings['model'].get('imgProperties').height, settings['model'].get('imgProperties').margin, settings['model'].get('imgProperties').margin, this.cells.first.imgElement);
    FPF.fitCenter(this.cells.first.imgElement);
  };

  Basic.prototype.animation = function(newSrc, slotIndex, imgProperties){
    this.setCells(slotIndex);

    $(this.cells.first.imgElement).attr('src', newSrc);

    //Align the image
    var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.first.imgElement);
    FP.fitCenter(this.cells.first.imgElement);

    this.switchPolarity();
  };

  return Basic;
});
