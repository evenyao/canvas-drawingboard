var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')  // 获取上下文
var lineWidth = 5  //定义画笔粗细默认为 5

autoSetCanvasSize(canvas)

listenToUser(canvas)

// 橡皮擦与画笔
var eraser = document.getElementById('eraser')
var pen = document.getElementById('pen')
var eraserEnabled = false


//点击橡皮函数，橡皮启用；并触发对应样式效果
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

//点击画笔函数，橡皮禁用
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

//点击清空函数，清除整个页面的痕迹
clear.onclick = function(){
  context.clearRect(0 ,0 ,canvas.width ,canvas.height )
}

//点击保存按钮，并生成所画图片
save.onclick = function(){
  var url = canvas.toDataURL("image/png")   //将当前图保存到一个url地址变量中
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的图画'  //图片命名
  a.target = '_blank'
  a.click()
}


//调色盘控制函数
//设置红色画笔
red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
//设置绿色画笔
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
//设置蓝色画笔
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
}

//设置细线
thin.onclick = function(){
  lineWidth = 5
}

//设置粗线
thick.onclick = function(){
  lineWidth = 10
}



/***********封装函数***********/
//自动设置canvas函数
function autoSetCanvasSize(canvas){
  setCanvasSize()
  // 定义获取宽高、并设置canvas宽高的函数setCanvasSize
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth  //获取当前宽度
    var pageHeight = document.documentElement.clientHeight  //获取当前高度
    canvas.width = pageWidth
    canvas.height = pageHeight
    //设置画布的颜色
    context.fillStyle = 'white'  //填充样式为白色
    context.fillRect(0 ,0 ,canvas.width ,canvas.height )  //填充出白色底的矩形，充当白色画布，不然默认是透明的
  }

  //当屏幕大小改变，重新获取宽高
  window.onresize = function() {
    setCanvasSize()
  }
}

// 画圆函数
function drawCircle(x,y,radius){
  context.beginPath()  //创建一个新的路径
  // context.fillStyle = 'black'
  context.arc(x ,y ,radius ,0 ,Math.PI*2 )
  context.fill()     //填充
}

// 画线函数
function drawLine(x1 ,y1 ,x2 ,y2){
  context.beginPath()  //创建一个新的路径
  // context.strokeStyle = 'black'
  context.moveTo(x1, y1)     //起点
  context.lineWidth = lineWidth      //线粗；每次进行绘画的时候去取选择的粗细的值
  context.lineTo(x2, y2)     //终点
  context.stroke()     //描边
  context.closePath()  //将笔点返回到当前子路径起始点
}

//监听用户设备事件函数
function listenToUser(canvas){
  var using = false  //是否在使用的变量
  var lastPoint = {x: undefined, y: undefined }

  //特性检测 检测支不支持touchstart
  if(document.body.ontouchstart !== undefined){
    //触屏设备
    canvas.ontouchstart = function(start){
      var x = start.touches[0].clientX
      var y = start.touches[0].clientY
      using = true
      if(eraserEnabled){     //判断橡皮擦是否开启
        context.clearRect(x - 5 ,y - 5 ,10 ,10 )  //清除API，并修正橡皮擦的准确位置
      }else{
        lastPoint = {"x": x ,"y": y}
      }
    }

    canvas.ontouchmove = function(move){
      var x = move.touches[0].clientX
      var y = move.touches[0].clientY
      if(using){
        if(eraserEnabled){
            context.clearRect(x - 5 ,y - 5 ,10 ,10 )  //清除API，并修正橡皮擦的准确位置
        }else{
            var newPoint = {"x": x ,"y": y}
            drawLine(lastPoint.x ,lastPoint.y ,newPoint.x ,newPoint.y )
            lastPoint = newPoint   //实时更新最后一个点的位置
        }
      }
    }

    canvas.ontouchend = function(end){
      using = false
    }
  }else{
    //非触屏设备
    canvas.onmousedown = function(down){
      var x = down.clientX
      var y = down.clientY
      using = true
      if(eraserEnabled){     //判断橡皮擦是否开启
        context.clearRect(x - 5 ,y - 5 ,10 ,10 )  //清除API，并修正橡皮擦的准确位置
      }else{
        lastPoint = {"x": x ,"y": y}
      }
    }

    canvas.onmousemove = function(move){
      var x = move.clientX
      var y = move.clientY
      if(using){
        if(eraserEnabled){
            context.clearRect(x - 5 ,y - 5 ,10 ,10 )  //清除API，并修正橡皮擦的准确位置
        }else{
            var newPoint = {"x": x ,"y": y}
            drawLine(lastPoint.x ,lastPoint.y ,newPoint.x ,newPoint.y )
            lastPoint = newPoint   //实时更新最后一个点的位置
        }
      }
    }

    canvas.onmouseup = function(up){
      using = false
    }
  }
}
