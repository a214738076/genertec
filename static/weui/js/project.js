 var option = {
    tooltip: {},
    legend: {
      // data: ['协同系统']
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: '用户沟通', max: 5 },
        { name: '产品设计', max: 5 },
        { name: '架构协同', max: 5 },
        { name: '团队组织', max: 5 },
        { name: '项目管控', max: 5 },
        { name: '价值运营', max: 5 },
        { name: '核心能力', max: 5 }
      ]
    },
    series: [{
      // name: '协同系统',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [
        {
          value: [2, 3, 3, 3, 3, 3, 3],
          name: '协同-协同系统'
        },
      ]
    }]
  };


$("#department").select({
    title: "选择部门",
    items: departments,
    onChange: function(d) {
       init();
    },
});

function init(){
    initDomain();
    initProject();
//    initTarget();
//    initDailyList();
}

function initProjectInfo(){
    initTarget();
    initDailyList();
}

function initDate(){
    var today = getToday();
    $('#dateEnd').val(today);

    var dateStart = getLastMonthDay(today);
    $('#dateStart').val(dateStart);
}

function initDomain(){
    var department = $('#department').val();
    var tmpHtml = '';
    var tmpDomain = projects[department];
    for(var p in tmpDomain){
        tmpHtml += '<option value='+p+'>' + p  + '</option>';
    }

    $('#domain').html(tmpHtml);
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
    initProjectInfo();
}


function initTarget(){
    var department = $('#department').val();
    var domain = $('#domain').val();
    var project = $('#project').val();

    var tmpHtml = '';
    var htmlPre = '<div class="weui-media-box__desc"><div class="weui-cell__bd"><div class="weui-cell"><div class="weui-cell__bd"><p>';
    var htmlEnd = '</p></div></div> </div></div>';
    if(domain != '其他' && project != '其他'){
        var arrTarget = projectDetails[department][domain][project]['target'];
        for(var i=0; i<arrTarget.length; i++){
            tmpHtml += htmlPre + (i+1) + '. ' +arrTarget[i] + htmlEnd;
        }
        $('#owner').val(projectDetails[department][domain][project]['owner']);
        $('#level').val(projectDetails[department][domain][project]['level']);

        console.log('begin');
        console.log(projectDetails[department][domain][project]['attender']);
        console.log('end');

        var attender = projectDetails[department][domain][project]['attender'];
        if( typeof(attender) != undefined && attender !== ''){
             $('#attender').val(attender);
             $('#attenderDisplay').css('display', 'block');
        }

        var attender1 = projectDetails[department][domain][project]['attender1'];
        if(projectDetails[department][domain][project]['attender1']){
            $('#attender1').val(projectDetails[department][domain][project]['attender1']);
            $('#attenderDisplay1').css('display', 'block');
        }
    }else{
        tmpHtml = htmlPre + '暂未设定' + htmlEnd;
    }

    $('#target').html(tmpHtml);


}

function getDailyList(){
     var project = $('#domain').val() + '-' + $('#project').val();

     var data = {
        'dateStart': $('#dateStart').val(),
        'dateEnd' : $('#dateEnd').val(),
        'department': $('#department').val(),
        'project': project,
	    'action': 'get',
    };

    var ret = [];

      $.ajax({
   		type: "post",
   		datatype: "json",
   		async: false,
   		data: data,
		url: urlPre + "/dailyreport/?action=get&type=history&department='数字化创新部'",
   		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
   		success:function(result){
    			ret =  result.data;
		},
		error: function(e){
			console.log(e.status);
			console.log(e.responseText);
		}
	});

	return ret;
}

function initDailyList(){
    var arrProjectList = getDailyList();
    var department = $('#department').val();

    var tmphtml = '';

    if(!arrProjectList || arrProjectList.length == 0)
    {
           var htmlPre = '<div class="weui-media-box__desc"><div class="weui-cell__bd"><div class="weui-cell"><div class="weui-cell__bd"><p>';
           var htmlEnd = '</p></div></div> </div></div>';
           tmphtml = htmlPre + '暂无记录' + htmlEnd;
    }else{
        for(i=0; i<arrProjectList.length; i++){
              var tmpStr = '<a class="weui-cell weui-cell_access" href="input.html?id=' +
                            arrProjectList[i].id + '&department=' + department + '&date=' + arrProjectList[i].date +
                            '"><div class="weui-cell__bd"><p>' +
                            arrProjectList[i].description +
                            '</p></div> <div class="weui-cell__ft">'+
                             arrProjectList[i].date +
                            '</div></a>';
                tmphtml = tmphtml + tmpStr;
        }
    }
    $('#dailyList').html(tmphtml);
}

var myChart = echarts.init(document.getElementById('proEcharts'));
myChart.setOption(option);

   $(function() {
        var department = getQueryString('department');
        var dateFromGet = getQueryString('date');

        if(department){ $('#department').val(department);}
        if(dateFromGet){
		$('#date').val(dateFromGet);
	}else{
	    initDate();
        init();
	}
   });
//
//$("#customer").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
//$("#productdesign").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
//$("#teamwork").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
//$("#orgnization").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
//$("#management").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
//$("#operation").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
//$("#competence").select({title: "选择进度", items: ["1", "2", "3", "4", "5"],});
//


