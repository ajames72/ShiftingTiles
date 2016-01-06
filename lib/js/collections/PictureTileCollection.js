/*global define, require, requirejs, window, jQuery, underscore, backbone, console, Image  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', '../models/PictureTileModel', '../views/PictureTileView', 'text!../templates/PictureTileRowTemplate.html'], function($, _, Backbone, PictureTileModel, PictureTileView, PictureTileRowTemplate){
	/**
	 * Private helper function to get a random number.
	 * @param {int} min, {int} max
	 * @returns {int} random
	 **/
	var getRandomInt = function(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};

	var PictureTileCollection = Backbone.Collection.extend({
		/**
		 * @property model
		 * @description the model class that the collection contains
		 * @type {PictureTileModel}
		 * @default
		 */
		model: PictureTileModel,
		/**
		 * @property viewSize
		 * @description The number of images that will be displayed in the view
		 * @type {int}
		 * @default 6
		 */
		viewSize: 6,
		/**
		 * @property removeSlotIndex
		 * @description This property is ued to store the index of the image that has been swapped last. It used to compare the next swap so thatthe same slot is not used twice in a row.
		 * @type {int}
		 * @default -1
		 */
		removeSlotIndex: -1,
		/**
		 * @property slots
		 * @description The image indexes are stored in the slots array. These slots correspond to the image frames in the view.
		 * @type {Array}
		 * @default []
		 */
		slots: [],
		/**
		 * @property template
		 * @description template definition for rendering each row
		 * @type {PictureTileRowTemplate}
		 * @default PictureTileRowTemplate
		 */
		template: _.template(PictureTileRowTemplate),
		/**
		 * Get a random index to reference the available images
		 * @param none
		 * @returns {int} rand
		 */
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
		/**
		 * Gets a new index value in order to replace a current image. It checks the currently displayed images to ensure duplicate images are not displayed.
		 * @param none
		 * @returns none
		 */
		getNewIndex: function(){
			var i;
			//ensure the same slot is not replaced more than once in sequence
			do{
				i = getRandomInt(0, this.slots.length);
			}while (this.removeSlotIndex === i);

			this.removeSlotIndex = i;
			//Get new value to insert
			const randValue = this.getRandomIndex();

			this.slots[this.removeSlotIndex] = randValue;
		},
		/**
		 * Initialises the available image slots with image indexes.
		 * @param none
		 * @returns none
		 */
		initializeSlots: function(){
			for(var i = 0; i < this.viewSize; i++){
				this.slots.push(this.getRandomIndex());
			}
		},
		/**
		 * This renders the next image
		 * @param {PictureTileCollection} context
		 * @returns none
		 */
		renderNext: function(context){
			context.getNewIndex();

			const cell = 'div[data-attr="'+context.removeSlotIndex+'"]';

			var pictureTileView = new PictureTileView({model: context.at(context.slots[context.removeSlotIndex]), el: $(cell)});
			pictureTileView.renderNext(context.removeSlotIndex);
		},
		/**
		 * This renders the initial image selection
		 * @param none
		 * @returns none
		 */
		render: function(){
			const self = this;
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
					row = "div.ajmebc-shifting-tile-row:nth-child(1)";
				} else if(index === 3){
					row = "div.ajmebc-shifting-tile-row:nth-child(2)";
				}

				var pictureTileView = new PictureTileView({model: self.at(currentValue), el: $(row)});
				pictureTileView.render(index);
			});
			// Start timer to swap images
			window.setInterval(this.renderNext, 2000, this);
		},
		 /**
		 * Checks if an image exists on the server
		 * If the image exists, the image is preloaded
		 * If the image does not exist, the model is deleted from the collection
 		 * @param {PictureTileModel} data
 		 * @returns {JQuery.Deferred.promise} deferredObject.promise
 		 */
		preload: function(data){
			const deferredObject = $.Deferred();
			const self  = this;

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
		/**
		* Loads the images in the image definition file and notifies the calling function when complete.
		* @param none
		* @returns {JQuery.Deferred.promise} deferredObject.promise
		*/
		load: function(){
			const deferredObject = $.Deferred();
			const self = this;
			//We need to store in a var because if images are missing, they will be deleted from the collection
			const size = this.size();
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
