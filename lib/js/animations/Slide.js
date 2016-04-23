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
  var Slide = function(options){
    this.options = options;
  };
  Slide.prototype = Object.create($B.prototype);
  Slide.prototype.constructor = Slide;

  Slide.prototype.initialize = function(settings){
    this.setCells(settings['slotIndex']);

    //$(this.cells.first).addClass('slide');
    //$(this.cells.second).addClass('slide');
  };

  Slide.prototype.animation = function(newSrc, slotIndex, imgProperties){

    var self = this;
    this.setCells(slotIndex);
    $(this.cells.first).removeClass('slide-left');
    $(this.cells.second).removeClass('slide-left');

    if(this.getPolarity() === 1){
      //Get the new src
      $(this.cells.second).attr('src', newSrc);
      //Align the image in the cell
      var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.second);
      FP.fitCenter(this.cells.second);
      //Prepare the images for animation
      $(this.cells.first).css({'left': '0', 'z-index': '1'});
      $(this.cells.second).css({'opacity': '1', 'left': '194px', 'z-index': '2'});
      //animate
      $(this.cells.first).addClass('slide-left');
      $(this.cells.second).addClass('slide-left');
    } else {

      $(this.cells.first).attr('src', newSrc);
      var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.first);
      FP.fitCenter(this.cells.first);
      $(this.cells.second).css({'opacity': '1', 'left': '0', 'z-index': '1'});
      $(this.cells.first).css({'opacity': '1', 'left': '194px', 'z-index': '2'});
      $(this.cells.second).addClass('slide-left');
      $(this.cells.first).addClass('slide-left');

    }

    //$(this.cells.first).toggleClass('slide-action');
    //$(this.cells.second).toggleClass('slide-action');

    /*
    if(this.getPolarity() === 1){

      $(this.cells.second).attr('src', newSrc);
      var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.second);
      FP.fitCenter(this.cells.second);
      $(this.cells.first).css({'left': '0', 'z-index': '1'});
      $(this.cells.second).css({'opacity': '1', 'left': '200px', 'z-index': '2'});
      //off
      $(this.cells.first).animate({
        'left': '-200px'
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });

      //On

      $(this.cells.second).animate({
        'left': '0px'
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });

      //$(this.cells.first).addClass('slidein');
      //$(this.cells.second).addClass('slidein');

    } else {

      $(this.cells.first).attr('src', newSrc);
      var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.first);
      FP.fitCenter(this.cells.first);
      $(this.cells.second).css({'opacity': '1', 'left': '0', 'z-index': '1'});
      $(this.cells.first).css({'opacity': '1', 'left': '200px', 'z-index': '2'});

      //Off

      $(this.cells.second).animate({
        'left': '-200px'
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });

      //On
      $(this.cells.first).animate({
        'left': '0px'
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });

      //$(this.cells.first).addClass('slideout');
      //$(this.cells.second).addClass('slideout');

    }
    */

    this.switchPolarity();
  };

  return Slide;

});
