const URL_WEB_PAGE = "https://images-api.nasa.gov/";
const URL_WEB_PAGE_2 = "search?q=";


let buscar_var = document.getElementById("btnBuscar");
let input_buscar = document.getElementById("inputBuscar");
let contenedor = document.getElementById("contenedor");



document.addEventListener("DOMContentLoaded", function(e){


});

buscar_var.addEventListener("click", function(e){
    let URL_WEB_PAGE_3 = "https://images-api.nasa.gov/" + URL_WEB_PAGE_2 + input_buscar.value;
console.log(URL_WEB_PAGE_3);

    getJSONData(URL_WEB_PAGE_3).then(function (resultObj) {
        if (resultObj.status === "ok") {
            planetArray = resultObj.data;
            mostrarBusqueda(planetArray);
        }
        else { console.log("ERROR AL OBTENER JSON") }
    })
    
});


let getJSONData = function (url) {
    let result = {};
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then(function (response) {
        result.status = 'ok';
        result.data = response;
        return result;
      })
      .catch(function (error) {
        result.status = 'error';
        result.data = error;
        return result;
      });
  }
  
  function mostrarBusqueda(planetArray){

    let htmlContentToAppend = "";

    console.log(planetArray)

      let items = planetArray.collection.items;
      console.log(items);
//hasta la posicion hay links, despues no existe esa propiedad en item

      for(let i = 0; i < items.length; i++){
        let item = items[i];

        console.log(item)

        let data = item.data;
          console.log(data);

      let title = data[0].title;
          console.log(title)

      let date = data[0].date_created;
      console.log(date);

      let description = data[0].description;
      console.log(description);

      let keywords = data[0].keywords

      let idIMG = keywords.nasa_id

      console.log(idIMG)

      // let URL_IMG = "https//images-assets.nasa.gov/image/"+ idIMG + "/~thumb.jpg"
      // console.log(URL_IMG);


      // let links = item.links[0];
      // console.log(links)
      // let img = links.href;
      // console.log(img);

     htmlContentToAppend += `
      <div class="card">
        <img src="${img}">
        <div class="cuerpo">
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
        <p class = "fecha"> ${date} </p>
      </div>`
      }

    contenedor.innerHTML += htmlContentToAppend;
      }