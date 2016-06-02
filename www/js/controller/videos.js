var videos = angular.module('videos', ['starter.controllers.utils']);

videos.controller('videos_controller',function(browser, $scope, $ionicModal,
 api, convenience, constants, $location) {
    convenience.showLoadingScreen('Loading YouTube Videos');

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
            $scope.searchString = $scope.videoSearchData.title;
            api.getFilteredVideoList($scope.videoSearchData.title, success_getting_videos, failure_getting_videos);
        }
        $scope.videoModal.hide();
    };

    $scope.clearSearch = function() {
        $scope.isSearchingIOS = false;
        $scope.isSearchingAndroid = false;
        
        api.getVideoList(success_getting_videos, failure_getting_videos);
    };


    var success_getting_videos = function (data) {
        videos = data["data"]["items"];

        //Setting scope so view can have access to them
        $scope.videos = videos;
        convenience.hideLoadingScreen();
    };

    var failure_getting_videos = function(data) {
        //Just a sad message :(
        console.log('Failure got data: ' + JSON.stringify(data));
        convenience.hideLoadingScreen();
        //Goes to that lovely error page we have
        $location.path('/app/error');
    };

    angular.element(document).ready(function() {
        api.getVideoList(success_getting_videos, failure_getting_videos);
    });

    $scope.view_selected_video = function(video) {
        var video_url = 'https://www.youtube.com/embed/' + video['id']['videoId'];
        browser.open(video_url);
    };

});
