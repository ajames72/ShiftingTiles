/*global define */
define(['jQuery', 'animations/Slide', '../API/FullscreenPositioner'], function($, Slide, FullscreenPositioner){
  var SlideRight = function(options){
    this.slideAnim = new Slide(options);
  };

  SlideRight.prototype.initialize = function(settings) {
    this.slideAnim.initialize(settings);
    $(this.slideAnim.cells.first.container).css({'opacity': '1', 'left': '0'});
    $(this.slideAnim.cells.second.container).css({'opacity': '1', 'left': '-' + this.slideAnim.axis['x'] + 'px'});

    var FPF = new FullscreenPositioner(settings['model'].get('imgProperties').width, settings['model'].get('imgProperties').height, settings['model'].get('imgProperties').margin, settings['model'].get('imgProperties').margin, this.slideAnim.cells.first.imgElement);
    FPF.fitCenter(this.slideAnim.cells.first.imgElement);
  };

  SlideRight.prototype.animation = function(newSrc, slotIndex, imgProperties){
    this.slideAnim.animation(newSrc, slotIndex, imgProperties, function(newSrc, newSrcProperties, axis, animOnCell, animOffCell, duration){
      //Set the new image src
      $(animOnCell.imgElement).attr('src', newSrc);
      //Align the image in the cell
      var FP = new FullscreenPositioner(newSrcProperties.width, newSrcProperties.height, newSrcProperties.margin, newSrcProperties.margin, animOnCell.imgElement);
      FP.fitCenter(animOnCell.imgElement);
      //Prepare the images for animation
      $(animOffCell.container).css({'opacity': '1', 'left': '0'});
      $(animOnCell.container).css({'opacity': '1', 'left': '-' + axis['x'] + 'px'});
      //animate
      $(animOffCell.container).css({'transform': 'translate(' + axis['x'] + 'px, 0)', 'transition': 'transform ' + duration + 's' });
      $(animOnCell.container).css({'transform': 'translate(' + axis['x'] + 'px, 0)', 'transition': 'transform ' + duration + 's' });

    });
  };

  return SlideRight;
});
