// Get references to HTML elements
const stockNameInput = document.getElementById('stock-name');
const stockQuantityInput = document.getElementById('stock-quantity');
const stockPriceInput = document.getElementById('stock-price');
const addStockButton = document.getElementById('add-stock-btn');
const portfolioList = document.getElementById('portfolio-list');
const totalValueElement = document.getElementById('total-value');
const totalStocksElement = document.getElementById('total-stocks');

// Initialize portfolio array from localStorage
let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

// Function to calculate and update portfolio summary
function updateSummary() {
  let totalValue = 0;
  let totalStocks = 0;

  // Loop through the portfolio to calculate total value and total stocks
  portfolio.forEach(stock => {
    totalValue += stock.quantity * stock.price;
    totalStocks += stock.quantity;
  });

  // Update the summary display
  totalValueElement.textContent = `Total Value: ₹${totalValue.toFixed(2)}`;
  totalStocksElement.textContent = `Total Stocks: ${totalStocks}`;
}

// Function to render the portfolio list
function renderPortfolio() {
  portfolioList.innerHTML = ''; // Clear current list

  portfolio.forEach((stock, index) => {
    // Create list item
    const li = document.createElement('li');
    li.textContent = `${stock.name} - ${stock.quantity} shares at ₹${stock.price} each`;

    // Calculate the total cost of the stock
    const totalCost = (stock.quantity * stock.price).toFixed(2);

    // Display total cost next to the stock name
    const costElement = document.createElement('span');
    costElement.textContent = ` - Total Cost: ₹${totalCost}`;
    costElement.style.fontWeight = 'bold';
    costElement.style.marginLeft = '10px';

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.style.marginLeft = '10px';

    // Add event listener to remove button
    removeButton.addEventListener('click', () => {
      removeStock(index);
    });

    li.appendChild(costElement);
    li.appendChild(removeButton);
    portfolioList.appendChild(li);
  });

  // Update the portfolio summary after rendering the portfolio
  updateSummary();
}

// Function to add a stock
function addStock() {
  const stockName = stockNameInput.value.trim();
  const stockQuantity = stockQuantityInput.value.trim();
  const stockPrice = stockPriceInput.value.trim();

  if (stockName && stockQuantity && stockPrice) {
    // Add new stock to portfolio
    portfolio.push({
      name: stockName,
      quantity: parseInt(stockQuantity),
      price: parseFloat(stockPrice),
    });

    // Save updated portfolio to localStorage
    localStorage.setItem('portfolio', JSON.stringify(portfolio));

    // Clear input fields
    stockNameInput.value = '';
    stockQuantityInput.value = '';
    stockPriceInput.value = '';

    // Re-render the portfolio
    renderPortfolio();
  } else {
    alert('Please enter stock name, quantity, and price.');
  }
}

// Function to remove a stock
function removeStock(index) {
  // Remove stock from portfolio
  portfolio.splice(index, 1);

  // Save updated portfolio to localStorage
  localStorage.setItem('portfolio', JSON.stringify(portfolio));

  // Re-render the portfolio
  renderPortfolio();
}

// Event listener for Add Stock button
addStockButton.addEventListener('click', addStock);

// Initial render of portfolio
renderPortfolio();
