document.addEventListener("DOMContentLoaded", () => {
    // Get references to all "add" buttons
    const buttons = [
      { id: "add-orange", name: "Oranges" },
      { id: "add-apple", name: "Apples" },
      { id: "add-bananas", name: "Bananas" },
      { id: "add-dragonfruit", name: "DragonFruit"},
    ];
  
    // Reference to the cart body where items will be appended
    const cartBody = document.querySelector(".cart-body");
  
    // Reference to the subtotal and total elements
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total")
    
    let subtotal = 0;
    const taxRate = 0.08517;
  
    // Function to update subtotal and total display
    function updateTotals() {
      const total = subtotal + subtotal * taxRate;
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      totalElement.textContent = `$${total.toFixed(2)}`;
    }
  
    // Function to handle adding an item to the cart
    function addItemToCart(itemName, price) {
      // Initialize quantity to 1
      let quantity = 1;
      price = parseFloat(price);
  
      // Create a new cart item div
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <h3>${itemName}</h3>
        <div class="info-container">
            <img src="./static/images/${itemName}.jpg">
            <div class="controls">
                <svg class="decrement" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                </svg>
                <div class="current-number">${quantity}</div>
                <svg class="increment" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
            </div>
        </div>
      `;
      cartBody.appendChild(cartItem);
  
      // Update the subtotal and total
      subtotal += price;
      updateTotals();
  
      // Add event listener to the plus icon to increment quantity
      const incrementButton = cartItem.querySelector(".increment");
      const quantityDisplay = cartItem.querySelector(".current-number");
  
      incrementButton.addEventListener("click", () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        subtotal += price;
        updateTotals();
      });
  
      // Add event listener to the minus icon to decrement quantity
      const decrementButton = cartItem.querySelector(".decrement");
  
      decrementButton.addEventListener("click", () => {
        if (quantity > 1) {
          quantity--;
          quantityDisplay.textContent = quantity;
          subtotal -= price;
          updateTotals();
        }
      });
    }
  
    // Attach event listeners to each button
    buttons.forEach(({ id, name }) => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener("click", () => {
          // Find the closest item-card and get the price
          const itemCard = button.closest(".item-card");
          const priceElement = itemCard.querySelector(".price");
          const price = priceElement.textContent.replace("$", "");
  
          // Add the item to the cart
          addItemToCart(name, price);
        });
      }
    });
  });
  