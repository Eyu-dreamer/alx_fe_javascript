// Initial array of quotes (if nothing is in localStorage)
const defaultQuotes = [{
        text: "The only way to do great work is to love what you do.",
        category: "Motivation",
    },
    {
        text: "Success is not final; failure is not fatal: It is the courage to continue that counts.",
        category: "Success",
    },
    {
        text: "In the middle of every difficulty lies opportunity.",
        category: "Life",
    },
];

// Load quotes from localStorage, or use default if none are saved
let quotes = JSON.parse(localStorage.getItem("quotes")) || defaultQuotes;

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote)); // Save last viewed quote to sessionStorage
    // Update DOM with the quote
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
        <p>"${randomQuote.text}"</p>
        <small>Category: ${randomQuote.category}</small>
    `;
}

// Function to dynamically create the "Add Quote" form
function createAddQuoteForm() {
    // Create a container div
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

    // Add the new quote to the quotes array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    // save quotes array into local storage
    saveQuotes();
    alert("New quote added successfully!");
}

// Attach event listener to the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Dynamically create and add the "Add Quote" form to the page
createAddQuoteForm();

// Import JSON file containing quotes
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes); // Add the imported quotes to the existing array
        saveQuotes(); // Save to local storage
        alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
}

// Export quotes to JSON file
let btn = document.createElement("button");
btn.textContent = "Download Quotes as a Json File";
document.body.appendChild(btn);

btn.addEventListener("click", () => {
    // Create a JSON string from the quotes array
    let jsonQuotes = JSON.stringify(quotes, null, 2); // Pretty-print with indentation
    let blob = new Blob([jsonQuotes], { type: "application/json" });
    let url = URL.createObjectURL(blob);

    // Create a link for download
    let link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Quotes.json");

    // Programmatically click and then remove the link
    document.body.appendChild(link);
    link.click();
    link.remove();
});
