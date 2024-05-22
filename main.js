
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}


let product=[]

function fetchdata() {
        fetch("https://render-deploy-1-hu0c.onrender.com/pitches")
        .then((res) => res.json())
        .then((data) => {cardlist(data)
          product=data
        })
        .catch((err) => console.log(err))
      
}

fetchdata();

function cardlist(data) {

    let store = data.map((el)=>singlecard(el.id,el.image,el.title,el.founder,el.category,el.price));
    document.querySelector(".card-list").innerHTML = store.join('');
}

function singlecard(id,image,title,founder,category,price,) {
    
    let card = ` 
   
<div class="card" data-id="${id}">
<div class="card-img">
  <img src=${image} alt="">
</div>  
<div class="card-body">
  <h4 class="card__title">${title}</h4>
  <p class="card-founder">${founder}</p>
  <p class="card-category">${category}</p>
  <p class="card-price">${price}</p>
  <a href="#" data-id="${id}" class="card-link">edit</a>
  <button data-id="${id}" class="card-button">delete</button>
</div>
</div>
`;
    return card;
}

// add


pitchCreateBtn.addEventListener("click", () => {
  let product = {
    title: pitchTitleInput.value,
    image: pitchImageInput.value, 
    category: pitchCategoryInput.value,
    founder: pitchfounderInput.value,
    price: pitchPriceInput.value
  };

  fetch("https://render-deploy-1-hu0c.onrender.com/pitches", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(product)
  })

  .then((res) => res.json()) 
  .then((data) => {
    console.log(data);
    alert("Product Added !");
  })
  .catch((err) => console.log(err));
});

  

// delete

document.addEventListener("click",(el)=>{

if(el.target.classList.contains("card-button"))
  {
    Dproduct(el.target.dataset.id)
  }

})

function Dproduct(id)
{
  fetch(`https://render-deploy-1-hu0c.onrender.com/pitches/${id}`,{
    method:"DELETE",
  }).then((res)=>res,json())
  .then((data)=>console.log(data))
  .catch((err)=>console.log(err))
}

// #####filter###### //

// food###

filterFood.addEventListener("click",()=>{


  let filterdata=product.filter((el)=>el.category=="Food")
  console.log(filterdata)
   cardlist(filterdata)


})

// Electronics###

filterElectronics.addEventListener("click",()=>{


  let filterdata=product.filter((el)=>el.category=="Electronics")
  console.log(filterdata)
   cardlist(filterdata)

})

// Personal care###

filterElectronics.addEventListener("click",()=>{


  let filterdata=product.filter((el)=>el.category=="Personal Care")
  console.log(filterdata)
   cardlist(filterdata)

})


sortAtoZBtn.addEventListener("click",()=>{
  const lowToHigh=product.sort((a,b)=>a.price-b.price)
  cardlist(lowToHigh)
})


sortZtoABtn.addEventListener("click",()=>{
   const hightoLow=product.sort((a,b)=>b.price-a.price)
   cardlist(hightoLow)
})




// update


document.addEventListener("click", (el) => {
 
 if(el.target.classList.contains("card-link")){
  let id=(el.target.dataset.id)
  update(id) 
}
});


function update(id)
{
  fetch(`https://render-deploy-1-hu0c.onrender.com/pitches/${id}`)
  .then((res)=>res.json())
  .then((data)=>{console.log(data)
    updatePitchIdInput.value=data.id
    updatePitchTitleInput.value=data.title
    updatePitchImageInput.value=data.image
    updatePitchfounderInput.value=data.founder
    updatePitchCategoryInput.value=data.category
    updatePitchPriceInput.value=data.price

  })
  .catch((err)=>console.log(err))
  
}

updatePitchBtn.addEventListener("click",()=>{

  let userdata={
    title:updatePitchTitleInput.value,
    image:updatePitchImageInput.value,
    founder:updatePitchfounderInput.value,
    category:updatePitchCategoryInput.value,
    price:updatePitchPriceInput.value,
    id:updatePitchIdInput.value
  }
console.log(userdata)

.

fetch(`https://render-deploy-1-hu0c.onrender.com/pitches/${userdata.id}`,{

method:"PUT"
,headers:{
   "Content-Type":"application/json"
},
   body:JSON.stringify(userdata)
})
.then((res)=>res.json())
.then((data)=>console.log(data))
.catch((err)=>console.log(err))

})












