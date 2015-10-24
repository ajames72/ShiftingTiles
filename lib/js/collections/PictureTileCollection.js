/*global define, require, requirejs, window, jQuery, underscore, backbone, console  */
define(['jQuery', 'underscore', 'backbone', '../models/PictureTileModel', '../views/PictureTileView', 'text!../templates/PictureTileRowTemplate.html'], function($, _, Backbone, PictureTileModel, PictureTileView, PictureTileRowTemplate){

	var getRandomInt = function(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};

	var PictureTileCollection = Backbone.Collection.extend({
		url: './content/json/pictures.json',
		model: PictureTileModel,
		viewSize: 6,
		slots: [],
		template: _.template(PictureTileRowTemplate),
		initializeSlots: function(){
			for(var i = 0; i < this.viewSize; i++){
				var rand = getRandomInt(0, this.size());
				//Check number has not yet been used
				for(var x = 0; x < i; x++){
					//If it has been used, get a new random number
					if(rand === this.slots[x]){
						rand = getRandomInt(0, this.size());
						//Start check again
						x = 0;
					}
				}
				this.slots.push(rand);
			}
		},
		render: function(){
			var self = this;
			var row;

			this.slots.forEach(function(currentValue, index){

				// append rows
				if((index === 0) || (index === 3)){
					self.el.append(self.template());
				}

				if(index === 0){
					row = "div.row:nth-child(1)";
				} else if(index === 3){
					row = "div.row:nth-child(2)";
				}

				//this.el is defined in the container view
				var pictureTileView = new PictureTileView({model: self.at(currentValue), el: $(row)});
				pictureTileView.render(index);
			});
		},
		addOne: function(data){
			this.add(data);
		},
		addAll: function(){
			this.each(this.addOne, this);
		},
		parse: function(response){
			return response.pictures;
		}
	});

	return PictureTileCollection;
});
