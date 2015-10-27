/*global define, require, requirejs, window, jQuery, underscore, backbone, console  */
define(['jQuery', 'underscore', 'backbone', '../models/PictureTileModel', '../views/PictureTileView', 'text!../templates/PictureTileRowTemplate.html'], function($, _, Backbone, PictureTileModel, PictureTileView, PictureTileRowTemplate){
	/**
	 * @name getRandomInt
	 * @param int min, int max
	 * @description Private helper function to get a random number.
	 * @returns random int
	 **/
	var getRandomInt = function(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};

	var PictureTileCollection = Backbone.Collection.extend({
		url: './content/json/pictures.json',
		model: PictureTileModel,
		viewSize: 6,
		slots: [],
		template: _.template(PictureTileRowTemplate),
		getRandomIndex: function(){
			var rand = getRandomInt(0, this.size());
			//Check number against currently allocated slots, that it has not yet been generated
			for(var x = 0; x < this.slots.length; x++){
				//If it has been used, get a new random number
				if(rand === this.slots[x]){
					rand = getRandomInt(0, this.size());
					//Start check again
					x = 0;
				}
			}

			return rand;
		},
		initializeSlots: function(){
			for(var i = 0; i < this.viewSize; i++){
				this.slots.push(this.getRandomIndex());
			}
		},
		renderNext: function(context){

			var removeSlotIndex = getRandomInt(0, (context.slots.length - 1));
			var getNewIndex = context.getRandomIndex();

			context.slots[removeSlotIndex] = getNewIndex;

			var cell = 'div[data-attr="'+removeSlotIndex+'"]';

			var pictureTileView = new PictureTileView({model: context.at(context.slots[removeSlotIndex]), el: $(cell)});
			pictureTileView.renderNext(removeSlotIndex);
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

				var pictureTileView = new PictureTileView({model: self.at(currentValue), el: $(row)});
				pictureTileView.render(index);
			});

			window.setInterval(this.renderNext, 2000, this);
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
