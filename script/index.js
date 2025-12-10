function removeActiveClass()
{
  const ActiveButtons = document.getElementsByClassName("active")
  // console.log(ActiveButtons);
  for(let btn of ActiveButtons)
  {
   btn.classList.remove("active");
  }
  
}

function loadCategorys() {
  //1. fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //  2.convert promise to json
    .then((res) => res.json())
      // 3.send data to display
    .then((data) => displayCategories(data.categories));
}
function loadVideos(searchText="") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response) => response.json())
    .then((data) => 
      {
       removeActiveClass();
        document.getElementById("btn-All").classList.add("active");
      displayVideos(data.videos)});
}

const loadCategoryVideos=(id)=>
{
   const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  //  console.log(url)
   fetch(url)
   .then(res=>res.json())
   .then((data)=>
    {
      removeActiveClass()
    const clickButton = document.getElementById(`btn-${id}`)
    clickButton.classList.add("active");
    // console.log(clickButton)
    displayVideos(data.category)})
}
const loadVideoDetails=(videoId)=>
{
   const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
   fetch(url)
   .then(res=>res.json())
   .then(data=>DisplayVideoDetails(data.video))
}

const DisplayVideoDetails=(video)=>
{
 console.log(video)
 document.getElementById("show_modal").showModal();
 const detailsContainer = document.getElementById("details-container");
 detailsContainer.innerHTML=`
  <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
 `
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
           <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
          `;
    // append the element
    categoryContainer.append(categoryDiv);
  }
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
  
  if(videos.length==0)
  {
    videoContainer.innerHTML=`<div class="col-span-full flex justify-center items-center flex-col text-center py-20">
        <img class="w-[150px]" src="assets/Icon.png" alt="" />
        <h2 class="font-bold text-2xl">Oops!! Sorry, There is no content here</h2>
      </div>`;
      return;
  }

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
            <h2 class="text-lg font-semibold">${video.title}</h2>
            <p class="text-sm font-semibold text-gray-500 flex gap-1">
            ${video.authors[0].profile_name} 
            ${video.authors[0].verified== true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt=""></img>`
               :
              
              ``} 
            
            </p>
            <p class="text-sm font-semibold text-gray-500">${video.others.views}</p>
          </div>
        </div>
        <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>

      </div>
      `;
    videoContainer.append(videoCard);
  });
};
 
document.getElementById("search-input").addEventListener("keyup",(EventArValue_nilam)=>
{
  const input=EventArValue_nilam.target.value;
  loadVideos(input)
}
);


loadCategorys();


