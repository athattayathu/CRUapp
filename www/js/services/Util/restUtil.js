var restUtils = angular.module('restUtils',[]);

// utitity methods for making http requests/posts
restUtils.factory('req', ['$window', '$http', function($window, $http) {
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

restUtils.factory('api', ['req', 'constants', function(req, constants) {
    return {
        getAllCampuses: function(success, err){
            var url = constants.BASE_SERVER_URL + 'campuses';
            req.get(url, success, err);
        },
        getAllEvents: function(success, err) {
            console.log("Aight lets see here");
            var url = constants.BASE_SERVER_URL + 'events'; 
            req.get(url, success, err);
        },
        getMinistryEvents: function(params, success, err) {
            var url = constants.BASE_SERVER_URL + 'events/search';
            req.post(url, params, success, err);
        },
        getEvent: function(id, success, err) {
            var url = constants.BASE_SERVER_URL + 'events/' + id;
            req.get(url, success, err);
        },
        getAllMissions: function(success, err) {
            var url = constants.BASE_SERVER_URL + 'summermissions/';
            req.get(url, success, err);
        },
        getMission: function(id, success, err) {
            var url = constants.BASE_SERVER_URL + 'summermissions/' + id;
            req.get(url, success, err);
        },
        getAllTeams: function(success, err) {
            var url = constants.BASE_SERVER_URL + 'ministryteams/';
            req.get(url, success, err);
        },
        // sorry for the confusing name, but gets teams with ministry specific search params
        getMinistryTeams: function(params, success, err) {
            var url = constants.BASE_SERVER_URL + 'ministryteams/find';
            req.post(url, params, success, err);
        },
        getTeam: function(id, success, err) {
            var url = constants.BASE_SERVER_URL + 'ministryteams/' + id;
            req.get(url, success, err);
        },
        getMinistry: function(id, success, err) {
            var url = constants.BASE_SERVER_URL + 'ministries/' + id;
            req.get(url, success, err);
        },
        getAllCommunityGroups: function(success, err) {
            var url = constants.BASE_SERVER_URL + 'communitygroups/';
            req.get(url, success, err);
        },
        getCommunityGroup: function(id, success, err) {
            var url = constants.BASE_SERVER_URL + 'communitygroups/' + id;
            req.get(url, success, err);
        },
        getUser: function(id, success, err) {
            var url = constants.BASE_SERVER_URL + 'users/' + id;
            req.get(url, success, err);
        },
        getFilteredRides: function(params, success, err) {
            var url = constants.BASE_SERVER_URL + 'rides/find';
            req.post(url, params, success, err);
        },
        getFilteredUsers: function(params, success, err) {
            var validateUrl = constants.BASE_SERVER_URL + 'users/find';
            req.post(validateUrl, params, success, err);
        },
        createRide: function(params, success, err) {
            var url = constants.BASE_SERVER_URL + 'rides';
            req.post(url, params, success, err);
        },
        createPassenger: function(params, success, err) {
            var url = constants.BASE_SERVER_URL + 'passengers';
            req.post(url, params, success, err);
        },
        addPassenger: function(rideID, params, success, err) {
            var url = constants.BASE_SERVER_URL + 'rides/' + rideID + '/passengers';
            req.post(url, params, success, err);
        },
        getPassengers: function(driverID, success, err) {
            var url = constants.BASE_SERVER_URL + 'rides/' + driverID;
            req.get(url, success, err);
        },
        getDriver: function(driverID, success, err) {
            var url = constants.BASE_SERVER_URL + 'rides/' + driverID;
            req.get(url, success, err);
        },
        getPassenger: function(passengerID, success, err) {
            var url = constants.BASE_SERVER_URL + 'passengers/' + passengerID;
            req.get(url, success, err);
        },
        deleteRide: function(driverID, success, err) {
            var url = constants.BASE_SERVER_URL + 'rides/' + driverID;
            req.delete(url, success, err);
        },
        deletePassenger: function(driverID, passengerID, success, err) {
            var url = constants.BASE_SERVER_URL + 'rides/' + driverID + '/passengers/' + passengerID;
            req.delete(url, success, err);
        },
        getAllArticleTags: function(success, err){
            var url = constants.BASE_SERVER_URL + 'resource-tags/list';
            req.get(url, success, err);
        },
        getFilteredArticles: function(params, success, err) {
            var url = constants.BASE_SERVER_URL + 'resources/find';
            req.post(url, params, success, err);
        },
        getAllArticles: function(params, success, err) {
            var url = constants.BASE_SERVER_URL + 'resources/';
            req.get(url, params, success, err);
        }

        
    };
}]);