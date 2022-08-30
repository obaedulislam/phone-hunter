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
        <div class="card h-100 shadow rounded-3 border-0">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    //Stop Spinner
    toggleSpiner(false);
} 

const searchProcess = (dataLimit, ) =>{
    toggleSpiner(true);
    const searchField = document.getElementById('search-phone');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
    searchProcess(10);
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
//loadPhones();

