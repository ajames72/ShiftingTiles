/*global define, require, requirejs, window, jQuery, underscore, backbone, console, Image  */
/*jshint esnext: true */
define(['jQuery', 'underscore', 'backbone', '../models/PictureTileModel', '../views/PictureTileView', '../views/PictureTileRowView'], function($, _, Backbone, PictureTileModel, PictureTileView, PictureTileRowView){
	/**
	 * @property LOADING_SETTINGS
	 * @description private
	 * @type {Array}
	 * @default ['sequence', 'random']
	 */
	var LOADING_SETTINGS = ['sequence', 'random'];
	/**
	 * Private helper function to get a random number.
	 * @param {Array} arr, {string} elemenet
	 * @returns {int} random
	 **/
	var contains = function(arr, elemenet)
	{
		for (var i in arr) {
			if (arr[i] === elemenet) {
				return true;
			}
		}
		return false;
	};
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
	 * @returns {int} percentage
	 **/
	var getPercentage = function(numerator, denominator){
		var percentage = ((numerator / denominator) * 100);
		return percentage;
	};
	var ProgressBar = function(denominator){
		this.percentage = getPercentage(1, denominator);
	};
	ProgressBar.prototype.progress = 0;
	ProgressBar.prototype.setProgress = function(){
		this.progress += this.percentage;
		$('.ajmebc-shifting-tile-progress').css({width: (this.progress + '%')});
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
		 * @property
		 * @description
		 * @type {}
		 * @default
		 */
		templateWidth: '0%',
		/**
		 * @property
		 * @description
		 * @type {}
		 * @default
		 */
		rowHeight: '0%',
		/**
		 * @property
		 * @description
		 * @type {}
		 * @default
		 */
		loading: 'sequence',
		/**
		 * @property
		 * @description
		 * @type {}
		 * @default
		 */
		imgSrcIndex: 0,
		style: {},
		/**
		 *
		 * @param none
		 * @returns none
		 */
		setRows: function(val) {
			this.rows = val || 0;
			this.rowHeight = getPercentage(1, this.rows) + '%';
		},
		/**
		 *
		 * @param none
		 * @returns none
		 */
		setColumns: function(val) {
			this.columns = val || 0;
			this.templateWidth = getPercentage(1, this.columns) + '%';
		},
		/**
		 *
		 * @param none
		 * @returns none
		 */
		setLoading: function(val) {
			if(contains(LOADING_SETTINGS, val)) {
				this.loading = val;
			} else {
				this.loading = LOADING_SETTINGS[0];
			}
		},
		/**
		 *
		 * @param none
		 * @returns none
		 */
		setViewSize: function() {
			//Set the view size from the number of available rows and columns
			this.viewSize = this.rows * this.columns;
		},
		/**
		 *
		 * @param none
		 * @returns none
		 */
		getSequentialIndex: function(){
			this.imgSrcIndex++;

			if(this.imgSrcIndex >= this.size()){
				this.imgSrcIndex = 0;
			}
		},
		/**
		 * Get a random index to reference the available images
		 * @param none
		 * @returns {int} rand
		 */
		getRandomIndex: function(){

			var rand = getRandomInt(0, this.size());
			var x = 0;
			//Check the randomly selected model src  against those already allocated
			if(typeof this.slots[x] !== 'undefined'){
				do {
					var subject = this.at(parseInt(rand, 10)).get('src');
					var comparator = this.slots[x].model.get('src');
					//If it has been used, get a new random number
					if(subject === comparator){
						rand = getRandomInt(0, this.size());
						//Start check again
						x = -1;
					}
					x++;
				} while(x < this.slots.length);
			}

			return rand;
		},
		/**
		 *
		 * @param none
		 * @returns PictureTileModel
		 */
		getNextModel: function(){
			//Get the slot to replace
			if(this.removeSlotIndex >= (this.slots.length - 1)){
				this.removeSlotIndex = 0;
			} else {
				this.removeSlotIndex++;
			}

			switch(this.loading){
				case LOADING_SETTINGS[1]:
					this.imgSrcIndex = this.getRandomIndex();
				break;
				default:
					this.getSequentialIndex();
				break;
			}
			var nextModel = this.at(this.imgSrcIndex).clone();
			return nextModel;
		},
		/**
		 * Initialises the available image slots with image indexes.
		 * @param none
		 * @returns none
		 */
		initializeSlots: function(index){
			var pictureTileView;
			pictureTileView = new PictureTileView({model: this.getNextModel(), attributes: {'data-attr': index}});
			pictureTileView.$el.css({width: this.templateWidth});
			/*
			for(var key in this.style){
				pictureTileView.$el.css(key, this.style[key]);
			}
			*/
			this.slots.push(pictureTileView);
		},
		/**
		 * This renders the next image
		 * @param {PictureTileCollection} context
		 * @returns none
		 */
		renderNext: function(self){
			//Get the next image to display
			var nextModelFromCollection = self.getNextModel();
			self.slots[self.removeSlotIndex].model.set({imgSrcIndex: nextModelFromCollection.get('imgSrcIndex'), src: nextModelFromCollection.get('src'), id: nextModelFromCollection.get('id')});
		},
		/**
		 * This renders the initial image selection
		 * @param none
		 * @returns none
		 */
		render: function(){
			var self = this;
			var rowSelector;
			var rowIndex = 0;

			//Removes the loading div
			this.el.empty();

			if(this.viewSize <= this.size()){
				for(var index = 0; index < this.viewSize; index++){
					var rowTemplate;
					//Create new row
					if((index === 0) || ((index % self.columns) === 0)){
						rowTemplate = new PictureTileRowView();
						rowTemplate.$el.css({ height: self.rowHeight });
						self.el.append(rowTemplate.el);
					}
					//Loads image indexes into slot array
					this.initializeSlots(index);
					//append to the row
					rowTemplate.$el.append(self.slots[index].el);
					//Override removeSlotIndex because this is set intially according the available slots (in function getNextModel), which at this point are not set
					this.removeSlotIndex = index;
				}
			} else {
				console.log("Error: less images than available image cells.");
			}

			// Start timer to swap images
			if(this.slots.length > 0){
					//Render all the images
					for(var i = 0; i < this.slots.length; i++) {
						this.slots[i].render(i);
					}

					window.setInterval(this.renderNext, 3000, this);
			} else {
				console.log("Error: no image cells available.");
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
			var modelIndex = 1;

			var progressBar = new ProgressBar(this.size());
			//Preload each image in the collection
			this.each(function(data){
				var p = self.preload(data);

				p.done(function(){
					//Only set index if image has successfully loaded
					data.set("imgSrcIndex", self.imgSrcIndex++);

				}).fail(function(){}).always(function(){
					//If all src's in the collection have been checked, it's ok to render
					progressBar.setProgress();
					modelIndex++;
					if(modelIndex === size){
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
