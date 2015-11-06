/*global define, require, requirejs, window, jQuery, underscore, backbone, console, Image  */
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
		removeSlotIndex: -1,
		slots: [],
		template: _.template(PictureTileRowTemplate),
		getRandomIndex: function(){

			var rand = getRandomInt(0, this.size());
			var x = 0;
			//Check number against currently allocated slots, that it has not yet been generated
			do {
				//If it has been used, get a new random number
				if(parseInt(rand, 10) === parseInt(this.slots[x], 10)){
					rand = getRandomInt(0, this.size());
					//Start check again
					x = -1;
				}
				x++;
			} while(x < this.slots.length);

			return rand;
		},
		getNewIndex: function(){
			//Chooses slot to replace
			var i;
			//ensure the same slot is not replaced more than once in sequence
			do{
				i = getRandomInt(0, this.slots.length);
			}while (this.removeSlotIndex === i);

			this.removeSlotIndex = i;
			//Get new value to insert
			var randValue = this.getRandomIndex();

			this.slots[this.removeSlotIndex] = randValue;
		},
		initializeSlots: function(){
			for(var i = 0; i < this.viewSize; i++){
				this.slots.push(this.getRandomIndex());
			}
		},
		renderNext: function(context){
			context.getNewIndex();

			var cell = 'div[data-attr="'+context.removeSlotIndex+'"]';

			var pictureTileView = new PictureTileView({model: context.at(context.slots[context.removeSlotIndex]), el: $(cell)});
			pictureTileView.renderNext(context.removeSlotIndex);
		},
		render: function(){
			var self = this;
			var row;

			//Loads image indexes into slot array
			this.initializeSlots();

			//Removes the loading div
			this.el.empty();

			//Display the images
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
		/**
		 * Checks if an image exists on the server
		 * If image exists, preload the image into cache
		 * If the image does not exist, delete model from the collection
		 **/
		preload: function(data){

			var deferredObject = $.Deferred();

			var self  = this;
			$.ajax({
          url: data.get('src'),
          method: "GET",
          success: function (_data, textStatus, jqXHR) {
						//Preload the images
						var image = new Image();
						image.addEventListener("load", function(){

						});
						image.src = data.get('src');
            deferredObject.resolve();
          },
          error: function (jQhxr, errorCode, errorThrown) {
						console.log("Image " + data.get('src') + " failed to load");
						self.remove(data);
            deferredObject.reject();
          }
      });

			return deferredObject.promise();
		},
		load: function(){
			var deferredObject = $.Deferred();
			var self = this;
			//We need to store in a var because if images are missing, they will be deleted from the collection
			var size = this.size();
			var i = 1;
			//Preload each image in the collection
			this.each(function(data){
				var p = self.preload(data);

				p.done(function(){}).fail(function(){}).always(function(){
					//If all src's in the collection have been checked, it's ok to render
					i++;
					if(i === size){
						deferredObject.resolve();
					}
				});
			});
			return deferredObject.promise();
		},
		parse: function(response){
			return response.pictures;
		}
	});

	return PictureTileCollection;
});
