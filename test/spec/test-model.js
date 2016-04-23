define( function(require) {
  var PictureTileCollection = require('collections/PictureTileCollection');
  var PictureTileModel = require('models/PictureTileModel');
  var state = 2;

  describe("The PictureTileModel", function(){
    describe("Model Initialization", function(){

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
      });

      it("should exist", function(){
        expect(_pictureTileModel).toBeDefined();
      });

      it("should contain the 'src' default attribute", function(){
        expect(_pictureTileModel.has('src')).toBe(true);
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

});
