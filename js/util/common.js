define(['ajaxMock'], function(mock) {
    var MT = {
        clearSpace: function(str) {
            /**
             * 清除字符串所有的空格
             */
            if (str) {
                return str.replace(/\s/g, "");
            } else {
                return false;
            }
        },
        checkPhone:function (str) {
            var regPhone = /^1[3|4|5|8][0-9]\d{8}$/;
            if(str){
                str=str.replace(/[^0123456789]/g,'');
            }
            if(str&&regPhone.test(str)){
                return true;
            }else{
                return false;
            }
        },
        checkAddress:function (str) {
            str=str.replace(/[^\.\w\u4e00-\u9fa5]/g,'');
            if(str&&str.length<250){
                addressCtrl.error.address=false;
                return true;
            }else{
                addressCtrl.error.address=true;
                return false;
            }
        },
        checkName:function (str) {
            str=str.replace(/[^\.\·\w\u4e00-\u9fa5]/g,'');
            if(str&&str.length<20){
                return true;
            }else{
                return false;
            }
        },
    }
    return MT;

}); // end of module define