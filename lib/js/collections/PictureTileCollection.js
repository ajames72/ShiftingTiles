/*global define, require, requirejs, window, jQuery, underscore, backbone, console, Image  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', '../models/PictureTileModel', '../views/PictureTileView', 'text!../templates/PictureTileRowTemplate.html'], function($, _, Backbone, PictureTileModel, PictureTileView, PictureTileRowTemplate){
	var contains = function(arr, elem)
	{
		for (var i in arr) {
			if (arr[i] === elem) {
				return true;
			}
		}
		return false;
	};
	var LOADING_SETTINGS = ['sequence', 'random'];
	/**
	 * Private helper function to get a random number.
	 * @param {int} min, {int} max
	 * @returns {int} random
	 **/
	var getRandomInt = function(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};
	/**
	 * Private helper function to get a percentage value§.
	 * @param {int} numerator, {int} denominator
	 * @returns {string} percentage
	 **/
	var getPercentage = function(numerator, denominator){
		var percentage = ((numerator / denominator) * 100);
		//Hack to fit row
		//@TODO: Fix cell css
		//return (percentage - 1) + '%';
		return percentage + '%';
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
		 * @property rows
		 * @description The number of rows that will created in the grid
		 * @type {int}
		 * @default 6
		 */
		rows: 0,
		/**
		 * @property columns
		 * @description The number of columns that will be created in the grid
		 * @type {int}
		 * @default 6
		 */
		columns: 0,
		/**
		 * @property viewSize
		 * @description The number of images that will be displayed in the view
		 * @type {int}
		 * @default 6
		 */
		viewSize: 0,
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
		templateWidth: '0%',
		rowHeight: '0%',
		loading: 'sequence',
		setRows: function(val) {
			this.rows = val || 0;
			this.rowHeight = getPercentage(1, this.rows);
		},
		setColumns: function(val) {
			this.columns = val || 0;
			this.templateWidth = getPercentage(1, this.columns);
		},
		setLoading: function(val) {
			if(contains(LOADING_SETTINGS, val)) {
				this.loading = val;
			}
		},
		getSequentialIndex: function(){

			var lookBackIndex = (this.removeSlotIndex - 1);

			if(lookBackIndex < 0){
				lookBackIndex  = (this.slots.length - 1);
			}

			//We want to check the value in the previous slot.
			var index = this.slots[lookBackIndex];
			//Then increment the index value for the next slot
			index++;

			if(index >= this.size()){
				index = 0;
			}

			return index;
		},
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
		getNewSequentialIndex: function(){
			//Get the slot to replace
			if(this.removeSlotIndex >= (this.slots.length - 1)){
				this.removeSlotIndex = 0;
			} else {
				this.removeSlotIndex++;
			}
			//Get the index to insert into the slot
			var nextValue = this.getSequentialIndex();
			this.slots[this.removeSlotIndex] = nextValue;
		},
		/**
		 * Gets a new index value in order to replace a current image. It checks the currently displayed images to ensure duplicate images are not displayed.
		 * @param none
		 * @returns none
		 */
		getNewRandomIndex: function(){
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
			//Set the view size from the number of available rows and columns
			this.viewSize = this.rows * this.columns;

			//Only add to slots if the collection size exceeds the number of cells
			if(this.viewSize <= this.size()){
				for(var i = 0; i < this.viewSize; i++){
					switch(this.loading){
						case LOADING_SETTINGS[1]:
							this.slots.push(this.getRandomIndex());
						break;
						default:
							this.slots.push(i);
						break;
					}
				}
			}
		},
		/**
		 * This renders the next image
		 * @param {PictureTileCollection} context
		 * @returns none
		 */
		renderNext: function(self){
			//Get the next image to display
			switch(self.loading){
				case LOADING_SETTINGS[1]:
					self.getNewRandomIndex();
				break;
				default:
					self.getNewSequentialIndex();
				break;
			}

			const cell = 'div[data-attr="' + self.removeSlotIndex + '"]';

			var pictureTileView = new PictureTileView({model: self.at(self.slots[self.removeSlotIndex]), el: $(cell)});
			pictureTileView["width"] = self.templateWidth;
			pictureTileView.renderNext(self.removeSlotIndex);
		},
		/**
		 * This renders the initial image selection
		 * @param none
		 * @returns none
		 */
		render: function(){
			const self = this;
			var row;
			var rowIndex = 0;

			//Loads image indexes into slot array
			this.initializeSlots();

			//Removes the loading div
			this.el.empty();

			//Display the images
			this.slots.forEach(function(currentValue, index){
				// append rows
				self.appendRowToContainer(index);

				if((index === 0) || ((index % self.columns) === 0)){
					rowIndex++;
					row = "div.ajmebc-shifting-tile-row:nth-child("+ rowIndex +")";
				}

				var pictureTileView = new PictureTileView({model: self.at(currentValue), el: $(row)});
				pictureTileView["width"] = self.templateWidth;
				pictureTileView.render(index);
			});
			// Start timer to swap images
			if(this.slots.length > 0){
					window.setInterval(this.renderNext, 2000, this);
			}
		},
		appendRowToContainer: function(index){
			if((index === 0) || ((index % this.columns) === 0)){
				this.el.append(this.template({height: this.rowHeight}));
			}
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
