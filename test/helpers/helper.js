/**
 * Global configuration object
 **/
/*
var ajmebc = ajmebc || {};
ajmebc.ShiftingTiles = {};


ajmebc.ShiftingTiles = {
  url: '',
  data: {"pictures":
          [
            { "src": "/content/imgs/image_1.png", "id": "1", "description": "this is image 1"},
            { "src": "/content/imgs/image_2.png", "id": "2", "description": "this is image 2"},
            { "src": "/content/imgs/image_3.png", "id": "3", "description": "this is image 3"},
            { "src": "/content/imgs/image_4.png", "id": "4", "description": "this is image 4"},
            { "src": "/content/imgs/image_5.png", "id": "5", "description": "this is image 5"},
            { "src": "/content/imgs/image_6.png", "id": "6", "description": "this is image 6"},
            { "src": "/content/imgs/image_7.png", "id": "7", "description": "this is image 7"},
            { "src": "/content/imgs/image_8.png", "id": "8", "description": "this is image 8"},
            { "src": "/content/imgs/image_9.png", "id": "9", "description": "this is image 9"},
            { "src": "/content/imgs/image_10.png", "id": "10", "description": "this is image 10"}
          ]
        },
  rows: 2,
  columns: 3,
  loading: 'random',
  animation: 'Basic'
};
*/

var ajmebc_shifting_tile_data = {"pictures": [
  { "src": "/content/imgs/image_1.png", "id": "1", "description": "this is image 1"},
  { "src": "/content/imgs/image_2.png", "id": "2", "description": "this is image 2"},
  { "src": "/content/imgs/image_3.png", "id": "3", "description": "this is image 3"},
  { "src": "/content/imgs/image_4.png", "id": "4", "description": "this is image 4"},
  { "src": "/content/imgs/image_5.png", "id": "5", "description": "this is image 5"},
  { "src": "/content/imgs/image_6.png", "id": "6", "description": "this is image 6"},
  { "src": "/content/imgs/image_7.png", "id": "7", "description": "this is image 7"},
  { "src": "/content/imgs/image_8.png", "id": "8", "description": "this is image 8"},
  { "src": "/content/imgs/image_9.png", "id": "9", "description": "this is image 9"},
  { "src": "/content/imgs/image_10.png", "id": "10", "description": "this is image 10"}
]}

var ajmebc = ajmebc || {};



ajmebc.ShiftingTiles = {
  //url: './content/json/pictures.json',
  data: ajmebc_shifting_tile_data,
  style: [{
    //Mobile
      height: '100px',
      width: '200px',
      rows: 1,
      columns: 3,
      frameStyle: {
        'margin': '3px',
      }
    },{
      //Tablet
      height: '200px',
      width: '400px',
      rows: 2,
      columns: 2,
      frameStyle: {
        'margin': '3px',
      }
    },{
      //Desktop
      height: '300px',
      width: '600px',
      rows: 2,
      columns: 3,
      frameStyle: {
        'margin': '3px',
      }
    }
  ],
  loading: 'sequence',
  //loading: 'random',
  timer: 2000,
  animation: {
    name: 'Slide',
    timer: 1000
  }
};

var collectToArr = function(arr){
  var indexArr = [];

  for(var slot = 0; slot < arr.length; slot++){
    indexArr.push(arr[slot].model.get('imgSrcIndex'));
  }

  return indexArr;
}
