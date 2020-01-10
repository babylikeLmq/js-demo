



var index=0,//当前图片的索引值
     timer=null,
    banner=byId("banner"),
     main=byId("main"),
     prev=byId("prev"),
     next=byId("next"),
     dots=byId("dots").getElementsByTagName("span"),
     pics=byId("banner").getElementsByTagName("div"),
    //主菜单
    zhuMenu=byId("menu-content"),
    // 主菜单下的选项
    zhuMenuDiv=zhuMenu.getElementsByTagName('div'),
    //子菜单的背景框
    subMenu=byId("sub-menu"),

    //二级菜单
    subItems=subMenu.getElementsByClassName("inner-box"),
    // subItems = document.getElementsByClassName("inner-box"),


    //一级菜单选项对应的二级菜单
innerBox=subMenu.getElementsByClassName("inner-box"),
    size=pics.length;
// console.log(subMenu);//null  为什么？  html打成sub-menu  现在可以了
// console.log(subItems);//ok
// console.log(subItems);
for(var e=0,len=zhuMenuDiv.length;e<len;e++){
    zhuMenuDiv[e].setAttribute("date-index" ,e);
    // console.log(zhuMenuDiv);
    addHandler(zhuMenuDiv[e],"mousemove",function () {
    	  subMenu.className="sub-menu";
    	  // console.log('m');//测试有没有加上属性
        //获取当前主菜单的索引



        idx=this.getAttribute("date-index");

        // alert('idx');
        //取二级菜单的索引 innerBox
        for(var m=0;m<innerBox.length;m++){
            //遍历一遍 就是把所有的都变成none

            innerBox[m].style.display="none";
            zhuMenuDiv[m].style.background="none";
        }
        //再显示当前
        innerBox[idx].style.display="block";
        //清除历史block  在每一次加进来前清

        //加颜色
        zhuMenuDiv[idx].style.background="rgba(0, 0, 0,0.3 )";
    	})
// 调用addHander
}
//鼠标移出banner 二级菜单消失 从banner上面下面都不行mouseleave mouseout 也是
addHandler(banner,"mouseout",function () {
    subMenu.className="sub-menu hide";
	});
//鼠标移出主菜单
addHandler(zhuMenu,"mouseout",function () {
	  subMenu.className="sub-menu hide";
	});

//鼠标移在二级菜单上 二级菜单不消失
addHandler(subMenu,"mouseover",function () {
	  subMenu.className="sub-menu";
	});
addHandler(subMenu,"mouseout",function () {
	  subMenu.className="sub-menu hide";
	});

//封装getgetElementById
function  byId(id) {
        return typeof(id)==="string"?document.getElementById(id):id;
}
//解决浏览器兼容性
function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, true);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    }
    else {
        element['on' + type] = handler;
    }
}


//切换图片
function changeImg() {
    for(var i=0;i<size;i++){
        pics[i].style.display="none";
        dots[i].className="";
    }
    pics[index].style.display="block";
    dots[index].className="active";

	}

// next.addEventListener("click",function () {
//     alert("1");
// });
/*addHandler(next,"click",function () {
	  alert("1");
	});//1
addHandler(next,"click",function () {
    alert("2");
});//2*/
/*addHandler(next,"click",function () {
	  console.log("文字被打印出来");//不出现
	});*/
//下一张
/*
addHandler(next,"click",function () {
    index++;
    if (index>=size) index=0;
    for(var i=0;i<size;i++){
        pics[i].style.display="none";
        dots[i].className="";
    }
    pics[index].style.display="block";
    dots[index].className="active";
});
*/
addHandler(next,"click",function () {
    index++;
    if (index>=size) index=0;
     // pics[0].className="";
    /* pics[0].style.display="none";
     pics[1].style.display="none";//第三第四 很多...要一个个加？*/
    changeImg();

    /*for(var i=0;i<size;i++){

        //让前一个关闭  0 开始  外面是1开始
        pics[i].style.display="none";
        dots[i].className="";//没有了当前样式
    }
     pics[index].style.display="block";
    dots[index].className="active";
     //第二张图片上来  overflow把第三张图片隐藏*/
});
addHandler(prev,"click",function () {
    index--;//第一次是-1  第二次是2进来 等于1
    console.log(index);
    if (index<0) index=size-1;
    changeImg();
    /*for(var i=0;i<size;i++){
        pics[i].style.display="none";
        dots[i].className="";
    }
    pics[index].style.display="block";//-1 就是第三张图开始  1中间那张   倒叙
    dots[index].className="active";*/

});


//点圆点切换图片
for(var d=0;d<size;d++){
    //setAttribute 可以自定义属性
    dots[d].setAttribute('date-id',d);//标准的属性 属性值没有数字
    addHandler(dots[d],'click',function () {
    	  //获取date-id的值  与 changeImg匹配

            index=this.getAttribute("date-id");

            changeImg();
    	})

}


//开启自动轮播
function startAutoPlay() {
    timer=setInterval(function () {
            //要index
        index++;
        //不能无限循环
        if(index>=size) index=0;
        changeImg();
    	},2000)
}
//关闭自动轮播
function stopAutoPlay() {
    //判断是否开启 里面有值就是真
    if(timer){
        clearInterval(timer);
    }

}
//鼠标在图片上面
addHandler(main,'mouseover',stopAutoPlay);
//鼠标离开
addHandler(main,'mouseout',startAutoPlay);


//鼠标划过主菜单 显示子菜单  给id得到数组

