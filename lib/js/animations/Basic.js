/*global define */
/*jshint esnext: true */
define(['jQuery', 'animations/Base'], function($, $B){
  /*
  var Basic = function(){
    this.base = $B;
    this.base();
  };
  Basic.prototype = new $B;
  */

  var Basic = function(){};
  Basic.prototype = Object.create($B.prototype);
  Basic.prototype.constructor = Basic;

  Basic.prototype.initialize = function(settings){
    console.log("init b");
    this.setCells(settings['slotIndex']);
    $(this.cells.second).css({'display': 'none'})
  };

  Basic.prototype.animation = function(newSrc, slotIndex){
    console.log("newSrc" + newSrc, " slotIndex "+slotIndex);
    this.setCells(slotIndex);

    $(this.cells.first).attr('src', newSrc);

    this.switchPolarity();
  };

  return Basic;
});
