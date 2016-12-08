// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var today = Date.now()
// console.log(today)



$(document).on("ready", function() {

  var titleBars = $('#handleP').html()
  console.log(titleBars)
  var titleCompile = Handlebars.compile(titleBars)
  var image = {
        url: 'earthquake.png',
        scaledSize : new google.maps.Size(22, 32)
    };
  // console.log(titleCompile)
  $.ajax({
    method: 'GET',
    url: weekly_quakes_endpoint,
    dataType: 'json',
    success: onSuccess,
    error: onError
  })
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 1
  })
  //   var marker = new google.maps.Marker({
  //     position: {lat: 37.78, lng: -122.44},
  //     map: map
  // })
  // CODE IN HERE!
  function onSuccess(data){
    // console.log(data)
    data.features.forEach(function(eachQuake){
      var quakeTitle = quakeRename(eachQuake.properties.title)
      // console.log(quakeTitle)
      var quakeCoordinates = {
        lat: eachQuake.geometry.coordinates[1],
        lng: eachQuake.geometry.coordinates[0]
      }
      console.log(eachQuake.properties.mag)
      console.log(eachQuake.properties.mag*25.5)
      // console.log(quakeCoordinates)
      // var magVisual = magnitudifier(eachQuake.geometry.mag)
      var appendQuake = titleCompile({
        title: quakeTitle,
        time: Math.round((today - eachQuake.properties.time)/3600000),
        thecolor: (Math.round((255-(eachQuake.properties.mag*25.5))))
      })
      // appendQuake.style.backgroundColor = "rgb("+(25.5*eachQuake.geometry.mag)+",0,0)"
      $('#info').append(appendQuake)
      makeMarker(quakeCoordinates)
    })
  }
  function makeMarker(location){
    // console.log(location)
    marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: image
    })
  }
  function quakeRename(toRename){
    var renameArray = toRename.split(' of ')
    return renameArray[1]
  }
  // function magnitudifier(magnitude){
  //
  // }
});




function onError(){
  console.log("you fail!")
}
