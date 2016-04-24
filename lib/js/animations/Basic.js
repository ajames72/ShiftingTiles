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
  var centerVertical = function(imgHeight, cellHeight) {

    var heightOffset = imgHeight - cellHeight;

    heightOffset /= 2;
    //Inverse to get top value
    if(heightOffset !== 0)
      heightOffset *= -1;

    return Math.round(heightOffset);
  }

  var centerHorizontal = function(imgWidth, cellWidth) {

    var widthOffset = imgWidth - cellWidth;

    widthOffset /= 2;

    if(widthOffset !== 0)
      widthOffset *= -1;

    return Math.round(widthOffset);
  }

  var Basic = function(options){
    this.options = options;
  };
  Basic.prototype = Object.create($B.prototype);
  Basic.prototype.constructor = Basic;

  Basic.prototype.initialize = function(settings){
    this.setCells(settings['slotIndex']);
    $(this.cells.second.container).css({'display': 'none'});
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
