const ul = document.querySelector(".poke-list");


const fetchPokemon = () => { 
  fetch('http://localhost:3000/pokemons', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      data.forEach (item => {
        let pokemonName = item.name 
        let pokemonImage =item.image
        let pokeID = item.id
        
        let section = document.createElement('section')
        let li = document.createElement('li')
        let deleteButton = document.createElement('button')
        let likeButton = document.createElement('button')
        let myImg = document.createElement('img')
    
        myImg.setAttribute('src', pokemonImage )
  
        //console.log(myImg)
  
        myImg.style.width = '100px';
  
          //Buttons starts here//

        deleteButton.addEventListener('click', function(){
          let id = pokeID
          deleteItem(id);
        })
  
          likeButton.addEventListener('click', function(){
  
            if(likeButton.style.backgroundColor === "transparent") {
              likeButton.style.color = 'white';
              likeButton.style.backgroundColor = "Blue"
            } else {
              likeButton.style.color = 'blue';
              likeButton.style.backgroundColor = "transparent"
            }
            
          })
  
          //buttons end here//
  
  
  
    
          section.className = 'pokemon'
          myImg.className = 'pokemon'
          deleteButton.className = 'deleteButton'
          likeButton.className = 'likeButton'
  
    
          
          ul.appendChild(section)
          section.appendChild(li)
          section.appendChild(myImg)
          section.appendChild(deleteButton)
          section.appendChild(likeButton)
    
          li.textContent = pokemonName;
          deleteButton.textContent = "Delete"
          likeButton.textContent = "Like"
  
        //console.log(pokemonName)
      })
    })

}

fetchPokemon()


// ABOVE is sourcing the information 


// BELOW is adding to the database

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let dataName = document.getElementById('name').value;
  let dataImage = document.getElementById('image').value;

  const pokeData = {
    "name": dataName,
    "image": dataImage
  }

  //console.log(pokeData)

  fetch('http://localhost:3000/pokemons', {
    method: 'POST',
    body: JSON.stringify(pokeData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data));
});


const deleteItem = (id) => {
  fetch(`http://localhost:3000/pokemons/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      const itemElement = document.getElementById(`item-${id}`);
      itemElement.parentNode.removeChild(itemElement);
    }
  })
}
