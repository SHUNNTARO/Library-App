const congfig={
    url: "https://api.recursionist.io/builder/computers?type=",
    parentId: "resultsArea",
    cpuBrandBtnId:"cpuBrand",
    cpuModelBtnId:"cpuModel",
    gpuBrandBtnId: "gpuBrand",
    gpuModelBtnId: "gpuModel",
    memoryBrandId:"memoryBrand",
    memoryModelId:"memoryModel",
    storageTypeId:"storageType",
    storageSizeId:"storageSize",
    storageBrandId:"storageBrand",
    storageModelId:"storageModel"
}

async function fetchData(type){
    const apiUrl =  congfig.url+type;
    try{
        const response = await fetch(apiUrl);
        return await response.json();
    }catch(error){
        console.log('Error ${e}: ',error);
    }
}

async function fetchDataEndPopulation(type,brandId,modelId,storageId=null,hardwareId=null){
    const data = await fetchData(type);

    let brandSelect = document.getElementById(brandId);
    let modelSelect = document.getElementById(modelId);
    let storageSelect = storageId ? document.getElementById(storageId):null;
    let hardwareSelect = hardwareId ? document.getElementById(hardwareId):null;

    initiallizeDropdown(brandSelect,"Select Brand");
    initiallizeDropdown(modelSelect,"Select model");
    if(storageSelect) initiallizeDropdown(storageSelect,"Select Storage");
    if(hardwareSelect) initiallizeDropdown(hardwareSelect,"Select HDD or SSD");

    populateBrandDropdown(brandSelect, data);
}


function initiallizeDropdown(select, defaultText){
    select.innerHTML =  <option selected disabled>${defaultText}</option>
}

function populateBrandDropdown(brandSelect, data){
    let brands = [...new Set(data.map(item=>item.Brand))];
    brands.forEach(brand => {
        let option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    });
}

// ブランドを選択したらモデルを絞り込む関数
function handleBrandSelection(brandSelect, modelSelect, data){
    brandSelect.addEventListener("change", () => {
        let selectedBrand = brandSelect.value;
        let models = data.filter(item => item.brand == selectedBrand);
        initiallizeDropdown(modelSelect, "Select Model");
        models.forEach(item =>{
            let option = document.createElement("option");
            option.value = item.Model;
            option.textContent = item.Model;
            modelSelect.appendChild(option);
        });

    });
}


