// --- 方法
// 获取对象长度
var getObjLength = function(o){
    var count = 0;
    for(var p in o){
        if(o.hasOwnProperty(p)){
            count++;
        }
    }
    return count;
};
// 返回随机整数，参数：对象长度
var getRnd = function(length){
    // 正常公式时 random 几乎不为零，所以提升总数加一计算随机数再减一
    var random = Math.floor(Math.random()*(length-0)+1);
    return random-1;
};

// --- 填充页面元素

// 获取标签
var jqueryPath = $('#tagPath');
var jqueryToBeElected = $('#tagToBeElected');
//
var fillUL = function(obj){
    var isCreateLink = true;
    jqueryToBeElected.html(""); //清空 tagToBeElected 内容
    if(Array.isArray(obj)){
        for(var i in obj){
            jqueryToBeElected.append("<li>"+obj[i]+"</li>");
        }
    }
    else{
        for(var i in obj){
            var tagLI = $('<li>');
            tagLI.html(i);
            if(obj[i] == undefined || obj[i].length == 0 || getObjLength(obj[i]) == 0){
                // 不加链接
            }
            else{
                // 给可点击标记 a 增加类: clickable
                tagLI.addClass("clickable");
                // 设置点击事件
                tagLI.click(function(){
                    console.log("已点击: "+this.innerHTML);
                    fillUL(obj[this.innerHTML]);
                    // 添加路径
                    var tagA = $('<a>');
                    tagA.html(this.innerHTML);
                    console.log(tagA[0]);
                    tagA.click(function(){
                        fillUL(obj[this.innerHTML]); //传入的 obj
                        // 点击 tagPath 时，删除其后的元素
                        var isDelete = false;
                        for(var i=0;i<jqueryPath[0].childNodes.length;i++){
                            if(isDelete){
                                jqueryPath[0].childNodes[i].remove();
                            }
                            else if(jqueryPath[0].childNodes[i].innerHTML == this.innerHTML){
                                isDelete = true;
                            }
                        }
                        console.log(isDelete);
                    });
                    jqueryPath.append(tagA);
                });
            }
            jqueryToBeElected.append(tagLI);
        }
    }
};

var startPage = function(){
    fillUL(examineTable);
    
    var home = $('<a>');
    home.html("主页");
    home.click(function(){
        startPage();
    });
    jqueryPath.html("");
    jqueryPath.append(home);
};

startPage();

// 随机选取名称

// 在列表中随机选取名称，参数：jquery对象
var getRndName = function(jqueryObj){
    var rnd = getRnd(jqueryObj.children.length);
    var rndName = jqueryObj.childNodes[rnd].innerText;
    $('#tagRndName').html(rndName);
    return rndName;
};

//// 填充选取结果
var selectedName;
var showSelectName = function(obj){
    selectedName = selectName(obj);
    $('#voteResult')[0].childNodes[1].innerText = selectedName;
    if(isCreateLink){
        prepareClick(selectedName);
    }
}
