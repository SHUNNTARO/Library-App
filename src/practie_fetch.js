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
}


function initiallizeDropdown(select, defaultText){
    select.innerHTML =  <option selected disabled>${defaultText}</option>
}

function logHardwareComponentsCall(hardware, configId){
    fetch(congfig.url+hardware).then(response=>response.json()).then(data =>{
        let parent = document.getElementById(configId);
        let jsonData = JSON.stringify(data);
        let cpuBrandStringHtml = `
        <option>${data.model}</option>
        `
    })
}

