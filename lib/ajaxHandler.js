(function (window) {
    'use strict';
    function myLibrary() {
        var _myLibraryObject = {};
        var _request = {};


        function initRequst() {
            _request = {
                url: '',
                data: {},
                method: 'GET',
                headers: [],
                cache: true,
                async: true,

            };
        }
        initRequst();


        _myLibraryObject.post = function (objOrUrl, data) {
            initRequst();
            _request.method = 'POST';
            if (typeof objOrUrl == 'object') {

                for (var key in objOrUrl) {
                    if (_request.hasOwnProperty(key)) {
                        _request[key] = objOrUrl[key];
                    }
                }

            } else {
                _request.url = objOrUrl;
                if (typeof data != 'undefined') {
                    _request.data = data;
                }
            }
            makeCall(objOrUrl);
        }
        

        _myLibraryObject.get = function (objOrUrl) {
            initRequst();
            _request.method = 'GET';
            if (typeof objOrUrl == 'object') {

                for (var key in objOrUrl) {
                    if (_request.hasOwnProperty(key)) {
                        _request[key] = objOrUrl[key];
                    }
                }

            } else {
                _request.url = objOrUrl;
            }


            makeCall(objOrUrl);
        }

        _myLibraryObject.put = function (objOrUrl, data) {
            initRequst();
            _request.method = 'PUT';
            if (typeof objOrUrl == 'object') {

                for (var key in objOrUrl) {
                    if (_request.hasOwnProperty(key)) {
                        _request[key] = objOrUrl[key];
                    }
                }

            } else {
                _request.url = objOrUrl;
                if (typeof data != 'undefined') {
                    _request.data = data;
                }
            }
            makeCall(objOrUrl);
        }


        _myLibraryObject.delete = function (objOrUrl) {
            initRequst();
            _request.method = 'DELETE';
            if (typeof objOrUrl == 'object') {
                for (var key in objOrUrl) {
                    if (_request.hasOwnProperty(key)) {
                        _request[key] = objOrUrl[key];
                    }
                }
            } else {
                _request.url = objOrUrl;
            }
            makeCall(objOrUrl);
        }

        function makeCall(objOrUrl) {
            if (typeof objOrUrl.headers == 'object' && objOrUrl.headers.length > 0) {
                _request.headers = objOrUrl.headers;
            }
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    objOrUrl.success(this.responseText);
                } else {
                    if (this.readyState == 4) {
                        objOrUrl.error(this.responseText,this.status);
                    }
                }
            };
            xhttp.open(_request.method, _request.url, _request.async);

            if(_request.cache == false){
                if(_request.url.indexOf("?") == -1){
                    _request.url = _request.url+"?_="+new Date().getTime();
                }else{
                    _request.url = _request.url+"&_="+new Date().getTime();
                }
                
            }

            if(typeof _request.headers == 'object' && _request.headers.length){
                for (var key in _request.headers) {
                    if(typeof _request.headers[key][1] != 'undefined'){
                        xhttp.setRequestHeader(_request.headers[key][0],  _request.headers[key][1])
                    }
                }
            }
            if(_request.data != null && typeof _request.data == 'object' && Object.keys(_request.data).length > 0){
                xhttp.send(JSON.stringify(_request.data));
            }else{
                xhttp.send();
            }
            
        }
        return _myLibraryObject;
    }

   
    if (typeof (window.httR) === 'undefined') {
        window.httR = myLibrary();
    }
})(window); // We send the window variable withing our function
