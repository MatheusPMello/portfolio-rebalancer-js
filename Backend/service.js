// server.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// IMPORTANT: This middleware is needed to parse JSON from the request body
app.use(express.json());

// --- Your API Endpoint ---
// This route will handle the form submission
app.post('/api/register-entry', async (req, res) => {
  // Get data from the request body
  const { description, amount, target, currency } = req.body;

  // Basic validation
  if (!description || !amount || !target || !currency) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Create the new entry in the database
    const newEntry = await prisma.financialEntry.create({
      data: {
        description: description,
        amount: amount,       // Prisma handles the Decimal conversion
        target: target,
        currency: currency,
      },
    });

    // Send back the created entry with a 201 status (Created)
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(500).json({ error: 'Failed to register entry.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});