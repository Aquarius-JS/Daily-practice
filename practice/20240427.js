async function fn1() {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  }).then(()=>{
    console.log("2")
  });
}

fn1();
console.log(1);
