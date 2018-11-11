angular
  .module("app")
  .controller("AppCtrl", function($scope, $http) {
    (this.addclicked = function() {
      window.location = "templates/addStudent.html";
      console.log("hoh");
    }),
      (this.pairingclicked = function() {
        window.location = "templates/shoosePairing.html";
        console.log("hoh");
      }),
      (this.historyclicked = function() {
        window.location = "templates/showHistory.html";
        console.log("hoh");
      });
    (this.getStudent = function() {
      $http({
        method: "GET",
        url: "/student"
      }).then(
        function Done(res) {
          $scope.Students = res.data;
          $scope.statuscode = res.status;
          console.log($scope.Students);
        },
        function Err(res) {
          $scope.error = res.statusText;
          console.log(res);
        }
      );
    }),
      (this.pairing = function(data) {
        $http({
          method: "GET",
          url: "/student",
          data: { student1: $scope.Students, student2: $scope.Students }
        }).then(
          function Done(res) {
            $scope.Students = res.data;
            //  console.log($scope.Students);

            var obj, c;
            var arr1 = $scope.Students;
            var arr2 = [];
            while (arr1.length > 1) {
              obj = {};
              c = Math.floor(Math.random() * arr1.length);
              obj.student1 = arr1[c].fullName;
              arr1.splice(c, 1);
              c = Math.floor(Math.random() * arr1.length);
              obj.student2 = arr1[c].fullName;
              arr1.splice(c, 1);
              arr2.push(obj);
              console.log(obj.student2);
            }
          },
          function Err(res) {
            $scope.error = res.statusText;
            console.log(res);
          }
        );
      }),
      (this.save = function() {
        $http({
          method: "POST",
          url: "/history",
          data: { table: $scope.Students.pairing }
        }).then(
          function Done(res) {
            $scope.Students = res.data;
            $scope.statuscode = res.status;
            console.log($scope.Students);
          },
          function Err(res) {
            $scope.error = res.statusText;
            console.log(res);
          }
        );
      });
  })
  .component("app", {
    bindings: {},
    controller: "AppCtrl",
    templateUrl: "/templates/app.html"
  });
