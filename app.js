let errorState;
let loadingState;

const show = el => {
  el.classList.remove('hidden');
}

const hide = el => {
  el.classList.add('hidden');
}

const pixEl = document.querySelector(".pix");
const errEl = document.querySelector(".error");
const loadingEl = document.querySelector(".loading");

const checkErrorState = (errorState) => {
  if (!errorState) {
    show(pixEl);
    hide(errEl);
  } else {
    hide(pixEl);
    show(errEl);
  }
}

const clearPix = () => {
  pixEl.innerHTML = '';
}

const checkLoadingState = () => {
  if (loadingState) {
    show(loadingEl);
  } else {
    hide(loadingEl);
  }
}

const getImages = () => {
  const url = document.getElementById('url').value;
  const newUrl = url + '/wp-json/wp/v2/media?per_page=50';
  const pix = document.querySelector('.pix')

  clearPix();

  fetch(newUrl).then(res => res.json()).then(r => {
    for (let e of r) {
      changeErrorState(errorState)
      const imgWrapper = document.createElement("div")
      const img = document.createElement("img")
      const title = document.createElement("p")
      title.innerText = e.slug
      img.setAttribute("src", `${e.source_url}`)
      imgWrapper.setAttribute("class", "img-wrapper")
      imgWrapper.appendChild(img)
      imgWrapper.appendChild(title)
      pix.appendChild(imgWrapper)
    }
  }).catch(err => {
    document.querySelector(".error").classList.toggle("hidden")
    document.querySelector(".error-text").innerText = String(err)
    document.querySelector(".pix").classList.toggle("hidden")
    errorState = true;


  });
}