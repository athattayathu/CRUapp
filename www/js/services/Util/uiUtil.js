var uiUtils = angular.module('uiUtils',[]);

uiUtils.factory('uiUtil',function($ionicLoading){
	return {
		showLoadingScreen: function(message) {
            $ionicLoading.show({
                delay: 1000,
                template: '<ion-spinner class="spinner-positive"></ion-spinner><br>' + message + '...',
                noBackdrop: true
             });
        },
        hideLoadingScreen: function() {
            $ionicLoading.hide();
        }
	}
});