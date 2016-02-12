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

  Basic.prototype.initialize = function(){
  };

  Basic.prototype.animation = function(newSrc, slotIndex){
    var self = this;

    this.cells.first = $('div[data-attr="'+slotIndex+'"] img.cell-1');
    this.cells.second = $('div[data-attr="'+slotIndex+'"] img.cell-2');


    this.switchPolarity();
  };

  return Basic;
});
