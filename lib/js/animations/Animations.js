/*global define */
/*jshint esnext: true */
define(['jQuery', 'animations/Base', 'animations/Basic', 'animations/Fade', 'animations/SlideLeft', 'animations/SlideRight', 'animations/SlideUp', 'animations/SlideDown'], function($, $B, Basic, Fade, SlideLeft, SlideRight, SlideUp, SlideDown){
  var Animations = {
    Basic: Basic,
    Fade: Fade,
    //Slide: Slide,
    SlideLeft: SlideLeft,
    SlideRight: SlideRight,
    SlideUp: SlideUp,
    SlideDown: SlideDown,
  };

  return Animations;
});
