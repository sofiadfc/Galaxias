document.getElementById('btnBuscar').addEventListener('click', function () {
    const query = document.getElementById('inputBuscar').value;
  
    if (query.trim() === '') {
      alert('Por favor, ingresa lo que quieres buscar.');
      return;
    }

    const url = `https://images-api.nasa.gov/search?q=${query}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '';
  
        if (data.collection.items.length === 0) {
          contenedor.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
          return;
        }
  
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'g-3');
  
        data.collection.items.forEach((item, index) => {
          const imageUrl = item.links ? item.links[0].href : '';
          const title = item.data[0].title || 'Sin título';
          const description = item.data[0].description || 'Sin descripción';
          const date = item.data[0].date_created || 'Fecha no disponible';
  
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('col-md-4', 'mb-3');
  
          cardDiv.innerHTML = `
            <div class="card h-100">
              <img src="${imageUrl}" class="card-img-top" alt="${title}">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <div class="card-text">
                  ${description}
                </div>
              </div>
              <div class="card-footer">
                <small class="text-muted">${new Date(date).toLocaleDateString()}</small>
              </div>
            </div>
          `;
  
          rowDiv.appendChild(cardDiv);
  
          if ((index + 1) % 3 === 0) {
            contenedor.appendChild(rowDiv);
            rowDiv = document.createElement('div');
            rowDiv.classList.add('row', 'g-3');
          }
        });
  
        if (rowDiv.children.length > 0) {
          contenedor.appendChild(rowDiv);
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud a la API de la NASA:', error);
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '<p>Ocurrió un error al obtener los datos.</p>';
      });
  });