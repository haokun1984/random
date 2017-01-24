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
var examineTable = {
    "大弯街道":{"area35":{"是否拆迁":"是"},"area80":{"是否拆迁":"否"},"area125":{"是否拆迁":"否"},"area170":{"是否拆迁":"否"}},
    "红阳街道":["area36","area81","area126","area171"],
    "弥牟镇":["area37","area82","area127","area172"],
    "城厢镇":["area38","area83","area128","area173"],
    "大同镇":["area39","area84","area129","area174"],
    "祥福镇":["area40","area85","area130","area175"],
    "清泉镇":["area41","area86","area131","area176"],
    "姚渡镇":["area42","area87","area132","area177"],
    "龙王镇":["area43","area88","area133","area178"],
    "福洪镇":["area44","area89","area134","area179"],
    "人和乡":{"area45":["人1","人2","人3"],"area90":[],"area135":[],"area180":[]}
};
var examineTable2 = {
    "主城区":{
        "主要街道-区城管局":[
            "向阳路公厕",
            "西林路公厕",
            "邮电巷公厕",
            "玉带小区公厕（老农民街）",
            "团结西路445号公厕",
            "团结东路与青江南路交汇处公厕",
            "团结西路13号公厕",
            "青江西路文化馆公厕",
            "青江南路99号旁公厕",
            "青江东路公厕",
            "民政局公厕（新广场）",
            "青白江区华金大道一段公厕",
            "大弯北路公厕",
            "大弯南路54号旁公厕",
            "教育街道公厕",
            "政府北路公厕",
            "1标公厕",
            "6标公厕",
            "8标公厕",
            "红阳路公厕",
            "团结东路446号公厕",
            "同辉路公厕",
            "奔腾广场公厕",
            "化工路公厕",
            "杨柳街公厕",
            "同华大道凯莱丽景公厕",
            "红阳路与同华大道交汇处公厕",
            "石家碾路金牛座公厕",
            "凤凰大道一段北侧公厕1",
            "凤凰大道一段北侧公厕2"
        ],
        "河道-区水务局":[],
        "公厕-区城管局":[],
        "工地-区建设局":[],
        "市场-区商务局":[],
        "物管小区-区房管局":[],
        "无物管小区-红阳":[],
        "无物管小区-大弯":[],
        "公园、景点-区建设局、区旅发中心、区文体广新":[],
        "交通站点-区交通局":[],
        "闲置土地-红阳":[],
        "闲置土地-大弯":[],
        "畜禽养殖场-区农发局":[],
        "村（社区）-大弯":[],
        "村（社区）-红阳":[]
    },
    "大弯街道":["area35","area80","area125","area170"],
    "红阳街道":["area36","area81","area126","area171"],
    "弥牟镇":["area37","area82","area127","area172"],
    "城厢镇":["area38","area83","area128","area173"],
    "大同镇":["area39","area84","area129","area174"],
    "祥福镇":["area40","area85","area130","area175"],
    "清泉镇":["area41","area86","area131","area176"],
    "姚渡镇":["area42","area87","area132","area177"],
    "龙王镇":["area43","area88","area133","area178"],
    "福洪镇":["area44","area89","area134","area179"],
    "人和乡":["area45","area90","area135","area180"]
};

// 获取标签 tagToBeElected
var jqueryToBeElected = $('#tagToBeElected');
var pathHelp;
var fillUL = function(obj){
    pathHelp = obj;
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
                console.log("可加链接："+tagLI.html());
                // 增加类：clickable
                tagLI.addClass("clickable");
                // 设置点击事件
                tagLI.click(function(){
                    console.log("已点击: "+this.innerHTML);
                    fillUL(obj[this.innerHTML]);
                });
            }
            jqueryToBeElected.append(tagLI);
        }
        // for(var i in jqueryToBeElected[0]){
    }
};
//
var path = [], level = 0;
var setPath = function(){

};
var fillPage = function(){
    fillUL(examineTable2);
};

fillPage();

// 在列表中随机选取名称，参数：对象
var selectName = function(obj){
    //var rnd = getRnd($('#voteList')[0].children.length);
    var rnd = getRnd(obj.children.length);
    return obj.childNodes[rnd].innerText;

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
