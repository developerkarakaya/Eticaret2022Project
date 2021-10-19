(function(){
    'use strict';
    /*
        Use Snippet Codes
        IdeaApp.plugins.loadingBar.show() - IdeaApp.plugins.loadingBar.hide()
        IdeaApp.plugins.notification('Uyarı', 'warning');
    */
    window.currentRevision = window.currentRevision || new Date().getTime();
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    window.engineGarantiPay = window.engineGarantiPay || {
        name: 'engineGarantiPay',
        version: '1.4',
        init: function(){
            if(route.group == 'order' && route.name == 'step3'){
                engineGarantiPay.loading('show');
                engineGarantiPay.eventListeners();
                engineGarantiPay.ready(function(){
                    engineGarantiPay.removePaymentTab();
                });
            }
        },
        loading: function(type){
            if(type == 'show'){
                engineGarantiPay.$('head').append('<style id="LoadingStyle">html{opacity:0!important;visibility:hidden!important;}</style>');
            }else if(type == 'hide'){
                setTimeout(function(){
                    engineGarantiPay.$('style#LoadingStyle').remove();
                }, 30);
            }
        },
        isGarantiPay: false,
        isContinueGarantiPay: false,
        eventListeners: function(){
            engineGarantiPay.$(document).on('click', '[data-selector="payment-tab"]', function(event){
                if(engineGarantiPay.$(this).attr('data-target') == 'GarantiPay'){
                    engineGarantiPay.isGarantiPay = true;
                }else{
                    engineGarantiPay.isGarantiPay = false;
                }
            });
            engineGarantiPay.$(document).on('change', '[data-selector="payment-tab-select"]', function(event){
                if(engineGarantiPay.$(this).find('> option:selected').attr('data-target') == 'GarantiPay'){
                    engineGarantiPay.isGarantiPay = true;
                }else{
                    engineGarantiPay.isGarantiPay = false;
                }
            });
            engineGarantiPay.$(document).on('submit', '[data-selector="payment-form"]', function(event){
                if(engineGarantiPay.$('[id="GarantiPay"]').hasClass('active')){
                    if(engineGarantiPay.isGarantiPay){
                        if(!engineGarantiPay.isContinueGarantiPay){
                            engineGarantiPay.setGarantiPayCouponCode('GARANTIPAY').done(function(){
                                engineGarantiPay.isContinueGarantiPay = true;
                                engineGarantiPay.$('#GarantiPay > [data-selector="payment-form"]').submit();
                            });
                            event.preventDefault();
                        }
                    }
                }
            });
        },
        removePaymentTab: function(){
            if(!isMember){
                engineGarantiPay.$('[data-selector="payment-tab"][data-target="GarantiPay"]').remove();
                engineGarantiPay.$('[data-selector="payment-tab-select"]').find('> option[data-target="GarantiPay"]').remove();
                engineGarantiPay.$('#checkout-header').find('.checkout-banner').remove();
            }
            engineGarantiPay.loading('hide');
        },
        setGarantiPayCouponCode: function(code){
            return engineGarantiPay.$.ajax({
                type: 'POST',
                url: '/hediye-ceki-kullan',
                data: 'code=' + code + '&anticsrf=' + anticsrf
            });
        },
        ready: function(callback, delay){
            if(engineGarantiPay.utils.isUndefined(delay)){
                delay = 30;
            }
            var DOMLoadTimer = setInterval(function(){
                if(document.readyState == 'complete'){
                    clearInterval(DOMLoadTimer);
                    if(callback && engineGarantiPay.utils.isFunction(callback)){
                        callback();
                    }
                }
            }, delay);
        },
        storage: {
            storageCache: {},
            makeFormat: function(value){
                var formatted = value;
                try {
                    formatted = JSON.parse(value)
                } catch (e){}
                return formatted
            },
            readLocalObj: function(type, namespace, setValue, modifier){
                if(engineGarantiPay.utils.isObject(setValue)){
                    setValue = JSON.stringify(setValue)
                }
                if(engineGarantiPay.utils.isUndefined(modifier)){
                    modifier = false
                }
                var storage = window[type == 'session' ? 'sessionStorage' : 'localStorage'],
                    valueArray = namespace.split('.'),
                    valueArrayLength = valueArray.length,
                    currentLevel;
                if(!engineGarantiPay.utils.hasStorage()){
                    currentLevel = this.storageCache
                }else{
                    currentLevel = window[type == 'session' ? 'sessionStorage' : 'localStorage']
                }
                var rootKey = valueArray[0],
                    objectCopy = {},
                    isSetMode = false;
                if(engineGarantiPay.utils.isDefined(setValue)){
                    isSetMode = true
                }
                for(var i = 0; i < valueArrayLength; i++){
                    var key = valueArray[i];
                    if(engineGarantiPay.utils.isUndefined(currentLevel) || !engineGarantiPay.utils.isObject(currentLevel)){
                        return null
                    }
                    if(isSetMode && i === valueArrayLength - 1){
                        if(modifier){
                            var r = this.makeFormat(currentLevel[key]);
                            r[modifier].apply(r, JSON.parse(setValue));
                            setValue = r
                        }
                        currentLevel[key] = setValue
                    }
                    if(!(engineGarantiPay.utils.isObject(currentLevel) && key in currentLevel)){
                        if(i !== valueArrayLength - 1){
                            currentLevel[key] = {}
                        }else{
                            currentLevel[key] = null
                        }
                    }
                    currentLevel = this.makeFormat(currentLevel[key]);
                    if(i === 0){
                        objectCopy = currentLevel
                    }
                }
                if(isSetMode){
                    if(!engineGarantiPay.utils.hasStorage()){
                        this.storageCache[rootKey] = JSON.stringify(objectCopy)
                    }else{
                        storage[rootKey] = JSON.stringify(objectCopy)
                    }
                }
                return currentLevel
            },
            set: function(type, namespace, value, modifier){
                var fetchPath = this.readLocalObj(type, namespace, value, modifier);
                return fetchPath
            },
            get: function(type, namespace){
                var fetchPath;
                if(namespace){
                    fetchPath = this.readLocalObj(type, namespace)
                }else{
                    if(!engineGarantiPay.utils.hasStorage()){
                        fetchPath = this.storageCache
                    }else{
                        fetchPath = window[type == 'session' ? 'sessionStorage' : 'localStorage']
                    }
                }
                return fetchPath
            },
            getUsedSpace: function(type, optKey){
                var allocatedMemory = 0,
                    storage = engineGarantiPay.utils.hasStorage() ? window[type == 'session' ? 'sessionStorage' : 'localStorage'] : false,
                    key;
                if(!storage){
                    return allocatedMemory
                }
                for(key in storage){
                    if(storage.hasOwnProperty(key) && (!optKey || optKey === key)){
                        allocatedMemory += (storage[key].length * 2) / 1024 / 1024
                    }
                }
                return parseFloat(allocatedMemory.toFixed(2))
            },
            clear: function(type, namespace){
                var storage = window[type == 'session' ? 'sessionStorage' : 'localStorage'],
                    valueArray = ((engineGarantiPay.utils.isDefined(namespace)) ? namespace.split('.') : '');
                if(engineGarantiPay.utils.isDefined(valueArray[1])){
                    if(engineGarantiPay.utils.isNull(this.storageCache)){
                        return
                    }
                    var objectCopy;
                    if(!engineGarantiPay.utils.hasStorage()){
                        objectCopy = JSON.parse(this.storageCache[valueArray[0]])
                    }else{
                        objectCopy = JSON.parse(storage[valueArray[0]])
                    }
                    delete objectCopy[valueArray[1]];
                    if(!engineGarantiPay.utils.hasStorage()){
                        this.storageCache[valueArray[0]] = JSON.stringify(objectCopy)
                    }else{
                        storage[valueArray[0]] = JSON.stringify(objectCopy)
                    }
                }else{
                    if(engineGarantiPay.utils.isDefined(namespace)){
                        if(!engineGarantiPay.utils.hasStorage()){
                            delete this.storageCache[namespace]
                        }else{
                            storage.removeItem(namespace)
                        }
                    }else{
                        if(!engineGarantiPay.utils.hasStorage()){
                            this.storageCache = {}
                        }else{
                            storage.clear()
                        }
                    }
                }
                return this
            }
        },
        cookie: {
            read: function read(name){
                var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return (match ? decodeURIComponent(match[3]) : null);
            },
            write: function write(name, value, expires, path, domain, secure){
                var cookie = [];
                cookie.push(name + '=' + encodeURIComponent(value));
                if(engineGarantiPay.utils.isNumber(expires)){
                    var date = new Date();
                    date.setTime(date.getTime() + expires*24*60*60*1000);
                    cookie.push('expires=' + date.toGMTString());
                }
                if(engineGarantiPay.utils.isString(path)){
                    cookie.push('path=' + path);
                }
                if(engineGarantiPay.utils.isString(domain)){
                    cookie.push('domain=' + domain);
                }
                if(secure === true){
                    cookie.push('secure');
                }
                document.cookie = cookie.join('; ');
            },
            remove: function remove(name){
                this.write(name, '', Date.now() - 86400000);
            }
        },
        utils: {
            isMobile: function(){
                return (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i))
            },
            isIpad: function(){
                return this.findDevice('ipad')
            },
            isWindows: function(){
                return this.findDevice('windows')
            },
            isWindowsPhone: function(){
                return this.isWindows() && this.findDevice('phone')
            },
            isAndroid: function(){
                return !this.isWindows() && this.findDevice('android')
            },
            isAndroidTablet: function(){
                return this.isAndroid() && !this.findDevice('mobile')
            },
            isWindowsTablet: function(){
                return this.isWindows() && (this.findDevice('touch') && !this.isWindowsPhone())
            },
            isFxos: function(){
                return (this.findDevice('(mobile;') || this.findDevice('(tablet;')) && this.findDevice('; rv:')
            },
            isCriOs: function(){
                return !navigator.userAgent.match('CriOS')
            },
            isFxosTablet: function(){
                return this.isFxos() && this.findDevice('tablet')
            },
            isTablet: function(){
                return this.isIpad() || this.isAndroidTablet() || this.isWindowsTablet() || this.isFxosTablet()
            },
            findDevice: function(needle){
                return window.navigator.userAgent.toLowerCase().indexOf(needle) !== -1
            },
            isEmpty: function(value){
                return (!value || 0 === value.length)
            },
            isEmptyObject: function(value){
                var name;
                for(name in value){
                    return false
                }
                return true
            },
            isFunction: function(value){
                return typeof value === 'function'
            },
            isObject: function(value){
                return value !== null && typeof value === 'object'
            },
            isArray: function(value){
                return Object.prototype.toString.call(value) == '[object Array]'
            },
            isString: function(value){
                return typeof(value) === 'string'
            },
            isNumber: function(value){
                return typeof value === 'number'
            },
            isNormalInteger: function(str){
                var n = Math.floor(Number(str));
                return n !== Infinity && String(n) === str && n >= 0;
            },
            isUndefined: function(value){
                return typeof value === 'undefined'
            },
            isDefined: function(value){
                return typeof value !== 'undefined'
            },
            isNull: function(value){
                return value === null
            },
            isBoolean: function(value){
                return typeof value === 'boolean'
            },
            isRegExp: function(value){
                return Object.prototype.toString.call(value) == '[object RegExp]'
            },
            isUrl: function(str){
                var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
            	return regexp.test(str);
            },
            isElement: function(node){
                return !!(node && (node.nodeName || (node.prop && node.attr && node.find)))
            },
            isHandlebarsSpecific: function(value){
                return (value && (value.fn != null)) || (value && (value.hash != null));
            },
            safeString: function(str){
                if(this.isDefined(engineGarantiPay.handlebars.Handlebars)){
                    return new engineGarantiPay.handlebars.Handlebars.SafeString(str);
                }else{
                    console.error('engineGarantiPay ~ Handlebars is undefined');
                }
        	},
            result: function(value){
                if(this.isFunction(value)){
        			return value();
        		}else{
        			return value;
        		}
            },
            verify: function(name, fnArg, argTypes){
                var arg, i, _i, msg, len, results;
        		if(argTypes == null){
        			argTypes = [];
        		}
        		fnArg = Array.prototype.slice.apply(fnArg).slice(0, argTypes.length);
        		results = [];
        		for(i = _i = 0, len = fnArg.length; _i < len; i = ++_i){
        			arg = fnArg[i];
        			msg = '{{' + name + '}} requires ' + argTypes.length + ' arguments ' + argTypes.join(', ') + '.';
        			if(argTypes[i].indexOf('safe:') > -1){
        				if(engineGarantiPay.utils.isHandlebarsSpecific(arg)){
        					results.push(engineGarantiPay.utils.err(msg));
        				}else{
        					results.push(void 0);
        				}
        			}else{
        				if(this.isUndefined(arg)){
        					results.push(this.err(msg));
        				}else{
        					results.push(void 0);
        				}
        			}
        		}
        		return results;
            },
            err: function(msg){
                throw new Error(msg);
            },
            addDots: function(str){
                return str.replace(/\//g, '.')
            },
            addSlashes: function(str){
                return str.replace(/\./g, '/')
            },
            getUrlParameters: function(url){
                url = url || window.location.href;
                var vars = {};
                var hashes = url.slice(url.indexOf('#') + 1).split('?');
                if(hashes.length > 1){
                    vars['state'] = hashes[0];
                    hashes = hashes[1].split('&')
                }else{
                    hashes = hashes[0].split('&')
                }
                for(var i = 0; i < hashes.length; i++){
                    var hash = hashes[i].split('=');
                    if(hash.length > 1){
                        vars[hash[0]] = hash[1]
                    }else{
                        vars[hash[0]] = null
                    }
                }
                return vars
            },
            getQueryString: function(field, url){
                var href = url ? url : window.location.href;
                var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
                var string = reg.exec(href);
                return string ? string[1] : null
            },
            hasStorage: function(){
                var uid = new Date;
                var storage;
                var result;
                try {
                    (storage = window.localStorage).setItem(uid, uid);
                    result = storage.getItem(uid) == uid;
                    storage.removeItem(uid);
                    return result && storage
                } catch (exception){}
            },
            forEach: function(object, callback, args){
                var value, i = 0,
                    length = object.length;
                if(args){
                    if(this.isArray(object)){
                        for(; i < length; i++){
                            value = callback.apply(object[i], args);
                            if(value === false){
                                break
                            }
                        }
                    }else{
                        for(i in object){
                            value = callback.apply(object[i], args);
                            if(value === false){
                                break
                            }
                        }
                    }
                }else{
                    if(this.isArray(object)){
                        for(; i < length; i++){
                            value = callback.call(object[i], i, object[i]);
                            if(value === false){
                                break
                            }
                        }
                    }else{
                        for(i in object){
                            value = callback.call(object[i], i, object[i]);
                            if(value === false){
                                break
                            }
                        }
                    }
                }
                return object
            },
            now: function(){
                return new Date().getTime()
            },
            debounce: function(func, wait, immediate){
                var timeout;
                return function(){
                    var context = this,
                        args = arguments;
                    var later = function(){
                        timeout = null;
                        if(!immediate) func.apply(context, args)
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if(callNow) func.apply(context, args)
                }
            },
            throttle: function(fn, threshhold, scope){
                threshhold || (threshhold = 250);
                var last, deferTimer;
                return function(){
                    var context = scope || this;
                    var now = +new Date,
                        args = arguments;
                    if(last && now < last + threshhold){
                        clearTimeout(deferTimer);
                        deferTimer = setTimeout(function(){
                            last = now;
                            fn.apply(context, args)
                        }, threshhold)
                    }else{
                        last = now;
                        fn.apply(context, args)
                    }
                }
            },
            wait: function(callback, hold, scope){
                scope = scope || this;
                return window.setTimeout(function(){
                    callback.apply(scope, arguments)
                }, hold)
            },
            serialize: function(object){
                var str = [];
                for(var i in object)
                    if(object.hasOwnProperty(i)){
                        str.push(encodeURIComponent(i) + "=" + encodeURIComponent(object[i]))
                    }
                return str.join('&')
            },
            serializeJSON: function(form){
                var options = {};
                var formToArray = form.serializeArray();
                engineGarantiPay.$.each(formToArray, function(){
                    if(options[this.name]){
                        if(!options[this.name].push){
                            options[this.name] = [options[this.name]]
                        }
                        options[this.name].push(this.value || '')
                    }else{
                        options[this.name] = this.value || ''
                    }
                });
                return options
            },
            size: function(obj, ownPropsOnly){
                var count = 0,
                    key;
                if(isArray(obj) || isString(obj)){
                    return obj.length
                }else if(isObject(obj)){
                    for(key in obj)
                        if(!ownPropsOnly || obj.hasOwnProperty(key)){
                            count++
                        }
                }
                return count
            },
            find: function(find, str){
                return new RegExp(find, 'g').test(str)
            },
            has: function(object, key){
                return Object.prototype.hasOwnProperty.call(object, key)
            },
            parseBoolean: function(value){
                if(this.isBoolean(value)){
                    return value
                }
                switch(value.toLowerCase()){
                    case 'true':
                    case 'yes':
                    case '1':
                        return true;
                    case 'false':
                    case 'no':
                    case '0':
                    case null:
                        return false;
                    default:
                        return Boolean(value)
                }
            },
            parseHTML: function(str){
                var html = document.createElement('html');
                html.innerHTML = str;
                return html;
			},
            convertUrl: function(value){
                value = value.replace(/&amp;/gi, "\&");
                value = value.replace(/&gt;/gi, "\>");
                value = value.replace(/&lt;/gi, "\<");
                value = value.replace(/&quot;/gi, "\"");
                value = value.replace(/&#039;/gi, "\'");
                return value
            },
            escape: function(value){
                var chars = {
                    '&': '&#38;',
                    '<': '&#60;',
                    '>': '&#62;',
                    ' ': '&nbsp;',
                    "'": '&#39;',
                    '"': '&#34;',
                    '\n': '<br />'
                };
                value = value.replace(/[&<> '"\n]/g, function(i){
                    if(i in chars){
                        return chars[i]
                    }
                    return false
                });
                return value
            },
            trim: function(value){
                return value.toString().replace(/^\s+|\s+$/g, '')
            },
            decode: function(value){
                return engineGarantiPay.$('<div />').html(value).text()
            },
            extend: function(destination, source){
                for(var key in source){
                    if(Object.prototype.hasOwnProperty.call(source, key)){
                        destination[key] = source[key]
                    }
                }
                return destination
            },
            objectLength: function(value){
                var i = 0;
                for(var j in value){
                    if(this.has(value, j)){
                        i++
                    }
                }
                return i
            },
            objectEquals: function(first, second){
                return JSON.stringify(first) === JSON.stringify(second)
            },
            arrayEquals: function(first, second){
                if(!second){
                    return false;
                }
                if(first.length != second.length){
                    return false
                }
                for(var i = 0, l = first.length; i < l; i++){
                    if(first[i] instanceof Array && second[i] instanceof Array){
                        if(!first[i].equals(second[i])) return false
                    }else if(first[i] != second[i]){
                        return false
                    }
                }
                return true
            },
            arrayDiff: function(first, second){
                var a = [],
                    diff = [];
                for(var i = 0; i < first.length; i++){
                    a[first[i]] = true
                }
                for(var i = 0; i < second.length; i++){
                    if(a[second[i]]) delete a[second[i]];
                    else a[second[i]] = true
                }
                for(var k in a){
                    diff.push(k)
                }
                return diff
            },
            arrayRemove: function(array, value){
                for(var i in array){
                    if(array[i] == value){
                        array.splice(i, 1);
                        break
                    }
                }
                return array
            },
            arrayIndexOf: function(array, value){
                if(array.indexOf){
                    return array.indexOf(value)
                }else{
                    var n = array.length;
                    while(n--){
                        if(array[n] === value){
                            return n
                        }
                    }
                    return -1
                }
            },
            removeArrayItemByIndex: function(array, index){
                if(index > -1){
                    return array.splice(index, 1)
                }
            }
        }
    }
    function bindJQuery(){
        if(!window.jQuery){
            throw 'engineGarantiPay: jQuery not found';
            return
        }
        engineGarantiPay.$ = $;
    }
    bindJQuery();
    engineGarantiPay.init();
}());
