/*global define, require, requirejs, window  */
/*jshint esnext: true */
/**
 * @licence ShiftingTiles - v1.0.0 - 2016-03-21
 * https://github.com/jamesa26/ShiftingTiles
 * Copyright (c) 2016 AJ & MEBC Ltd; * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
requirejs.config({
  baseUrl: './js/',   //All js files loaded are relative to this URL
  paths: {
  	jQuery: "../../node_modules/jquery/dist/jquery.min",
  	underscore : "../../node_modules/backbone/node_modules/underscore/underscore-min",
  	backbone: "../../node_modules/backbone/backbone-min",
    bootstrap: "../../node_modules/bootstrap/dist/js/bootstrap.min",
    ssm: '../../node_modules/simplestatemanager/dist/ssm.min',
    //ssm: '../../node_modules/simplestatemanager/src/ssm',
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
		ssm: {
			exports: 'ssm'
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
