var apiKey = 'p63XBWNnnykt7tjxBWTXoucYcr36w2OYeYpgjWOe';

// Função para fazer a requisição à API da NASA Image and Video Library e obter uma imagem astronômica aleatória
function getRandomAstronomyImage() {
  var apiUrl = 'https://images-api.nasa.gov/search?media_type=image&q=astronomy';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var images = data.collection.items;
      var randomIndex = Math.floor(Math.random() * images.length);
      var imageLink = images[randomIndex].links[0].href;

      var imageContainer = document.getElementById('image-container');
      imageContainer.innerHTML = ''; // Limpar o conteúdo anterior

      var image = document.createElement('img');
      image.src = imageLink;
      image.alt = 'Imagem Astronômica da NASA';
      imageContainer.appendChild(image);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
