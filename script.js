document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const searchBox = document.getElementById('searchBox');

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalSpecies = document.getElementById('modal-species');
  const closeModal = document.querySelector('.close');

  let imageData = [];

  // Load data from JSON
  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      imageData = data;
      displayImages(data);
    });

  // Display images
  function displayImages(data) {
    gallery.innerHTML = '';
    data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('gallery-item');
      div.innerHTML = `<img src="${item.src}" alt="${item.species}" data-species="${item.species}">`;
      div.addEventListener('click', () => {
        modalImg.src = item.src;
        modalSpecies.textContent = item.species;
        modal.classList.remove('hidden');
      });
      gallery.appendChild(div);
    });
  }

  // Search filter
  searchBox.addEventListener('input', () => {
    const term = searchBox.value.toLowerCase();
    const filtered = imageData.filter(item =>
      item.species.toLowerCase().includes(term)
    );
    displayImages(filtered);
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
});