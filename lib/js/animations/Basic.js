/*global define */
/*jshint esnext: true */
define(['jQuery', 'animations/Base'], function($, $B){
  var Basic = $B || {};

  Basic.prototype.initialize = function(){
    console.log("Basic init");
  };

  return Basic;
});
