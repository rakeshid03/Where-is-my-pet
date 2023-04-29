const scrollUp = document.getElementById("scroll-up");

// Show Scroll Up button
window.addEventListener("scroll", () => scrollY >= 200 ? scrollUp.classList.add("show-scroll") : scrollUp.classList.remove("show-scroll"));

// On click back to top
scrollUp.onclick = () => window.scrollTo({ top: 0 });

// ON SCROLL REVEAL SMALL CARDS
ScrollReveal().reveal('.card', {
  duration: 1200,
  opacity: 0,
  distance: "40%",
  origin: "bottom"
});


//=======================================
// Pet Card Open And Close, And Add Data
const PetContainer = document.querySelector(".pet-container");
const closeButton = document.querySelector(".close-pet-card");
const cards = document.querySelectorAll('.card');
const PetImage = document.querySelector(".pet-image");
const PetName = document.querySelector(".pet-name");
const PetOwner = document.querySelector('.pet-owner');

// Card close button
function closeModel() {
  PetContainer.classList.remove('model-open');
}
closeButton.onclick = PetContainer.onclick = closeModel;
// prevent the PetContainer from closing when the pet-card is clicked
const pets = document.querySelectorAll('.pet-card');
pets.forEach(pet => pet.addEventListener('click', e => e.stopPropagation()));
 

// Add small Card randomly and on click in small cards open big pet card
fetch('./assets/data.json')
  .then(response => response.json())
  .then(data => {
    var container = document.querySelector(".card-container");

    // Shuffle The Array Randomly
    data.data.sort(() => Math.random() - 0.5);

    // Add Small Cards 
    data.data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = item.animalcatagory;
      container.appendChild(div);

      // Open Big Card
      div.addEventListener('click', () => {
        PetContainer.classList.add('model-open');
        PetImage.src = item.image;
        PetName.innerText = item.petname;
        PetOwner.innerText = item.ownername;
        PetOwner.href = item.ownerlink;
      });
    });
  })
  .catch(error => console.log(error));
  
// if pet owner link is blank then prevent a click
function validateLink(event) {
  if (!event.target.getAttribute("href")) {
    event.preventDefault();
    return false;
  }
  return true;
}
