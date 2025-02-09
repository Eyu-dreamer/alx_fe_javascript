// Default quotes (if nothing is in localStorage)
const defaultQuotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Life" },
];

// Load quotes from localStorage, or use default if none are saved
let quotes = JSON.parse(localStorage.getItem("quotes")) || defaultQuotes;

// Load last selected category from localStorage
let selectedCategory = localStorage.getItem("selectedCategory") || "";

// Function to display a random quote
function showRandomQuote() {
    const filteredQuotes = selectedCategory
        ? quotes.filter((quote) => quote.category === selectedCategory)
        : quotes;
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote)); // Save last viewed quote to sessionStorage

    // Update DOM with the quote
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
        <p>"${randomQuote.text}"</p>
        <small>Category: ${randomQuote.category}</small>
    `;
}

// Function to populate categories dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = extractUniqueCategories();

    // Clear existing options (except for the first)
    categoryFilter.innerHTML = '<option value="">--Select a category--</option>';

    // Add categories to dropdown
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Set the previously selected category if exists
    categoryFilter.value = selectedCategory;
}

// Function to extract unique categories from the quotes array
function extractUniqueCategories() {
    const categories = quotes.map((quote) => quote.category);
    return [...new Set(categories)]; // Remove duplicates
}

// Function to filter and update displayed quotes based on selected category
function filterQuotesByCategory(event) {
    selectedCategory = event.target.value;
    localStorage.setItem("selectedCategory", selectedCategory); // Save selected category to localStorage
    showRandomQuote(); // Show a random quote based on the selected category
}

// Function to dynamically create the "Add Quote" form
function createAddQuoteForm() {
    const formContainer = document.createElement("div");

    // Create input for new quote text
    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";

    // Create input for new quote category
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";

    // Create a button to add a new quote
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    // Append inputs and button to the container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    // Append the form container to the body
    document.body.appendChild(formContainer);
}

// Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please fill in both fields!");
        return;
    }

    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    saveQuotes();
    alert("New quote added successfully!");
}

// Function to fetch quotes from the server using a mock API
const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API URL
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const serverQuotes = await response.json();

        // Process and sync quotes with localStorage
        syncQuotes(serverQuotes);
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

// Function to sync quotes with server data and handle conflicts
function syncQuotes(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    const mergedQuotes = [...serverQuotes, ...localQuotes];

    const uniqueQuotes = mergedQuotes.filter((quote, index, self) =>
        index === self.findIndex((q) => q.text === quote.text)
    );

    localStorage.setItem("quotes", JSON.stringify(uniqueQuotes));
    notifyUser("Quotes updated successfully!");
}

// Function to post new quotes to the server using a mock API
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quote),
        });

        if (response.ok) {
            console.log("Quote posted successfully:", await response.json());
        }
    } catch (error) {
        console.error("Error posting quote:", error);
    }
}

// Function to notify the user about updates
function notifyUser(message) {
    const notification = document.createElement("div");
    notification.innerText = message;
    notification.style.backgroundColor = "green";
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.marginTop = "20px";
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 5000);
}

// Periodically fetch and update quotes every minute
setInterval(fetchQuotesFromServer, 60000); // 60 seconds

// Attach event listener to "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Attach event listener to category filter dropdown
document.getElementById("categoryFilter").addEventListener("change", filterQuotesByCategory);

// Initialize the app
createAddQuoteForm();
populateCategories();
fetchQuotesFromServer();
