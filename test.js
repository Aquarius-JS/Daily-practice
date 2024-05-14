async function a(param) {
  new Promise(res => {
    console.log(param);
    setTimeout(() => {
      res(param);
    }, 1000 - param);
  }).then(res => {
    // setTimeout(()=>{
    //     console.log(res);
    // },1000)
    console.log(res);
  });
}

await a(0);
await a(500);
