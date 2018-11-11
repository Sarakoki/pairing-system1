angular
  .module("app")
  .controller("AddCtrl", function($scope, $http) {
    (this.back = function() {
      //window.location = "templates/app.html";
      console.log("hoh");
    }),
      (this.addStudent = function(student, level) {
        $http({
          method: "POST",
          url: "/student",
          data: { studentName: student, level: level }
        }).then(
          function Done(res) {
            $scope.Students = res.data;
            $scope.statuscode = res.status;
            console.log(res);
          },
          function Err(res) {
            $scope.error = res.statusText;
            console.log(res.data);
          }
        );
      });
    this.deleteStudent = function(id) {
      $http({
        method: "DELETE",
        url: `/student/id`
      }).then(
        function Done(res) {
          $scope.Students = res.data;
          $scope.statuscode = res.status;
          console.log($scope.Students);
        },
        function Err(res) {
          $scope.error = res.statusText;
          console.log($scope.error, data);
        }
      );
    };
    this.getAllStudents = function(data) {
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
    };
  })
  .component("app", {
    bindings: {},
    controller: "AddCtrl",
    templateUrl: "/templates/addStudent.html"
  });
