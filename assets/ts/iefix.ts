let IEfix = () => {
  try {
   let p = Promise;
  }
  catch (e) {
    let loader = document.querySelector(".loader");
    loader.parentNode.removeChild(loader);
  }
}

export {IEfix }
