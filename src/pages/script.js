const tagsContainer = document.querySelector('#tags');
tagsContainer.addEventListener('click', (event) => {
  if (event.target.matches('#tags > button')) {
    const button = event.target;

    // Toggle button styles
    button.classList.toggle('bg-primary!');
    button.classList.toggle('text-white');
  }
});
