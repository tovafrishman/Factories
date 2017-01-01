//myApp.factory('logger', function () {
//    var logArr = [];
//    var factoryObj=new Object();
//    factoryObj.logWrite = function (Time,status) {
//       alert("ASDFA")
//        logArr.push({ date: new Date(),Time: $scope.enterTime, status: $scope.Enter });
//        alert("אחרי")
//    };
//    factoryObj.loggerRead = function () {
//        return logArr;
//    };
//    factoryObj.loggerActionRead = function (Action) {
//        var arr = [];
//        angular.ForEach(logArr, function (item, index) {
//            if (item.action == Action)
//                arr.push(item);
//        });
//        return arr;
//    };
//    return factoryObj;
//});

//צורה ב
myApp.factory('logger', function () {
    var logArr = [];
    return {
        logWrite: function (Time, status) {
           
            logArr.push({ date: new Date(), Time: $scope.enterTime, status: $scope.Enter }); 
        },
        loggerRead: function () {
            return logArr;
        },
        loggerActionRead: function (Action) {
            alert("בתוך")
            var arr = [];
            angular.ForEach(logArr, function (item, index) {
                if (item.action == Action)
                    arr.push(item);
            });
            return arr;
        }
    }

});