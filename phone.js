const loadPhones = async(searchText, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    //No Phone Found
    const noMatchingPhone = document.getElementById('no-phone-found');
    if(phones.length === 0){
        noMatchingPhone.classList.remove('d-none');
    }
    else{
        noMatchingPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 shadow rounded-4  p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-text">Brand: ${phone.brand}</h6>

                <!-- Button trigger modal -->
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    //Stop Spinner
    toggleSpiner(false);
} 

const searchProcess = (dataLimit) =>{
    toggleSpiner(true);
    const searchField = document.getElementById('search-phone');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
    searchProcess(10);
});

//search input field using enter key

document.getElementById('search-phone').addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        searchProcess(10);
        
    }
});



const toggleSpiner = isLoading => {
    const spinnerSection  = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
} 


//Show All phone by click show all button
document.getElementById('btn-show-all').addEventListener('click', function(){
    searchProcess();
})



const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    desplayPhoneDetails(data.data);
}

const desplayPhoneDetails = phone =>{
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerHTML = `${phone.name}`;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
            <div class="row w-100">
            <div class="col-md-5 col-sm12">
                <div class="phone-img">
                    <img src="${phone['image']}" alt="" srcset="" class="img-fluid">
                </div>
            </div>
            <div class="col-md-7 col-sm-12">
                <div class="phone-desc">
                    <h4 class="mb-4"><b>Brand:</b> ${phone['brand']}</h4>
                    <p><b>Realease Date:</b> ${phone.releaseDate}</p>
                    <p><b>Storage:</b> ${phone.mainFeatures.storage}</p>
                    <p><b>Display Size:</b> ${phone.mainFeatures.displaySize}</p>
                    <p><b>Chipset:</b> ${phone.mainFeatures.chipSet}</p>
                    <p><b>Sensor:</b> ${phone.mainFeatures.sensors[0]}, ${phone.mainFeatures.sensors[1]}, ${phone.mainFeatures.sensors[2]}, ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[4]}</p>
                    <p><b>USB:</b> ${phone.others.USB}</p>
                </div>
            </div>
        </div>
    `;
}

loadPhones('apple');