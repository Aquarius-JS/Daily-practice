0. url从输入到解析呈现过程
1. http/https
2. http1.0/1.1/2.0 3.互联网攻击(xxs，还有个，emm~，忘记了)
3. 如何防范，怎么做表单验证
4. 三次握手
5. 四次挥手
6. 状态码
7. svg和canvas的对比，性能，潜在优劣
8. 项目使用的优化方法，是不是都自己想的
9. 缓存和缓冲
10. 浏览器缓存
11. 跨域解决策略

```txt
CORS,JSONP,代理
```

12. 最长不重复子串
13. 快排

```ts
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  let pivot = arr[0];
  let left = 1;
  let right = arr.length;
  let index = 0;
  while (left <= right) {
    while (left <= right) {
      if (arr[right] < pivot) {
        arr[index] = arr[right];
        index = right--;
        break;
      }
      right--;
    }
    while (left <= right) {
      if (arr[left] > pivot) {
        arr[index] = arr[left];
        index = left++;
        break;
      }
      left++;
    }
  }
  return [...quickSort(arr.slice(0, index)), pivot, ...quickSort(arr.slice(index))];
}
```

14. 扁平数组转树形
15. 正则表达式

16. 手写一个三栏布局，左右宽度固定，中间自适应，我用了flex和grid，有问到flex这个复合属性具体是哪三个，分别代表什么意思

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">
      <div class="left"></div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
    <style>
      body {
        margin: 0;
      }
      .container {
        /* width: 100vw; */
        height: 100vh;
        display: flex;
        flex-direction: row;
      }
      .left,
      .right {
        height: 100%;
        flex: 0 0 100px;
        background-color: brown;
      }
      .center {
        height: 100%;
        flex: 1 1 100px;
        background-color: blue;
      }
    </style>
  </body>
</html>
```

17. 给你一个多叉树结构，要求写一个dfs和bfs去遍历它，还算比较简单
18. 最后问了vue3的响应式与vue2的响应式之间的区别，以及composition api的好处，对它的理解
19. 项目的难点
20. Flutter的底层实现，和浏览器的渲染机制有什么区别
21. 说说浏览器的底层渲染，以及根据这个渲染能有什么应用场景（这里讲了首屏渲染的优化，以及z-index分层渲染）
22. 讲下浏览器的性能优化有哪些
23. 说说自己擅长哪块技术：页面布局（css）、js逻辑处理、网络等，说了页面布局
24. css3的新特性
25. 然后问了怎么实现三角形（说了通过border以及clip-path去实现）
26. 更进一步，怎么实现其中一个角是圆角的三角形（这里没答上来）
27. 怎么实现垂直居中（讲了三种方式）
28. vue的组件通信
29. 讲一下订阅发布的原理，手写订阅发布
30. 进一步：单次订阅怎么实现
31. 进一步：用户订阅时，把之前发布的也要执行
32. 除了redux这种状态管理工具之外还了解其它的状态管理工具吗？
33. react hooks的出现解决了什么问题？使用过哪些hooks？什么时候会用useMemo？
34. hooks可不可以放到if语句内？hooks里面的依赖项对数据类型有什么特殊的要求？
35. 浏览器原理了解过吗，通过什么方式减少重排重绘
36. 了解过ES6吗，Set、Map、WeakMap的区别 √
37. 比较版本号
38. 两数之和（lc 改了一点，没写出来，差点）
39. 交换最大元素
40. http 版本
41. http 缓存
42. uniapp 原理（没去看……）
43. 微信小程序模型（浅浅说了双线程模型，面试官说了一大堆底层的，没仔细听）
44. 两者区别（只答了怎么做的技术选型）
45. mvvm 模型
46. 虚拟 dom（当时回答的很少啊，现在可以说半小时……）
47. 懒加载
48. expires
49. 字符串怎么比较大小（不知道，只知道从左往右比）
50. 回流重绘
51. tcp，udp区别
52. tcp 三次握手挥手
53. set 底层实现（不知道）
54. 实现一个LRU
55. purecomponent原理
56. setSate
57. redux-thunk原理
58. 为什么用reducer，不用会怎么样
59. 为什么hook不能放在条件语句里面
60. 白屏怎么优化
61. 函数式组件和类式组件优缺点
62. 用hook实现循环count加十次
63. redux怎么实现数据透传
64. 讲一下读过的react源码（头已经昏了）
65. http1.0/1.1/2.0/3.0
66. websocket在哪一层，和http的区别
67. OSI七层模型
68. 快排实现、复杂度、缺点、优化

完美世界前端实习
给定许多个button如何设置只选择一个节点，点击一个按钮，上一个按钮事件消失，这个按钮触发点击事件

如何获取div窗口的大小：offsetwidth

ES6说一下

new的过程

箭头函数

原型和原型链

promise的状态

事件循环的理解

ts：interface、type，enum的转化过后是什么类型？

$nexttick

diff算法，新旧节点对比过程

vue的template如何进行转化成dom节点的？template渲染的过程？

watch和computed

数据的双向绑定

vue3的setup，ref和reactive，哪个处理复杂数据，答反了

跨域

js的垃圾回收，v8的垃圾回收
webpack和vite
算法说解题思想：链表、快排、斐波那契不使用递归如何实现

前端 四月 已凉
一面
一道简单算法题
很多八股
最近了解了哪些前沿知识

二面
实习经历，项目
性能优化
缓存
websocket
http和https，版本
tcp和udp，适用场景
适配方案
flex
水平垂直居中
react的hooks
服务端渲染
代码题 日期格式

4. 类组件和函数式组件区别
5. 页面上线后，组件重复渲染怎么解决
   （React.memo，shouldComponentUpdate）
6. interface和type的区别
7. 前端i18n原理，如果会影响性能怎么优化
   （懒加载？后来感觉是服务端注入时的事，应该往服务端思考）
8. 项目里最有挑战的内容
9. 手写一下懒加载图片核心逻辑
   （img.offsetTop < window.innerHeight + document.body.scrollTop和IntersectionObserver)
10. 几个项目怎么做的测试
    （只做过单元测试，面试官想听到的估计是E2E）
11. js模块化方案有哪些，区别
12. 模块之间循环引用会有什么问题，怎么解决
    （webpack里是建立依赖图时创建一个map，然后再编译）
13. ts有用过enum吗，enum编译成js是啥
    （对象，key和value都会做索引）
14. js精度丢失怎么解决
    （我说bigint，转字符串，然后说不如用第三方库，面试官绷不住了）
15. 手写大数相加
    （感觉稳了，泪流满面。**\*\*\*\***\*\***\*\*\*\***）
16. 平常项目上网页安全会做什么处理
    （xss攻击框架转义，别用危险api，csp；csrf设置token）
17. https过程
    （说了一半就打断了）
18. 线上白屏从哪些角度排查原因
    （页面资源和js报错）
