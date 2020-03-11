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
          name: '项目1'
        },
        {
          value: [3, 2, 1, 0, 0, 0, 0],
          name: '项目2'
        },
        {
          value: [2, 3, 3, 3, 3, 3, 3],
          name: '项目3'
        },
        {
          value: [1, 3, 0, 0, 0, 0, 0],
          name: 'pro4'
        },
        {
          value: [1, 3, 0, 0, 0, 0, 0],
          name: 'pro5'
        },
        {
          value: [1, 3, 0, 0, 0, 0, 0],
          name: 'pro6'
        },
        {
          value: [3, 3, 0, 0, 0, 0, 0],
          name: 'pro7'
        },
        {
          value: [4, 3, 0, 0, 0, 0, 0],
          name: 'pro8'
        },
        {
          value: [4, 3, 0, 0, 0, 0, 0],
          name: 'pro9'
        },
        {
          value: [4, 3, 0, 0, 0, 0, 0],
          name: 'pro10'
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
    initTarget();
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
}


function initTarget(){
    var department = $('#department').val();
    var domain = $('#domain').val();
    var project = $('#project').val();
    console.log(project);

    console.log(projectDetails[department][domain][project]);
//    console.log(projectDetails[department][domain][project]['target']);
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


