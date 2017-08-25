
//数据通信对象用来数据通信的对象
var DataObj={
    /*发送获取请求函数
     *@ModefyObj：类型：Object 调用的对象
     *@method：类型：Function 数据获取后的处理函数
     **返回：null
     */
    getDataOfTable:function(ModefyObj,method){
        if(GloabObj.OnTest) {
            var data = "测试代码";
            if(GloabObj.isFunction(ModefyObj[method])){
                ModefyObj[method](data);
            }else{
                GloabObj.Console("不是方法")
            }
        }else{

        }
    }
};

//具体页面的数据处理对象
var PageObj={
    //数据对象所需参数
    Param:{
        getDataForTable:null
    },
    //获取数据的对象模型
    DataObj:{},
    getDataForTable:function(){
        this.DataObj[this.Param.getDataForTable](this,"getDataForTableCallBack");
    },
    getDataForTableCallBack:function(data){
        GloabObj.Console(data,"info");
    },
    init:function(options){
        this.Param=jQuery.extend({}, this.Param, options);
        this.DataObj = options.DataObj;
        this.getDataForTable();
    }
};
PageObj.init({
    //数据处理对象
    DataObj:DataObj,
    //获取特定内容的处理函数
    getDataForTable:"getDataOfTable"
});