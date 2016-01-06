/*global define */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', 'views/PictureTileContainerDataView'], function($, _, Backbone, PictureTileContainerDataView) {
  var AJMEBC_ShiftingTiles_App = function() {
    //Bypassing the router as this will be embedded in the page.
    //Replace code below with router config to go here if router required.
    var pictureTileContainerDataView = new PictureTileContainerDataView();
    pictureTileContainerDataView.render();
  };

  AJMEBC_ShiftingTiles_App.prototype = {
  };

  return AJMEBC_ShiftingTiles_App;
});
