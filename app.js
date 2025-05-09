const fs = require('fs');
const express = require('express');

const { JSDOM } = require('jsdom');

const app = express();
const port = 3000;

// Read XML file content
const xmlContent = fs.readFileSync('./public/library.xml', 'utf8');

// Parse XML content using jsdom
const dom = new JSDOM(xmlContent, { contentType: 'text/xml' });
const doc = dom.window.document;

// Get all <book> elements
const books = doc.getElementsByTagName('book');

// Filter books with year < 2012
let filteredBooks = [];

for (let i = 0; i < books.length; i++) {
  const book = books[i];

  const title = book.getElementsByTagName('title')[0]?.textContent || 'Unknown Title';
  const author = book.getElementsByTagName('author')[0]?.textContent || 'Unknown Author';
  const yearText = book.getElementsByTagName('year')[0]?.textContent || '0';
  const year = parseInt(yearText);

  if (year < 2012) {
    filteredBooks.push({ title, author, year });
  }
}

// Route to show books with year < 2012
app.get('/', (req, res) => {
  let html = `
    <h1>📚 Books Published Before 2012
    <ul style="font-family: Arial; font-size: 16px;">`;

  if (filteredBooks.length === 0) {
    html += `<h1><li>No books found before 2012</li>`;
  } else {
    filteredBooks.forEach(book => {
      html += `<h1><li><strong>${book.title}</strong> by ${book.author} (Year: ${book.year})</li>`;
    });
  }

  html += `</ul>`;

  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

