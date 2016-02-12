/**
 * Global configuration object
 **/
var ajmebc = ajmebc || {};
ajmebc.ShiftingTiles = {};


ajmebc.ShiftingTiles = {
  url: '',
  data: {"pictures":
          [
            { "src": "/content/imgs/image_1.png", "id": "1" },
            { "src": "/content/imgs/image_2.png", "id": "2" },
            { "src": "/content/imgs/image_3.png", "id": "3" },
            { "src": "/content/imgs/image_4.png", "id": "4" },
            { "src": "/content/imgs/image_5.png", "id": "5" },
            { "src": "/content/imgs/image_6.png", "id": "6" },
            { "src": "/content/imgs/image_7.png", "id": "7" },
            { "src": "/content/imgs/image_8.png", "id": "8" },
            { "src": "/content/imgs/image_9.png", "id": "9" },
            { "src": "/content/imgs/image_10.png", "id": "10" }
          ]
        },
  rows: 2,
  columns: 3,
  loading: 'random',
  animation: 'Basic'
};

var collectToArr = function(arr){
  var indexArr = [];

  for(var slot = 0; slot < arr.length; slot++){
    indexArr.push(arr[slot].model.get('imgSrcIndex'));
  }

  return indexArr;
}
