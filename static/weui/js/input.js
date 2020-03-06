var arrAttenderMap = {
'数字化创新部' : ['陈宇玲', '卢彤', '赵杰', '许力', '王胜军', '唐瑞', '王天舒', '乔禹', '赵紫峰', '尹丹娜', '钱宝超', '李旭东', '张涛', '刘洁彬', '邓庆野', '周艺', '肖亚男'],
'信息安全和云服务部' : ['蔡铁军', '方永宏', '于晖', '崔岩', '王彦龙', '许京鹏', '杭喆昊', '方毅'],
'IT治理部': ['李焱', '丁艳', '戴雷'] };

var id=0;

   $(function() {
        FastClick.attach(document.body);
        $('#projectData').hide();
        $('#showProject').hide();
        init();
   });

$("#isProject").click(function () {
    if ($(this).is(":checked")) {
        $('#projectData').show();
        $('#showProject').show();
    } else {
         $('#projectData').hide();
         $('#showProject').hide();
    }
});

/*获取get传参*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

function init(){
    var date = getQueryString('date');
    $('#date').val(date);
    var department = getQueryString('department');
    $('#department').val(department);
    initAttender();
    var idTmp = getQueryString('id');
    if(idTmp){
	id = idTmp;
    	initPageById(id);
    }else{
	id=0;
    }

}

function initPageById(id){
    $.ajax({
        type: "post",
        datatype: "json",
        async: false,
        url:"http://127.0.0.0:8888/dailyreport/?action=get&id="+ id,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success:function(result){
		if(result.data[0]['tag'] == 'daily'){ 
			$('#isProject').attr("checked", false);
       			$('#projectData').hide();
       			$('#showProject').hide();
		}else{
			$('#isProject').attr("checked", true);
			$('#projectData').show();
       	 		$('#showProject').show();
		}
		
		$('#description').val(result.data[0]['description']);
		$('#partner').val(result.data[0]['partner']);
		$('#customer').val(result.data[0]['customer']);
		$('#productdesign').val(result.data[0]['productdesign']);
		$('#teamwork').val(result.data[0]['teamwork']);
		$('#orgnization').val(result.data[0]['orgnization']);
		$('#management').val(result.data[0]['management']);
		$('#operation').val(result.data[0]['operation']);
		$('#competence').val(result.data[0]['competence']);

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

function initAttender(){
    var department = $('#department').val();
    var attenderList = arrAttenderMap[department];
    var tmpHtml = '';
    for(i=0; i< attenderList.length; i++){
        tmpHtml += '<label class="weui-cell weui-check__label"><div class="weui-cell__hd"><input type="checkbox" class="weui-check" name="checkbox1" id=list' +
        i + '>' +
        '<i class="weui-icon-checked"></i></div>'+
        '<div class="weui-cell__bd"><p>' + attenderList[i] +
        '</p></div></label>';
    }

    $('#attender').html(tmpHtml);
}

$("#department").select({
title: "选择部门",
items: ["数字化创新部", "信息安全和云服务部", "IT治理部"],
onChange: function(d) {
    initAttender();
},
});

$("#customer").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
$("#productdesign").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
$("#teamwork").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
$("#orgnization").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
$("#management").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
$("#operation").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
$("#competence").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});


function initDaily(){
    var department = $("#department").val();
    var dailylist = dailyreport[department];
    var date = $('#date').val();
    console.log(date);

    var dailyhtml = '';
    for(i=0; i<dailylist.length; i++){
        var tmpStr = '<div class="weui-cells"><a class="weui-cell weui-cell_access" href="input.html?id=' +
                        dailylist[i].id + '&department=' + department + '&date=' + date +
                        '"><div class="weui-cell__bd weui-cell_primary"><p>' +
                        dailylist[i].description +
                        '</p></div><span class="weui-cell__ft"></span></a></div>';
            dailyhtml = dailyhtml + tmpStr;
    }

        var tmpStr = '<div class="weui-cells"><a class="weui-cell weui-cell_access" href="input.html?'+
                        'department=' + department + '&date=' + date +
                        '"><div class="weui-cell__bd weui-cell_primary"><p>' +
                        '点击新增记录' +
                        '</p></div><span class="weui-cell__ft"></span></a></div>';
        dailyhtml = dailyhtml + tmpStr;

    $('#dailyList').html(dailyhtml);
    $('#tomorrowDailyList').html(dailyhtml);
}

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
        'customer': $('#customer').val(),
        'productdesign' : $('#productdesign').val(),
        'teamwork' : $('#teamwork').val(),
        'orgnization' : $('#orgnization').val(),
        'management': $('#management').val(),
        'operation': $('#operation').val(),
        'competence': $('#competence').val(),
        'projectname': $('#projectsList').val(),
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
