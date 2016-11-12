(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItems)
    .constant('ApiBasePath', "//davids-restaurant.herokuapp.com");

    function FoundItems() {

        var ddo = {
            templateUrl: 'foundItems.html',
            restrict: 'E',
            scope: {
                found: '<foundItems',
                onRemove: '&doRemove'
            }
        };

        return ddo;

    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {

        var narrow = this;

        narrow.searchTerm = '';

        narrow.down = function ()
        {
            var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

            promise.then(function (response) {
                narrow.found = response;
            })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            });
        }

        narrow.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        };

    }

    MenuSearchService.$inject = ['$q', '$http', 'ApiBasePath'];
    function MenuSearchService($q, $http, ApiBasePath) {

        var service = this;

        var menuItems;
        var searchTerm = '';

        service.foundItems = [];

        var filterFunction = function (item) {
            return item.description.indexOf(searchTerm.toLowerCase()) != -1;
        }

        var filterResult = function () {
            return searchTerm == '' ? [] : menuItems.filter(filterFunction);
        }

        service.getMatchedMenuItems = function (searchTermNew) {

            searchTerm = searchTermNew;

            if (!menuItems) {
                return $http.get(ApiBasePath + "/menu_items.json").then(function(result) {
                    menuItems = result.data.menu_items;
                    service.foundItems = filterResult();
                    return service.foundItems;
                });
            }
            else {
                var deferrer = $q.defer();
                service.foundItems = filterResult();
                deferrer.resolve(service.foundItems);
                return deferrer.promise;
            }
        }

        service.removeItem = function (itemIndex) {
            service.foundItems.splice(itemIndex, 1);
        };
    }

})();
