utils = angular.module('BrowserModule',[]);
utils.factory('browser', ['$cordovaInAppBrowser', function($cordovaInAppBrowser) {
    return {
        open: function(url) {
            var isIOS = ionic.Platform.isIOS();
            var isAndroid = ionic.Platform.isAndroid();
            var options = {};
            var browserType = '';
            if (isIOS) {
                options = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'yes',
                    zoom: 'no'
                };
                browserType = '_blank';
            } else if (isAndroid) {
                options = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'no',
                    zoom: 'no'
                };
                browserType = '_self';
            }

            $cordovaInAppBrowser.open(url, browserType, options);
        }
    };
}]);
