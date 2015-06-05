angular.module('openit.controllers', [])

.factory('Configurations', function() {
    return {
        message: "I'm data from a service",
        defaultlimit: 20,
        defaultdelay : 500,
        
    };
})

.factory('LicenseMonitorData', function() {
    return {
    	jsonData : null,
		vlicense : null,
        processData :function( data )
        {
        	var xmldoc = XMLTools.domParser( data );
        	this.jsonData =  JSON.parse( xml2json ( xmldoc, '') );
       		this.vlicense = this.jsonData.realtime.vendorlicenses;
        	this.calculateProductLicenses();
        },
        calculateProductLicenses : function ()
        {
        	var prod_total_license = 0;
        	var prod_total_use = 0;
			getArraySubObjects(this.vlicense.vendorlicense).forEach(function(entry) 
			{
				getArraySubObjects(entry.daemons.daemon.features.feature).forEach ( function (feature) 
				{
					prod_total_license =parseInt(prod_total_license) +  parseInt( feature.licenses ) ;
					if ( feature.online != null )
					{
						
						getArraySubObjects(feature.online.entry).forEach( function (user){
							prod_total_use = parseInt( prod_total_use ) + parseInt(user.count);
						});
					}
				});
				entry[ "licenses" ] = prod_total_license;
				entry[ "used" ] = prod_total_use;
			});

        },
        
        
        
    };
})






.controller('AppCtrl', function($scope, $ionicModal, $timeout , $http , Configurations, LicenseMonitorData ) {
  
  $scope.prepareLicenseStatus = function () {
	Logging.debug ( "Retriving xml data" );
	$http.get('/license_status.xml').
	  success(function(data, status, headers, config) {
	  LicenseMonitorData.processData( data );
	  $scope.vlicense = LicenseMonitorData.vlicense.vendorlicense;
	 
	  })
	  .error(function(data, status, headers, config) {
		Logging.error ( "Failed to retrieve data. status: " + status )
	 });
  }
  

  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
