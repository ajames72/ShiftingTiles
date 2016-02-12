/*global define, console */
/*jshint esnext: true */
define(['jQuery', 'animations/Base'], function($, $B){
/*
  var Fade = function(){
    this.base = $B;
    this.base();
  };

  Fade.prototype = new $B;

*/
  var Fade = function(){};
  Fade.prototype = Object.create($B.prototype);
  Fade.prototype.constructor = Fade;


  //Fade.prototype.imageWidth = '0px';
  //Fade.prototype.imageHeight = '0px';

  Fade.prototype.initialize = function(settings){
    this.cells.first = $('div[data-attr="'+settings['slotIndex']+'"] img#cell-1');
    this.cells.second = $('div[data-attr="'+settings['slotIndex']+'"] img#cell-2');
    //this.cells.second.css({opacity: 0});
    //this.imageHeight = this.cells.first.height() + 'px';
    //this.imageWidth = this.cells.first.width() + 'px';
  };
/*
  Fade.prototype.animation = function(){

    if(this.getPolarity() === 1){
      $(this.cells.second).attr('src', this.getSrc());
      $(this.cells.first).toggleClass('slidein', false);
      $(this.cells.first).toggleClass('slideout', true);
      $(this.cells.second).toggleClass('slidein', true);
      $(this.cells.second).toggleClass('slideout', false);
    } else {
      $(this.cells.first).attr('src', this.getSrc());
      $(this.cells.first).toggleClass('slidein', true);
      $(this.cells.first).toggleClass('slideout', false);
      $(this.cells.second).toggleClass('slidein', false);
      $(this.cells.second).toggleClass('slideout', true);
    }

    this.switchPolarity();
  };
*/

  Fade.prototype.animation = function(newSrc, slotIndex){
    var self = this;
    //this.setIndex(slotIndex);
    this.cells.first = $('div[data-attr="'+slotIndex+'"] img.cell-1');
    this.cells.second = $('div[data-attr="'+slotIndex+'"] img.cell-2');

    if(this.getPolarity() === 1){

      $(this.cells.second).attr('src', newSrc);
      //off
      $(this.cells.first).animate({
        //margin-left: '100%'
        opacity: 0
      },
      {
        duration: 1000,
        complete: function(){
          //console.log("complete - need to reset properties");
          //$(self.cells.first).css({ left: self.imageWidth });
        }
      });

      //On
      $(this.cells.second).animate({
        //margin-left: '0%'
        opacity: 1
      },
      {
        duration: 1000,
        complete: function(){
          //console.log("complete - need to reset properties");
          //$(self.cells.second).css({ left: '0px' });
        }
      });

    } else {

      $(this.cells.first).attr('src', newSrc);
      //Off
      $(this.cells.second).animate({
        //margin-left: '100%'
        opacity: 0
      },
      {
        duration: 1000,
        complete: function(){
          //console.log("complete - need to reset properties");
          //$(self.cells.second).css({ left: self.imageWidth });
        }
      });
      //$(this.selector + ':nth-child(2)').css('top', '0px');
      //On
      $(this.cells.first).animate({
        //margin-left: '0%'
        opacity: 1
      },
      {
        duration: 1000,
        complete: function(){
          //console.log("complete - need to reset properties");
          //$(self.cells.first).css({ left: '0px' });
        }
      });

    }

    this.switchPolarity();
  };

  return Fade;

});
