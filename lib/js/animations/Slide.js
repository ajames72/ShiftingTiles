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

    $(this.cells.first.container).css({'opacity': '1', 'left': '0'});
    $(this.cells.second.container).css({'opacity': '1', 'left': '194px'});

  };

  Slide.prototype.animation = function(newSrc, slotIndex, imgProperties){

    var self = this;
    this.setCells(slotIndex);

    $(this.cells.first.container).removeClass('slide-left');
    $(this.cells.second.container).removeClass('slide-left');

    if(this.getPolarity() === 1){
      //Get the new src
      $(this.cells.second.imgElement).attr('src', newSrc);
      //Align the image in the cell
      var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.second.imgElement);
      FP.fitCenter(this.cells.second.imgElement);
      //Prepare the images for animation
      $(this.cells.first.container).css({'opacity': '1', 'left': '0'});
      $(this.cells.second.container).css({'opacity': '1', 'left': '194px'});
      //animate
      $(this.cells.first.container).addClass('slide-left');
      $(this.cells.second.container).addClass('slide-left');
    } else {

      $(this.cells.first.imgElement).attr('src', newSrc);
      var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.first.imgElement);
      FP.fitCenter(this.cells.first.imgElement);
      $(this.cells.second.container).css({'opacity': '1', 'left': '0'});
      $(this.cells.first.container).css({'opacity': '1', 'left': '194px'});
      $(this.cells.second.container).addClass('slide-left');
      $(this.cells.first.container).addClass('slide-left');

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
