/*global define, require, requirejs, window  */
/*jshint esnext: true */
requirejs.config({
  baseUrl: './js/',   //All js files loaded are relative to this URL
  paths: {
  	jQuery: "../../node_modules/jquery/dist/jquery.min",
  	underscore : "../../node_modules/backbone/node_modules/underscore/underscore-min",
  	backbone: "../../node_modules/backbone/backbone-min",
    bootstrap: "../../node_modules/bootstrap/dist/js/bootstrap.min",
    app: "app",
  	text: "text-master/text"
  },
  shim: {
    jQuery: {
      exports: '$'
    },
    underscore: {
    	deps: ['jQuery'],
      exports: '_'
    },
    backbone: {
      deps: ['jQuery', 'underscore'],
      exports: 'backbone'
    },
    bootstrap: {
      deps: ['jQuery'],
      exports: 'bootstrap'
    },
    app: {
      deps: ['jQuery', 'underscore',
      				'backbone', 'bootstrap']
    }
  }
});

require(['app'], function(AJMEBC_ShiftingTiles_App) {
  window.ShiftingTiles = new AJMEBC_ShiftingTiles_App();
});
