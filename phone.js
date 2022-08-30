const loadPhones =(searchText, dataLimit) => {
//   console.log(searchText)
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
 .then(res => res.json())
 .then(data =>displayPhones(data.data, dataLimit) )
 
  
}


const displayPhones = (phones, dataLimit) =>{
  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.textContent = '';
//   console.log(phones)

// phones = phones.slice(0, 10)
const showAll = document.getElementById('show-all')
 if( dataLimit && phones.length > 10){
    phones = phones.slice(0,10)
   
    showAll.classList.remove('hidden')
 }
  else{
    showAll.classList.add('hidden')
  }
  
//display no phones found
const noPhone = document.getElementById('no-found-message')

if(phones.length === 0){
    console.log(phones.length)
    noPhone.classList.remove('hidden')
}

else{
    noPhone.classList.add('hidden')
}
  phones.forEach(phone =>{
    const phoneDiv = document.createElement('div')
    phoneDiv.innerHTML = `
    <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
    
        <div class="mx-32 mt-4">
        <img class="" src="${phone.image}" alt="">
        </div>

    
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${phone.phone_name}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 ">The iPhone is a line of smartphones designed and marketed by Apple Inc. These devices use Apple's iOS mobile operating system</p>
            <label onclick="loadPhoneDetails('${phone.slug}')" for="my-modal" class="btn modal-button text-white lg:right-2.5 lg:left-3/4 lg:bottom-2.5 bottom-1.5  bg-blue-700 hover:bg-blue-800 font-medium rounded-lg 
            text-sm lg:px-4 lg:py-2 px-3 py-1">Show Details</label>
            
    </div>
   </div>
    `
   phoneContainer.appendChild(phoneDiv)
  })

  //stop spinner or loader
  toggleSpinner(false)
}


//handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
     processSearch(10);
})

//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
    console.log(e.key)
          if(e.key === 'Enter'){
            processSearch(10);  
          }
})
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('hidden')
    }
    else{
        loaderSection.classList.add('hidden')
    }
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field')
   //  console.log(searchField);
    const searchText = searchField.value;
   //  console.log(searchText)
    loadPhones(searchText, dataLimit);
}


//not the best way to load show all
document.getElementById('btn-showAll').addEventListener('click', function(){
   processSearch();
})


const loadPhoneDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data =>displayPhoneDetails (data.data))
}

const displayPhoneDetails = phone =>{
    // console.log(phone)
    const modalTitle = document.getElementById('phoneTitle')
    // console.log(modalTitle);
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-Details');
    phoneDetails.innerHTML = `
    <p>Brand: ${phone.brand}</p>
    <p>ChipSet: ${phone.mainFeatures.chipSet}</p>
    <p>DisplaySize: ${phone.mainFeatures.displaySize}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Sensors: ${phone.mainFeatures.sensors}</p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date'}</p>
    
    `
}
//  loadPhones('phone');