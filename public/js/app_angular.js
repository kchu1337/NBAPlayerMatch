const playerSearch = angular.module('playerSearch', []);

function mainController($scope, $http) {

    $scope.percentileData=[];

    $http.get("/getPercentiles").then(function(response) {
        $scope.percentileData = response.data;

        //Add choices for dropdowns
        $scope.rim = {options:[
                {label: "Very Low", value: $scope.percentileData[0].rimFgp},
                {label: "Low", value: $scope.percentileData[1].rimFgp},
                {label: "Medium", value: $scope.percentileData[2].rimFgp},
                {label: "High", value: $scope.percentileData[3].rimFgp},
                {label: "Very High", value: $scope.percentileData[4].rimFgp}
            ]};
        $scope.rimSelected = {label: "Very Low", value: 30};


        $scope.close = {options:[
                {label: "Very Low", value: $scope.percentileData[0].closeFgp},
                {label: "Low", value: $scope.percentileData[1].closeFgp},
                {label: "Medium", value: $scope.percentileData[2].closeFgp},
                {label: "High", value: $scope.percentileData[3].closeFgp},
                {label: "Very High", value: $scope.percentileData[4].closeFgp}
            ]};
        $scope.closeSelected = {label: "Very Low", value: 20};

        $scope.midrange = {options:[
                {label: "Very Low", value: $scope.percentileData[0].midrangeFgp},
                {label: "Low", value: $scope.percentileData[1].midrangeFgp},
                {label: "Medium", value: $scope.percentileData[2].midrangeFgp},
                {label: "High", value: $scope.percentileData[3].midrangeFgp},
                {label: "Very High", value: $scope.percentileData[4].midrangeFgp}
            ]};
        $scope.midrangeSelected = {label: "Very Low", value: 20};

        $scope.three = {options:[
                {label: "Very Low", value: $scope.percentileData[0].threeFgp},
                {label: "Low", value: $scope.percentileData[1].threeFgp},
                {label: "Medium", value: $scope.percentileData[2].threeFgp},
                {label: "High", value: $scope.percentileData[3].threeFgp},
                {label: "Very High", value: $scope.percentileData[4].threeFgp}
            ]};
        $scope.threeSelected = {label: "Very Low", value: 20};

        $scope.assist = {options:[
                {label: "Very Low", value: $scope.percentileData[0].ast},
                {label: "Low", value: $scope.percentileData[1].ast},
                {label: "Medium", value: $scope.percentileData[2].ast},
                {label: "High", value: $scope.percentileData[3].ast},
                {label: "Very High", value: $scope.percentileData[4].ast}
            ]};
        $scope.assistSelected = {label: "Very Low", value: 20};

        $scope.turnover = {options:[
                {label: "Very Low", value: $scope.percentileData[0].tov},
                {label: "Low", value: $scope.percentileData[1].tov},
                {label: "Medium", value: $scope.percentileData[2].tov},
                {label: "High", value: $scope.percentileData[3].tov},
                {label: "Very High", value: $scope.percentileData[4].tov}
            ]};
        $scope.turnoverSelected = {label: "Very Low", value: 20};

        $scope.usage = {options:[
                {label: "Very Low", value: $scope.percentileData[0].usg},
                {label: "Low", value: $scope.percentileData[1].usg},
                {label: "Medium", value: $scope.percentileData[2].usg},
                {label: "High", value: $scope.percentileData[3].usg},
                {label: "Very High", value: $scope.percentileData[4].usg}
            ]};
        $scope.usageSelected = {label: "Very Low", value: 20};
    });
    
    $http.get("/getdefinitions")
        .then(function (response) {
        $scope.definitions = response;
    });
    
    
    $scope.submit = function () {
        //Get all parameters from DOM
        var rimFga = document.getElementById("rimFga").value;
        var rimFgp = $scope.rimSelected.value;
        var closeFga = document.getElementById("closeFga").value;
        var closeFgp = $scope.closeSelected.value;
        var midrangeFga = document.getElementById("midrangeFga").value;
        var midrangeFgp = $scope.midrangeSelected.value;
        var threeFga = document.getElementById("threeFga").value;
        var threeFgp = $scope.threeSelected.value;
        var ast = $scope.assistSelected.value;
        var tov = $scope.turnoverSelected.value;
        var usg = $scope.usageSelected.value;
        var driveFga = document.getElementById("driveFga").value;
        var catchShootFga = document.getElementById("CSFga").value;
        var pullupFga = document.getElementById("pullupFga").value;
        
        
        //Find percentages if sum != 100
        var fgaTotal = Number(rimFga) + Number(closeFga) + Number(midrangeFga) + Number(threeFga);
        rimFga = rimFga / fgaTotal * 100;
        closeFga = closeFga / fgaTotal * 100;
        midrangeFga = midrangeFga / fgaTotal * 100;
        threeFga = threeFga / fgaTotal * 100;

        //Create post body
        var body = {
          rimFga,
          rimFgp,
          closeFga,
          closeFgp,
          midrangeFga,
          midrangeFgp,
          threeFga,
          threeFgp,
          ast,
          tov,
          usg,
          driveFga,
          catchShootFga,
          pullupFga
        };

        //Get JSON
      $http.post("/search", body)
            .then(function (response) {
                $scope.players = response;
                $scope.$apply();
            })
            .catch(function () {
                alert("Error");
            });
    }
}