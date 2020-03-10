$(function() {
    var department = getQueryString('department');
    var dateFromGet = getQueryString('date');

    if(department){ $('#department').val(department);}
    if(dateFromGet){
        $('#date').val(dateFromGet);
    }else{
        initDate();
    }

    initDaily();
    var a = getDailyByDate($('#date').val());
    initVarDailylist(a);
});

function initDate(){
    today = getToday();
    $('#date').val(today);
}

function dateChange(){
     initDaily();
}

$("#department").select({
title: "选择部门",
items: ["数字化创新部", "信息安全和云服务部", "IT治理部"],
onChange: function(d) {
  console.log(this, d);
  initDaily();
},
onClose: function() {
//  console.log("close");
},
onOpen: function() {
//  console.log("open");
},
});

var dailyreport = {
    '数字化创新部': [{'id': 1, 'description': '我是数字化项目一'},{'id': 2, 'description': '我是数字化项目二'},{'id': 3, 'description': '我是数字项目三'}],
    '云安全服务部': [{'id': 1, 'description': '我是云一'},{'id': 2, 'description': '我是云二'}],
    'IT治理部': [{'id': 1, 'description': '我是I一'},{'id': 2, 'description': '我是I二'},{'id': 3, 'description': '我是I三'}]
    };


function initDaily(){
    var department = $("#department").val();
    var date = $('#date').val();
    var tom =  getTomorrow(date);

    var arrTmp = getDailyByDate(date);
    var dailyreport = initVarDailylist(arrTmp);
    var dailylist = dailyreport[department];
    var dailyhtml = '';
    console.log(dailyreport);
    console.log(dailylist);


    for(i=0; i<dailylist.length; i++){
	  var tag = '';
          if(dailylist[i].tag == 'project')  {
		tag = '项目';
	  }        
          var tmpStr = '<div class="weui-cells"><a class="weui-cell weui-cell_access" href="input.html?id=' +
                        dailylist[i].id + '&department=' + department + '&date=' + date +
                        '"><div class="weui-cell__bd weui-cell_primary"><p>' +
                        dailylist[i].description +
                        '</p></div><span class="weui-cell__ft">' + tag + '</span></a></div>';
            dailyhtml = dailyhtml + tmpStr;
    }

     var tmpStr = '<a href="input.html?department=' + department + '&date=' + date + '"><div class="weui-cell weui-cell_link"><div class="weui-cell__bd">添加更多</div></a>';
     dailyhtml = dailyhtml + tmpStr;

    $('#dailyList').html(dailyhtml);

    arrTmp = getDailyByDate(tom);
    dailyreport = initVarDailylist(arrTmp);
    dailylist = dailyreport[department];
    dailyhtml = '';
    for(i=0; i<dailylist.length; i++){
        var tmpStr = '<div class="weui-cells"><a class="weui-cell weui-cell_access" href="input.html?id=' +
                        dailylist[i].id + '&department=' + department + '&date=' + tom +
                        '"><div class="weui-cell__bd weui-cell_primary"><p>' +
                        dailylist[i].description +
                        '</p></div><span class="weui-cell__ft"></span></a></div>';
            dailyhtml = dailyhtml + tmpStr;
    }

     var tmpStr = '<a href="input.html?department=' + department + '&date=' + tom + '"><div class="weui-cell weui-cell_link"><div class="weui-cell__bd">添加更多</div></a>';
     dailyhtml = dailyhtml + tmpStr;
    $('#tomorrowDailyList').html(dailyhtml);
}

function getDailyByDate(date){
    var dailyLists = [];
    $.ajax({
            type: "post",
            datatype: "json",
            async: false,
            url:"http://127.0.0.1:8888/dailyreport/?action=get&date="+date,
            contentType: "application/json;charset=UTF-8",
            success:function(result){
                    dailyLists = result.data;
		    console.log(result);
            },
            error: function(e){
                console.log(e.status);
                console.log(e.responseText);
            }
        });
   return dailyLists; 
}

function initVarDailylist(dailyLists){
    var ret = {'数字化创新部':[], '信息安全和云服务部':[], 'IT治理部':[]};
    for(var i=0; i<dailyLists.length; i++){
	    ret[dailyLists[i].department].push(dailyLists[i]);
    }
    return ret;
}

function getAllProjects(){
   var projects = [];
   $.ajax({
   		type: "post",
   		datatype: "json",
   		async: false,
		url:"http://127.0.0.1:8888/dailyreport/project?action=get&type=detail&department='数字化创新部'",
   		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
   		success:function(result){
    			console.log('success')
    			projects = result.data;
		},
		error: function(e){
			console.log(e.status);
			console.log(e.responseText);
		}
	});

    return projects;
}
