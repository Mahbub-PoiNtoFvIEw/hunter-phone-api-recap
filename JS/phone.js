const loadPhones = async (searchText = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  const isDataFound = document.getElementById('data-validity-message');
    if(data.status === false){
        isDataFound.classList.remove('hidden')
    }else{
        isDataFound.classList.add('hidden')
    }
  displayPhone(phones, isShowAll);
  // console.log(phones);
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container');
  const showAllContainer = document.getElementById('show-all-container');
  phoneContainer.innerHTML = '';
  
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
  }else{
    showAllContainer.classList.add('hidden');
  }
  if(!isShowAll){
    phones = phones.slice(0,12);
  }
  phones.forEach((phone) => {
    const phoneContent = document.createElement('div');
    phoneContent.classList = `card bg-gray-200 shadow-xl`;
    phoneContent.innerHTML = `
        <figure class="px-4 pt-4">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
            <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneContent);
        // console.log(phone)
  });
  handleLoadingSpinner(false)
}

const handleSearchPhones = (isShowAll)=>{
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    handleLoadingSpinner(true)
    loadPhones(searchText,isShowAll);
    // console.log('searching Phone',searchText);
}

const handleShowAll = () =>{
    handleSearchPhones(true)
}

const handleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('toggle-loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
    // console.log(data)
}

const showPhoneDetails = (phone) =>{
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <figure class="flex justify-center items-center my-2"><img class='text-center' src="${phone.image}" alt=""></figure>
    <h3 id="show-detail-phone-name" class="text-3xl font-bold my-2">${phone.name}</h3>
    <div class="flex flex-col gap-2 my-2">
        <p><span class="text-lg font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="text-lg font-bold">ChipSet : </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="text-lg font-bold">DisplaySize : </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="text-lg font-bold">Memory : </span>${phone?.mainFeatures?.memory}</p>
        <p><span class="text-lg font-bold">Sensors : </span>${phone?.mainFeatures?.sensors?.join(', ')}</p>
        <p><span class="text-lg font-bold">ReleaseDate : </span>${phone?.releaseDate}</p>
        <p><span class="text-lg font-bold">Slug : </span>${phone?.slug}</p>
        <p><span class="text-lg font-bold">GPS : </span>${phone?.others?.GPS || 'No GPS available'}</p>
    </div>
    `;
    show_details_modal.showModal()
    // console.log(phone)
}

loadPhones();
