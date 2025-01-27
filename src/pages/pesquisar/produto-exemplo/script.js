let productQuantity = 120;
const originalQuantity = productQuantity;
const tagsContainer = document.querySelector('#tags');

tagsContainer.addEventListener('click', (event) => {
  if (event.target.matches('#tags > button')) {
    const button = event.target;

    // Toggle button styles
    button.classList.toggle('bg-primary!');
    button.classList.toggle('text-white');

    // Update product quantity based on button selection
    productQuantity = button.classList.contains('bg-primary!')
      ? Math.ceil(productQuantity / 2)
      : Math.min(productQuantity * 2, originalQuantity);

    updateProductQuantity();
  }
});

const updateProductQuantity = () => {
  document.querySelector('section > h1').textContent = `${productQuantity} Produtos encontrados`;
};
