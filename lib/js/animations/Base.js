/*global define */
/*jshint esnext: true */
define(['jQuery'], function($){
  var Base = function(){};
  Base.prototype.index = 0;
  Base.prototype.polarity = 1;
  Base.prototype.cells = {
    first: {
      container: "",
      imgElement: ""
    },
    second: {
      container: "",
      imgElement: ""
    }
  };
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
    this.cells.first = {
      container: $('div[data-attr="'+index+'"] .cell-1'),
      imgElement: $('div[data-attr="'+index+'"] .cell-1 img')
    };
    this.cells.second = {
      container: $('div[data-attr="'+index+'"] .cell-2'),
      imgElement: $('div[data-attr="'+index+'"] .cell-2 img')
    };
  };

  return Base;
});
