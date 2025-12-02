function loadCategorys() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

// "category_id": "1001",
// "category": "Music"
function displayCategories(Categories) {
  //  get the Container
  const categoryContainer = document.getElementById("category-container");
  // loop operation on Array of object
 
  for (let cat of Categories) {
    const categoryDiv = document.createElement("div");
     // create element
    categoryDiv.innerHTML = `
           <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
          `;
    // append the element
    categoryContainer.append(categoryDiv);
  }
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

const loadCategoryVideos=(id)=>
{
   const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  //  console.log(url)
   fetch(url)
   .then(res=>res.json())
   .then(data=>displayVideos(data.category))
}

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML="";

  videos.forEach((video) => {
    // console.log(video)
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
         <div class="card bg-base-100 shadow-sm">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" />
          <span
            class="absolute bottom-2 right-2 bg-black text-white text-sm px-2 rounded-lg"
            >3hrs 56 min ago</span
          >
        </figure>

        <div class="disclaimer px-0 flex gap-3 py-5">
          <div class="profile">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2"
              >
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="text-lg font-semibold">Building a Winning UX Strategy Using the Kano Model</h2>
            <p class="text-sm font-semibold text-gray-500 flex gap-1">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt=""></p>
            <p class="text-sm font-semibold text-gray-500">${video.others.views}</p>
          </div>
        </div>
      </div>
      `;
    videoContainer.append(videoCard);
  });
};



loadCategorys();

