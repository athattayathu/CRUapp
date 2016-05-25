var videos = angular.module('videos', ['starter.controllers.utils']);

videos.controller('videos_controller',function(browser, $scope, $ionicModal,
 req, convenience, constants, $location) {
    convenience.showLoadingScreen('Loading YouTube Videos');

    var CHANNEL_ID = 'UCe-RJ-3Q3tUqJciItiZmjdg';
    var YT_API_KEY = 'AIzaSyA5LSnAk7YftObCYuPSZIQi21WE6zZA1j0';

    $scope.videoSearchData = {};
    $scope.isSearchingIOS = false;
    $scope.isSearchingAndroid = false;

    // Search Modal
    $ionicModal.fromTemplateUrl('templates/resources/videos/videoSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.videoModal = modal;
    });
    $scope.closeSearch = function() {
        $scope.videoModal.hide();
    };
    $scope.openSearch = function() {
        $scope.videoModal.show();
    };


    // submit the search query
    $scope.search = function() {
        $scope.isSearchingIOS = ionic.Platform.isIOS();
        $scope.isSearchingAndroid = ionic.Platform.isAndroid();

        if (typeof $scope.videoSearchData.title !== 'undefined') {
            console.log("doing title search " + $scope.videoSearchData.title);
            $scope.searchString = $scope.videoSearchData.title;

            url = "https://www.googleapis.com/youtube/v3/search?key=" + YT_API_KEY + "&channelId=" + CHANNEL_ID + "&q=" + $scope.videoSearchData.title;
            url += "&part=snippet,id&order=date&maxResults=50";
            req.get(url, success_getting_videos, failure_getting_videos);
        }
        $scope.videoModal.hide();
    };

    $scope.clearSearch = function() {
        $scope.isSearchingIOS = false;
        $scope.isSearchingAndroid = false;
        url = 'https://www.googleapis.com/youtube/v3/search?key=' + YT_API_KEY + '&channelId=' + CHANNEL_ID +
        '&part=snippet,id&order=date&maxResults=50';

        req.get(url, success_getting_videos, failure_getting_videos);
    };


    var success_getting_videos = function (data) {
        videos = data["data"]["items"];

        //Setting scope so view can have access to them
        $scope.videos = videos;
        convenience.hideLoadingScreen();
    };

    var failure_getting_videos = function(data) {
        //Just a sad message :(
        console.log('Failure got data: ' + data);

        //Goes to that lovely error page we have
        $location.path('/app/error');
    };

    angular.element(document).ready(function() {
        url = 'https://www.googleapis.com/youtube/v3/search?key=' + YT_API_KEY + '&channelId=' + CHANNEL_ID +
        '&part=snippet,id&order=date&maxResults=50';

        req.get(url, success_getting_videos, failure_getting_videos);
    });

    $scope.view_selected_video = function(video) {
        var video_url = 'https://www.youtube.com/embed/' + video['id']['videoId'];
        browser.open(video_url);
    };

});
