/*global define, console */
/*jshint esnext: true */
define(['jQuery', 'animations/Base'], function($, $B){
/*
  var Fade = function(){
    this.base = $B;
    this.base();
  };

  Fade.prototype = new $B;

*/
  var Fade = function(){};
  Fade.prototype = Object.create($B.prototype);
  Fade.prototype.constructor = Fade;

  Fade.prototype.initialize = function(settings){
    this.setCells(settings['slotIndex']);
  };

  Fade.prototype.animation = function(newSrc, slotIndex){
    var self = this;
    this.setCells(slotIndex);

    if(this.getPolarity() === 1){

      $(this.cells.second).attr('src', newSrc);
      //off
      $(this.cells.first).animate({
        opacity: 0
      },
      {
        duration: 1000,
        complete: function(){
        }
      });

      //On
      $(this.cells.second).animate({
        opacity: 1
      },
      {
        duration: 1000,
        complete: function(){
        }
      });

    } else {

      $(this.cells.first).attr('src', newSrc);
      //Off
      $(this.cells.second).animate({
        opacity: 0
      },
      {
        duration: 1000,
        complete: function(){
        }
      });
      //On
      $(this.cells.first).animate({
        opacity: 1
      },
      {
        duration: 1000,
        complete: function(){
        }
      });
    }

    this.switchPolarity();
  };

  return Fade;

});
