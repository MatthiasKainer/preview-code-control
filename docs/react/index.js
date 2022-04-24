import { React, ReactDOM } from "https://unpkg.com/es-react";
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement)

const { useState, useEffect } = React;

const shoppingCartService = {
  itemsCount: 0,
  loadCountOfElementsInCart: function() {
    return new Promise(resolve =>
      setTimeout(() => resolve(this.itemsCount), 500)
    );
  },
  addItemToCart: function() {
    this.itemsCount++;
    return Promise.resolve();
  }
};

const Cart = ({ count }) => {
  return (
    html`<div className="shopping-cart">
      <div>🛒</div>
      <div>${count}</div>
    </div>`
  );
};

const DetailPage = ({ onItemAddedToCart }) => {
  return (
    html`<div>
      <h2>Product</h2>
      <button onClick=${onItemAddedToCart}>Add item to cart</button>
    </div>`
  );
};

const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    shoppingCartService.loadCountOfElementsInCart().then(setCount);
  }, []);
  return (
    html `<div>
      <${Cart} count=${count} />
      <${DetailPage}
        onItemAddedToCart=${() =>
          shoppingCartService
            .addItemToCart()
            .then(() => shoppingCartService.loadCountOfElementsInCart())
            .then(setCount)
        }
      />
    </div>`
  );
};

ReactDOM.render(html`<${App} />`, document.getElementById("root"));
