var utils = angular.module('CalendarModule', []);

// calendar utility for adding things to the native calendar
utils.factory('cal', ['$localStorage', '$cordovaCalendar', '$ionicPopup', function($localStorage, $cordovaCalendar, $ionicPopup) {
    return {
        addToCalendar: function(eventName, location, _id, originalStartDate, originalEndDate) {
            startDateAndTime = this.getTimeAndDate(originalStartDate);
            startDate = startDateAndTime[0];
            startTime = startDateAndTime[1];

            endDateAndTime = this.getTimeAndDate(originalEndDate);
            endDate = endDateAndTime[0];
            endTime = endDateAndTime[1];

            finalStartDate = this.createDate(startDate, startTime);    
            finalEndDate = this.createDate(endDate, endTime);

            //Using ngcordova to create an event to their native calendar
            $cordovaCalendar.createEvent({
                title: eventName,
                location: location['street'],
                startDate: finalStartDate,
                endDate: finalEndDate
            }).then(function(result) {
                //Get the data from the local storage of list of all added events
                listOfAddedEvents = $localStorage.getObject('listOfAddedEvents');
                if (listOfAddedEvents == null) {
                    listOfAddedEvents = {};
                }

                listOfAddedEvents[_id] = {'name': eventName, 'location': location['street'], 
                    'secretStartDate': originalStartDate, 'secretEndDate': originalEndDate};
                
                //Added event information to local phone
                $localStorage.setObject('listOfAddedEvents', listOfAddedEvents);

                //If successfully added, then alert the user that it has been added
                var alertPopup = $ionicPopup.alert({
                    title: 'Event Added',
                    template: eventName + ' has been added to your calendar!'
                });
            }, function(err) {
                //If unsuccessful added, then an alert with a error should pop up
                console.error('There was an error: ' + err);
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Could not add event to calendar: ' + err
                });
            });
        },
        getTimeAndDate: function(timeAndDate) {
            //Split at the "T" to separate the date and time
            splitDateAndTime = timeAndDate.split('T');
            
            //Splitting up the date into pieces
            date = splitDateAndTime[0].split('-');
            
            //Splitting up the time into pieces
            time = splitDateAndTime[1].split(':');
            return [date, time];
        },
        createDate: function(date, time) {
            date = new Date(date[0], Number(date[1]) - 1, date[2], time[0], time[1], 0, 0, 0);
            return date;
        }
    };
}]);
