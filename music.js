async function pesquisar() {
  const artistName = document.getElementById('search-input').value;
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0b172b1620mshe820616756304d1p1edce4jsn801fd59d9abf',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    await exibirResultados(data);
  } catch (error) {
    console.error(error);
  }
}

async function exibirResultados(data) {
  const pesquisaResult = document.getElementById('pesquisaResult');
  pesquisaResult.innerHTML = ''; // Limpar resultados anteriores

  if (data && data.data) {
    const musicas = data.data;

    if (musicas.length > 0) {
      for (let i = 0; i < musicas.length; i += 2) {
        const musica1 = musicas[i];
        const musica2 = i + 1 < musicas.length ? musicas[i + 1] : null;

        const divLinha = document.createElement('div');
        divLinha.className = 'linha';

        const divColuna1 = await criarDivMusica(musica1);
        divLinha.appendChild(divColuna1);

        if (musica2) {
          const divColuna2 = await criarDivMusica(musica2);
          divLinha.appendChild(divColuna2);
        }

        pesquisaResult.appendChild(divLinha);
      }
    } else {
      pesquisaResult.innerHTML = 'Nenhum resultado encontrado.';
    }
  } else {
    pesquisaResult.innerHTML = 'Ocorreu um erro na busca.';
  }
}

async function criarDivMusica(musica) {
  const nomeMusica = musica.title;
  const nomeArtista = musica.artist.name;
  const imagemArtista = musica.artist.picture_medium;
  const trechoMusica = musica.preview;

  const divColuna = document.createElement('div');
  divColuna.className = 'coluna';

  const divMusica = document.createElement('div');
  divMusica.className = 'musica';
  divMusica.innerHTML = `
    <img style="color:#fff" src="${imagemArtista}" alt="${nomeArtista}">
    <h3 style="color:#fff">${nomeMusica}</h3>
    <p style="color:#fff">Artista: ${nomeArtista}</p>
  `;

  // Estilizar a div principal
  divMusica.style.display = 'flex';
  divMusica.style.flexDirection = 'column';
  divMusica.style.alignItems = 'center';

  // Criar elemento de áudio
  const audioElement = document.createElement('audio');
  audioElement.src = trechoMusica;
  audioElement.controls = true;

  // Adicionar o elemento de áudio abaixo da imagem
  divMusica.appendChild(audioElement);

  const letras = await obterLetrasMusica(musica.id);

  if (letras) {
    const divLetras = document.createElement('div');
    divLetras.innerHTML = `<p style="color:#fff">Letra: ${letras}</p>`;
    divMusica.appendChild(divLetras);
    divLetras.style.display = 'none'; // Oculta a div de letras inicialmente

    audioElement.addEventListener('play', function() {
      divLetras.style.display = 'block'; // Mostra a div de letras ao iniciar a reprodução
    });

    audioElement.addEventListener('pause', function() {
      divLetras.style.display = 'none'; // Oculta a div de letras ao pausar a reprodução
    });
  }

  divColuna.appendChild(divMusica);

  return divColuna;
}


async function obterLetrasMusica(idMusica) {
  const url = `https://api.genius.com/songs/${idMusica}`;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer niAdHO5V6n3_pgU4mk1vWUDnDDZNB7Ef9r9_HQvXrP0qVjyX4R1vEzFi3ueoG7GdcO-idwqSMeKrvLPlk688CA'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data && data.response && data.response.song && data.response.song.lyrics) {
      const lyrics = data.response.song.lyrics;
      return lyrics;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

