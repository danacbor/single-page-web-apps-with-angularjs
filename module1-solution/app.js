(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

function LunchCheckController()
{
  this.items = '';
  this.message = '';

  this.checkIfTooMuch = function ()
  {
    var itemsCount = countItems(this.items);
    switch(true) {
      case (itemsCount > 3):
        this.message = 'Too much!';
        break;
      case (itemsCount > 0):
        this.message = 'Enjoy!';
        break;
      default:
        this.message = 'Please enter data first'
    }
  };

  var countItems = function(items)
  {
    var counter = 0,
    itemsArray = items.split(',');
    for (var i in itemsArray)
    {
      if (itemsArray[i].trim() != '') counter++;
    }
    return counter;
  }

}

})();
