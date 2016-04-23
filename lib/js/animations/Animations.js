/*global define */
/*jshint esnext: true */
define(['jQuery', 'animations/Base', 'animations/Basic', 'animations/Fade', 'animations/Slide'], function($, $B, Basic, Fade, Slide){
  var Animations = {
    Basic: Basic,
    Fade: Fade,
    Slide: Slide
  };

  return Animations;
});
