function currentUser() {
    return currentEndpoint().match(/http[s]*:\/\/([^.]*).*/)[1];
}

function currentEndpoint() {
    return "http://wri-01.cartodb.com/api/v1/map";
}

function render(year, coords,layer,style,spinner){
    var target = document.getElementById('map');
        spinner.spin(target);

        console.log(year);
            $.ajax({
                dataType: "json",
                url: "http://vizz.water-test.appspot.com/water?coords="+coords+"&date="+year+"-01-01",
                    success: function(data) {
                        console.log(data);
                        layer.clearLayers(); 
                        //drawnItems.clearLayers(); 

                        $(data.result.features).each(function(key, data) {
                        layer.addData(data);
                        layer.setStyle(style);
                        spinner.stop(target);
                        });
                    }
            }).error(function() {spinner.stop(target);alert ('Ouch! There was an error. Try a smaller box and make sure you are around the California area')});
    }




function main() {
     $('#yearcontrol').hide();


     // set the spinner opts
     var opts = {
          lines: 13, // The number of lines to draw
          length: 20, // The length of each line
          width: 10, // The line thickness
          radius: 30, // The radius of the inner circle
          corners: 0.3, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: -1, // 1: clockwise, -1: counterclockwise
          color: '#74776B', // #rgb or #rrggbb or array of colors
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: true, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: '50%', // Top position relative to parent
          left: '50%' // Left position relative to parent
        };
        var target = document.getElementById('map');
        var spinner = new Spinner(opts);
      // Disable dragging when user's cursor enters the element
    document.querySelector('#yearcontrol').addEventListener('mouseover', function () {
        map.dragging.disable();
    });

    // Re-enable dragging when user's cursor leaves the element
    document.querySelector('#yearcontrol').addEventListener('mouseout', function () {
        map.dragging.enable();
    });
     

    var pol_pgis = null;
    var year=1999;
    //slider.defaultValue=year;
    //slider.value=year;
    slider.onchange = function(){
    console.log(this.value);
    document.querySelector('#currentYear').value = this.value;
    year=this.value;
    render(year, pol_pgis, boundary, waterStyle,spinner)
    }
    
    // Create map
    var map = new L.Map('map', {
        zoomControl: true,
        drawnControl: true,
        center: [39.27, -119.77],
        zoom: 10
    });

    // Add CartoDB basemaps
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '<a href="http://cartodb.com">CartoDB</a> © 2014',
        maxZoom: 18
    }).addTo(map);

    var waterStyle = {
        "color": "#00F",
        "weight": 1,
        "opacity": 0.65
    };


    var boundary = new L.geoJson();
            boundary.addTo(map);
            boundary.setStyle(waterStyle);

    
    // Add drawn controls
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
        position: 'bottomleft',
        draw: {
            polyline: false,// Turns off this drawing tool
            marker: false,
            polygon: false,
            
            rectangle: {
                shapeOptions: {
                    color: '#a63b55',
                    fill:false,
                    weight:0.5
                },
                showArea: true
            },
             circle: false,
            
            
        },
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);
    //$("#yearcontrol").appendTo(".leaflet-control-container");
    
    //map.on('draw:edited', function(e){map.trigger()})
    // Handle draw actions
    map.on('draw:created', function (e) {
        var type = e.layerType,
            layer = e.layer;
        
        pol_pgis = null;
        
        switch(type) {
                
            // Create a Rectangle geometry in PostGIS
            case 'rectangle':
                var coords = layer.getLatLngs();
                

                pol_pgis = "[["+ 
                    coords[0].lng +","+coords[0].lat+"],["+ 
                    coords[1].lng +","+coords[1].lat+"],["+ 
                    coords[2].lng +","+coords[2].lat+"],["+ 
                    coords[3].lng +","+coords[3].lat+"]]";
               
                break;
            
        }
                
           
        if (pol_pgis) {
            //var year=2001;
            drawnItems.clearLayers(); 
            spinner.spin(target)

            $.ajax({
                dataType: "json",
                url: "http://vizz.water-test.appspot.com/water?coords="+pol_pgis+"&date="+year+"-01-01",
                    success: function(data) {
                        console.log(data);
                        boundary.clearLayers(); 
                        

                        $(data.result.features).each(function(key, data) {
                        boundary.addData(data);
                        boundary.setStyle(waterStyle);
                        $('#yearcontrol').fadeIn('slow');
                        
                        //year++;
                        //year=(year>2011)?1999:year;
                        spinner.stop(target);
                        });
                    }
            }).error(function(errors) {spinner.stop(target);alert ('Ouch! There was an error. Try a smaller box and make sure you are around the California area')});


        }
        
        else {
            layer.bindPopup("Could not get value!");
        }
        
        drawnItems.addLayer(layer);
    });


    
    
    
    
    
}