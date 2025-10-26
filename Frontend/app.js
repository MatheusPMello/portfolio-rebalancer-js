// app.js

// [NEW] Helper function to render the list in the HTML
// Receives an array of entry objects from the database
function renderEntries(entries) {
  // 1. Find the <ul> element on the page
  const entryList = document.getElementById('entryList');

  // 2. Clear the list (to remove "Loading..." or old data)
  entryList.innerHTML = '';

  // 3. Check if the list is empty
  if (entries.length === 0) {
    entryList.innerHTML = '<li>No entries found. Register one above!</li>';
    return;
  }

  // 4. Loop through each entry and create an <li> element for it
  entries.forEach(entry => {
    const li = document.createElement('li');
    
    // Format the text (ex: "My Trip [Travel] - 1500.50 BRL")
    // Note: 'entry.amount' might be a string, so we parse it
    const amount = parseFloat(entry.amount).toFixed(2);
    
    li.textContent = `${entry.description} [${entry.target}] - ${amount} ${entry.currency}`;
    
    entryList.appendChild(li);
  });
}

// [NEW] Helper function to fetch entries from the backend
async function fetchEntries() {
  const entryList = document.getElementById('entryList');
  try {
    const response = await fetch('http://localhost:3000/api/get-entries');
    
    if (!response.ok) {
      throw new Error('Failed to fetch entries');
    }
    
    const entries = await response.json();
    renderEntries(entries); // Pass the data to our render function
    
  } catch (error) {
    console.error('Error fetching entries:', error);
    entryList.innerHTML = '<li>Error loading entries. Please refresh.</li>';
  }
}

// --- Main code starts when the page loads ---
document.addEventListener('DOMContentLoaded', () => {
  
  const entryForm = document.getElementById('entryForm');
  const messageDiv = document.getElementById('message');
  
  // --- Form submission logic (this was already here) ---
  entryForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(entryForm);
    const data = Object.fromEntries(formData.entries());

    data.amount = parseFloat(data.amount);
    data.target = parseInt(data.target);
    if (data.currency) {
      data.currency = data.currency.toUpperCase();
    }

    try {
      const response = await fetch('http://localhost:3000/api/register-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        messageDiv.textContent = `Entry registered successfully! (ID: ${result.id})`;
        messageDiv.style.color = 'green';
        entryForm.reset();
        
        // [NEW] Refresh the list after successful submission!
        fetchEntries(); 
        
      } else {
        const errorData = await response.json();
        messageDiv.textContent = `Error: ${errorData.error || 'Failed to register'}`;
        messageDiv.style.color = 'red';
      }
    } catch (error) {
      console.error('Submission error:', error);
      messageDiv.textContent = 'A network error occurred. Please try again.';
      messageDiv.style.color = 'red';
    }
  });
  
  // [NEW] Fetch the initial list when the page loads!
  fetchEntries();
  
});