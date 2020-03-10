var id=0;
var arrProject = [];

$(function() {
    initDomain($('#department').val());
    initProject();
    init();
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

function addArrProjectList(){
    var department = $('#department').val();
    var projectname = $('#domain').val() + '-' + $('#project').val();

    arrProject.push(projectname);
    initArrProjectList();
    console.log(arrProject);
}

function initArrProjectList(){
    var htmlPre = '<div class="weui-cell weui-cell_swiped"><div class="weui-cell__bd"><div class="weui-cell"><div class="weui-cell__bd"><p>';
    var htmlMiddle = '</p></div> <a class="weui-btn weui-btn_mini weui-btn_default" href="javascript:deleteArrProjectList(';
    var htmlEnd = ')">删除</a></div> </div></div>';

    var tmpHtml = '';
    for(var i=0; i<arrProject.length; i++){
        tmpHtml += htmlPre + arrProject[i] + htmlMiddle + i + htmlEnd;
    }

    $('#projectList').html(tmpHtml);
}

function deleteArrProjectList(index){
  console.log("delete " + index);
  arrProject.splice(index, 1);
  initArrProjectList();
}

function initDomain(department){
    var tmpHtml = '';
    var tmpDomain = projects[department];
    for(var p in tmpDomain){
        tmpHtml += '<option value='+p+'>' + p  + '</option>';
    }

    $('#domain').html(tmpHtml);
}

function addProject(){
    console.log('test');
}

function initProject(){
    var department = $('#department').val();
    var domain = $('#domain').val();
    var itemsPro = [];

    var tmpHtml = '';

    for(var i=0; i< projects[department][domain].length; i++){
        var tmp = {'title' : projects[department][domain][i], 'value': projects[department][domain][i]};
        tmpHtml += '<option value=' + projects[department][domain][i] +'>' + projects[department][domain][i] + '</option>';
    }

    $('#project').html(tmpHtml);
}

function initPageById(id){
    $.ajax({
        type: "post",
        datatype: "json",
        async: false,
        url: urlPre + "/dailyreport/?action=get&id="+ id,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        success:function(result){
            $('#description').val(result.data[0]['description']);
            $('#partner').val(result.data[0]['partner']);
		    var tmpProject = result.data[0]['project'].split(',');

		    if(tmpProject.length == 1){
		        var arrTmp = tmpProject[0].split('-');
                setSelected('domain', arrTmp[0]);
                initProject();
                setSelected('project', arrTmp[1]);

		    }else{
		        arrProject = tmpProject;
		        initArrProjectList();
		    }
	    },
        error: function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    }); 
}

function setSelected(id, value){
    $("#" + id + ' option[value="' + value + '"]').attr("selected", "selected");
}



$("#department").select({
title: "选择部门",
items: departments,
onChange: function(d) {
    initDomain($('#department').val());
    initProject();
    arrProject = [];
    initArrProjectList();
},
});

function dateChange(){
    initDomain($('#department').val());
    initProject();
    init();
}

function getAllProjects(){
   var projects = [];
   $.ajax({
   		type: "post",
   		datatype: "json",
   		async: false,
		url: urlPre + "/dailyreport/project?action=get&type=detail&department='数字化创新部'",
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
    var department = $('#department').val();
    if( $('#description').val() == ''){
	    alert("事项描述不能为空");
	    return;
    }

    var project = '';
    if(arrProject.length == 0){
        project = $('#domain').val() + '-' + $('#project').val();
    }else{
        project = arrProject.toString();
    }
    console.log(project);

       var data = {
        'date': $('#date').val(),
        'department': $('#department').val(),
        'description': $('#description').val(),
        'partner':  $('#partner').val(),
        'project': project,
	    'action': 'insert',
	    'id': id,
    };

       $.ajax({
   		type: "post",
   		datatype: "json",
   		async: false,
   		data: data,
		url: urlPre + "/dailyreport/?action=insert",
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
