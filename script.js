let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Red Shirt",
    tag: "redshirt",
    price: 799,
    inCart: 0,
  },

  {
    name: "White Shirt",
    tag: "whiteshirt",
    price: 899,
    inCart: 0,
  },

  {
    name: "Red Design Shirt",
    tag: "redshirt1",
    price: 799,
    inCart: 0,
  },

  {
    name: "White Shoe",
    tag: "whiteshoe",
    price: 1499,
    inCart: 0,
  },

  {
    name: "Blue Shoe",
    tag: "blueshoe",
    price: 1399,
    inCart: 0,
  },

  {
    name: "Green Shoe",
    tag: "greenshoe",
    price: 2499,
    inCart: 0,
  },

  {
    name: "Leather Watch 1",
    tag: "watch1",
    price: 3499,
    inCart: 0,
  },

  {
    name: "Leather Watch 2",
    tag: "watch2",
    price: 4499,
    inCart: 0,
  },

  {
    name: "Leather Watch 3",
    tag: "watch3",
    price: 3999,
    inCart: 0,
  },
];
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCardNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
  let calValue = eval(cartCost - (cartCost * 20) / 100);

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class = "product">
      <ion-icon name="close-circle"></ion-icon>
      <img src="img/${item.tag}.jpg">
      <span>${item.name}</span>
      </div>
      <div class="price">₹${item.price}.00</div>
      <div class="quantity">
      <ion-icon name="arrow-dropleft-circle"></ion-icon>
      <span>${item.inCart}</span>
      <ion-icon name="arrow-dropright-circle"></ion-icon>
      </div>
      <div class="total">
      ₹${item.inCart * item.price}.00
      </div>
      `;
    });

    productContainer.innerHTML += `
    <div class = "basketTotalContainer">
    <h4 class = "basketTotalTitle">
    Basket Total
    </h4>
    <h4 class = "basketTotal">
    ₹${cartCost}.00
    </h4>
    </div>
    `;

    productContainer.innerHTML += `
    <div class = "discountContainer">
    <h4 class = "discountTitle">
    Discount
    </h4>
    <h4 class = "disountTotal">
    20%
    </h4>
    </div>`;

    productContainer.innerHTML += `
    <div class = "netTotalContainer">
    <h4 class = "netTotalTitle">
    Net Total
    </h4>
    <h4 class = "netTotal">
    ₹${calValue}
    </h4>
    </div>`;
  }
  // document.querySelector(".close circle").addEventListener("click", () => {
  //   for (let i = 0; i <= cartItems.length; i++) {
  //     console.log("you clicked");
  //   }
  // });
}

onLoadCardNumbers();
displayCart();
