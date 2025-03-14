function removeActiveClass(){
  const activeButton=document.getElementsByClassName('active')
  for(let btn of activeButton){
    btn.classList.remove('active')
  }
}
// fetch 1
function loadCatagories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>displayCatagories(data.categories))
}
// fetch 2
function loadVideo(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res=>res.json())
    .then(data=>{
      removeActiveClass()
      document.getElementById('btn-all').classList.add('active')
      displayVideos(data.videos)
    })
} 
// fetch 3        
const loadCatagoriesVideos=(id)=>{
  const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    removeActiveClass()
    // no active class remainnig
    const clickButton=document.getElementById(`btn-${id}`)
    clickButton.classList.add('active')
    displayVideos(data.category)
  })
} 
const loadVideoDetails=(videoId)=>{
 console.log(videoId)
 const url =(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
 fetch(url)
 .then(res=>res.json())
 .then(data=>displayVideoDetails(data.video))
}  
const displayVideoDetails=(video)=>{
 console.log(video)
 document.getElementById('video_details').showModal()
 const detailsContainer=document.getElementById('details-container')
 detailsContainer.innerHTML=`
 <div class="card bg-base-100 image-full  shadow-sm">
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
// Call function 1
function displayCatagories(catagories){
    // console.log(catagories)
   const catagoriesContainer=document.getElementById('catagory-container')
   for(let cat of catagories){
    // console.log(cat)
    const catagoriesdiv=document.createElement('div')
    catagoriesdiv.innerHTML=`
    <button id="btn-${cat.category_id}" onclick="loadCatagoriesVideos(${cat.category_id})" class="btn btn-md font-medium hover:bg-red-600 hover:text-white">${cat.category}</button>`
    catagoriesContainer.append(catagoriesdiv)
   }
}
// Call function 2
// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }
// Call function 2
const displayVideos=(videos)=>{
    const videoContainer=document.getElementById('video-container')
    videoContainer.innerHTML='';
    if(videos.length==0){
      videoContainer.innerHTML=`
      <div class="py-22 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="font-bold text-4xl">Oops!! Sorry, There is no <br> content here</h2>
        </div>
      `;
      return
    }
    videos.forEach(video=>{
        const videoCard=document.createElement('div')
        videoCard.innerHTML=`
            <div class="card bg-base-100 ">
            <figureb class="relative">
              <img class="w-full h-[200px] rounded-lg object-cover" src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute left-46 bottom-30 text-white bg-black px-2 rounded-sm text-sm">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 py-5 px-0">
            <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
            </div>
            <div class="intro">
               <h2 class="text-sm font-semibold">Midnight Serenade</h2>
               <p class="text-sm text-gray-400 flex gap-1 ">${video.authors[0].profile_name} <img class="w-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></p>
               <p class="text-sm text-gray-400">${video.others.views}</p>
            </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block hover:bg-red-500 hover:text-white rounded-md">Show Details</button>
          </div>
        `
        videoContainer.append(videoCard)
    })
}
loadCatagories()

