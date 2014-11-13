var app = angular.module('myApp', []);

app.controller('MyController', ['$scope', '$http', function($scope, $http) {

    var totalRepos = 0, i;
    var viz = [];
    var maximOccur = 0;
    var language = '';
    $scope.username = '';
    $scope.predominant_language = '';

    $scope.findLanguage = function() {
        var requestUrl =  'https://api.github.com/users/' + $scope.username + '/repos';
        $http.get(requestUrl)
            .success(function(data){
                if (data.length == 0) {
                    $scope.predominant_language = "0 repositories found";
                }
                else {
                    countOccurences(data);
                    findMaximumOccurence(data);
                    $scope.predominant_language = "Dominant language: " + language + " out of " + totalRepos + " repositories";
                }
            })
            .error(function() {
                $scope.predominant_language = "Username not found";
            })
    }

    var findMaximumOccurence = function(data) {
        maximOccur = 0;
        language = '';
        for (i=0;i<data.length;++i) {
            if (data[i].language != null && viz[data[i].language] > maximOccur) {
                maximOccur = viz[data[i].language];
                language = data[i].language;
            }
        }
    }

    var countOccurences = function(data) {
        totalRepos = 0;
        viz = [];
        for (i=0;i<data.length;++i) {
            if (data[i].language != null) {
                totalRepos++;
                if (isNaN(viz[data[i].language])) {
                    viz[data[i].language] = 1;
                }
                else {
                    viz[data[i].language]++;
                }
            }
        }
    }

}]);
