module.exports = {
    date2str(date) {
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        (month<10)&&(month='0'+month);
        (day<10)&&(day='0'+day);
        return year+'-'+month+'-'+day;
    },
    dateFormat(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    getVisibleText(text, n) {
        var realLength = 0, len = text.length, preLen = -1, charCode = -1, needCut = false;
        for (var i=0; i<len; i++) {
            charCode = text.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (preLen===-1 && realLength >= n) {
                preLen = i+1;
            } else if (realLength > n+2) {
                needCut = true;
                break;
            }
        }
        if (needCut) {
            text = text.substr(0, preLen)+'..';
        }
        return text;
    },
    cutLimitText(text, n) {
        var realLength = 0, len = text.length, preLen = -1, charCode = -1, needCut = false;
        for (var i=0; i<len; i++) {
            charCode = text.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (preLen===-1 && realLength >= n) {
                preLen = i+1;
            } else if (realLength > n) {
                needCut = true;
                break;
            }
        }
        if (needCut) {
            text = text.substr(0, preLen);
        }
        return text;
    },
    getCurrentDateStr() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        (month<10)&&(month='0'+month);
        (day<10)&&(day='0'+day);
        return year+'-'+month+'-'+day;
    },
    getStrlen(str){
        var len = 0;
        for (var i=0; i<str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
               len++;
            } else {
              len+=2;
            }
        }
        return len;
    },
    str2date(str) {
        return new Date(str);
    },
    checkPhone(phone) {
        return /^1\d{10}$/.test(phone);
    },
    checkPassword(pwd) {
        return /^[\d\w_]{6,20}$/.test(pwd);
    },
    checkVerificationCode(code) {
        return /^\d{6}$/.test(code);
    },
    checkNumberCode(code) {
        return /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(code);
    },
    checkBankCardCode(code) {
        return /^(\d{16}|\d{19})$/.test(code);
    },
};
