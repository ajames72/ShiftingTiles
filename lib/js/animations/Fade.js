/*global define, console */
/*jshint esnext: true */
define(['jQuery', 'animations/Base'], function($, $B){
  var Fade = $B || {};
  Fade.prototype.imageWidth = '0px';
  Fade.prototype.imageHeight = '0px';
  Fade.prototype.initialize = function(settings){
    console.log("Fade init");

    //this.cells.first = $('div[data-attr="'+settings['slotIndex']+'"] img:nth-child(1)');
    //this.cells.second = $('div[data-attr="'+settings['slotIndex']+'"] img:nth-child(2)');
    this.cells.first = $('div[data-attr="'+settings['slotIndex']+'"] img#cell-1');
    this.cells.second = $('div[data-attr="'+settings['slotIndex']+'"] img#cell-2');
    this.imageHeight = this.cells.first.height() + 'px';
    this.imageWidth = this.cells.first.width() + 'px';
    console.log(this.imageHeight);
    //$(this.cells.first).css({ position: 'relative', top: '0px', left: '0px', height: h, width: w });
    //$(this.cells.second).css({ display: 'none', position: 'relative', top: '-'+h+'px', left: '0px', height: h, width: w });

    //$(this.cells.first).css({ top: '0px' });
    //$(this.cells.second).css({ top: ('-' + this.imageHeight) });

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
/*
  Fade.prototype.animation = function(){
    console.log("Fade anim");

    if(this.getPolarity() === 1){
      $(this.cells.second).attr('src', this.getSrc());
      $(this.cells.first).fadeOut(2000);
      $(this.cells.second).fadeIn(2000);

    } else {
      $(this.cells.first).attr('src', this.getSrc());
      $(this.cells.second).fadeOut(2000);
      $(this.cells.first).fadeIn(2000);

    }

    this.switchPolarity();
  };
  */

  Fade.prototype.animation = function(){


    //console.log("this.getSrc() " + this.getSrc());
    if(this.getPolarity() === 1){
      var self = this;
      $(this.cells.second).attr('src', this.getSrc());
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
      var self = this;
      $(this.cells.first).attr('src', this.getSrc());
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



});
