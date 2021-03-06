angular.module('shwoodApp')

    .controller('SunglassesLensesController',function($scope,$http,SunglassesLensesFactory,messageFactory,$filter,$routeParams) {
        $scope.sunglasses = [];
        $scope.order = 'created_at';
        $scope.reverse = true;
        $scope.itemSelected='10';
        $scope.itemRow = $routeParams.itemId;
        var item  = $routeParams.itemId;
        function init(item){
            SunglassesLensesFactory.getSunglassesLenses(item)
                .success(function(data){
                    $scope.sunglasses = data;
                });
            //SunglassesLensesFactory.getProduct(item)
            //    .success(function(ret){
            //        $scope.product = ret;
            //    })
        }
        init(item);
        // $http.get('/admin/getNews').success(function(data){
        //     $scope.books = data;
        //});
        $scope.sort = function(name){
            $scope.order = name;
            $scope.reverse = ! $scope.reverse;
        };

        if (messageFactory.hasAlert()) {
            $scope.success = messageFactory.getSuccess();
            messageFactory.reset();
        }

        $scope.active = function(sunglass){
            console.log(sunglass.pivot.id);
            SunglassesLensesFactory.active(sunglass.pivot.id)
                .success(function(data){
                    console.log('aaaaaaaaaaa');
                  //  init(item);
                    sunglass.pivot.active = ! sunglass.pivot.active;
                });


        };
        $scope.deleteItem = function(id){
            console.log(id);
            var a = window.confirm('Are you Sure you want to delete this item?');
            if(a) {
                SunglassesLensesFactory.deleteItem(id)
                    .success(function (data) {
                        console.log('aaaaaaaaaaa');
                        init(item);
                    });
            }
        };

        var activeArray = [];
        var ActiveObjects;
        $scope.selectedItems = function () {
            ActiveObjects = $filter('filter')($scope.sunglasses, {checked: true});
            console.log(ActiveObjects);
            // for(var i=0;i<$scope.ActiveObjects.length;i++) {
            //     $http.post('/admin/latest/activeAll', JSON.stringify($scope.ActiveObjects[0]))
            //         .success(function (data) {
            //             console.log(data);
            //         });
            //}
        }
        $scope.activeAll = function(){
            for(var i=0; i < ActiveObjects.length ; i++){
                activeArray.push((ActiveObjects[i].id));
            }
            console.log(activeArray);
            $http.post('/adminmaster/sunglassesLenses/activeAll', JSON.stringify(activeArray))
                .success(function (data) {
                    console.log(data);
                    init(item);
                });
            activeArray = [];

        };

        $scope.deleteAll = function() {
            var a = window.confirm('Are you Sure you want to delete this item?');
            if (a) {
                for (var i = 0; i < ActiveObjects.length; i++) {
                    activeArray.push((ActiveObjects[i].id));
                }
                console.log(activeArray);
                $http.post('/adminmaster/sunglassesLenses/deleteAll', JSON.stringify(activeArray))
                    .success(function (data) {
                        console.log(data);
                        init(item);
                    });
                activeArray = [];
            };
        }
    });