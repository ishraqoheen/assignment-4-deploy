// Name: Ishraq Oheen
// Assignment 4

import './components/app-header.js';
import './components/entry-card.js';

const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const entriesList = document.getElementById('entries-list');

async function init() {
  if (!category) return;

  try {
    const response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/category/${category}`);
    if (!response.ok) throw new Error('API Error');

    const json = await response.json();
    const entries = json.data;

    // sort alphabetically
    entries.sort((a, b) => a.name.localeCompare(b.name));

    entriesList.innerHTML = '';

    entries.forEach(entry => {
      const card = document.createElement('entry-card');
      card.data = entry;
      entriesList.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    entriesList.innerHTML = '<p>Error loading entries.</p>';
  }
}

init();