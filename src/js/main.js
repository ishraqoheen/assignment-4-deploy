import './components/app-header.js';
import './components/app-button.js';

const categories = ['creatures', 'monsters', 'materials', 'equipment', 'treasure'];
const buttonContainer = document.getElementById('category-buttons');

if (buttonContainer) {
  categories.forEach(category => {
    const btn = document.createElement('app-button');
    btn.setAttribute('href', `category.html?category=${category}`);

    const label = document.createElement('span');
    label.slot = 'label';
    label.textContent = category;

    btn.appendChild(label);
    buttonContainer.appendChild(btn);
  });
}