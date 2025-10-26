// app.js

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
  const entryForm = document.getElementById('entryForm');
  const messageDiv = document.getElementById('message');

  // Add a submit event listener to the form
  entryForm.addEventListener('submit', async (event) => {
    // Prevent the default form submission (which reloads the page)
    event.preventDefault();

    // Get the form data
    const formData = new FormData(entryForm);
    const data = Object.fromEntries(formData.entries());

    // --- Data Sanitization ---
    // The <input type="number"> gives a string,
    // so we convert it to a number (float) before sending.
    data.amount = parseFloat(data.amount);
    data.target = parseInt(data.target);
    
    // Convert currency to uppercase
    data.currency = data.currency.toUpperCase();

    try {
      // Send the data to the backend API endpoint
      const response = await fetch('/api/register-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server we are sending JSON
        },
        body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
      });

      // Handle the response from the server
      if (response.ok) {
        const result = await response.json();
        messageDiv.textContent = `Entry registered successfully! (ID: ${result.id})`;
        messageDiv.style.color = 'green';
        entryForm.reset(); // Clear the form
      } else {
        const errorData = await response.json();
        messageDiv.textContent = `Error: ${errorData.error || 'Failed to register'}`;
        messageDiv.style.color = 'red';
      }
    } catch (error) {
      // Handle network errors (e.g., server is down)
      console.error('Submission error:', error);
      messageDiv.textContent = 'A network error occurred. Please try again.';
      messageDiv.style.color = 'red';
    }
  });
});