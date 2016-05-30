var campuses = angular.module('starter.controllers.camp', ['starter.controllers.utils']);

// allows for access of variable across controllers
campuses.service('selectedCampuses', function() {
    var campuses = [];
    var campusesObj = {};

    return {
        getCampuses: function() {
            return campuses;
        },
        setCampuses: function(campusesList) {
            campuses = campusesList;
            campusesObj = {};
            for (var x = 0; x < campusesList.length; x++) {
                campusesObj[campusesList[x]._id] = campusesList[x];
            }
        },
        getCampusesObject: function() {
            return campusesObj;
        }
    };
});


campuses.controller('CampusCtrl', ['$scope', '$location','$ionicPopup', 'api', 'selectedCampuses', 'constants', function($scope, $location, $ionicPopup, api, selectedCampuses, constants) {

    var err = function(xhr, text, err) {
        $location.path('/app/error');
    };
    $scope.testin = campuses.testin;

    var success = function(data) {
        // make object "checkable" for the view
        for (var i = 0; i < data.data.length; ++i) {
            data.data[i].checked = false;
        }

        // pass to the view
        $scope.choices = data.data;
    };

    api.getAllCampuses(success, err);
    $scope.title = 'Select Campuses';
    $scope.next = 'Select Ministries';

    // function to be called when the user presses footer button
    // andvances to ministry page and sets the campuses the chose
    $scope.goToNext = function() {
        var campuses = [];

        // adds campuses user checked to list
        for (var i = 0; i < $scope.choices.length; ++i) {
            if ($scope.choices[i].checked) {
                campuses.push($scope.choices[i]);
            }
        }

        selectedCampuses.setCampuses(campuses);
        $location.path('/app/ministries');
    };
}]);

