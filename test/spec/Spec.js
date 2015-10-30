define(function (require) {

	describe("The Application", function(){
		it("should exist", function(){

			var App = require('App');

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

			beforeEach(function(){
				PictureTileModel = require('models/PictureTileModel');
				PictureTileCollection = require('collections/PictureTileCollection');
				pictureTileCollection = new PictureTileCollection();
			});

			it("should exist", function(){
				expect(pictureTileCollection).toBeDefined();
			});
			it("should contain a PictureTileModel", function(){
				expect(new pictureTileCollection.model() instanceof PictureTileModel).toBe(true);
			});
			it("should contain a viewSize setting set to 6", function(){
				expect(pictureTileCollection.viewSize).toBe(6);
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
				pictureTileCollection.slots.length = 0;
				fakeServer.restore();
				spyCallback.reset();
			});

			it("should get random image index", function(){
				pictureTileCollection.fetch();
				fakeServer.respond();

				var check_no_of_times = 15;
				for(var i = 0; i < check_no_of_times; i++){
					//Testing that it does not exceed the size of the collection
					var rand = pictureTileCollection.getRandomIndex();
					expect(rand < pictureTileCollection.size()).toBe(true);
				}
			});

			it("should initialize the image slots", function(){
				pictureTileCollection.fetch();
				fakeServer.respond();

				pictureTileCollection.initializeSlots();

				expect(pictureTileCollection.slots.length).toBe(pictureTileCollection.viewSize);

				// Checking all the slots are unique
				for(var i  = 1; i < pictureTileCollection.slots.length; i++){
					for(var x = 0; x < i; x++){
						expect(pictureTileCollection.slots[x] === pictureTileCollection.slots[i]).toBe(false);
					}
				}
			});

			it("should insert a new image into the slots", function(){

				pictureTileCollection.fetch();
				fakeServer.respond();

				pictureTileCollection.initializeSlots();

				var check_no_of_times = 15;
				var count  = 0;

				do{
					for(var i  = 0; i < pictureTileCollection.slots.length; i++){
						for(var x = 0; x < i; x++){
							expect(pictureTileCollection.slots[x]).not.toBe(pictureTileCollection.slots[i]);
						}
					}

					//Generates a new image reference
					pictureTileCollection.getNewIndex();

					count++;
				} while (count < check_no_of_times);

			});


			it("should display only 6 items", function(){
				pictureTileCollection.fetch();
				fakeServer.respond();
				//pictureTileCollection.render();
				var model0 = pictureTileCollection.at(0);
				expect(model0.get('src')).toBe("/content/imgs/image_1.png");
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
			//expect(routeSpy).toHaveBeenCalledWith();
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
			/*it("should create a list element", function() {
				expect(pictureContainerView.el.nodeName).toEqual("DIV");
			});*/
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
