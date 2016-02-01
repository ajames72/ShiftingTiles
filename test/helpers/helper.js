/**
 * Global configuration object
 **/
var ajmebc = ajmebc || {};
ajmebc.ShiftingTiles = {};


ajmebc.ShiftingTiles = {
  url: '',
  data: {"pictures":
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
