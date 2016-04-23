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
    $(this.cells.second).css({'display': 'none'});
  };

  Basic.prototype.animation = function(newSrc, slotIndex, imgProperties){
    this.setCells(slotIndex);

    $(this.cells.first).attr('src', newSrc);

    //Align the image
    var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.first);
    FP.fitCenter(this.cells.first);
    /*
    //console.log('imgProperties.margin ' + parseInt(imgProperties.margin, 10));
    var margin = parseInt(imgProperties.margin, 10);
    switch(FP.orientation) {
      case 'portrait':
        var top = centerVertical(FP.maxHeight, FP.windowHeight);
        if(!isNaN(margin)){
          //top += margin;
        }

        $(this.cells.first).css({'width': '100%', 'height': '', 'top': top + 'px', 'left': '0'});

        break;
      case 'landscape':
        var left = centerHorizontal(FP.maxWidth, FP.windowWidth);

        if(!isNaN(margin)){
          //left += margin;
        }

        $(this.cells.first).css({'height': '100%', 'width': '', 'top': '0', 'left': left + 'px'});

        break;
    }
    */
    this.switchPolarity();
  };

  return Basic;
});
