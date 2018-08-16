# Canvas 画板
![](https://upload-images.jianshu.io/upload_images/12904618-e86b31e1e0556db7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 作品介绍
使用 `canvas` 与 原生`JavaScript` 制作的 Canvas画板 作品。
v1.0版本 详细功能包含
- 支持触屏与非触屏设备使用
- 画笔 粗/细 调节功能
- 红/绿/蓝 三色画笔
- 橡皮擦功能
- 清空画布功能
- 作品导出下载功能

# 相关要点
## 特性检测 / 检测支不支持touchstart
值得注意的是，`onmouse` 事件的 `MouseEvent` 中，直接拥有 `clientX` 与 `clientY` 属性，可以取到当前的坐标。
![](https://upload-images.jianshu.io/upload_images/12904618-287845adc3f845ca.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

但 `ontouch` 事件中，由于触屏设备多点触控的机制， `clientX` 与 `clientY` 属性被放置在 `TouchEvent` 下面的 `touches` 数组属性的第 `[0]` 项当中。
![](https://upload-images.jianshu.io/upload_images/12904618-108fc39873979097.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 支持 touchstart ，监听 ontouch 事件
#### 开始触摸
```JavaScript
canvas.ontouchstart = function(){
  console.log('touchstart')
}
```

#### 触摸移动
```JavaScript
canvas.ontouchmove = function(){
  console.log('touchmove')
}
```

#### 触摸结束
```JavaScript
canvas.ontouchend = function(){
  console.log('touchend')
}
```

### 不支持 touchstart ，监听 onmouse 事件
#### 按下鼠标
```JavaScript
document.onmousedown = function(){
  console.log('mousedown')
}
```

#### 移动鼠标
```JavaScript
document.onmousemove = function(){
  console.log('mousemove')
}
```

#### 松开鼠标
```JavaScript
document.onmouseup = function(){
  console.log('mouseup')
}
```
## 自动设置 canvas
包含了刷新页面，更改页面大小，不会出现缩放条

```JavaScript
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
```

## 设置白画布的方法
原理上就是在 `(0 ,0 ,canvas.width ,canvas.height )` 区域画一个白色的超大矩形，且每次都在初始化的时候执行
```JavaScript
context.fillStyle = 'white'  //填充样式为白色
context.fillRect(0 ,0 ,canvas.width ,canvas.height )  //填充出白色底的矩形，充当白色画布，不然默认是透明的
```

## 画线的方法
```JavaScript
function drawLine(x1 ,y1 ,x2 ,y2){
  context.beginPath()  //创建一个新的路径
  // context.strokeStyle = 'black'
  context.moveTo(x1, y1)     //起点
  context.lineWidth = lineWidth      //线粗；每次进行绘画的时候去取选择的粗细的值
  context.lineTo(x2, y2)     //终点
  context.stroke()     //描边
  context.closePath()  //将笔点返回到当前子路径起始点
}
```

## 原生 JavaScript 增添 css class 的方法
```JavaScript
classList.add('active')
classList.remove('active')
```

## 保存生成所画图画的方法
```JavaScript
save.onclick = function(){
  var url = canvas.toDataURL("image/png")   //将当前图保存到一个url地址变量中
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的图画'  //图片命名
  a.target = '_blank'
  a.click()
}
```

## iconFont - SVG 图标导入
具体参考博客
[关于字体图标的三两事](https://www.jianshu.com/p/1542a8d3ce0b)

## 相关 API 参考
[MDN canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

## 版本相关
- 2018.08.17 -- v1.0版本   
