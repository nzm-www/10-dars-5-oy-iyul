import { getData, creatDetels, getDataStorge } from "./function.js";

const detelsmain = document.getElementById("detelsmain");
const loader = document.getElementById("loader");

document.addEventListener("DOMContentLoaded", function () {
  let url = window.location.href;
  let id = url.split("id=")[1];

  if (!id) {
    window.location.assign(`http://127.0.0.1:5500/index.html`);
    return;
  }

  getData(`https://strapi-store-server.onrender.com/api/products/${id}`)
    .then((data) => {
      if (data.data.id) {
        let card = creatDetels(data.data);
        detelsmain.innerHTML = card;

        const form = document.getElementById("form");
        const button = document.getElementById("btn");
        const select = document.getElementById("select");

        form.addEventListener("submit", function (event) {
          event.preventDefault();
          let product = {
            id: data.data.id,
            time: Date.now(),
            count: select.value *1,
            attribute: data.data.attributes,
          };

          let products = getDataStorge();
          let isExist = product.find((element) => {
            return element.id == product.id;
          });
          if (isExist && isExist.id) {
            products = products.map((element) => {
              if (element.id == product.id) {
                element.count += product.count;
              }
              return element;
            });
          } else {
            products.push(product);
          }
          localStorage.setItem("products", JSON.stringify(products));
        });
      } else {
        detelsmain.innerHTML = "bunday sahifa mavjud emas";
      }
    })
    .catch((err) => {
      detelsmain.innerHTML = "bunday sahifa mavjud emas";

      console.log(err);
    })
    .finally(function () {
      loader.style.display = "none";
    });
});
