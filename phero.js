// Go to FAQ webPage 

const goToBlog = () => {
    window.location.href = 'FAQ.html'
}

// Show category buttons dynamically 

const categoryBtnContainer = document.getElementById('category-btn-container')
categoryBtnContainer.classList = `flex gap-7 justify-center items-center mt-10`
categoryBtnContainer.innerHTML = `
<div>
<button onclick="getAllCategoryId()" class="btn btn-active hover:bg-[#FF1F3D]">All</button>
</div>
<div> 
<button onclick="getMusicCategoryId()" class="btn btn-active hover:bg-[#FF1F3D]">Music</button></div>
<div> 
<button onclick="getComedyCategoryId()" class="btn btn-active hover:bg-[#FF1F3D]">Comedy</button></div>
<div>
<button onclick="getDrawingCategoryId()" class="btn btn-active hover:bg-[#FF1F3D]">Drawing</button>
</div>

`


// show all category by default 
const showAllByDefault = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const allData = await res.json()
    const data = allData.data
    // console.log(data);
    const all = data[0].category_id
    getAllCategoryData(all)

}
showAllByDefault()



// (1) show all category by all btn
const getAllCategoryId = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const allData = await res.json()
    const data = allData.data
    const all = data[0].category_id
    getAllCategoryData(all)

}

// (2) show music category by all btn
const getMusicCategoryId = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const allData = await res.json()
    const data = allData.data
    const all = data[1].category_id
    getAllCategoryData(all)

}
// (3) show comedy category by all btn
const getComedyCategoryId = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const allData = await res.json()
    const data = allData.data
    const all = data[2].category_id
    getAllCategoryData(all)

}

// (3) show drawing category by all btn
const getDrawingCategoryId = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const allData = await res.json()
    const data = allData.data
    const all = data[3].category_id
    getAllCategoryData(all)
    showDrawingDetails()

}

// show modal when click drawing btn

const showDrawingDetails = () => {
    const showDetails = document.getElementById('drawing-btn-details')
    showDetails.textContent = ''
    const drawingDiv = document.createElement('div')
    drawingDiv.classList = `card w-96 bg-base-100`
    drawingDiv.innerHTML = `
        <figure>
        <img src="images/Icon.png" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title text-center">Oops!! Sorry, There is no content here</h2>
          </div>
        </div>
        
        `
    showDetails.appendChild(drawingDiv)

}

/* main execution function */
// getAllCategoryId()

const getAllCategoryData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const allCategory = await res.json()
    
    const allData = allCategory.data

// display all card

    const showAllCategoryCard = document.getElementById('card-container')

    showAllCategoryCard.textContent = ''
    showAllCategoryCard.classList = `grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10 my-10`

    allData.forEach((data) => {
        console.log(data.authors);
        const cardDiv = document.createElement('div')
        cardDiv.classList = `card bg-base-100 shadow-xl`
        cardDiv.innerHTML = `
        <figure>
        <img class="h-52" src="${data.thumbnail}" alt="Picture" />
        </figure>
        <div class="flex gap-4 mt-5">
            <div>
            <img class="rounded-full w-10 h-10" src="${data.authors[0].profile_picture}" alt="">
            </div>
            
            <div class="">
            <h2 class="card-title">${data.title}</h2>
            <p>${data.authors[0].profile_name} <span id="verified-icon">${data.authors[0].verified}</span></p> 
            <p> <span>${data.others.views}</span> views</p>
            </div>
        </div>
        
        `
        showAllCategoryCard.appendChild(cardDiv)

    })
}