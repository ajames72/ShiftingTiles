/*global define */
/*jshint esnext: true */
define(['jQuery', 'animations/Base', 'animations/Basic', 'animations/Fade'], function($, $B, Basic, Fade){
  var Animations = {
    Basic: Basic,
    Fade: Fade
  };

  return Animations;
});
