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
  var Fade = function(options){
    this.options = options;
  };
  Fade.prototype = Object.create($B.prototype);
  Fade.prototype.constructor = Fade;

  Fade.prototype.initialize = function(settings){
    this.setCells(settings['slotIndex']);
  };

  Fade.prototype.animation = function(newSrc, slotIndex, imgProperties){
    var self = this;
    this.setCells(slotIndex);

    if(this.getPolarity() === 1){

      $(this.cells.second.imgElement).attr('src', newSrc);
      var FP = new FullscreenPositioner(imgProperties.width, imgProperties.height, imgProperties.margin, imgProperties.margin, this.cells.first.imgElement);
      FP.fitCenter(this.cells.second.imgElement);

      //off
      $(this.cells.first.container).animate({
        opacity: 0
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });

      //On
      $(this.cells.second.container).animate({
        opacity: 1
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

      //Off
      $(this.cells.second.container).animate({
        opacity: 0
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });
      //On
      $(this.cells.first.container).animate({
        opacity: 1
      },
      {
        duration: self.options.timer,
        complete: function(){
        }
      });
    }

    this.switchPolarity();
  };

  return Fade;

});
