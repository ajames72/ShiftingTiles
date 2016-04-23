define(function (require) {

  var PictureTileContainerDataView = require('views/PictureTileContainerDataView');
  var PictureTileView = require('views/PictureTileView');
  var PictureTileCollection = require('collections/PictureTileCollection');
  var Animations = require('animations/Animations');
  //var pictureContainerDataView = new PictureTileContainerDataView();
  //var pictureTileView = new PictureTileView();

  describe("the PictureTileContainerDataView", function(){

    beforeEach(function(){

    });
    describe("TodoListView", function() {

      beforeEach(function() {
        this.view = new PictureTileContainerDataView();
      });

      describe("Instantiation", function() {
//$("#ajmebcShiftingTilesApp"),
        it("should create a list element", function() {
          //expect(this.view.el).toHaveId("ajmebcShiftingTilesApp");
        });

      });

    });
    /*
    describe("Instantiation", function() {
      it("should contain a collection", function(){
        //expect(pictureContainerDataView.collection instanceof PictureTileCollection).toBe(true);
      });
    });
    */
  });

  describe("the PictureTileView", function(){

    beforeEach(function(){

    });

    describe("Instantiation", function() {
      it("should set the correct animation", function(){

      });
    });
  });

});
