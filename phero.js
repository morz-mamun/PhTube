// Go to FAQ webPage 

const goToBlog = () => {
    window.location.href = 'FAQ.html'
}

// Show category buttons dynamically 

const showCategoryBtn = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const allCategory = await response.json()
    const allData = allCategory.data

    const categoryBtnContainer = document.getElementById('category-btn-container')
    categoryBtnContainer.classList = `flex gap-2 lg:flex-row lg:gap-7 justify-center items-center mt-10`
    allData.forEach((data) => {
        // console.log(data);
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        <button onclick="getCategoryId('${data.category_id}'), handleShortBtn('${data.category_id}')" class="btn hover:bg-[#FF1F3D]">${data.category}</button>
        `
        categoryBtnContainer.appendChild(btnDiv)

    })
}
showCategoryBtn()



// handler function
const getCategoryId = (id) => {
    getAllCategoryData(id)
    
    if(id ==='1005'){
        showDrawingDetails() 
    } else {
        const drawingDetails = document.getElementById('drawing-btn-details')
        drawingDetails.innerHTML = ''
    }
    
}



const handleShortBtn = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const allCategory = await res.json()

    const allData = allCategory.data
    // console.log(allData);
    const newArr = allData.map((data)=> {
        return parseInt(data.others.views)
    })
    const shortArr = newArr.sort((a,b)=> {
        return b - a
    })
    shortArr.forEach((value) => {
       
    })
}


const showDrawingDetails = () => {
    
        const showDetails = document.getElementById('drawing-btn-details')
        showDetails.textContent = ''
        const drawingDiv = document.createElement('div')
        drawingDiv.classList = `card w-96 bg-base-100 `
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
        // time converter

        const timeConverter = (sec) => {
            const hours = Math.floor(sec / 3600)
            const extraSec = sec % 3600
            const minutes = Math.floor(extraSec / 60)
        
            return {hours, minutes}
        }
        const {hours, minutes} = timeConverter(data.others.posted_date)
       
        
        // console.log(data.others);
       
        const cardDiv = document.createElement('div')
        cardDiv.classList = `card bg-base-100 shadow-xl relative`
        cardDiv.innerHTML = `
        <figure>
        <div>
        <img class="h-52 w-screen" src="${data.thumbnail}" alt="Picture" />
        <div class="absolute bottom-28 right-2 bg-black text-white px-2" > ${data.others.posted_date ? `${hours} hrs ${minutes} min ago`  : "" }  
        </div>
        </div>
        
       
        </figure>
        <div class="flex gap-4 mt-5">
            <div>
            <img class="rounded-full w-10 h-10" src="${data.authors[0].profile_picture}" alt="">
            </div>
            
            <div class="">
            <h2 class="card-title">${data.title}</h2>
            <p class="flex gap-2" >${data.authors[0].profile_name} <span">${data.authors[0].verified ? " <img src='images/fi_10629607.png' alt=''>" : ""}</span></p> 
            <p> <span>${data.others.views}</span> views</p>
            </div>
        </div>
        
        `
        showAllCategoryCard.appendChild(cardDiv)

    })
}

// show all category by default 
const showAllCategoryCardByDefault = (id) => {
    getAllCategoryData(id)
}
showAllCategoryCardByDefault(1000)

// short handler 



// const getDataID = async() => {
//     const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
//     const allCategory = await response.json()
//     const allData = allCategory.data
//     allData.forEach((data)=> {
//         const id = data.category_id
//         dataById(id)
//     })
    
// }

// const dataById = async(id)=>{
//     const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
//     const allData = await response.json()
//     const datas = allData.data
//     const views = datas.forEach(data=> data.others.views)
    
// }

handleShortBtn()