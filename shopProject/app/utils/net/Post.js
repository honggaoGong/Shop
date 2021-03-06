'use strict';

var Des = require('@remobile/react-native-des');
var KEY = CONSTANTS.DES_KEY;

module.exports = (url, parameter, success, failed, wait)=>{
    console.log("send:", url, parameter);
    if (typeof failed === 'boolean') {
        wait = failed;
        failed = null;
    }
    if (wait) {
        app.showProgressHUD();
    }
    Des.encrypt(JSON.stringify(parameter), KEY, (base64)=>{
        var param = base64;
        fetch(url,  {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'text/plain'
            },
            body: param
        })
        .then((response)=>response.text())
        .then((base64)=>{
            //console.log("base64:",base64);
            success && Des.decrypt(base64, KEY, (jsonString)=>{
                var json = {};
                try {
                    json = JSON.parse(jsonString);
                } catch (error) {
                    if (!failed || !failed(error)) {
                        Toast('JSON解析错误');
                        console.log(url+ ":JSON解析错误");
                        if (wait) {
                            app.dismissProgressHUD();
                        }
        			}
                }
                console.log("recv:", json);
                if (wait) {
                  app.dismissProgressHUD();
                }
                success(json);
            }, ()=>{
                if (!failed || !failed()) {
                    Toast('数据解密错误');
                    console.log(url+ ":数据解密错误");
                    if (wait) {
                        app.dismissProgressHUD();
                    }
                }
            });
        })
        .catch((error)=>{
            if (!failed || !failed(error)) {
                Toast('网络错误');
                console.log(url+ ":网络错误");
                if (wait) {
                    app.dismissProgressHUD();
                }
			}
        });
    }, ()=>{
        if (!failed || !failed()) {
            Toast('数据加密错误');
            if (wait) {
                app.dismissProgressHUD();
            }
        }
    });
}
