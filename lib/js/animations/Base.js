/*global define */
/*jshint esnext: true */
define(['jQuery'], function($){
  var Base = function(){};
  Base.prototype.index = 0;
  Base.prototype.polarity = 1;
  Base.prototype.cells = {first: "", second: ""};
  Base.prototype.setIndex = function(value){
    this.index = value;
  };
  Base.prototype.getIndex = function(){
    return this.index;
  };
  Base.prototype.switchPolarity = function(){
    if(this.polarity === 1){
      this.polarity = 2;
    } else {
      this.polarity = 1;
    }
  };
  Base.prototype.getPolarity = function(){
    return this.polarity;
  };
  Base.prototype.setCells = function(index){
    this.cells.first = $('div[data-attr="'+index+'"] img.cell-1');
    this.cells.second = $('div[data-attr="'+index+'"] img.cell-2');
  }

  return Base;
});
