define(function(require){

	var PictureTileCollection = require('collections/PictureTileCollection');
	var PictureTileModel = require('models/PictureTileModel');
	var state = 2;



  describe("The PictureTileCollection", function(){

		describe("Collection Initialization", function(){

      var pictureTileModel, pictureTileCollection;

			beforeEach(function(){
        pictureTileModel = new PictureTileModel();
        pictureTileCollection = new PictureTileCollection();


        pictureTileCollection.setLoading(ajmebc.ShiftingTiles.loading);
        pictureTileCollection.setRows(ajmebc.ShiftingTiles.style[state].rows);
        pictureTileCollection.setColumns(ajmebc.ShiftingTiles.style[state].columns);
        pictureTileCollection.setViewSize();
        pictureTileCollection.add(ajmebc.ShiftingTiles.data.pictures);
			});

			afterEach(function(){
				pictureTileCollection.setLoading('random');
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


    describe("Load images - random", function(){
      var _fakeServer, _spyCallback, _pictureTileModel, _pictureTileCollection;

      beforeEach(function(){
        _fakeServer = sinon.fakeServer.create();
        _spyCallback = sinon.spy();
        _pictureTileModel = new PictureTileModel();
        _pictureTileCollection = new PictureTileCollection();

        /*
         * Collection settings
         */
        _pictureTileCollection.setLoading(ajmebc.ShiftingTiles.loading);
        _pictureTileCollection.setRows(ajmebc.ShiftingTiles.style[state].rows);
        _pictureTileCollection.setColumns(ajmebc.ShiftingTiles.style[state].columns);
        _pictureTileCollection.setViewSize();
        _pictureTileCollection.add(ajmebc.ShiftingTiles.data.pictures);

        /*
         * Fake server responses
         */
         _fakeServer.respondWith(
          "GET", "/content/imgs/image_1.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_1.png' ]
        );

        _fakeServer.respondWith(
          "GET", "/content/imgs/image_2.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_2.png' ]
        );

        _fakeServer.respondWith(
          "GET", "/content/imgs/image_3.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_3.png' ]
        );

        _fakeServer.respondWith(
          "GET", "/content/imgs/image_4.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_4.png' ]
        );

        _fakeServer.respondWith(
          "GET", "/content/imgs/image_5.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_5.png' ]
        );

        _fakeServer.respondWith(
          "GET", "/content/imgs/image_6.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_6.png' ]
        );

        _fakeServer.respondWith(
          "GET", "/content/imgs/image_7.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_7.png' ]
        );

        _fakeServer.respondWith(
          "GET", "/content/imgs/image_8.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_8.png' ]
        );

        _fakeServer.respondWith(
          "GET", "/content/imgs/image_9.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_9.png' ]
        );

        _fakeServer.respondWith(
          "GET", "/content/imgs/image_10.png",
          [ 200, { "Content-Type": "image/png" }, '/content/imgs/image_10.png' ]
        );
        /*
        var fakeResolved = function() {
            return {
                then: function() {
                    //callback();
                    _pictureTileCollection.each(function(model){
                      model.set("imgSrcIndex", _pictureTileCollection.imgSrcIndex++);
                    });

                }
            }
        }
        */
        //var stub = sinon.stub(_pictureTileCollection, "load", fakeResolved());

        var p = _pictureTileCollection.load();

        _fakeServer.respond();

        //var stub = sinon.stub(object, "method");
      });

      afterEach(function(){
        _fakeServer.restore();
        _spyCallback.reset();
      });

      it("should load any images that exist", function(){
        expect(_pictureTileCollection.size()).toBe(10);
      });

      it("should be a random image loading setting", function(){
        expect(_pictureTileCollection.loading).toBe('random');
      });

      it("should set the view size", function(){
        expect(_pictureTileCollection.viewSize).toBe(6);
      });

      it("should initialize the image slots", function(){
        expect(_pictureTileCollection.slots.length).toBe(_pictureTileCollection.viewSize);
        // Checking all the slots are unique
        for(var i  = 1; i < _pictureTileCollection.slots.length; i++){
          for(var x = 0; x < i; x++){
            expect(_pictureTileCollection.slots[x].model.get('imgSrcIndex')).not.toEqual(_pictureTileCollection.slots[i].model.get('imgSrcIndex'));
          }
        }
      });

      it("should get the next model", function(){
        var nextModel = _pictureTileCollection.getNextModel();
        expect(nextModel instanceof PictureTileModel).toBe(true);
      });

      it("should insert a new random image into a random slots", function(){

        var check_no_of_times = 15;
        var count  = 0;

        do{
          //test all images in the array are unique
          for(var i  = 1; i < _pictureTileCollection.slots.length; i++){
            for(var x = 0; x < i; x++){
              expect(_pictureTileCollection.slots[x].model.get('imgSrcIndex')).not.toEqual(_pictureTileCollection.slots[i].model.get('imgSrcIndex'));
            }
          }
          //Generates a new image reference
          _pictureTileCollection.renderNext(_pictureTileCollection);
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


		describe("Data fetch", function(){

			var _fakeServer, _spyCallback, _pictureTileModel, _pictureTileCollection;

			beforeEach(function(){
				_fakeServer = sinon.fakeServer.create();
				_spyCallback = sinon.spy();
				_pictureTileModel = new PictureTileModel();
				_pictureTileCollection = new PictureTileCollection();

				/*
				 * Collection settings
				 */
				_pictureTileCollection.setLoading(ajmebc.ShiftingTiles.loading);
				_pictureTileCollection.setRows(ajmebc.ShiftingTiles.style[state].rows);
				_pictureTileCollection.setColumns(ajmebc.ShiftingTiles.style[state].columns);
				_pictureTileCollection.setViewSize();
				_pictureTileCollection.add(ajmebc.ShiftingTiles.data.pictures);

				/*
				 * Fake server responses
				 */
				 _fakeServer.respondWith(
					"GET", "/content/imgs/image_1.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_1.png' ]
				);

				_fakeServer.respondWith(
					"GET", "/content/imgs/image_2.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_2.png' ]
				);

				_fakeServer.respondWith(
					"GET", "/content/imgs/image_3.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_3.png' ]
				);

				_fakeServer.respondWith(
					"GET", "/content/imgs/image_4.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_4.png' ]
				);

				_fakeServer.respondWith(
					"GET", "/content/imgs/image_5.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_5.png' ]
				);

				_fakeServer.respondWith(
					"GET", "/content/imgs/image_6.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_6.png' ]
				);

				_fakeServer.respondWith(
					"GET", "/content/imgs/image_7.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_7.png' ]
				);

				_fakeServer.respondWith(
					"GET", "/content/imgs/image_8.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_8.png' ]
				);

				_fakeServer.respondWith(
					"GET", "/content/imgs/image_9.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_9.png' ]
				);

				_fakeServer.respondWith(
					"GET", "/content/imgs/image_10.png",
					[ 200, { "Content-Type": "image/png" }, '/content/imgs/image_10.png' ]
				);
        /*
        var fakeResolved = function() {
            return {
                then: function() {
                    //callback();
                    _pictureTileCollection.each(function(model){
                      model.set("imgSrcIndex", _pictureTileCollection.imgSrcIndex++);
                    });

                }
            }
        }
        */
        //var stub = sinon.stub(_pictureTileCollection, "load", fakeResolved());

				var p = _pictureTileCollection.load();

				_fakeServer.respond();

				//var stub = sinon.stub(object, "method");
			});

			afterEach(function(){
				_fakeServer.restore();
				_spyCallback.reset();
			});

			it("should add items to the collection", function(){
				expect(_pictureTileCollection.length).toEqual(10);
			});

			it("should get the src property in the model", function(){

				var counter = 0;
				// check the src property in the models
				_pictureTileCollection.each(function(model){
					counter++;
					expect(model.get('src')).toBe('/content/imgs/image_'+counter+'.png');
				});
				expect(counter).toBe(10);
			});

			it("should get the 'imgSrcIndex' property in the model", function(){
				var counter = 0;
				// check the imgSrcIndex property in the models
				_pictureTileCollection.each(function(model){
					expect(model.get('imgSrcIndex')).toBe(counter);
					counter++;
				});
			});

			it("should get the 'id' property in the model", function(){
				var counter = 1;
				// check the id property in the models
				_pictureTileCollection.each(function(model){
					expect(model.get('id')).toBe(counter.toString());
					counter++;
				});
			});

			it("should get the 'description' property in the model", function(){
				var counter = 1;
				// check the id property in the models
				_pictureTileCollection.each(function(model){
					var testString = "this is image " + counter.toString();
					expect(model.get('description')).toBe(testString);
					counter++;
				});
			});
		});
	});
});
