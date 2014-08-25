$(function(){
    var $messageBox = $('#message');
    var $map = $('#map-canvas');

    var SF = {
            lat: 37.755,
            long:-122.4167
        },
        ZOOM = 13,
        map;

    var message = {
        searching:'Currently searching for the nearest food truck',
        notfound:'Sorry we couldn\'t locate a food truck near you, choose one from the map.'
    };

    
    var mapOptions = {
        center: new google.maps.LatLng(SF.lat, SF.long),
        zoom: ZOOM
    };

    /* Helper Methods */

    var cleanUpData = function(d){
        if(d.applicant.indexOf('Catering') > -1 || d.applicant.indexOf("May Sun Kitchen") > -1 || d.applicant.indexOf("Munch A Bunch") > -1 || d.applicant.indexOf("Senor Si") > -1 ||) {
            return null;
        }
        if(d.applicant.indexOf(',') > -1) {
            d.applicant = d.applicant.replace(/,/g,'');
        }
        if(d.applicant.indexOf('LLC') > -1){
            d.applicant = d.applicant.substr(0, d.applicant.indexOf('LLC'));
        }
        if(d.applicant.indexOf('/') > -1){
            d.applicant = d.applicant.substr(0, d.applicant.indexOf('/'));
        }
        if(d.applicant.indexOf('DBA') > -1){
            d.applicant = d.applicant.substr(d.applicant.indexOf('DBA') + 4,d.applicant.length);
        }

        return d;
    };

    /* App Setup */

    var AppView = Backbone.View.extend({
        el: $("body"),

        initialize: function(){
            $messageBox.find('.status').text(message.searching);
            map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);
            this.initTrucks();

        },

        initTrucks: function(){
            var closest,
                pos;

            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);
                });
            }
            $.getJSON('/trucks',function(data){

                $.each(data,function(i,e){

                    var truck = cleanUpData(e);

                    if(!truck){
                        return;
                    }

                    var truckMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(truck.latitude,
                            truck.longitude),
                        map:map
                    });

                    var truckInfo = new google.maps.InfoWindow({
                        maxWidth: 400
                    });

                    if(!!pos){
                        var distance = google.maps.geometry.spherical.computeDistanceBetween(truckMarker.getPosition(),pos);
                        if(!closest || closest.distance > distance){
                            closest = {
                                marker:truckMarker,
                                distance:distance
                            }
                        }
                    }

                    google.maps.event.addListener(truckMarker, 'click', function() {
                        try{
                            $.getJSON('/trucks/'+encodeURIComponent(truck.applicant), function(data){
                                if(data){
                                    truck.image_url = data.image_url;
                                    truck.rating_img_url = data.rating_img_url;
                                    truck.review_count = data.review_count;
                                    truck.url = data.url;
                                    truck.snippet_text = data.snippet_text;
                                    truckInfo.setContent(_.template($('#truck-template').html(), truck));
                                }else {
                                    truckInfo.setContent(_.template($('#truck-template-bare').html(), truck));
                                }
                            }).error(function() { 
                                 truckInfo.setContent(_.template($('#truck-template-bare').html(), truck));
                            });
                        }catch(e){
                            truckInfo.setContent(_.template($('#truck-template-bare').html(), truck));
                        }
                        truckInfo.open(map, truckMarker);
                    });
                });

                if(closest && (closest.distance < 2500)){
                    $messageBox.find('.status').text('');
                    map.setCenter(pos);
                    map.setZoom(15);
                    google.maps.event.trigger(closest.marker,'click');
                }else {
                    $messageBox.find('.status').text(message.notfound);
                }

                $messageBox.addClass('move');
                $map.removeClass('fade');
            });
        }
    });

    var App = new AppView;

});