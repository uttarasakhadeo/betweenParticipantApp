angular
    .module( 'betweenParticipantApp', [] )
    .service( 'PredictorListService', [ '$rootScope', function( $rootScope ) {
        return {
            bpFactorList: [
                {   idx:0,
                    predictorName: 'Gp1',
                    categoryList: []
                }
            ],
            add: function( item ) {
                data = {idx:0, predictorName: item, categoryList: []};
                this.bpFactorList.push( data );
                $rootScope.$broadcast( 'PredictorListService.update', this.bpFactorList );
            },
            addSub: function( subItem, index ) {
                category = {idx:0, category: subItem};
                this.bpFactorList[index].categoryList.push( category );
                $rootScope.$broadcast( 'PredictorListService.update', this.bpFactorList );
            }
        };
    }])
    .controller( 'ControllerA', [ 'PredictorListService', '$scope', function( PredictorListService, $scope ) {
        $scope.bpFactorList = PredictorListService.bpFactorList;

        $scope.addItem = function() {
            PredictorListService.add( $scope.newItem );
        };

        $scope.addSubItem = function(index) {
            PredictorListService.addSub( $scope.newSubItem, index );
        };

        $scope.$on( 'PredictorListService.update', function( event, bpFactorList ) {
            $scope.bpFactorList = bpFactorList;
        });
    }]);