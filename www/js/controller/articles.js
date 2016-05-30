//Essentially manages viewing of the articles
//Also if you are following my controller to figure out how to make views linked with controllers, remember to do the following:

	//Add your script in the index.html
	//Whatever you name your module (Here I name is 'articles'), remember to add it in the 'controller.js' on the top with everyone else
		//there should be a line like 'var module = angular.module(...'
	//In the 'app.js' specify which controller your view is connected to

//'starter.controllers.articles' is just name of the module
//Requires some of the functionality from 'starter.controllers.utils'
var articles = angular.module('articles', ['starter.controllers.utils', 'ionic']);

//This is a helper function to sort the articles by date
var sortArticles = function(unsorted) {
    return unsorted.sort(function(a, b) {
        var aDate = a.date;
        var bDate = b.date;

        if (aDate > bDate) {
            return -1;
        } else if (bDate > aDate) {
            return 1;
        } else {
            return 0;
        }
    });
};

//This will display and handle the list of articles that are available
//Params for function:
//$scope used to pass data from controller to view
//req used for making request
//constants are used for the defines in the util.js file
//$location is used for rerouting to a different page
articles.controller('articles_controller',function($scope, $ionicModal, api, constants,
 convenience, $location, browser) {
    convenience.showLoadingScreen('Loading Articles');

    // set up searching modal for articles
    // data structure for holding search parameters
    $scope.articleSearchData = {};
    $scope.isSearchingIOS = false;
    $scope.isSearchingAndroid = false;

    // creating the modal using ionicModal
    $ionicModal.fromTemplateUrl('templates/resources/articles/articleSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.articleModal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/resources/articles/articleTags.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.tagsModal = modal;
    });

    // Triggered in the modal to close it
    $scope.closeSearch = function() {
        $scope.articleModal.hide();
    };

    // Open the modal
    $scope.openSearch = function() {
        $scope.articleModal.show();
    };

    $scope.openTags = function() {
        $scope.tagsModal.show();
        $scope.articleModal.hide();
    };

    $scope.closeTags = function() {
        $scope.tagsModal.hide();
    };

    $scope.applyTags = function() {
        for (var i = 0; i < $scope.articles.length; ++i) {
            $scope.articles[i].visible = false;
            for (var k = 0; k < $scope.tags.length; ++k) {
                if ($scope.tags[k].checked) {
                    for (var j = 0; j < $scope.articles[i].tags.length; ++j) {
                        if ($scope.tags[k]._id == $scope.articles[i].tags[j]) {
                            $scope.articles[i].visible = true;
                        }
                    }
                }
            }
        }
        $scope.isSearching = true;
        $scope.tagsModal.hide();
    };

    // submit the search results
    $scope.search = function() {
        // regex (?i: makes it case insensitive)
        var queryParams = {};
        $scope.searchString = '';
        $scope.isSearchingIOS = ionic.Platform.isIOS();
        $scope.isSearchingAndroid = ionic.Platform.isAndroid();

        if (typeof $scope.articleSearchData.title !== 'undefined') {
            $scope.searchString += $scope.articleSearchData.title;
            queryParams['title'] = {'$regex':  '(?i:' + $scope.articleSearchData.title + ')'};
        }

        if (typeof $scope.articleSearchData.author !== 'undefined') {
            $scope.searchString += ' by ' + $scope.articleSearchData.author;
            queryParams['author'] = {'$regex':  '(?i:' + $scope.articleSearchData.author + ')'};
        }

        api.getFilteredArticles(queryParams, successGettingArticles, failureGettingArticles);

        $scope.articleModal.hide();
    };

    $scope.clearSearch = function() {
        // make request to db
        api.getAllArticles(successGettingArticles, failureGettingArticles);
        $scope.isSearchingIOS = false;
        $scope.isSearchingAndroid = false;


        if ($scope.articleSearchData && $scope.articleSearchData.title !== '') {
            $scope.articleSearchData.title = '';
        }
        if ($scope.articleSearchData && $scope.articleSearchData.author !== '') {
            $scope.articleSearchData.author = '';
        }
    };

    //This will contain list of articles where the view can grab from
    list_of_articles = [];

    //When successfully getting the articles from the db, the following function
    //will be executed
    var successGettingArticles = function(data) {

        for (var i = 0; i < data.data.length; ++i) {
            data.data[i].visible = true;
        }

        //Getting list of articles from request
        articles = data['data'];

        //sort the articles by date
        articles = sortArticles(articles);

        //Setting scope so view can have access to them
        $scope.articles = articles;

        //Debugging to view data

        for (var i = 0; i < articles.length; i++) {
            console.log(articles[i]);
        }

        uiUtil.hideLoadingScreen();
        
        var tempTags;
        var tags = [];
        for (var artidx = 0; artidx < articles.length; artidx++) {
            tempTags = articles[artidx].tags;
            for (var i = 0; i < tempTags.length; ++i) {
                if (tags.indexOf(tempTags[i]) == -1) {
                    tempTags[i].checked = false;
                    tags.push(tempTags[i]);
                }
            }
        }
        $scope.tags = tags;
    };

    //When failing to get the articles from the db, the following function
    //will be executed
    var failureGettingArticles = function(data) {

        //Goes to that lovely error page we have
        $location.path('/app/error');
    };

    var successGettingArticleTags = function(data) {
        tags = data['data'];
        for (var i = 0; i < tags.length; ++i) {
            tags[i].checked = false;
        }
        $scope.tags = tags;
    };

    var failureGettingArticleTags = function(data) {

        //Goes to that lovely error page we have
        $location.path('/app/error');
    };

    //Every time screen loads, we will attempt to get articles from CRU's db
    $scope.$on('$ionicView.enter', function() {
        // make request to db
        api.getAllArticles(successGettingArticles, failureGettingArticles);
    });

    //When clicking a specific article, it will reroute to another page
    //consisting specific info for the article.
    //Also note, you have to add to the app.js file so that it routes properly
    $scope.viewSelectedArticle = function(article) {
		browser.open(article['url']);
    };

});
