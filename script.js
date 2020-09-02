document.getElementById("add_button").addEventListener("click", addCard);

let companyName;
let symbol;
let previousClose;
let currentPrice;

function getData() {
  const beginURL = "https://cloud.iexapis.com/stable/stock/";
  const endURL = "/quote?token=pk_93c31736e1884c4d9585a581f9a431d6";
  const input = document.getElementById("stock_symbol").value;
  const stock = input.toLowerCase();

  const apiURL = beginURL + stock + endURL;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      symbol = data.symbol;
      companyName = data.companyName;
      previousClose = data.previousClose;
      currentPrice = data.iexRealtimePrice;

      console.log(companyName);
      console.log(symbol);
      console.log(previousClose);
      console.log(currentPrice);

      let card = document.createElement("div");
      card.id = "card";
      card.className = "card";
      card.style.width = "14rem";
      card.style.height = "auto";
      document.getElementById("results").append(card);

      let cardBody = document.createElement("div");
      cardBody.className = "card-body";
      card.append(cardBody);

      let companyNameTag = document.createElement("h5");
      companyNameTag.className = "card-title text-center";
      companyNameTag.innerHTML = companyName;
      cardBody.append(companyNameTag);

      let stockSymbol = document.createElement("h5");
      stockSymbol.className = "card-title text-center";
      stockSymbol.innerHTML = symbol;
      cardBody.append(stockSymbol);

      let currentPriceTag = document.createElement("h5");
      currentPriceTag.className = "card-title text-center";
      currentPriceTag.innerHTML = "$" + currentPrice;
      cardBody.append(currentPriceTag);

      let addToFav = document.createElement("input");
      addToFav.type = "image";
      addToFav.id = "addFav";
      addToFav.className = "text-center";
      addToFav;
      addToFav.src = "logosmall.png";
      cardBody.append(addToFav);
    });

  document.forms["form"].reset();
}

function addCard() {
  getData();
}
