/**
 * Global configuration object
 **/
var ajmebc = ajmebc || {};
ajmebc.ShiftingTiles = {
	url: './content/json/pictures.json',
	data: {"pictures": [
        { "src": "content/images/20140528_182558.jpg"},
        { "src": "content/images/8311987635_6f157d5ea1_o.jpg" },
        { "src": "content/images/8311987635_6f157d5ea1_oxxx.jpg" },
        { "src": "content/images/8590992191_2e96b12bbc_o.jpg" },
        { "src": "content/images/8591017723_6f72083658_o.jpg" },
        { "src": "content/images/8591031889_e72b08afa5_o.jpg" },
        { "src": "content/images/8876100671_442ac3b93e_o.jpg" },
        { "src": "content/images/8591017723_6f72083658_oxxx.jpg" },
        { "src": "content/images/8591031889_e72b08afa5_oxxx.jpg" },
        { "src": "content/images/8876100671_442ac3b93e_oxxx.jpg" },
        { "src": "content/images/IMG_1323_edited-2.jpg" },
        { "src": "content/images/IMG_1325_edited-2.jpg" },
        { "src": "content/images/IMG_3464_edited-1.jpg" },
        { "src": "content/images/IMG_3512_edited-1.jpg" },
        { "src": "content/images/IMG_3543.jpg" }
      ]},
	rows: 0,
	columns: 0
};

define(function (require) {

	describe("The Application", function(){
		it("should exist", function(){

			var App = require('app');

			var app = new App();

			expect(app).toBeDefined();
		});
	});

	describe("The PictureTileModel", function(){
		describe("Initialization", function(){
			var PictureTileModel;
			var pictureTileModel;

			beforeEach(function(){
				PictureTileModel = require('models/PictureTileModel');

				pictureTileModel = new PictureTileModel();
			});

			it("should exist", function(){
				expect(pictureTileModel).toBeDefined();
			});

			it("should contain the 'src' default attribute", function(){
				expect(pictureTileModel.has('src')).toBe(true);
			});
		});

		describe("Attributes", function(){
			var PictureTileModel;
			var pictureTileModel;
			var imgPath = "../content/images/";

			beforeEach(function(){
				PictureTileModel = require('models/PictureTileModel');

				pictureTileModel = new PictureTileModel();
			});

			it("should have the default 'src' attribute set to an empty string", function(){
				expect(pictureTileModel.get('src')).toBe('');
			});

			it("should set/get the src attribute", function(){
				pictureTileModel.set({src: imgPath});
				expect(pictureTileModel.get('src')).toBe(imgPath);
			});
		});

		describe("Content Fetch", function(){
			var PictureTileModel;
			var pictureTileModel;
			var fakeServer;
			var spyCallback;
			var url = '/testcontenturl/'
			var responseData = {
									"src": "/testlocation/testimage.png"
								};

			beforeEach(function(){
				fakeServer = sinon.fakeServer.create();
				spyCallback = sinon.spy();
				PictureTileModel = require('models/PictureTileModel');
				pictureTileModel = new PictureTileModel();

				fakeServer.respondWith(
					"GET",
					"./content/pictures.json",
					[
						200,
						{"Content-Type": "application/json"},
						JSON.stringify(responseData)
					]
				);

				pictureTileModel['url'] = './content/pictures.json';

			});

			afterEach(function(){
				fakeServer.restore();
				spyCallback.reset();
			});

			it("should fetch data", function(){
				pictureTileModel.fetch({
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
				fakeServer.respond();
				expect(fakeServer.requests.length).toEqual(1);
				expect(pictureTileModel.get('src')).toBe('/testlocation/testimage.png');
			});
		});
	});

	describe("The PictureTileCollection", function(){
		describe("Initialization", function(){
			var PictureTileCollection;
			var PictureTileModel;
			var pictureTileCollection;
			var pictureTileCollectionUrl = "./content/json/pictures.json";

			beforeEach(function(){
				PictureTileModel = require('models/PictureTileModel');
				PictureTileCollection = require('collections/PictureTileCollection');
				pictureTileCollection = new PictureTileCollection();
				pictureTileCollection.url = "./content/json/pictures.json";
			});

			it("should exist", function(){
				expect(pictureTileCollection).toBeDefined();
			});
			it("should contain a PictureTileModel", function(){
				expect(new pictureTileCollection.model() instanceof PictureTileModel).toBe(true);
			});
			it("should set the view size", function(){
				pictureTileCollection.initializeSlots();

				expect(pictureTileCollection.viewSize).toBe(0);
			});
			it("should contain a viewSize setting set to 6", function(){
				pictureTileCollection.setRows(2);
				pictureTileCollection.setColumns(3);

				pictureTileCollection.initializeSlots();

				expect(pictureTileCollection.viewSize).toBe(6);
			});
			it("should set the url property", function(){
				expect(pictureTileCollection.url).toBe(pictureTileCollectionUrl);
			});

			//@TODO: Unit tests for setter functions
			it("should set the loading mode", function(){
				var test1 = 'sequence';
				var test2 = 'random';

				pictureTileCollection.setLoading(test1);
				expect(pictureTileCollection.loading).toBe(test1);

				pictureTileCollection.setLoading(test2);
				expect(pictureTileCollection.loading).toBe(test2);
			});

			it("should set the default loading mode", function(){
				var defaultSetting = 'sequence';
				var test1 = 'somevalue';
				var test2 = -100;
				var test3;

				pictureTileCollection.setLoading(test1);
				expect(pictureTileCollection.loading).toBe(defaultSetting);

			});
		});

		describe("Content fetch", function(){
			var PictureTileCollection;
			var pictureTileCollection;
			var PictureTileModel;
			var pictureTileModel;
			var fakeServer;
			var spyCallback;
			var responseData = {"pictures":
														[
															{ "src": "/content/imgs/image_1.png" },
															{ "src": "/content/imgs/image_2.png" },
															{ "src": "/content/imgs/image_3.png" },
															{ "src": "/content/imgs/image_4.png" },
															{ "src": "/content/imgs/image_5.png" }
														]
													};


			beforeEach(function(){
				fakeServer = sinon.fakeServer.create();
				spyCallback = sinon.spy();
				PictureTileCollection = require('collections/PictureTileCollection');
				pictureTileCollection = new PictureTileCollection();
				pictureTileCollection.url = ajmebc.ShiftingTiles.url;
				PictureTileModel = require('models/PictureTileModel');
				pictureTileModel = new PictureTileModel();


				fakeServer.respondWith(
					"GET",
					"./content/json/pictures.json",
					[
						200,
						{"Content-Type": "application/json"},
						JSON.stringify(responseData)
					]
				);
			});

			afterEach(function(){
				fakeServer.restore();
				spyCallback.reset();
				pictureTileCollection.length = 0;
				pictureTileCollection.slots.length = 0;
			});

			it("should make the correct request", function(){
				pictureTileCollection.fetch();
				fakeServer.respond();
				expect(fakeServer.requests.length).toEqual(1);
			});

			it("should add items to the collection", function(){
				pictureTileCollection.fetch();
				fakeServer.respond();
				expect(pictureTileCollection.length).toEqual(5);
			});

			it("should set the src property in the model", function(){
				pictureTileCollection.fetch();
				fakeServer.respond();

				var counter = 0;
				// check the src property in the models
				pictureTileCollection.each(function(model){
					counter++;
					expect(model.get('src')).toBe('/content/imgs/image_'+counter+'.png');
				});
				expect(counter).toBe(5);
			});

		});


		describe("Data fetch", function(){
			var PictureTileCollection;
			var pictureTileCollection;
			var PictureTileModel;
			var pictureTileModel;
			var responseData = {"pictures":
														[
															{ "src": "/content/imgs/image_1.png" },
															{ "src": "/content/imgs/image_2.png" },
															{ "src": "/content/imgs/image_3.png" },
															{ "src": "/content/imgs/image_4.png" },
															{ "src": "/content/imgs/image_5.png" }
														]
													};


			beforeEach(function(){
				PictureTileCollection = require('collections/PictureTileCollection');
				pictureTileCollection = new PictureTileCollection();
				PictureTileModel = require('models/PictureTileModel');
				pictureTileModel = new PictureTileModel();
				pictureTileCollection.add(responseData.pictures);
			});

			afterEach(function(){
				pictureTileCollection.length = 0;
				pictureTileCollection.slots.length = 0;
			});

			it("should add items to the collection", function(){
				expect(pictureTileCollection.length).toEqual(5);
			});

			it("should set the src property in the model", function(){

				var counter = 0;
				// check the src property in the models
				pictureTileCollection.each(function(model){
					counter++;
					expect(model.get('src')).toBe('/content/imgs/image_'+counter+'.png');
				});
				expect(counter).toBe(5);
			});

			it("should not load any images that do not exist", function(){

				var getImageFakeServer = sinon.fakeServer.create();
				getImageFakeServer.respondWith(
					"GET",
					"/content/imgs/image_1.png",
					[
						200,
						{ "Content-Type": "application/json" },
						'[{"test":"success"}]'
					]
				);

				getImageFakeServer.respondWith(
					"GET",
					"/content/imgs/image_2.png",
					[
						200,
						{ "Content-Type": "application/json" },
						'[{"test":"success"}]'
					]
				);

				getImageFakeServer.respondWith(
					"GET",
					"/content/imgs/image_3.png",
					[
						200,
						{ "Content-Type": "application/json" },
						'[{"test":"success"}]'
					]
				);

				getImageFakeServer.respondWith(
					"GET",
					"/content/imgs/image_4.png",
					[
						200,
						{ "Content-Type": "application/json" },
						'[{"test":"success"}]'
					]
				);

				getImageFakeServer.respondWith(
					"GET",
					"/content/imgs/image_5.png",
					[
						404,
						{ "Content-Type": "application/json" },
						'[{"test":"error"}]'
					]
				);

				var p = pictureTileCollection.load();
				getImageFakeServer.respond();

				p.done(function(){
					expect(pictureTileCollection.size()).toBe(4);

					getImageFakeServer.restore();
				});

			});

		});


		describe("Rendering", function(){

			var PictureTileCollection;
			var pictureTileCollection;
			var PictureTileModel;
			var pictureTileModel;
			var fakeServer;
			var spyCallback;
			var responseData = {"pictures":
														[
															{ "src": "/content/imgs/image_1.png" },
															{ "src": "/content/imgs/image_2.png" },
															{ "src": "/content/imgs/image_3.png" },
															{ "src": "/content/imgs/image_4.png" },
															{ "src": "/content/imgs/image_5.png" },
															{ "src": "/content/imgs/image_6.png" },
															{ "src": "/content/imgs/image_7.png" },
															{ "src": "/content/imgs/image_8.png" },
															{ "src": "/content/imgs/image_9.png" },
															{ "src": "/content/imgs/image_10.png" }
														]
													};


			beforeEach(function(){
				fakeServer = sinon.fakeServer.create();
				spyCallback = sinon.spy();
				PictureTileCollection = require('collections/PictureTileCollection');
				pictureTileCollection = new PictureTileCollection();
				pictureTileCollection.url = ajmebc.ShiftingTiles.url;
				PictureTileModel = require('models/PictureTileModel');
				pictureTileModel = new PictureTileModel();

				fakeServer.respondWith(
					"GET",
					"./content/json/pictures.json",
					[
						200,
						{"Content-Type": "application/json"},
						JSON.stringify(responseData)
					]
				);

				pictureTileCollection.fetch();
				fakeServer.respond();
			});

			afterEach(function(){
				pictureTileCollection.slots.length = 0;
				fakeServer.restore();
				spyCallback.reset();
			});

			it("should get random image index", function(){
				pictureTileCollection.setLoading('random');
				pictureTileCollection.setRows(2);
				pictureTileCollection.setColumns(3);
				var check_no_of_times = 15;
				for(var i = 0; i < check_no_of_times; i++){
					//Testing that it does not exceed the size of the collection
					var rand = pictureTileCollection.getRandomIndex();
					expect(rand < pictureTileCollection.size()).toBe(true);
				}
			});

			it("should get the next image in the sequence", function(){
				pictureTileCollection.setLoading('sequence');
				pictureTileCollection.setRows(4);
				pictureTileCollection.setColumns(1);
				pictureTileCollection.initializeSlots();

				pictureTileCollection.getNewSequentialIndex();

				expect(pictureTileCollection.slots).toEqual([4,1,2,3]);

			});

			it("should get the next image in the sequence", function(){
				pictureTileCollection.setLoading('sequence');
				pictureTileCollection.setRows(4);
				pictureTileCollection.setColumns(1);
				pictureTileCollection.initializeSlots();

				pictureTileCollection.getNewSequentialIndex();
				expect(pictureTileCollection.slots).toEqual([4,1,2,3]);

				pictureTileCollection.getNewSequentialIndex();
				expect(pictureTileCollection.slots).toEqual([4,5,2,3]);

				pictureTileCollection.getNewSequentialIndex();
				expect(pictureTileCollection.slots).toEqual([4,5,6,3]);

				pictureTileCollection.getNewSequentialIndex();
				expect(pictureTileCollection.slots).toEqual([4,5,6,7]);

				pictureTileCollection.getNewSequentialIndex();
				expect(pictureTileCollection.slots).toEqual([8,5,6,7]);

				pictureTileCollection.getNewSequentialIndex();
				expect(pictureTileCollection.slots).toEqual([8,9,6,7]);

				pictureTileCollection.getNewSequentialIndex();
				expect(pictureTileCollection.slots).toEqual([8,9,0,7]);

				pictureTileCollection.getNewSequentialIndex();
				expect(pictureTileCollection.slots).toEqual([8,9,0,1]);
			});



			it("should initialize the image slots", function(){
				pictureTileCollection.setLoading('random');
				pictureTileCollection.setRows(2);
				pictureTileCollection.setColumns(3);
				pictureTileCollection.initializeSlots();

				expect(pictureTileCollection.slots.length).toBe(pictureTileCollection.viewSize);

				// Checking all the slots are unique
				for(var i  = 1; i < pictureTileCollection.slots.length; i++){
					for(var x = 0; x < i; x++){
						expect(pictureTileCollection.slots[x] === pictureTileCollection.slots[i]).toBe(false);
					}
				}
			});

			it("should insert a new random image into a random slots", function(){
				pictureTileCollection.setLoading('random');
				pictureTileCollection.setRows(2);
				pictureTileCollection.setColumns(3);
				pictureTileCollection.initializeSlots();

				var check_no_of_times = 15;
				var count  = 0;

				do{
					//test all images in the array are unique
					for(var i  = 0; i < pictureTileCollection.slots.length; i++){
						for(var x = 0; x < i; x++){
							expect(pictureTileCollection.slots[x]).not.toBe(pictureTileCollection.slots[i]);
						}
					}

					//Generates a new image reference
					pictureTileCollection.getNewRandomIndex();

					count++;
				} while (count < check_no_of_times);

			});

			it("should load any images that exist", function(){

				var getImageFakeServer = sinon.fakeServer.create();
				getImageFakeServer.respondWith(
					"GET",
					"/content/imgs/image_1.png",
					[
						200,
						{ "Content-Type": "application/json" },
						'[{"test":"success"}]'
					]
				);
				/*
				var testModel = new PictureTileModel();
				testModel.set('src', "/content/imgs/image_1.png");
				pictureTileCollection.add(testModel);
				*/
				var p = pictureTileCollection.load();
				getImageFakeServer.respond();

				p.done(function(){
					expect(pictureTileCollection.size()).toBe(1);

					getImageFakeServer.restore();
				});

			});

			it("should not load any images that do not exist", function(){

				var getImageFakeServer = sinon.fakeServer.create();
				getImageFakeServer.respondWith(
					"GET",
					"/content/imgs/image_1.png",
					[
						404,
						{ "Content-Type": "application/json" },
						'[{"test":"error"}]'
					]
				);

				var testModel = new PictureTileModel();
				testModel.set('src', "/content/imgs/image_1.png");
				pictureTileCollection.add(testModel);

				var p = pictureTileCollection.load();
				getImageFakeServer.respond();

				p.done(function(){
					expect(pictureTileCollection.size()).toBe(0);

					getImageFakeServer.restore();
				});

			});
		});
	});

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

	describe("the PictureTileContainerView", function(){
		var PictureTileContainerView;
		var PictureTileCollection;
		var pictureContainerView;

		beforeEach(function(){
			PictureTileContainerView = require('views/PictureTileContainerView');
			PictureTileCollection = require('collections/PictureTileCollection');
			pictureContainerView = new PictureTileContainerView();
		});

		describe("Instantiation", function() {
			it("should create an instance of PictureTileCollection", function(){
				expect(pictureContainerView.collection instanceof PictureTileCollection).toBe(true);
			});
		});
	});

	describe("the PictureTileView", function(){
		var PictureTileView;
		var pictureTileView;

		beforeEach(function(){
			PictureTileView = require('views/PictureTileView');
			pictureTileView = new PictureTileView();
		});

		describe("Instantiation", function() {

		});
	});
});
