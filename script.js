document.getElementById("add_button").addEventListener("click", addCard);

function addCard() {
  const stock = document.getElementById("stock_symbol").value;
  document.forms["form"].reset();

  let card = document.createElement("div");
  card.id = "card";
  card.className = "card";
  card.style.width = "14rem";
  document.getElementById("results").append(card);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  let stockSymbol = document.createElement("h5");
  stockSymbol.className = "card-title text-center";
  stockSymbol.innerHTML = stock;
  cardBody.append(stockSymbol);

  let editButton = document.createElement("button");
  editButton.className = "btn btn-outline-warning";
  editButton.innerHTML = "Add to Favorites";
  cardBody.append(editButton);
}
