//var dataJson = require('../data/project.json'); //with path
//import * from '../data/project.json'

var id=0;
var arrProject = [0];

$(function() {
//    init();
//    initDomain($('#department').val());
//    initArrProjectHtml($('#department').val());
});

function init(){
    var date = getQueryString('date');
    $('#date').val(date);
    var department = getQueryString('department');
    $('#department').val(department);

    var idTmp = getQueryString('id');
    if(idTmp){
	    id = idTmp;
    	initPageById(id);
    }else{
	    id=0;
    }
}


function initArrProjectHtml(department){
    var domainHtml = initDomain(department);
    var tmpPre =  '<div class="weui-cell weui-cell_swiped">' +
                  '<div class="weui-cell weui-cell_select weui-cell_select-before">' +
                  '<div class="weui-cell__hd">' +
                  '<select class="weui-select" style="width:145px" id="domain';
    var tmpMid = '" onchange="initProjectList()">' + domainHtml + '</select></div>' +
                     '<div class="weui-cell"><div class="weui-cell__bd">' +
                     '<input class="weui-input" type="text" placeholder="选择项目" id="projectsList';
    var tmpEnd = '"></div></div></div></div>' +
                '<div class="weui-cell__ft">' +
                '<a class="weui-swiped-btn weui-swiped-btn_warn delete-swipeout" href="javascript:">删除</a></div>' +
                '</div>';

    var html = '';

    for(var i=0; i<arrProject.length; i++){
        html += tmpPre + arrProject[i] +  tmpMid + arrProject[i] + tmpEnd;
    }

    console.log(html);
    $('#arrProject').html(html);
}


function addArrProjectHtml(){
    var department = $('#department').val();
    var domainHtml = initDomain(department);
    var tmpPre = '<div class="weui-cell weui-cell_select weui-cell_select-before">' +
                 '<div class="weui-cell__hd">' +
                 '<select class="weui-select" style="width:145px" id="domain';
    var tmpMid = '" onchange="initProjectList()">' + domainHtml + '</select></div>' +
                     '<div class="weui-cell"><div class="weui-cell__bd">' +
                     '<input class="weui-input" type="text" placeholder="选择项目" id="projectsList';
    var tmpEnd = '"></div></div></div></div>';
    var html =  $('#arrProject').html();

    i = arrProject.length;
    html += tmpPre + i +  tmpMid + i + tmpEnd;
    $('#arrProject').html(html);

    arrProject.push(i);
    console.log(arrProject);
}


function initDomain(department){
    var tmpHtml = '';
    var tmpDomain = projects[department];
    for(var p in tmpDomain){
        tmpHtml += '<option value='+p+'>' + p  + '</option>';
    }
    return tmpHtml;
//    console.log(tmpHtml);
//    $('#domain').html(tmpHtml);
//    initProjectList();
}

function addProject(){
    console.log('test');
}

function initProjectList(){
    var department = $('#department').val();
    var domain = $('#domain').val();

//   console.log(itemsPro);

    var itemsPro = [];

    for(var i=0; i< projects[department][domain].length; i++){
        var tmp = {'title' : projects[department][domain][i], 'value': projects[department][domain][i]};
        itemsPro.push(tmp);
    }

       $("#projectsList").select({
        title: "项目名称",
        multi: true,
//        min: 1,
        items: itemsPro,
        onClose: function (d) {
            console.log('close');
        }
      });

      console.log(itemsPro);
}

function initPageById(id){
    $.ajax({
        type: "post",
        datatype: "json",
        async: false,
        url:"http://127.0.0.0:8888/dailyreport/?action=get&id="+ id,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success:function(result){
            $('#description').val(result.data[0]['description']);
            $('#partner').val(result.data[0]['partner']);
		    var arrAttender = result.data[0]['attender'].split(',');
            var department = $('#department').val();
            var attenderList = arrAttenderMap[department];

            for(var i=0; i< attenderList.length-1; i++){
                var tmpstr = $.inArray(attenderList[i], arrAttender);
                if(tmpstr != -1){
                    $('#list'+i).attr("checked", true);
                }else{
                    $('#list'+i).attr("checked", false);
                }
            }
	    },
        error: function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    }); 
}



$("#department").select({
title: "选择部门",
items: departments,
onChange: function(d) {

},
});

function getDailyByDate(){
    var date = $('#date').val();
      $.ajax({
            type: "post",
            datatype: "json",
            async: false,
            url:"http://127.0.0.1/dailyreport?action=get&date="+date,
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
}

function getAllProjects(){
   var projects = [];
   $.ajax({
   		type: "post",
   		datatype: "json",
   		async: false,
		url:"http://127.0.0.1/dailyreport/project?action=get&type=detail&department='数字化创新部'",
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


function submitDaily(){
    var attender = '';
    var department = $('#department').val();
    var attenderList = arrAttenderMap[department];
    for(i=0; i< attenderList.length; i++){
        if($("#list" + i ).is(":checked")){
            attender += attenderList[i] + ",";
        }
    }
    var tag = $('#isProject').is(":checked")? 'project' : 'daily';
    if(attender == '' || $('#description').val() == ''){
	alert("事项描述和参与人不能为空");
	return;
    }

       var data = {
        'date': $('#date').val(),
        'department': $('#department').val(),
        'description': $('#description').val(),
        'partner':  $('#partner').val(),
        'attender': attender,
        'tag': tag,
	    'action': 'insert',
	    'id': id,
    };

       $.ajax({
   		type: "post",
   		datatype: "json",
   		async: false,
   		data: data,
		url:"http://127.0.0.0:8888/dailyreport/?action=insert",
   		success:function(result){
    			alert('提交成功');
			    window.location.href = "show.html?department="+department+"&date="+$('#date').val();
		},
		error: function(e){
			console.log(e.status);
			console.log(e.responseText);
			alert('遇到一点点问题，请稍后再试');
		}
	});
}
