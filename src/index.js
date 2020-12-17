let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

const toyURL = "http://localhost:3000/toys"

function renderOneListing(toyObj){
  const toyCollect = document.querySelector("#toy-collection")
  const divCard = document.createElement("div")
  const newH2 = document.createElement("h2")
  const newImg = document.createElement("img")
  const newP = document.createElement("p")
  const likesButton= document.createElement("button")

  divCard.classList.add('card') // want to add toyObj to this card
  newImg.classList.add('toy-avatar')
  likesButton.classList.add('like-btn')
  
  //take name/img/likes out of toyObj  
  newH2.textContent = toyObj.name 
  newImg.src = toyObj.image
  newP.textContent = toyObj.likes + " likes"
  likesButton.dataset.buttonType = "upvote"
  likesButton.textContent = "👍"
  likesButton.dataset.id = toyObj.id 
  // debugger
  //take qualities from obj and assign to newH2/etc..toyCollect, using dot notation
  //append all to div
  
  toyCollect.append(divCard)
  divCard.append(newH2)
  divCard.append(newImg)
  divCard.append(newP)
  divCard.append(likesButton)
  // console.log(divCard)
}

function renderAllListings (toysArray) {
  toysArray.forEach((toyObj) =>{
    renderOneListing(toyObj)
  })
}



fetch(toyURL)
  .then((response) => response.json())
  .then ((toysArray) => {
    console.log(toysArray)
    renderAllListings(toysArray)
    // toysArray.forEach(toy => renderOneListing(toy))
  })


  const createToy = document.querySelector(".add-toy-form")
  createToy.addEventListener("submit", function (event) {
    // console.log(event)
    //create new toy object, take in name, url, assign likes as zero
    // debugger
    event.preventDefault() 

    const newToyObj = {
      name: event.target.name.value,
      image: event.target.image.value, 
      likes: 0
    }
    

    fetch(toyURL, {
      //post stuff
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToyObj),
    })

    .then(resp => resp.json())
    .then((newToyData) => {
      renderOneListing(newToyData)

      event.target.reset()
    }) 
  })

//like button
// go to parent toy-collection, use conditional to find like button
//increment


const allToys = document.querySelector("#toy-collection")

allToys.addEventListener("click", function (event) {
  if (event.target.dataset.buttonType ==="upvote") { 
    const toyDiv = event.target.closest("div.card")
    const likesP = toyDiv.querySelector("p")
    const numOfLikes = parseInt(likesP.textContent) + 1
    likesP.textContent = numOfLikes + " likes"
  }
})

});

