function loadCategorys() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

// "category_id": "1001",
// "category": "Music"

function displayCategories(c) {
  //  get the Container
  const categoryContainer = document.getElementById("category-container");
  // loop operation on Array of object
  // create element
  for (let cat of c) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
           <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
          `;
    // append the element
    categoryContainer.append(categoryDiv);
  }
}

loadCategorys();
