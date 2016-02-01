/*global define */
/*jshint esnext: true */
define(['jQuery'], function($){
  var Base = function(){};
  Base.prototype.index = 0;
  Base.prototype.src = undefined;
  Base.prototype.polarity = 1;
  Base.prototype.cells = {first: "", second: ""};
  Base.prototype.setIndex = function(value){
    this.index = value;
  };
  Base.prototype.setSrc = function(value){
    this.src = value;
  };
  Base.prototype.getSrc = function(){
    return this.src;
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
  /*Base.prototype.animation = function(anim1Callback, anim2Callback){


    if(this.getPolarity() === 1){

      anim1Callback();

    } else {

      anim2Callback();

    }

    this.switchPolarity();
  };*/
  return Base;
});
