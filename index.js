/**
 先调用百度地图的API来获取用户所在的城市，
 随后调用聚合数据的天气API将数据放在页面上。
 由于ajax不支持跨域，所以采用了jsonp的方式来调用数据。
 */
//调用jsonp方式请求当前所在城市

jsonp('https://api.map.baidu.com/api?v=2.0&ak=yke8mQjFmfyaZucEd2qkcMgUtKERiROG&s=1&callback=getCity');//javascript API

  
window.onload = function () {
    //请求天气车数据
    btn.addEventListener('click',function () {
          jsonp(createUrl()[0]);//获取到数组中的第一个对象   调用函数中返回的数组
         
		
    });
    text.addEventListener('keydown', function (e){
        if (e.keyCode == 13) {
            jsonp(createUrl()[0]);
           
        }
    });
}
//获取到的城市交给jsonp()里的参数callback然后创建<script></script>引入url
function getCity() {
    function city(result) {
        //去掉城市名后的"市"
        var city = result.name.substring(0, result.name.length - 1);
        //请求当前城市的天气数据
        jsonp(createUrl(city)[0]);

    }
    var cityName = new BMap.LocalCity();//本地城市  提供自动判断您所在城市的服务
    cityName.get(city);
}

// 数据请求函数
function jsonp(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.insertBefore(script, document.body.firstChild);//insertBefore(a,b)在b的前面插入a
    document.body.removeChild(script);
}

//数据请求成功回调函数，用于将获取到的数据放入页面相应位置
function getWeather(response) {
    var oSpan = document.getElementsByClassName('info');
    var data = response.result;
    oSpan[0].innerHTML = data[0].citynm;//城市
    oSpan[1].innerHTML = data[0].days;//日期
    oSpan[2].innerHTML = data[0].week;//星期
    oSpan[3].innerHTML = data[0].weather;//天气
    oSpan[4].innerHTML = data[0].temperature;//温度
    oSpan[5].innerHTML = data[0].winp;//风向
    oSpan[6].innerHTML = data[0].wind;//风力

    var aDiv = document.getElementsByClassName('future_box');
    for (var i = 0; i < aDiv.length; i++) {
        var aSpan = aDiv[i].getElementsByClassName('future_info');
        aSpan[0].innerHTML = data[i + 1].days;
        aSpan[1].innerHTML = data[i + 1].week;
        aSpan[2].innerHTML = data[i + 1].weather;
        aSpan[3].innerHTML = data[i + 1].temperature;
    }
    //根据返回数据，替换不同天气图片
    changeImg(response);
}


//根据获取到的数据更改页面中相应的图片
function changeImg(data) {
    var firstImg = document.getElementsByTagName("img")[0];
    var firstWeatherId = data.result[0].weatid;
    chooseImg(firstWeatherId, firstImg);

    var aImg = document.getElementById('future_container').getElementsByTagName('img');
    for (var j = 0; j < aImg.length; j++) {
        var weatherId = data.result[j + 1].weatid;
        chooseImg(weatherId, aImg[j]);
    }
}

//选择图片
function chooseImg(id, index) {
    switch (id) {
        case '1':
            index.src = 'images/weather_icon/1.png';
            break;
        case '2':
            index.src = 'images/weather_icon/2.png';
            break;
        case '3':
            index.src = 'images/weather_icon/3.png';
            break;
        case '4':
        case '5':
        case '6':
        case '8':
        case '9':
        case '10':
        case '11':
        case '12':
        case '13':
        case '20':
        case '22':
        case '23':
        case '24':
        case '25':
        case '26':
            index.src = 'images/weather_icon/4.png';
            break;
        case '7':
            index.src = 'images/weather_icon/6.png';
            break;
        case '14':
        case '15':
        case '16':
        case '17':
        case '18':
        case '27':
        case '28':
        case '29':
            index.src = 'images/weather_icon/5.png';
            break;
        case '19':
        case '21':
        case '30':
        case '31':
        case '32':
        case '33':
            index.src = 'images/weather_icon/7.png';
            break;
        default:
            index.src = 'images/weather_icon/8.png';
    }
}

//根据城市名创建请求数据（城市名）及url
function createUrl() {
	//搜索城市
    var cityName = '';
    if (arguments.length == 0) {//arguments类似于一个数组
        cityName = document.getElementById('text').value;
    } else {
        cityName = arguments[0];
    }
    var urls = [];
       urls[0] = ' http://api.k780.com:88/?app=weather.future&weaid=1&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&jsoncallback=getWeather&weaid=' + encodeURI(cityName);//获得未来几天的天气
 
     
   return urls;
}



