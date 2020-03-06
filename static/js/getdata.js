
function loadErpStatus(){

   $.ajax({
   		type: "POST",
   		url:"http://api.genertec.com.cn/erp/webservice.php",
		async: false,   
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
   		success:function(result){
   			var s = result.split(",");
   			appStatusIni();
   			$('#App02Div').css('background-color','#ffe153');
   			$('#App02Font').css('color','#0076b0');
   			$('#SystemTitle').html("集团贸易板块ERP系统运行统计");
			$('#statDPV3').html("<b>"+s[0]+"</b>");
			$('#statDPV4').html("<b>"+s[1]+"</b>");
			$('#statDPV1').html("<b>"+s[2]+"</b>");
			$('#statDPV2').html("<b>"+s[3]+"</b>");
			$('#statDPT3').html("今日新增资金往来单据");
			$('#statDPT4').html("今日新增所有单据数据");
			$('#statDPT1').html("实时在线人数");
			$('#statDPT2').html("今日累计审批次数");

    		console.log(result)
		},
		error: function(e){
			console.log(e.status);
			console.log(e.responseText);
		}
	});

}


function refreshKouhao(){
	if($('#SystemTitle').html()=="集成办公用户访问量实时统计"){
		loadErpStatus();
		 $('#kouhao').html("当遇到困难踌躇不前时，想想是否已全力以赴");
	}
	else{
		loadPortalStatus();
		$('#kouhao').html("当获得成绩沾沾自喜时，想想可否能做得更好");
	}
}

function getVPNIni(){
   var urls = [];
   $.ajax({
   		type: "post",
   		datatype: "json",
   		async: false,
		url:"http://10.1.32.76/interfaceBigscreen?type=getAllUrl",
   		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
   		success:function(result){
    			console.log('success')
    			urls = result.data;
		},
		error: function(e){
			console.log(e.status);
			console.log(e.responseText);
		}
	});

    return urls;
}


function getNextVpn(url, index){
	$.ajax({
	   		type: "post",
	   		datatype: "json",
			async: false,
	   		url:"http://10.1.32.76/interfaceBigscreen?type=getDetail&index=" + index,
	   		data: {'url': url, 'index': index},
	   		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
	   		success:function(result){
				var s = result.data;
				if (s.length==10){
					$('#vpnsn').html(s[0]+'/19');
					$('#vpntitle').html("<b>"+unescape(s[1]).toUpperCase()+"</b>");
					$('#vpntime').html(unescape(s[2]));
					$('#vpnimage').attr("src",s[3]);
					$('#vpndata1').html(s[4]+" b/s");
					$('#vpndata2').html(s[5]+" b/s");
					$('#vpndata3').html(s[6]+" b/s");
					$('#vpndata4').html(s[7]+" b/s");
					$('#vpndata5').html(s[8]+" b/s");
					$('#vpndata6').html(s[9]+" b/s");
				}
			},
			error: function(e){
				console.log(e.status);
				console.log(e.responseText);
			}
		});

}


function loadVPNstatus(){
    var allUrls = getVPNIni();

    var length = allUrls.length;


	for(var i=0; i<=length; i++){
		(function(j){
			setTimeout(function timer(){
			refreshKouhao();
			
			if(j!=length){
				getNextVpn(allUrls[j], j);
			}else{
                                setTimeout(loadVPNstatus(), (length)*15000);        
			}
}, j*15000);
		})(i);

		console.log("i:" +i);
	}



}

