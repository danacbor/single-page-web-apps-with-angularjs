(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyControllerFunction)
    .controller('AlreadyBoughtController', AlreadyBoughtControllerFunction)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffServiceFunction);

    ToBuyControllerFunction.$inject = ['ShoppingListCheckOffService'];
    function ToBuyControllerFunction(ShoppingListCheckOffService)
    {
        var tbc = this;
        tbc.items = ShoppingListCheckOffService.getItems('to_buy');

        tbc.buyItem = function (index) {
            ShoppingListCheckOffService.buyItem(index);
        }
    }

    AlreadyBoughtControllerFunction.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtControllerFunction(ShoppingListCheckOffService)
    {
        var abc = this;
        abc.items = ShoppingListCheckOffService.getItems('bought');
    }

    function ShoppingListCheckOffServiceFunction() {
        var service = this;

        // List of shopping items
        var items = {
            to_buy: [
                { name: "item1", quantity: 10 },
                { name: "item2", quantity: 20 },
                { name: "item3", quantity: 30 },
                { name: "item4", quantity: 40 },
                { name: "item5", quantity: 50 }
            ],
            bought: []
        }

        service.buyItem = function (itemIndex) {
            items.bought.push(items.to_buy.splice(itemIndex, 1)[0]);
        };

        service.getItems = function (list) {
            return items[list];
        };

    }

})();
