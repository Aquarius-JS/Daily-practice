function delay(time) {
  const pre = Date.now();
  while (Date.now() - pre < time) {}
}

setTimeout(() => {
  console.log("time out");
}, 0);
// 创建XMLHttpRequest对象
const xhr = new XMLHttpRequest();

// 配置请求类型、URL以及是否异步执行
xhr.open("GET", "https://api.example.com/data", true);

// 设置请求完成后的回调函数
xhr.onreadystatechange = function () {
  // readyState 4表示请求已完成，且响应已就绪
  if (xhr.readyState == 4) {
    // status 200表示成功响应
    if (xhr.status == 200) {
      console.log(xhr.responseText); // 打印响应内容
    } else {
      console.error("Request failed: " + xhr.status); // 打印错误信息
    }
  }
};

// 发送请求
xhr.send();

delay(3000);

Promise.resolve().then(() => {
  console.log("resolve");
});
