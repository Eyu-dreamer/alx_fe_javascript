// Array to store quotes
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success usually comes to those who are too busy to be looking for it.", category: "Success" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length); // Get a random index
  const quote = quotes[randomIndex]; // Select a quote
  const quoteDisplay = document.getElementById("quoteDisplay"); // Get the display element

  // Update the DOM with the selected quote
  quoteDisplay.innerHTML = `
    <p>${quote.text}</p>
    <small>Category: ${quote.category}</small>
  `;
}

// Add event listener to the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Function to add a new quote
function addQuote() {
  // Get user input
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  // Validate input
  if (quoteText && quoteCategory) {
    // Add new quote to the array
    quotes.push({ text: quoteText, category: quoteCategory });

    // Alert user and clear input fields
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    // If input is invalid, alert the user
    alert("Please fill in both fields.");
  }
}
