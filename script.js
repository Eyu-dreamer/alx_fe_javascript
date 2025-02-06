// Reference to the display area
let showBox = document.querySelector("#quoteDisplay");

// Create initial array of quotes
let quotes = [
  {
    text: "Success is not final, failure is not fatal.",
    category: "Motivation",
  },
  {
    text: "Believe you can and you're halfway there.",
    category: "Inspiration",
  },
  { text: "Your only limit is your mind.", category: "Mindset" },
];

// Function to show a random quote
function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  showBox.textContent = quotes[randomIndex].text;
}

// Grab quote and category input from the user
let textInput = document.querySelector("#newQuoteText");
let categoryInput = document.querySelector("#newQuoteCategory");
let text = "";
let category = "";

// Function to grab the quote text
function grabQuote(event) {
  text = event.target.value.trim();
}

// Function to grab the category input
function grabCategory(event) {
  category = event.target.value.trim();
}

// Add the new quote to the quotes array
function addQuote() {
  if (text && category) {
    let newQuote = { text: text, category: category };
    quotes.push(newQuote);
    textInput.value = "";
    categoryInput.value = "";
    localStorage.setItem("quotes", quotes); // to save the upto date quote array;
    console.log(localStorage.getItem("quotes")); // Check the updated quotes array in the console
  } else {
    alert("Please fill in both quote and category fields.");
  }
}

// Attach event listeners for inputs to capture the data
textInput.addEventListener("input", grabQuote);
categoryInput.addEventListener("input", grabCategory);

// Attach event listener for the button to add the quote
let addQuoteButton = document.querySelector("#addQuoteBtn");
addQuoteButton.addEventListener("click", addQuote);

// Attach event listener for the "Show New Quote" button
let newQuoteButton = document.querySelector("#newQuoteBtn");
newQuoteButton.addEventListener("click", showRandomQuote);

