// server.js (Tudo em Inglês, como solicitado)

// 1. Import dependencies
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

// 2. Initialize Express app and Prisma Client
const app = express();
const prisma = new PrismaClient();

// 3. Middleware
// This is crucial: it parses incoming JSON from the frontend
app.use(express.json());
app.use(cors());

// --- API Endpoints ---

// Nosso novo endpoint para registrar o FinancialEntry
app.post('/api/register-entry', async (req, res) => {
  // Get data from the request body (sent by the frontend 'fetch')
  const { description, amount, target, currency } = req.body;

  // Basic validation
  if (!description || !amount || !target || !currency) {
    // 400 = Bad Request
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Use Prisma to create the new entry in the database
    const newEntry = await prisma.financialEntry.create({
      data: {
        description: description,
        amount: amount,
        target: target,
        currency: currency,
      },
    });

    // 201 = Created. Send back the new entry.
    res.status(201).json(newEntry);

  } catch (error) {
    console.error('Error creating financial entry:', error);
    // 500 = Internal Server Error
    res.status(500).json({ error: 'Failed to register entry.' });
  }
});

// (Aqui você pode adicionar outros endpoints, ex: GET para ler os dados)

// 4. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});