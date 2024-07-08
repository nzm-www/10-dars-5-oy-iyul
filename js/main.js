import { getData, createCard } from "./function.js";

const wrapper = document.getElementById("wrapper");
const loader = document.getElementById("loader");

document.addEventListener("DOMContentLoaded", function () {
  getData("https://strapi-store-server.onrender.com/api/products")
    .then((data) => {
      loader.style.display = "none";
      data.data.length > 0 &&
        data.data.forEach((prompt) => {
          let card = createCard(prompt);
          wrapper.innerHTML += card;
        });

      let cards = document.querySelectorAll(".card");
      cards.length > 0 &&
        cards.forEach(function (card) {
          card.addEventListener("click", function (event) {
            const cardId = this.getAttribute("data-id");
            if (cardId) {
              window.location.assign(
                `http://127.0.0.1:5500/pages/detels.html?id=${cardId}`
              );
            }
          });
        });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function () {});
});
