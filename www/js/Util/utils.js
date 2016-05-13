var utils = angular.module('starter.controllers.utils', []);
// various convenience methods that are used in various parts of the app
utils.factory('convenience' , ['$location', '$ionicLoading', function($location, $ionicLoading) {
    return {
        contains: function(value, array) {
            for (val in array) {
                if (array[val] === value) {
                    return true;
                }
            }

            return false;
        },
        containsAtIndex: function(item, arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].rideId === item) {
                    return i;
                }
            }

            return -1;
        },
        // takes a date object and makes the string to be seen by a user
        formatDate: function(date, includeDay) {
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var day = '';

            if (includeDay) {
                day = days[date.getDay()] + ' - ';
            }

            return day + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        },
        // takes a message that can be used to help locate an error, like where is was called
        // and returns a function that can be used by any function that requires an error callback
        defaultErrorCallback: function(controllerName, message) {
            return function(err) {
                $ionicLoading.hide();
                console.error(controllerName + ': ' + message);
                console.error(err);
                $location.path('/app/error');
            };
        },
        
        //Get the JSON object to send the the server from a location string
        getLocationObject: function(locationStr) {
            if (locationStr) {
                var splitStr = locationStr.split(",");
                var size = splitStr.length;
                var street, suburb, state, postcode;
                var country = "USA";
                var splitState;
                
                //get street address
                if (size >= 1) {
                    street = splitStr[0];
                }
                
                //get city
                if (size >= 2) {
                    suburb = splitStr[1];
                }
                
                //state and postal code
                if (size >= 3) {
                    splitState = splitStr[2].split(" ");
                    
                    if (splitState.length > 1) {
                        postcode = splitState[1];
                    }
                    
                    state = splitState[0];
                }
                
                return {
                    postcode: postcode,
                    suburb: suburb,
                    street1: street,
                    state: state,
                    country: country
                };
            }
            
            return {
                country: "USA"
            };
        },
        
        //Takes a location object and returns the formated address
        formatLocation: function(location) {
            var address = '';
            var country = 'USA';
            
            if (location) {
                //street address
                if (location.street1) {
                    address += location.street1;
                }
                
                //city
                if (location.suburb) {
                    address += ", " + location.suburb;
                }
                
                //state
                if (location.state) {
                    address += ", " + location.state;
                    
                    //postal code
                    if (location.postcode) {
                        address += " " + location.postcode;
                    }
                }
                
                address += country;
                console.log(address);
                return address;
            }
            
            return country;
        }
    };
}]);