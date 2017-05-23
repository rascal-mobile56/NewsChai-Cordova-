yogiApp.service("yogiService", ["$cordovaSocialSharing","$http","$q", "$timeout",
    function($cordovaSocialSharing, $http, $q, $timeout) {
        getHeaders = function() {
            var authHeaders = {
                'Content-Type': 'application/json',
            };
            return authHeaders;
        };
        var currentNews = "";
        var menudata = "";
        var timeExpired = {};
        var currentModule ="";
        var isTextVersion = false;
        var homeIndex = null;
        var categoryData = {};
        var categoryIndex=null;
        var selectedCategory= "";
        var selectedCategoryData = false;
        var selectedCategoryTitle = "" ;
        var categoryRecordShowned = "";
        var deferred = $q.defer();        return {
              httpRequestHandler : function(url, params, objParam, userHeaders) {
/*                    var timeout = $q.defer(),
                        result = $q.defer(),
                        timedOut = false,
                        httpRequest;

                    $timeout(function () {
                        timedOut = true;
                        timeout.resolve();
                    }, (1000 * 10));*/
            
                    // httpRequest = $http({
                    //     method : 'post',
                    //     url: url,
                    //     params: params,
                    //     data: objParam,
                    //     headers: userHeaders,
                    //     cache: false,
                    //     timeout: timeout.promise
                    // });
                    // $http.get(url,{
                    //     cache: false,
                    //     headers: userHeaders
                    // }).then(function (response) {
                    //     result.resolve(response);
                    // },function (error) {
                    //     if(timedOut){
                    //         result.reject({
                    //             error: 'timeout',
                    //             message: 'Request took longer than 3 seconds.'
                    //         });
                    //     } else {
                    //         result.reject(error);
                    //     }
                    // });
                    // httpRequest.success(function(data, status, headers, config) {
                    //     result.resolve(data);
                    // });

                    // httpRequest.error(function(data, status, headers, config) {
                    //     if (timedOut) {
                    //         result.reject({
                    //             error: 'timeout',
                    //             message: 'Request took longer than 3 seconds.'
                    //     });
                    //     } else {
                    //         result.reject(data);
                    //     }
                    // });
            
                    return $http({
                        method : 'get',
                        url: url,
                        params: params,
                        data: objParam,
                        headers: userHeaders,
                        /*timeout: 1000 * 30,*/
                        cache: false
                    });
            },
            shareFacebook: function (message, image, link) {
                //message = link;
                //$cordovaSocialSharing.shareViaFacebook(message)
                $cordovaSocialSharing.shareViaFacebook(message, image)
                .then(function(result) {
                    console.log('success Share', result);
                    // Success!
                }, function(err) {
                    console.log('error Share', err);

                    // An error occurred. Show a message to the user
                });
            },
            shareWhatsapp: function (message, image, link) {
                //console.warn(message, image, link);
                message = link + '\n\n' + message;
                //$cordovaSocialSharing.shareViaWhatsApp(message);
               /* window.plugins.socialsharing.shareViaWhatsApp(message, image, link, function() {
                    console.log('share ok')
                }, function(errormsg){
                    console.log(errormsg)
                })*/
                $cordovaSocialSharing.shareViaWhatsApp(message, image, link)
                .then(function(result) {
                    console.log('success Share', result);
                    // Success!
                }, function(err) {
                    console.log('error Share', err);

                    // An error occurred. Show a message to the user
                });
            },
            getData: function(url, param, data, successCallback, failureCallback, header) {
                var params = angular.isDefined(param) ? param : "";
                var objParam = angular.isDefined(data) ? data : "";
                var userHeaders = getHeaders();
                if(!header){
                    this.setTimeExpired(this.getSelectedCategory());
                }
                /*$http({
                    method: 'GET',
                    url: url,
                    params: params,
                    data: objParam,
                    headers: userHeaders
                }).success(function(result, status, headers, config) {
                    successCallback(result, status, headers, config);
                }).error(function(result, status, headersdata, config) {
                    failureCallback(result, status, headersdata, config);
                });*/
                // var httpRequest = this.httpRequestHandler(url, params, objParam, userHeaders);
                this.httpRequestHandler(url, params, objParam, userHeaders).then(function (result) {
                    console.log("-----SUCCESS----------", result.data);
                    successCallback(result.data);
                },function (error) {
                    console.log("-----ERROR----------", error.data);
                    failureCallback(error.data);
                })
                // httpRequest.then(function (result) {
                //    //$scope.status = 'Complete';
                //    // $scope.response = data.text;
                //     console.log("-----SUCCESS----------", result);
                //     successCallback(result);
                //
                // }, function (error) {
                //    // $scope.status = 'Error';
                //     //$scope.response = error;
                //     console.log("-----ERROR----------", error);
                //     failureCallback(error);
                // });
                
                
            },
            getCaterotyData: function(url, categoryName) {
                var userHeaders = getHeaders();
                if(categoryName){
                    this.setTimeExpired(categoryName);
                }

                return this.httpRequestHandler(url, '', '', userHeaders)
            },
            getDataCategory:function (key) {
                return categoryData[key.toUpperCase()];
            },
            setLocalData: function(key, data) {
                var value = JSON.stringify(data);
                categoryData[key.toUpperCase()] = data;
                if(localforage){
                    localforage.setItem(key.toUpperCase(), value, function (err) {

                    });
                }
            },
            getLocalData: function(key) {
                var deferred = $q.defer()
                if (localforage){
                    localforage.getItem(key.toUpperCase(), function (err, value) {
                        if(value){
                            deferred.resolve(JSON.parse(value));
                        } else {
                            deferred.resolve(false);
                        }
                    });
                }
                //var data = localStorage.getItem(key);
                //data=JSON.parse(data);
                return deferred.promise;
            },
            setCategoryRecordShowned: function(data) {
                categoryRecordShowned = data;
            },
            getCategoryRecordShowned: function() {
                return categoryRecordShowned;
            },
            setSelectedCategory: function(data) {
                selectedCategory = data;
            },
            getSelectedCategory: function() {
                return selectedCategory;
            },
            setSelectedCategoryData: function(data) {
                selectedCategoryData = data;
            },
            getSelectedCategoryData: function() {
                return selectedCategoryData;
            },
            setSelectedCategoryTitle: function(data) {
                selectedCategoryTitle = data;
            },
            getSelectedCategoryTitle: function() {
                return selectedCategoryTitle;
            },
            setCurrentData: function(data) {
                currentNews = data;
            },
            getCurrentData: function() {
                return currentNews;
            },
            setCurrentModule: function(data) {
                currentModule = data;
            },
            getCurrentModule: function() {
                return currentModule;
            },
            
            setMenuData : function(data){
                menudata = data
            },
            getMenuData : function(){
             return menudata;   
            },
            setCategoryIndex : function(data){
                categoryIndex = data
            },
            getCategoryIndex : function(){
             return categoryIndex;   
            },
            setHomeIndex : function(data){
                homeIndex = data;
            },
            getHomeIndex : function(){
                return homeIndex;   
            },
            setViewMode: function(option) {
                localStorage.setItem('isTextVersion', option);
                isTextVersion = option;
            },
            getViewMode: function() {
                return localStorage.getItem('isTextVersion') == 'true' ? true : false;
            },
             formatDateTime : function (date){
                var monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
                if(date != null){
                    date = new Date(date)
                    return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear() + " "+ this.fomartTimeShow(date.getHours(), date.getMinutes());
                }else {
                    return null;
                }
            },
            getTimeExpired: function (key) {
                //var key = this.getSelectedCategory();
                if(timeExpired[key]){
                    return timeExpired[key];
                } else {
                    return 0;
                }
            },
            setTimeExpired: function (key, refresh) {
                //var keyin = this.getSelectedCategory();
                var keyin = key;
                if (refresh){
                    timeExpired[keyin] = 0;
                    return;
                }
                timeExpired[keyin] = Date.now() + 5*60*1000;
            },
            fomartTimeShow : function(hour, minutes) {
                var result  = hour;
               var  ext = 'AM';
                if(hour > 12){
                    ext = 'PM';
                    hour = (hour - 12);
                    if(hour < 10){
                        result = "0" + hour;
                    }else if(hour == 12){
                        hour = "00";
                        ext = 'AM';
                    }
                }else if(hour < 12){
                    result = ((hour < 10) ? "0" + hour : hour);
                    ext = 'AM';
                }else if(hour == 12){
                    ext = 'PM';
                }
                if(minutes < 10){
                    minutes = "0" + minutes; 
                }             
                result = result + ":" + minutes + ' ' + ext; 
                return result;
            },
            getIndexNews:function (id) {
                var self = this;
                var data = this.getDataCategory(self.getSelectedCategory());

                var index;
                for (var i= 0; i < data.feed.length; i++){
                    if (data.feed[i].id == id) {
                        index =  i;
                        return index;
                    }
                }
                return index;
            },
            checkExistNews:function (id) {
                var exist = {
                    prev:false,
                    next:false
                };

                var data = this.getDataCategory(this.getSelectedCategory());
                var currentNews = this.getIndexNews(id);
                if (currentNews!= 0){
                    exist.prev = true;
                }
                if (currentNews != data.feed.length - 1){
                    exist.next = true;
                }
                return exist;
            }
        }
    }
])