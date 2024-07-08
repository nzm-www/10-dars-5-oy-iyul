async function getData(url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
}

function createCard(product) {
  return `
      <div class="card" data-id = '${product.id}'>
          <img class='img' src="${product.attributes.image}"alt=""/>
          <h3>${product.attributes.title}</h3>
          <p>${product.attributes.price}</p>
      </div>`;
}

function creatDetels(product) {
  return ` <div class="wrapp">
    <div>
      <img width="350" src="${product.attributes.image}" alt="" />
    </div>
    <div class="info">
      <h2>${product.attributes.title}</h2>
      <p>${product.attributes.company}</p>
      <p>$${product.attributes.price}</p>
      <p>${product.attributes.description}</p>

      <form id="form">
            <select id="select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            
            <button id="btn">ADD To BAG</button>
      </form>
    </div>
  </div>`;
}

function getDataStorge() {
  let data = [];
  if (localStorage.getItem("products")) {
    data = JSON.parse(localStorage.getItem("products"));
  }

  return data;
}

export { getData, createCard, creatDetels,getDataStorge };
