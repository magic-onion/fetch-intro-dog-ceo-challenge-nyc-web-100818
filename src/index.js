  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  const dogKennel = document.getElementById('dog-image-container');
  let dogGenes = document.getElementById('dog-breeds') //ul
  const listItem = document.getElementsByTagName('li')
  // empty variable to assign within functions
  let responseThing;

  //generic fetch requires a .then(function(parsedResponse) {}
  function fetchFromUrl (url) {
    return fetch(url)
    .then(function (responseObject) {
      if (responseObject.ok) {
        return responseObject.json();
      }
      else {
        throw responseObject;
      }
    })
  }

  //grabs four images from API and places img tags in divs
  function putsDogsThere () {
    fetchFromUrl(imgUrl)
    .then(function(parsedResponse) {
      responseThing = parsedResponse.message;
      responseThing.forEach(function(urlString) {
        let imgContainer = document.createElement('div');
        imgContainer.innerHTML = `<img src = ${urlString}>`
        imgContainer.style = 'max-width: 400px;'
        dogKennel.appendChild(imgContainer);
      })
    })
    .catch(r=>console.warn(r))
  }

  //grabs the list of breeds and places them in the ul, assiging an id
  //that is equal to the first letter of the string
  function getDogBreeds () {
    fetchFromUrl(breedUrl)
    .then(function (parsedResponse) {
      return Object.keys(parsedResponse.message);
    })
    .then(function(parsedArray) {
      responseThing = parsedArray
      responseThing.forEach(function(breedName) {
        let breedListItem = document.createElement('li');
        breedListItem.innerText = breedName;
        breedListItem.id = breedName[0];
        dogGenes.appendChild(breedListItem);
        breedListItem.addEventListener('click', changeBreedDisplayColor)
      })
    })
    .catch(r=>console.warn(r))
  }

  //function to chang li color -- could set the width of li's
  //for better precision.
  function changeBreedDisplayColor (event) {
    console.log('it happened')
    event.target.style = 'color: green;'
  }

  //janky filtering that works
  function breedSelector (event) {
    let thing = Array.from(dogGenes.children)
    thing.forEach(function (el) {
      if (event.target.value !== el.id) {
        el.style = "display: none;"
      }
      else if (event.target.value === el.id) {
        el.style = ""
      }
    })
  }

//unclear to me where to put these or how to organize
//load events vs UI events
document.addEventListener('DOMContentLoaded',function() {
  document.querySelector('select[name="select-breed"]').onchange=breedSelector;
},false);
document.addEventListener('DOMContentLoaded', putsDogsThere)
document.addEventListener('DOMContentLoaded', getDogBreeds)
