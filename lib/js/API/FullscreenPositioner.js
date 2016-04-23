/*global define, jQuery, window */
define(['jQuery'], function($){
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
  var FullscreenPositioner = function(propertyWidth, propertyHeight, marginH, marginV, container){
    this.elementWidth = propertyWidth || 0;
    this.elementHeight = propertyHeight || 0;

    var mH = 0;
    var mV = 0;

    if(marginH !== undefined) {
      mH = parseInt(marginH, 10);
    }
    if(marginV !== undefined){
      mV = parseInt(marginV, 10);
    }

    this.margin = {
      top: mV,
      right: mH,
      bottom: mV,
      left: mH
    };

    this.container = container || undefined;
  };

  FullscreenPositioner.prototype.maxWidth = 0;
  FullscreenPositioner.prototype.maxHeight = 0;
  FullscreenPositioner.prototype.maxViewWidth = 0;
  FullscreenPositioner.prototype.maxViewHeight = 0;
  FullscreenPositioner.prototype.windowHeight = 0;
  FullscreenPositioner.prototype.windowWidth = 0;
  FullscreenPositioner.prototype.orientation = 'landscape';

  FullscreenPositioner.prototype.setWindowDimensions = function(){
    console.log('this.container ' + this.container);
    if((this.container !== undefined) && ($(this.container).length)) {
      this.windowHeight = $(this.container).height();
      this.windowWidth = $(this.container).width();
    } else {
      this.windowHeight = $(window).height();
      this.windowWidth = $(window).width();
    }

    this.maxViewHeight = this.windowHeight;
    this.maxViewHeight -= this.margin.top;
    this.maxViewHeight -= this.margin.bottom;

    this.maxViewWidth = this.windowWidth;
    this.maxViewWidth -= this.margin.left;
    this.maxViewWidth -= this.margin.right;
  };

  FullscreenPositioner.prototype.setFullscreenViewDimensions = function(){
    var widthRatio = this.elementWidth / this.maxViewWidth;
    var heightRatio = this.elementHeight / this.maxViewHeight;

    if(widthRatio >= heightRatio) {
      this.maxWidth = this.elementWidth / widthRatio;
      this.maxHeight = this.elementHeight / widthRatio;
    } else {
      this.maxWidth = this.elementWidth / heightRatio;
      this.maxHeight = this.elementHeight / heightRatio;
    }
  };

  FullscreenPositioner.prototype.getOrientation = function(){
    if(this.elementHeight > this.elementWidth) {
      this.orientation = 'portrait';
    } else {
      this.orientation = 'landscape';
    }
  };

  FullscreenPositioner.prototype.fitCenter = function(rule){
    this.getOrientation();

    this.windowHeight = $(this.container).parent().height();
    this.windowWidth = $(this.container).parent().width();

    var widthRatio = this.elementWidth / this.windowWidth;
    var heightRatio = this.elementHeight / this.windowHeight;

    switch (this.orientation) {
      case 'portrait':
        this.maxWidth = this.elementWidth / widthRatio;
        this.maxHeight = this.elementHeight / widthRatio;

        break;
      case 'landscape':
        this.maxWidth = this.elementWidth / heightRatio;
        this.maxHeight = this.elementHeight / heightRatio;

        break;
      default:

    }

    //this.maxWidth -= this.margin.right;
    //this.maxHeight -= this.margin.top;
    switch(this.orientation) {
      case 'portrait':
        var top = centerVertical(this.maxHeight, this.windowHeight);
        //if(!isNaN(margin)){
          //top += margin;
        //}

        $(rule).css({'width': '100%', 'height': '', 'top': top + 'px', 'left': '0'});

        break;
      case 'landscape':
        var left = centerHorizontal(this.maxWidth, this.windowWidth);

        //if(!isNaN(margin)){
          //left += margin;
        //}

        $(rule).css({'height': '100%', 'width': '', 'top': '0', 'left': left + 'px'});

        break;
    }

  }

  return FullscreenPositioner;
});
