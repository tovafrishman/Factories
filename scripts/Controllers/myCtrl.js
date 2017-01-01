myApp.controller('myCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.Data = [];
    $scope.myFilter = function (element) {
        return element.date.getMonth() + 1 == angular.element(".input-date").val().substring(0, 2) && element.date.getFullYear() == angular.element(".input-date").val().substring(3, 7);
    };

    angular.element("#datetimepicker10").datetimepicker({
        viewMode: 'years',
        format: 'MM/YYYY'
    });

    //For Enter/Exit - save the time selected in the local-storage and update the relevant parameters
    $scope.EnterSave = function (enterTime) {
        if ($scope.Enter == true) {
            localStorage[localStorage.length + 1] = JSON.stringify({ date: new Date(), Time: enterTime});
            $scope.Enter = false;
            $scope.isEnter = false;
            $scope.Exit = true;
            $scope.HourStart = new Date(enterTime);


        }
        else {
            $scope.SumHours = new Date(enterTime).getHours() - $scope.HourStart.getHours();
            $scope.SumMinutes = new Date(enterTime).getMinutes() - $scope.HourStart.getMinutes();
            //Exit time  before Enter time
            if ($scope.SumHours < 0 || $scope.SumHours == 0 && $scope.SumMinutes<0) {
                alert("Exit time is not correct")

            }
            else {
                localStorage[localStorage.length + 1] = JSON.stringify({ date: new Date(), Time: enterTime});
                $scope.isEnter = false;
                $scope.Enter = false;
                $scope.Exit = false;
            }
        }
    }

    $scope.out = function () {
        if ($scope.Enter == true) {
            $scope.isEnter = false;
        }
        else {
            $scope.isEnter = false;
        }
    }
    //Fill the Data in the local-storage content 
    $scope.TableLoad = function () {
        $scope.Data = [];

        for (var i = 1; i < localStorage.length; i += 2) {
            var temp = localStorage[i];
            var entry = JSON.parse(temp);
            temp = localStorage[i + 1];
            var exit = JSON.parse(temp);
            var diff = moment.duration(moment(exit.Time).diff(moment(entry.Time)));
            var hours = new Date()
            hours.setMilliseconds(0);
            hours.setSeconds(0);
            hours.setHours(diff._data.hours);
            hours.setMinutes(diff._data.minutes);
            $scope.Data.push({ date: new Date(entry.date), entry: new Date(entry.Time), exit: new Date(exit.Time), hours: hours });
        }
    };

    $scope.showGraph = function () {
        for (var i = 1, j = 0; i <= localStorage.length - 1; i += 2, j++) {
            var temp = localStorage[i];
            var p = JSON.parse(temp);
            temp = localStorage[i + 1];
            var p2 = JSON.parse(temp);
            var x = new Date(p2.Time).getHours() - new Date(p.Time).getHours();
            $scope.dataGraph[j] = x;


        }
    }
    //Graph days a week
    $scope.labels = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday"];
    $scope.dataGraph = [0, 0, 0, 0, 0];
    //Type style
    $scope.type = 'PolarArea';
    $scope.toggle = function () {
        $scope.type = $scope.type === 'PolarArea' ?
        'Pie' : 'PolarArea';
    };

}]);