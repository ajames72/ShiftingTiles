/*global define */
define(['jQuery', 'animations/Slide', '../API/FullscreenPositioner'], function($, Slide, FullscreenPositioner){
  var SlideDown = function(options){
    this.slideAnim = new Slide(options);
  };

  SlideDown.prototype.initialize = function(settings) {
    this.slideAnim.initialize(settings);
    $(this.slideAnim.cells.first.container).css({'opacity': '1', 'left': '0', 'top': '0'});
    $(this.slideAnim.cells.second.container).css({'opacity': '1', 'left': '0', 'top': '-' + this.slideAnim.axis['y'] + 'px'});

    var FPF = new FullscreenPositioner(settings['model'].get('imgProperties').width, settings['model'].get('imgProperties').height, settings['model'].get('imgProperties').margin, settings['model'].get('imgProperties').margin, this.slideAnim.cells.first.imgElement);
    FPF.fitCenter(this.slideAnim.cells.first.imgElement);
  };

  SlideDown.prototype.animation = function(newSrc, slotIndex, imgProperties){
    this.slideAnim.animation(newSrc, slotIndex, imgProperties, function(newSrc, newSrcProperties, axis, animOnCell, animOffCell, duration){
      //Set the new image src
      $(animOnCell.imgElement).attr('src', newSrc);
      //Align the image in the cell
      var FP = new FullscreenPositioner(newSrcProperties.width, newSrcProperties.height, newSrcProperties.margin, newSrcProperties.margin, animOnCell.imgElement);
      FP.fitCenter(animOnCell.imgElement);
      //Prepare the images for animation
      $(animOffCell.container).css({'opacity': '1', 'top': '0'});
      $(animOnCell.container).css({'opacity': '1', 'top': '-' + axis['y'] + 'px'});
      //animate
      $(animOffCell.container).css({'transform': 'translate(0, ' + axis['y'] + 'px)', 'transition': 'transform ' + duration + 's' });
      $(animOnCell.container).css({'transform': 'translate(0, ' + axis['y'] + 'px)', 'transition': 'transform ' + duration + 's' });

    });
  };

  return SlideDown;
});
