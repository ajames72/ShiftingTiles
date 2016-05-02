/*global define, console */
/*jshint esnext: true */
define(['jQuery', 'animations/Base', '../API/FullscreenPositioner'], function($, $B, FullscreenPositioner){
/*
  var Fade = function(){
    this.base = $B;
    this.base();
  };

  Fade.prototype = new $B;

*/
  /*
  var animateCell = function(newSrc, newSrcProperties, axis, animOnCell, animOffCell, duration){
    //Set the new image src
    $(animOnCell.imgElement).attr('src', newSrc);
    //Align the image in the cell
    var FP = new FullscreenPositioner(newSrcProperties.width, newSrcProperties.height, newSrcProperties.margin, newSrcProperties.margin, animOnCell.imgElement);
    FP.fitCenter(animOnCell.imgElement);
    //Prepare the images for animation
    $(animOffCell.container).css({'opacity': '1', 'left': '0'});
    $(animOnCell.container).css({'opacity': '1', 'left': axis['x'] + 'px'});
    //animate
    var timer = parseInt(duration, 10);
    timer /= 1000;
    if(!isNaN(timer)){
      $(animOffCell.container).css({'transform': 'translate(-' + axis['x'] + 'px, 0)', 'transition': 'transform ' + timer + 's' });
      $(animOnCell.container).css({'transform': 'translate(-' + axis['x'] + 'px, 0)', 'transition': 'transform ' + timer + 's' });
    } else {
      $(animOffCell.container).css({'transform': 'translate(-' + axis['x'] + 'px, 0)', 'transition': 'transform 2s' });
      $(animOnCell.container).css({'transform': 'translate(-' + axis['x'] + 'px, 0)', 'transition': 'transform 2s' });
    }
  };
  */
  var Slide = function(options){
    this.options = options;
  };
  Slide.prototype = Object.create($B.prototype);
  Slide.prototype.constructor = Slide;
  Slide.prototype.axis = {
    x: 0,
    y: 0
  };

  Slide.prototype.initialize = function(settings){
    this.setCells(settings['slotIndex']);

    this.axis['x'] = $(this.cells.first.container).width();
    this.axis['y'] = $(this.cells.first.container).height();
    //$(this.cells.first.container).css({'opacity': '1', 'left': '0'});
    //$(this.cells.second.container).css({'opacity': '1', 'left': this.axis['x'] + 'px'});

    //var FPF = new FullscreenPositioner(settings['model'].get('imgProperties').width, settings['model'].get('imgProperties').height, settings['model'].get('imgProperties').margin, settings['model'].get('imgProperties').margin, this.cells.first.imgElement);
    //FPF.fitCenter(this.cells.first.imgElement);
  };

  Slide.prototype.animation = function(newSrc, slotIndex, imgProperties, animateCell){

    var self = this;
    this.setCells(slotIndex);
    //Reset tranformations
    $(this.cells.first.container).css({'transform': '', 'transition': '' });
    $(this.cells.second.container).css({'transform': '', 'transition': '' });

    var timer = parseInt(self.options.timer, 10);
    
    if(!isNaN(timer)){
      timer /= 1000;
    } else {
      timer = 2;
    }

    if(this.getPolarity() === 1){
      animateCell(newSrc, imgProperties, this.axis, this.cells.second, this.cells.first, timer);
    } else {
      animateCell(newSrc, imgProperties, this.axis, this.cells.first, this.cells.second, timer);
    }


    /*
    if(this.getPolarity() === 1){

      $(this.cells.second.imgElement).attr('src', newSrc);
      var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.second.imgElement);
      FP.fitCenter(this.cells.second.imgElement);
      $(this.cells.first.container).css({'left': '0', 'z-index': '1'});
      $(this.cells.second.container).css({'opacity': '1', 'left': '194px', 'z-index': '2'});

      //off
      $(this.cells.first.container).animate({
        'left': '-194px'
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });

      //On
      $(this.cells.second.container).animate({
        'left': '0px'
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });

    } else {

      $(this.cells.first.imgElement).attr('src', newSrc);
      var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.first.imgElement);
      FP.fitCenter(this.cells.first.imgElement);
      $(this.cells.second.container).css({'opacity': '1', 'left': '0', 'z-index': '1'});
      $(this.cells.first.container).css({'opacity': '1', 'left': '194px', 'z-index': '2'});

      //Off
      $(this.cells.second.container).animate({
        'left': '-194px'
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });

      //On
      $(this.cells.first.container).animate({
        'left': '0px'
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });
    }
    */

    this.switchPolarity();
  };

  return Slide;

});
