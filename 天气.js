//当页面加载完成时
// $(function () {
    //1.获取当前城市的天气信息
    let tianqi;
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/data/?city",
        dataType:"jsonp",
        success:function (obj) {
            // console.log(obj);
            tianqi=obj.data;
            console.log(tianqi);
            updata(tianqi);
        }
    });
    function updata (tianqi) {
        //获取当前的城市
        $(".header-nav").html(tianqi.city);
        $("header>h3").html("湿度 "+tianqi.weather.aqi+"% ");
        $("header>h1").html(tianqi.weather.current_temperature+"℃");
        $("header>h2").html(tianqi.weather.current_condition);
        $(".center>p").html(tianqi.weather.quality_level);
        $("nav>.first>p:nth-child(1)>span:nth-child(2)").html(tianqi.weather.dat_high_temperature+'/'+tianqi.weather.dat_low_temperature+'℃');
        $("nav>.last>p:nth-child(1)>span:nth-child(2)").html(tianqi.weather.tomorrow_high_temperature+'/'+tianqi.weather.tomorrow_low_temperature+'℃');
        $(".pix2").css({"background":"url(./img/"+tianqi.weather.dat_weather_icon_id+".png) no-repeat center/cover"});
        $(".pix1").css({"background":"url(./img/"+tianqi.weather.tomorrow_weather_icon_id+".png) no-repeat center/cover"});
        $("nav>.first>p:nth-child(2)>span:nth-child(1)").html(tianqi.weather.dat_condition);
        $("nav>.last>p:nth-child(2)>span:nth-child(1)").html(tianqi.weather.tomorrow_condition);

        let hweather=tianqi.weather.hourly_forecast;
    //     //未来24小时天气
        hweather.forEach(function (v,i) {
            // console.log(v);
            //创建一个li追加在ul的昨天天气之后
            // let li=document.createElement(".nav>ul>li");
            // $(".nav>ul").append(li);
            // //添加时间、天气图标、温度
            // // $(".nav>ul>li").append("<span class='list_top'>"+v.hour+"</span>>")
            // let div=document.createElement(".nav>ul>li>div");
            // $(".nav>ul>li").append(div);
            // $(".timelist li span:eq(1)").addClass('list_middle').css
            let str=`
            <li>
                    <div></div>
                    <img src="" alt="">
                    <div></div>
            </li>`;
            $(".nav>ul").append(str);
            $(".nav>ul>li>div:nth-child(1)").eq(i).html(v.hour+":00");
            $(".nav>ul>li>img").eq(i).attr("src","./img/"+v.weather_icon_id+".png");
            $(".nav>ul>li>div:nth-child(3)").eq(i).html(v.temperature+"℃")
        });
        let weathers=tianqi.weather.forecast_list;
        weathers.forEach(function (v,i) {
            let strs=`<li>
                    <p></p>
                    <p>01/15</p>
                    <p>多云</p>
                    <img src="./img/15.png" alt="" class="pix3">
                    <p>3°</p>
                    <p>-12°</p>
                    <img src="./img/20.png" alt="" class="pix4">
                    <p>多云</p>
                    <p>西北风</p>
                    <p>3级</p>
                </li>`;
            $(".bottom-b>ul").append(strs);
            let aii=v.date.substr(5);
            $(".bottom-b>ul>li>p:nth-child(2)").eq(i).html(aii);
            $(".bottom-b>ul>li>p:nth-child(3)").eq(i).html(v.condition);
            $(".pix3").eq(i).attr("src","./img/"+v.weather_icon_id+".png");
            $(".bottom-b>ul>li>p:nth-child(5)").eq(i).html(v.high_temperature);
            $(".bottom-b>ul>li>p:nth-child(6)").eq(i).html(v.low_temperature);
            $(".pix4").eq(i).attr("src","./img/"+v.weather_icon_id+".png");
            $(".bottom-b>ul>li>p:nth-child(8)").eq(i).html(v.condition);
            $(".bottom-b>ul>li>p:nth-child(9)").eq(i).html(v.wind_direction);
            $(".bottom-b>ul>li>p:nth-child(10)").eq(i).html(v.wind_level+"级");
        })
    }
    $(".header-nav").click(function () {
        $(".search").css({"display":"block"});
        $("header").css({"display":"none"});
        $(".foot").css({"display":"none"})
    });
    $(".search-header>span").click(function () {
        $(".search").css({"display":"none"});
        $("header").css({"display":"block"});
        $(".foot").css({"display":"block"})
    }) ;
    // //点击取消，消失
    // function
    // //获取城市信息
    let city;
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/city/",
        dataType:"jsonp",
        success:function(obj) {
        city=obj.data;
        // console.log(city);
        updataCity(city);
    }
    });
    // //获取每个城市信息
    function updataCity(city){
        let k=0;
        for (let i in city){

            // console.log(i);
            let strss=`
                <p>${i}</p>
                <ul class="search-list-b"> 
                </ul>
           `;
            $(".search-list").append(strss);
            for(let j in city[i]){
                let str1=`
                <li>${j}</li>`;
                $(".search-list-b").eq(k).append(str1);
            }
            k++;
            }}
//     //     点击每个城市，获取当前城市的天气信息
        window.onload=function () {

            $('.search-list-b>li').click(function () {
                $(".search").css({"display":"none"});
                $("header").css({"display":"block"});
                $(".foot").css({"display":"block"});
                 let con=$(this).html();    
                 console.log(con);          
                 ajaxs(con);
            }) ;


 };
//
// // //             //获取某个城市的天气信息
            function ajaxs(str2) {
                // console.log(1);
                // let url1=`https://www.toutiao.com/stream/widget/local_weather/city/=${str2}`;
                $.ajax({
                    type:"get",
                    url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str2}`,
                    dataType:"jsonp",
                    success:function (obj) {
                        console.log(obj);                  
                        let tianqi2=obj.data;
                        updata(tianqi2);
                    }
                })
            }


// // 在搜索框内输入内容，可以搜索当前城市的天气情况
$("input").focus(function () {
    $(".search-header>span").html("搜索");
    });
$("input").blur(function () {
    $(".search-header>span").html("取消");
    });
// //当点击搜索时，获取input中的内容进行搜索
$(".search-header>span").click(function () {
     $(".search").css({"display":"none"});
     $("header").css({"display":"block"});
     $(".foot").css({"display":"block"});
     let text=$("input").val();
     for (let i in city){
         for(let j in city[i]){
             if(text==j){
                  ajaxs(text);
                  return;
             }
         }
     }
     $('input').val("");    
});
// })

// 1.获取默认城市的天气信息
// 2.获取所有城市的信息
// 3.点击每个城市可以获取当前城市的天气信息
// 4.在搜索框内输入要搜索的城市，点击搜索按钮可以进行搜索