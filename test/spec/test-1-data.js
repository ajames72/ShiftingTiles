define(function (require) {

	var getImageFakeServer = sinon.fakeServer.create();
	var spyCallback = sinon.spy();
	var PictureTileCollection = require('collections/PictureTileCollection');
	var pictureTileCollection = new PictureTileCollection();
	var PictureTileModel = require('models/PictureTileModel');
	var pictureTileModel = new PictureTileModel();
	var state = 2;

	/*
	 * Collection settings
	 */
	pictureTileCollection.setLoading(ajmebc.ShiftingTiles.loading);
	pictureTileCollection.setRows(ajmebc.ShiftingTiles.style[state].rows);
	pictureTileCollection.setColumns(ajmebc.ShiftingTiles.style[state].columns);
	pictureTileCollection.setViewSize();
	pictureTileCollection.add(ajmebc.ShiftingTiles.data.pictures);

	/*
	 * Fake server responses
	 */
	 getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_1.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_1.png' ]
	);

	getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_2.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_2.png' ]
	);

	getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_3.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_3.png' ]
	);

	getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_4.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_4.png' ]
	);

	getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_5.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_5.png' ]
	);

	getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_6.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_6.png' ]
	);

	getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_7.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_7.png' ]
	);

	getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_8.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_8.png' ]
	);

	getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_9.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_9.png' ]
	);

	getImageFakeServer.respondWith(
		"GET", "/content/imgs/image_10.png",
		[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_10.png' ]
	);

	var p = pictureTileCollection.load();

	getImageFakeServer.respond();

	p.done(function(){
		getImageFakeServer.restore();
	});

	//Initialize the view slots
	var rowSelector = "div";
	for(var index = 0; index < pictureTileCollection.viewSize; index++){
		pictureTileCollection.initializeSlots(rowSelector, index);
	}

	describe("The Application", function(){

		beforeEach(function(){

		});

		it("should exist", function(){

			var App = require('app');

			var app = new App();

			expect(app).toBeDefined();
		});
	});

	describe("The PictureTileModel", function(){
		describe("Model Initialization", function(){

			beforeEach(function(){

			});

			it("should exist", function(){
				expect(pictureTileModel).toBeDefined();
			});

			it("should contain the 'src' default attribute", function(){
				expect(pictureTileModel.has('src')).toBe(true);
			});
		});

		describe("Model Attributes", function(){

			var _pictureTileModel = new PictureTileModel();
			var imgPath = "../content/images/";
			var id = "1";
			var description = "Test description";

			beforeEach(function(){
			});

			it("should have the default 'src' property set to an empty string", function(){
				expect(_pictureTileModel.get('src')).toBe('');
			});

			it("should set/get the 'src' property", function(){
				_pictureTileModel.set({src: imgPath});
				expect(_pictureTileModel.get('src')).toBe(imgPath);
			});
			it("should have the default 'id' property set to an empty string", function(){
				expect(_pictureTileModel.get('id')).toBe('');
			});

			it("should set/get the 'id' property", function(){
				_pictureTileModel.set({id: id});
				expect(_pictureTileModel.get('id')).toBe(id);
			});
			it("should have the default 'description' property set to an empty string", function(){
				expect(_pictureTileModel.get('description')).toBe('');
			});

			it("should set/get the 'description' property", function(){
				_pictureTileModel.set({description: description});
				expect(_pictureTileModel.get('description')).toBe(description);
			});
		});

		describe("Model Content Fetch", function(){

			var _pictureTileModel;
			var _fakeServer;
			var _spyCallback;

			var responseData = {
									"src": "/testlocation/testimage.png"
								};

			beforeEach(function(){
				_fakeServer = sinon.fakeServer.create();
				_spyCallback = sinon.spy();
				_pictureTileModel = new PictureTileModel();

				_fakeServer.respondWith(
					"GET",
					"./content/testcontent.json",
					[
						200,
						{"Content-Type": "application/json"},
						JSON.stringify(responseData)
					]
				);

				_pictureTileModel['url'] = './content/testcontent.json';

			});

			afterEach(function(){
				_fakeServer.restore();
				_spyCallback.reset();
			});

			it("should fetch data", function(){
				_pictureTileModel.fetch({
					success: function(){
						console.log("success")
					},
					fail: function(){
						console.log("fail");
					},
					error: function(jqxhr){
						console.log("error: " + jqxhr.toString());
					}
				});
				_fakeServer.respond();
				expect(_fakeServer.requests.length).toEqual(1);
				expect(_pictureTileModel.get('src')).toBe('/testlocation/testimage.png');
			});
		});
	});

	describe("Load images - random", function(){

		it("should load any images that exist", function(){
			expect(pictureTileCollection.size()).toBe(10);
		});

		it("should be a random image loading setting", function(){
			expect(pictureTileCollection.loading).toBe('random');
		});

		it("should set the view size", function(){
			expect(pictureTileCollection.viewSize).toBe(6);
		});

		it("should initialize the image slots", function(){
			expect(pictureTileCollection.slots.length).toBe(pictureTileCollection.viewSize);
			// Checking all the slots are unique
			for(var i  = 1; i < pictureTileCollection.slots.length; i++){
				for(var x = 0; x < i; x++){
					expect(pictureTileCollection.slots[x].model.get('imgSrcIndex')).not.toEqual(pictureTileCollection.slots[i].model.get('imgSrcIndex'));
				}
			}
		});

		it("should get the next model", function(){
			var nextModel = pictureTileCollection.getNextModel();
			expect(nextModel instanceof PictureTileModel).toBe(true);
		});

		it("should insert a new random image into a random slots", function(){

			var check_no_of_times = 15;
			var count  = 0;

			do{
				//test all images in the array are unique
				for(var i  = 1; i < pictureTileCollection.slots.length; i++){
					for(var x = 0; x < i; x++){
						expect(pictureTileCollection.slots[x].model.get('imgSrcIndex')).not.toEqual(pictureTileCollection.slots[i].model.get('imgSrcIndex'));
					}
				}
				//Generates a new image reference
				pictureTileCollection.renderNext(pictureTileCollection);
				count++;
			} while (count < check_no_of_times);
		});
	});



	describe("Load images - sequence", function(){

		beforeEach(function(){
			pictureTileCollection.length = 0;
			pictureTileCollection.slots.length = 0;
			pictureTileCollection.imgSrcIndex = -1; //Set to -1 to compensate for initial increment
			pictureTileCollection.setLoading('sequence');
			pictureTileCollection.setRows(1);
			pictureTileCollection.setColumns(4);
			pictureTileCollection.setViewSize();

			var _p = pictureTileCollection.load();

			getImageFakeServer.respond();

			_p.done(function(){
				getImageFakeServer.restore();
			});

			//Initialize the view slots
			var rowSelector = "div";
			for(var index = 0; index < pictureTileCollection.viewSize; index++){
				pictureTileCollection.initializeSlots(rowSelector);
				pictureTileCollection.removeSlotIndex = index;
			}
		});

		it("should be a sequence image loading setting", function(){
			expect(pictureTileCollection.loading).toBe('sequence');
		});

		it("should set the index property in the model", function(){
			var counter = 0;
			// check the src property in the models
			pictureTileCollection.each(function(model){
				expect(model.get('imgSrcIndex')).toBe(counter);
				counter++;
			});
		});

		it("should get the next image in the sequence", function(){

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([4,1,2,3]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([4,5,2,3]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([4,5,6,3]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([4,5,6,7]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([8,5,6,7]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([8,9,6,7]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([8,9,0,7]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([8,9,0,1]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([2,9,0,1]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([2,3,0,1]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([2,3,4,1]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([2,3,4,5]);

			pictureTileCollection.renderNext(pictureTileCollection);
			expect(collectToArr(pictureTileCollection.slots)).toEqual([6,3,4,5]);
		});

	});
	/*
	describe("The Application Route", function(){

		var ApplicationRouter = require('router');
		var router;
		var routeSpy;

		beforeEach(function(){
			router = new ApplicationRouter();
			routeSpy = sinon.spy();
			// To ensure that the route method and event is always fired,
			// we navigate away somewhere else silently during the setup phase, just to ensure that the URL fragments are different.
			// http://tinnedfruit.com/2011/04/26/testing-backbone-apps-with-jasmine-sinon-3.html
			router.navigate("elsewhere");
		});

		it("fires the index route with a blank hash", function() {
			router.bind("route:index", routeSpy);
			router.navigate("", true);
			expect(routeSpy.calledOnce).toBe(true);
		});
	});
	*/
});
