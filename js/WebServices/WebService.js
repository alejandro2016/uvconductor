
 App.service('WebService', function( $http, $q, $ionicLoading, $rootScope){
  
	/* SIGN UP 
	===========================================*/
	 this.upload = function( link,img_el,post_data ){
		
		// $.mobile.loading('show');
		var url = base_url + link ;
		var result = null;
		
		var deferred = $q.defer();
	    
		var img = document.getElementById(img_el); 
		var imageURI = img.src;
		
			var options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			options.mimeType="image/jpeg";
			
			options.params = post_data;
			options.chunkedMode = false;
			var ft = new FileTransfer();
			
			ft.upload(imageURI, url, 
			function(r){
				deferred.resolve(r.response);	
			}, function(error){
				alert("An error has occurred: Code::: = " + error.code);
				 
				
			}, options);
		
		return deferred.promise;
	  //alert(result);
	 }

	 /* SEARCH SHOPS 
	  ===============================================*/ 
	this.send_data = function( link , post_data ){
            var self = this;
            
            var deferred = $q.defer();
             var result = null;
                /* WP
       --------------------------------------*/
           if( wordpress == true){
               
               var url = base_url ;
              
               
                   
               post_data.action = link;
              
                               
                $.ajax({
                 type: "POST",
                 url: url,
                 data: post_data,
                 success: function(data){ 
                    // alert(JSON.stringify(data)); 
                   deferred.resolve(data);    
                 },
                 dataType: "json"
               });
               
                   
               
               
           }
            else{
                
                    var url = base_url + link;
                    var req = {
                         method: 'POST',
                         url: url,
                         data: post_data
                    }
                    
                     
                    $http(req).then( 
                        function (data){
                             //alert(JSON.stringify(data.data));
                            deferred.resolve(data.data);        
                        },function (error){
                            /*
                            alert(error.status +" "+ error.statusText);
                            // alert(JSON.stringify(error,null,4));
                            if(error.status == 404){
                                alert("Sorry! Server not responding (404)");
                            }
                            else{
                                alert('sorry! an error occured');
                            }
                            */
                            // self.remove_loading();
                            $ionicLoading.hide();
                            deferred.reject();
                        }
                    );    
            }
            
            
          
          return deferred.promise;
         }
     
     
     
     
     
     
     
     
     
     
     this.get_google_lat_lng=function(address){  
           
			
			var deferred = $q.defer();
			
			var url = address;
			var result = null;
			
			 var req = {
				 method: 'POST',
				 url: url
			}
			
			 
			$http(req).then( 
				function (data){
					// alert(JSON.stringify(data.data));
					deferred.resolve(data.data);		
				},function (error){
					
					$ionicLoading.hide();
					deferred.reject();
				}
			);	
		  
		  return deferred.promise;
         
         
     }
     
     
     
		 
	this.show_loading = function(){
			$ionicLoading.show({
          content: 'Loading',
          showBackdrop: false
      });
	 }
    
    
    

    this.load_trips = function () {
          var link = 'driver_bookings';
          $rootScope.user_data = JSON.parse( localStorage.getItem('user_data') );		
          var driver_id=$rootScope.user_data.Id;
           console.log("consulto driver_bookings con id: " + driver_id);
        $rootScope.myTrip_menu_selected = 0;
        var post_data={
        	'driver_id':driver_id
        }
          var promise = this.send_data( link,post_data);
          promise.then(function(data){
				
				var cuenta = 2;
				var count2 = 1;

             $rootScope.Trips = data;
				try {
								/*if ($rootScope.active_trip !== undefined) {
									console.log("Active trip: "+$rootScope.active_trip);
									var countx = Object.keys($rootScope.active_trip).length;
									console.log("countx: "+countx + "length: " + $rootScope.active_trip.length);
								}*/
								var cuenta = localStorage.getItem('cuenta');
								if ($rootScope.Trips.new_rade !== undefined) {
									//console.log("Trips newrade: "+$rootScope.Trips.new_rade);
									var count2 = Object.keys($rootScope.Trips.new_rade).length;
									console.log("count2: "+count2 + " cuenta: " + cuenta.length);
								}
								
				}
				catch(err) {
				console.log(err.message);
				}			 
		     $rootScope.active_trip = $rootScope.Trips.new_rade;
             $rootScope.completed_trip = $rootScope.Trips.complete;
			 $rootScope.cancelled_trip = $rootScope.Trips.Cancelled;
             $rootScope.accept_btn = true;
             $rootScope.all_settings=$rootScope.Trips.settings;
			localStorage.setItem('cuenta', $rootScope.Trips.new_rade.length);
			if (count2 > cuenta) {
				playAudio('http://173.230.140.74/nueva.mp3');
			}					 
             
		 });
       }
/*
	this.loopuno = function () {

		setTimeout(function () {
				console.log("ejecuto el loop");
				$rootScope.load_trips();
				$scope.loopuno();
		}, 5000);
	}
*/

	   
    this.map_style=function(){
        var styles = [
					{
						"featureType": "all",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"saturation": 36
							},
							{
								"color": "#000000"
							},
							{
								"lightness": 40
							}
						]
					},
					{
						"featureType": "all",
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"visibility": "on"
							},
							{
								"color": "#000000"
							},
							{
								"lightness": 16
							}
						]
					},
					{
						"featureType": "all",
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "administrative",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 20
							}
						]
					},
					{
						"featureType": "administrative",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 17
							},
							{
								"weight": 1.2
							}
						]
					},
					{
						"featureType": "landscape",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 20
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 21
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.fill",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 17
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 29
							},
							{
								"weight": 0.2
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 18
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 16
							}
						]
					},
					{
						"featureType": "transit",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 19
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#000000"
							},
							{
								"lightness": 17
							}
						]
					}
				];
        return styles;

        
    }
    
 
    
    
 })
 
 