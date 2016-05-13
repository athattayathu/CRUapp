var utils = angular.module('starter.controllers.utils');

// utitity methods for making http requests/posts
utils.factory('req', ['$window', '$http', function($window, $http) {
    return {
        get: function(url, success, err) {
            // Simple GET request
            $http({
                method: 'GET',
                url: url
            }).then(success, err);
        },
        post: function(url, data, success, err) {
            $http.post(url, data).then(success, err);
        },
        delete: function(url, success, err) {
            // Simple GET request
            $http({
                method: 'DELETE',
                url: url
            }).then(success, err);
        }
    };
}]);