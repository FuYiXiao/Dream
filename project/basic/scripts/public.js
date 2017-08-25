
/*
 页面使用的一些公共函数
 */
(function() {
    //控制台重置函数
    (function() {
        var method;
        var noop = function () {};
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }
    }());

    window.GloabObj = {
        //全局参数,当前的开发环境
        OnTest:true,

        //是否是对象
        isObj:function(o){
            return  Object.prototype.toString.call(o)=="[object Object]";
        },
        //是否是数组
        isArray:function(o){
            return  Object.prototype.toString.call(o)=="[object Array]";
        },
        //是否是NULL
        isNULL:function(o){
            return  Object.prototype.toString.call(o)=="[object Null]";
        },
        //是否是函数
        isFunction:function(o){
            return  Object.prototype.toString.call(o)=="[object Function]";
        },
        //这个函数本身就不可以使用,会报参数错误
        isUndefined:function(o){
            return (typeof o == "undefined");
        },
        //当为NULL,或者""时判断为空
        isHasValue:function(o){
            if(this.isNULL(o)){
                return false;
            }
            if(o==""){
                return false;
            }
            return true;
        },

        /*控制台输出内容
         *@consoleString：类型：Stirng ，控制台需要输出的内容
         *@method ：类型：Stirng ，需要调用的方法
         * 返回：null
         */
        Console:function(consoleString,method) {
            if (GloabObj.OnTest) {
                if (method) {
                    console[method](consoleString);
                } else {
                    console.log(consoleString)
                }
            }
        },

        /*获取Url参数
         *@name：类型：Stirng ，获取的参数名
         *@ifUnescape ：类型：true,false ，是否需要消协
         * 返回：null,或者String 值
         */
        getQueryString: function(name, ifUnescape) {
            var r, reg;
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            r = window.location.search.substr(1).match(reg);
            if (r != null) {
                if (ifUnescape) {
                    return unescape(r[2]);
                } else {
                    return r[2];
                }
            }
            return null;
        },

        /*获取Url参数
         *@url：类型：Stirng ，获取的参数名
         * *返回：键值对对象或{}
         */
        parseQueryString: function(url) {
            var arr_url, reg_para, reg_url, result, ret, str_para;
            reg_url = /^[^\?]+\?([\w\W]+)$/;
            reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g;
            arr_url = reg_url.exec(url);
            ret = {};
            if (arr_url && arr_url[1]) {
                result = null;
                str_para = arr_url[1];
                while ((result = reg_para.exec(str_para)) !== null) {
                    ret[result[1]] = result[2];
                }
            }
            return ret;
        },

        /*生成空的iframe
         *@id：类型：Stirng ，iframe的容器ID
         *@url：类型：Stirng ，iframe的url
         *@loadCall：类型：Stirng ，回调函数
         * *返回：true,false是否创建成功
         */
        CreateHideFrame: function(id, url, loadCall) {
            var _this, dFrame, mainBody;
            _this = this;
            mainBody = document.getElementsByTagName('body')[0];
            if (!document.getElementById(id)) {
                dFrame = document.createElement('iframe');
                dFrame.name = id;
                dFrame.id = id;
                dFrame.src = url;
                dFrame.style.width = "0";
                dFrame.style.height = "0";
                dFrame.style.position = "absolute";
                dFrame.style.visibility = "hidden";
                dFrame.onload = dFrame.onreadystatechange = function() {
                    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                        if (_this.IsFunction(loadCall)) {
                            loadCall();
                        }
                        return dFrame.onload = dFrame.onreadystatechange = null;
                    }
                };
                return mainBody.insertBefore(dFrame, mainBody.firstChild);
            }
        },

        /*删除指定的DOM
         *@frameID：类型：Stirng ，容器的DOM的ID
         * *返回：true,false是否删除成功
         */
        DropIFrame: function(frameID) {
            return $("#" + frameID).remove();
        },

        /*浏览器判断函数
         * *返回：一个对象判断各个浏览器
         */
        WhatBrowser: (function() {
            var UserAgent, UserAgent2;
            UserAgent = navigator.userAgent.toLowerCase();
            UserAgent2 = navigator.userAgent;
            return {
                isUc: /ucweb/.test(UserAgent) || /ucbrowser/.test(UserAgent),
                isChrome: /chrome/.test(UserAgent),
                isFirefox: /firefox/.test(UserAgent),
                isOpera: /opera/.test(UserAgent),
                isSafire: /safari/.test(UserAgent) && !/chrome/.test(UserAgent),
                is360: /360se/.test(UserAgent),
                isBaidu: /bidubrowser/.test(UserAgent),
                isSougou: /metasr/.test(UserAgent),
                isIE6: /msie 6.0/.test(UserAgent),
                isIE7: /msie 7.0/.test(UserAgent),
                isIE8: /msie 8.0/.test(UserAgent),
                isIE9: /msie 9.0/.test(UserAgent),
                isIE10: /msie 10.0/.test(UserAgent),
                isIE11: /msie 11.0/.test(UserAgent),
                isLB: /lbbrowser/.test(UserAgent),
                isWX: /micromessenger/.test(UserAgent),
                isQQ: /qqbrowser/.test(UserAgent),
                isBoosjApp: /boosj/.test(UserAgent),
                isIECore: UserAgent2.indexOf('Trident') > -1,
                isOperaCore: UserAgent2.indexOf('Presto') > -1,
                isGoogleOrAppleCore: UserAgent2.indexOf('AppleWebKit') > -1,
                isFirefoxCore: UserAgent2.indexOf('Gecko') > -1 && UserAgent2.indexOf('KHTML') === -1,
                isMobile: !!UserAgent2.match(/AppleWebKit.*Mobile.*/),
                isIos: !!UserAgent2.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                isAndroid: UserAgent2.indexOf('Android') > -1 || UserAgent2.indexOf('Linux') > -1,
                isIPhone: UserAgent2.indexOf('iPhone') > -1 || UserAgent2.indexOf('Mac') > -1,
                isIPad: UserAgent2.indexOf('iPad') > -1,
                isWebApp: UserAgent2.indexOf('Safari') === -1
            };
        })(),

        /*系统判断函数
         * *返回：一个对象判断各个浏览器
         */
        WhatSystem: (function() {
            var UserAgent;
            UserAgent = navigator.userAgent.toLowerCase();
            return {
                isIpad: /ipad/.test(UserAgent),
                isIphone: /iphone os/.test(UserAgent),
                isAndroid: /android/.test(UserAgent),
                isWindowsCe: /windows ce/.test(UserAgent),
                isWindowsMobile: /windows mobile/.test(UserAgent),
                isWin2K: /windows nt 5.0/.test(UserAgent),
                isXP: /windows nt 5.1/.test(UserAgent),
                isVista: /windows nt 6.0/.test(UserAgent),
                isWin7: /windows nt 6.1/.test(UserAgent),
                isWin8: /windows nt 6.2/.test(UserAgent),
                isWin81: /windows nt 6.3/.test(UserAgent)
            };
        })(),

        /*距离现在的时间点
         *@dateTimeStamp：类型：Date ，Date的毫秒数
         **返回：距离现在时间点的字符串
         */
        TimeChange: function(dateTimeStamp) {
            var day, dayC, diffValue, halfamonth, hour, hourC, minC, minute, month, monthC, now, result, weekC;
            minute = 1000 * 60;
            hour = minute * 60;
            day = hour * 24;
            halfamonth = day * 15;
            month = day * 30;
            now = new Date().getTime();
            diffValue = now - dateTimeStamp;
            monthC = diffValue / month;
            weekC = diffValue / (7 * day);
            dayC = diffValue / day;
            hourC = diffValue / hour;
            minC = diffValue / minute;
            result = "";
            if (monthC >= 1) {
                result =  parseInt(monthC) + "个月前";
            } else if (weekC >= 1) {
                result =  parseInt(weekC) + "周前";
            } else if (dayC >= 1) {
                result =  parseInt(dayC) + "天前";
            } else if (hourC >= 1) {
                result = parseInt(hourC) + "个小时前";
            } else if (minC >= 1) {
                result =  parseInt(minC) + "分钟前";
            } else {
                result = "刚刚发布";
            }
            return result;
        },

        /*插入到input光标指定位置
         *@JsDom：类型：JS的Dom对象
         *@myValue：类型：String  ，需要插入的String值
         * *返回：null
         */
        insertAtCursor: function(JsDom, myValue) {
            var endPos, restoreTop, sel, startPos;
            if (document.selection) {
                JsDom.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
                return sel.select();
            } else if (JsDom.selectionStart || JsDom.selectionStart === 0) {
                startPos = JsDom.selectionStart;
                endPos = JsDom.selectionEnd;
                restoreTop = JsDom.scrollTop;
                JsDom.value = JsDom.value.substring(0, startPos) + myValue + JsDom.value.substring(endPos, JsDom.value.length);
                if (restoreTop > 0) {
                    JsDom.scrollTop = restoreTop;
                }
                JsDom.focus();
                JsDom.selectionStart = startPos + myValue.length;
                return JsDom.selectionEnd = startPos + myValue.length;
            } else {
                JsDom.value += myValue;
                return JsDom.focus();
            }
        },

        /*判断浏览器是否支持某个CSS属性
         *@Attribute：类型：String , 某个CSS属性
         *@Value：类型：String  ，取值
         * *返回：true 或者 false
         */
        IfSupportCssAttributeAndValue: function(Attribute, Value) {
            var element;
            element = document.createElement('div');
            if (Attribute in element.style) {
                element.style[Attribute] = Value;
                return element.style[Attribute] === Value;
            } else {
                return false;
            }
        },

        /*以320像素的宽度为准，如果不支持ＶＷ，便JS输出字体大小
         **返回：Number　返回一个数值
         */
        WriteFontSizeOfHtml: function() {
            if (!BackObj.IfSupportCssAttributeAndValue("fontSize", "100vw")) {
                var fontSize, htmlFontSize;
                fontSize = $(window).width() / 320 * 100;
                $("html").css("font-size", fontSize + 'px');
            }
        },

        /*获取随机函数
         *@Min：类型：Number 取值得最小值（包含）
         *@Max：类型：Number 取值得最值（包含）
         **返回：Number　返回一个数值
         */
        GetRandomNum: function(Min, Max) {
            var Rand, Range;
            Min = parseInt(Min);
            Max = parseInt(Max);
            Range = Max - Min;
            Rand = Math.random();
            return Min + Math.round(Rand * Range);
        },

    };

    if(define){
        define(function() {
            return window.GloabObj;
        });
    }

}).call(this);

