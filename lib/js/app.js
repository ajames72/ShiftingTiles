/*global define */
define(['jQuery', 'underscore', 'backbone', 'router'], function($, _, Backbone, ApplicationRouter) {
  var App = function() {
  	this.Router = new ApplicationRouter();
  };

  App.prototype = {
  };

  return App;
});