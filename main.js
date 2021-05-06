$(window).load(()=>{
    // 1.获取当前的日期时间，得到年份月份周几
    var nowTime = new Date(); //获取当前日期
    var nowYear = nowTime.getFullYear();//现在的年份
    var nowMouth = nowTime.getMonth();//现在的月份
    var nowDay = nowTime.getDate();//现在的天数
    var nowWork = nowTime.getDay();//今天是周几
    var tmpTime = nowTime;//当前日期的副本
    tmpTime.setDate(1);//将日期设置为1号
    var TimeDom = loadDay( nowMouth+1 ,tmpTime,nowDay);
    var locationT;//用于判断1号是周几
    var $days = $('.days');//天数列表
    var $year = $('.year');//年月控件
    var $week = $('.week');//周几的显示控件
    var $day = $('.day');//日期的显示控件
    var $nextBtn = $('.next');//下一月按钮
    var $lastBtn = $('.last');//上一月按钮
    
    


    //第一次更新界面
    $days.html(TimeDom);
    $year.text(`${loadMouth(nowMouth)} ${nowYear}`);
    $week.text(loadDayInWkeek(nowWork));
    $day.text(nowDay);

    // if(nowDay > 20){
    //     $(`div.day:contains(${nowDay}):eq(2)`).addClass("today");
    // }else {
    //     $(`div.day:contains(${nowDay}):eq(1)`).addClass("today");
    // }
   
    //按钮点击时事件
    $nextBtn.on('click',()=>{
        //   下一月
        //1.月份加一，判断是否月份为13月则年份加一,月份变为一月
        //2.如果年份没有加，则更改时间为上一月的时间再赋值
        nowMouth = nowMouth + 1;
        if(nowMouth == 13){
            nowYear = nowYear + 1;
            nowTime = new Date(nowYear,nowMouth,1);
        } 
        else{
            nowTime = new Date(nowYear,nowMouth,1);
        }
        nowYear = nowTime.getFullYear();//现在的年份
        nowMouth = nowTime.getMonth();//现在的月份
        nowDay = nowTime.getDate();//现在的天数
        nowWork = nowTime.getDay();//今天是周几
        // console.log('下一月 : nowMouth   ' + (nowMouth+1) + '   nowTime   ' + nowTime + '   nowDay   ' + nowWork);
        TimeDom = loadDay( nowMouth+1 ,nowTime);
        // console.log(TimeDom);
        $days.html(TimeDom);
        $year.text(`${loadMouth(nowMouth)} ${nowYear}`);
    });
    
    $lastBtn.on('click',()=>{
        //    上一月
        //1.月份加一，判断是否月份为月则年份加一,月份变为一月
        //2.如果年份没有加，则更改时间为上一月的时间再赋值
        nowMouth = nowMouth - 1;
        if(nowMouth == -1){
            nowYear = nowYear - 1;
            nowMouth = 11;
            console.log("nowYear: " + nowYear);
            nowTime = new Date(nowYear,nowMouth,1);
            console.log("nowYear: " + nowYear);
            // console.log(nowTime);
        } else{
            nowTime = new Date(nowYear,nowMouth,1);
        }
        nowYear = nowTime.getFullYear();//现在的年份
        nowMouth = nowTime.getMonth();//现在的月份
        nowDay = nowTime.getDate();//现在的天数
        nowWork = nowTime.getDay();//今天是周几
        // console.log('nowMouth   ' + (nowMouth+1) + '   nowTime   ' + nowTime + '   nowDay   ' + nowDay);
        TimeDom = loadDay( nowMouth-1 ,nowTime);
        // console.log(TimeDom);
        $days.html(TimeDom);
        $year.text(`${loadMouth(nowMouth)} ${nowYear}`);
    });
    // 2.更新当前界面，更改显示的日期时间
    // 2.1通过获得现在的月份来决定填充的元素个数，一个月的前几天
    //3.按钮事件
});
//实现一个月里的连续天数创建
function loadDay(nowMouth,tmpTime,nowDay){
    var daysNum = 0;
    var str = '';
    locationT = tmpTime.getDay(); //这个月1号是周几
    // console.log("locationT: " + locationT);
    str = loadUpDay(nowMouth,locationT);//获取前面的日期
    // console.log("月份为" + nowMouth);
    if(nowMouth == 2 ){
        daysNum = 28;
    }else if(nowMouth == 4 || nowMouth == 6 || nowMouth == 9 || nowMouth == 11){
        daysNum = 30;
    }else{
        daysNum = 31;
    }
    //前几天的日期
    
    for(let i = 1; i <= daysNum; i++ ){
        if(i == nowDay) str += `<div class="day today">`;
        else str += `<div class="day">`;
        str += i;
        str += `</div>`;
    }

    str += loadDownDay(locationT,daysNum);//获取后面的日期
    // console.log("中间部分为: " + str);
    return str;
    
    
}
//实现一个上个月剩余天数的加载
function loadUpDay(nowMouth,locationT){
    // nowMouth用于决定前面1号前的日期结尾数字，locationT用于决定1号前差几天
    let tmpStr = '';
    if(locationT == 0) locationT = 7;//因为周日的getday为0要改为7
    if(nowMouth == 3){
        for(let i = locationT; i > 1; i--){
            tmpStr += `<div class="day">`;
            tmpStr += (30 - i);
            tmpStr += `</div>`;
        }
    }else if(nowMouth % 2 == 0){
        for(let i = locationT; i > 1; i--){
            tmpStr += `<div class="day">`;
            tmpStr += (33 - i);
            tmpStr += `</div>`;
        }
    }else {
        for(let i = locationT; i > 1; i--){
            tmpStr += `<div class="day">`;
            tmpStr += (32 - i);
            tmpStr += `</div>`;
        }
    }
    // console.log('前部分为：' + tmpStr+'  nowMouth: '+nowMouth+'  locationT: '+locationT);
    // console.log("前部分为： " + tmpStr);
    return tmpStr;
}
//实现一个下个月剩余天数的加载
function loadDownDay(locationT,nowDay){
    // console.log('后部分为： '+ 'locationT: ' + locationT + '   nowDay: ' + nowDay);
    let tmpStr = '';
    //第二个判断式的原因是一共35个格子-月份的固定格子-今天星期几+1（今天的星期和前面有几天差一天所以加一）
    if(locationT == 0) locationT = 7; //因为周日的getday为0要改为7
    for(let i = 1; i <= 43-locationT-nowDay; i++){
        tmpStr += `<div class="day">`;
        tmpStr += i;
        tmpStr += `</div>`;
    }
    // console.log('后部分为： '+tmpStr);
    return tmpStr;
}
//星期几的加载
function loadDayInWkeek(day){
    var strDay = '';
    switch(day){
        case 1: 
            strDay = 'MONDAY';
            break;
        
        case 2: 
            strDay = 'TUESDAY';
            break;
        
        case 3: 
            strDay = 'WEDNESDAY';
            break;
        
        case 4: 
            strDay = 'THURSDAY';
            break;
        
        case 5: 
            strDay = 'FRIDAY';
            break;
        
        case 6: 
            strDay = 'SATURDAY';
            break;
        
        case 7: 
            strDay = 'SUNDAY';
            break;
        
        default: 
            break;
    }
    return strDay;
}
//月份的加载
function loadMouth(mouth){ 
    var strmouth = '';
    switch(mouth+1){
        case 1: 
            strmouth = 'JANUARY';
            break;
        
        case 2: 
            strmouth = 'FEBRUARY';
            break;
        
        case 3: 
            strmouth = 'MARCH';
            break;
        
        case 4: 
            strmouth = 'APRIL';
            break;
        
        case 5: 
            strmouth = 'MAY';
            break;
        
        case 6: 
            strmouth = 'JUNE';
            break;
        
        case 7: 
            strmouth = 'JULY';
            break;

        case 8: 
            strmouth = 'AUGUST';
            break;

        case 9: 
            strmouth = 'SUPTEMBER';
            break;

        case 10: 
        strmouth = 'OCTOBER';
        break;

        case 11: 
            strmouth = 'NOVAMBER';
            break;

        case 12: 
        strmouth = 'DECEMBER';
        break;

        default: 
            break;
    }
    return strmouth;
}