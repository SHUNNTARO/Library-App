const config = {
    parent: document.getElementById("target"),
    url: "https://api.recursionist.io/builder/computers?type=",
    cpu:{
        brand: "#cpuBrand",
        model: "#cpuModel"
    },
    gpu:{
        brand: "#gpuBrand",
        model: "#gpuModel"
    },
    ram:{
        num: "#ramNum",
        brand: "#ramBrand",
        model: "#ramModel"
    },
    storage:{
        type: "#storageType",
        size: "#storageSize",
        brand: "#storageBrand",
        model: "#storageModel"
    }
}

class PC{
    constructor(){
        this.cpuBrand = null;
        this.cpuModel = null;
        this.cpuBenchmark = null;
        this.gpuBrand = null;
        this.gpuModel = null;
        this.gpuBenchmark = null;
        this.ramBrand = null;
        this.ramModel = null;
        this.ramBenchmark = null;
        this.storageType = null;
        this.storageSize = null;
        this.storageBrand = null;
        this.storageModel = null;
        this.storageBenchmark = null;
    }

    static addBrandData(parts, selectedBrand, pc){ //->String, String, Object
        switch(parts){
            case "cpu":
                pc.cpuBrand = selectedBrand;
                break;
            case "gpu":
                pc.gpuBrand = selectedBrand;
                break;
            case "ram":
                pc.ramBrand = selectedBrand;
                break;
            case "hdd":
                pc.storageBrand = selectedBrand;
                break;
            case "ssd":
                pc.storageBrand = selectedBrand;
                break;
        }
    }

    static addModelData(parts, selectedModel, pc){ //->String, String, Object
        switch(parts){
            case "cpu":
                pc.cpuModel = selectedModel;
                break;
            case "gpu":
                pc.gpuModel = selectedModel;
                break;
            case "ram":
                pc.ramModel = selectedModel;
                break;
            case "hdd":
                pc.storageModel = selectedModel;
                break;
            case "ssd":
                pc.storageModel = selectedModel;
                break;    
        }
    }

    static addBenchmarkData(parts, benchmark, pc){ //->String, Int, Object
        switch(parts){
            case "cpu":
                pc.cpuBenchmark = benchmark;
                break;
            case "gpu":
                pc.gpuBenchmark = benchmark;
                break;
            case "ram":
                pc.ramBenchmark = benchmark;
                break;
            case "hdd":
                pc.storageBenchmark = benchmark;
                break;
            case "ssd":
                pc.storageBenchmark = benchmark;
                break;    
        }
    }

    static addStorageSizeData(size, pc){ //->String, Object
        pc.storageSize = size;
    }

    static getGamingBenchmark(pc){ //->Object
        let cpuScore = parseInt(pc.cpuBenchmark * 0.25);
        let gpuScore = parseInt(pc.gpuBenchmark * 0.6);
        let ramScore = parseInt(pc.ramBenchmark * 0.125);
        let storageScore = this.storageType = "SSD" ? parseInt(pc.storageBenchmark * 0.1) : parseInt(pc.storageBenchmark * 0.025);
        return cpuScore + gpuScore + ramScore + storageScore;
    }

    static getWorkBenchmark(pc){ //->Object
        let cpuScore = parseInt(pc.cpuBenchmark * 0.6);
        let gpuScore = parseInt(pc.gpuBenchmark * 0.25);
        let ramScore = parseInt(pc.ramBenchmark * 0.1);
        let storageScore = parseInt(pc.storageBenchmark * 0.05);
        return cpuScore + gpuScore + ramScore + storageScore;
    }
}

class View{    
    static createInitialPage(pc){ //->Object
        const parent = config.parent
        let container = document.createElement("div");
        container.classList.add("bg-white");
        container.innerHTML = 
        `
            <div class="bg-dark col-12 d-flex justify-content-center align-items-center">
                <h1 class="text-white text-center">Build Your Own Computer</h1>
            </div>
            <div class="m-2 pt-3">
                <h4>step1: Select Your CPU</h4>
            </div>
            <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
                <h5>Brand</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="cpuBrand">
                    <option>-</option>
                </select>
                <h5>Model</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="cpuModel">
                    <option>-</option>
                </select>        
            </div>
            <div class="m-2 pt-3">
                <h4>step2: Select Your GPU</h4>
            </div>
            <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
                <h5>Brand</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="gpuBrand">
                    <option>-</option>
                </select>
                <h5>Model</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="gpuModel">
                    <option>-</option>
                </select>        
            </div>
            <div class="m-2 pt-3">
                <h4>step3: Select Your Memory Card</h4>
            </div>
            <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
                <h5>How many?</h5>
                <select class="mx-3 col-9 col-sm-1 custom-select" id="ramNum">
                    <option>-</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                <h5>Brand</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="ramBrand">
                    <option>-</option>
                </select>
                <h5>Model</h5>
                <select class="mx-3 col-9 col-sm-3 custom-select" id="ramModel">
                    <option>-</option>
                </select>        
            </div>
            <div class="m-2 pt-3">
                <h4>step4: Select Your Storage</h4>
            </div>
            <div class="p-2 d-flex justify-content-start flex-column d-sm-flex flex-sm-row justify-content-sm-start align-items-sm-center">
                <h5>HDD or SSD</h5>
                <select class="mx-3 col-9 col-sm-2 custom-select" id="storageType">
                    <option>-</option>
                    <option>HDD</option>
                    <option>SSD</option>
                </select>
                <h5>Storage</h5>
                <select class="mx-3 col-9 col-sm-2 custom-select" id="storageSize">
                    <option>-</option>
                </select>
                <h5>Brand</h5>
                <select class="mx-3 col-9 col-sm-2 custom-select" id="storageBrand">
                    <option>-</option>
                </select>
                <h5>Model</h5>
                <select class="mx-3 col-9 col-sm-2 custom-select" id="storageModel">
                    <option>-</option>
                </select>        
            </div>
            <div>
                <button type="submit" class="my-3 ml-3 btn btn-primary col-2" id="addPc">Add PC</button>
            </div>
            <div id="displayPC">
            </div>
        
        `
        parent.append(container);

        const addPcBtn = document.querySelectorAll("#addPc")[0];
        addPcBtn.addEventListener("click", function(){
            Controller.clickAddPc(pc);
        });

        return parent;
    }

    static createbuiltPcPage(pc, gamingScore, workScore, count){ //->Object, int, int, int
        const container = document.querySelectorAll("#displayPC")[0];
        let div = document.createElement("div");
        div.classList.add("bg-primary","text-white", "m-2", "col-12");
        div.innerHTML =
        `
        <div class="m-2 pt-3 d-flex justify-content-center">
            <h1>Your PC${count}</h1>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>CPU</h1>
            <h5>Brand: ${pc.cpuBrand}</h5>
            <h5>Model: ${pc.cpuModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>GPU</h1>
            <h5>Brand: ${pc.gpuBrand}</h5>
            <h5>Model: ${pc.gpuModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>RAM</h1>
            <h5>Brand: ${pc.ramBrand}</h5>
            <h5>Model: ${pc.ramModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>Storage</h1>
            <h5>Disk: ${pc.storageType}</h5>
            <h5>Storage: ${pc.storageSize}</h5>
            <h5>Brand: ${pc.storageBrand}</h5>
            <h5>Model: ${pc.storageModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex justify-content-around align-items-center">
            <h1>Gaming: ${gamingScore}%</h1>
            <h1>Work: ${workScore}%</h1>
        </div>
        `
        container.append(div);
        return container;
    }
}


class Controller{
    static count = 0;

    static startBuildComputer(){
        const pc = new PC();
        View.createInitialPage(pc); 
        Controller.getAllData(pc); 
    }

    static getAllData(pc){ //->Object
        const cpuBrandOp = document.querySelectorAll(config.cpu.brand)[0];
        const cpuModelOp = document.querySelectorAll(config.cpu.model)[0];
        const gpuBrandOp = document.querySelectorAll(config.gpu.brand)[0];
        const gpuModelOp = document.querySelectorAll(config.gpu.model)[0];
        const ramBrandOp = document.querySelectorAll(config.ram.brand)[0];
        const ramModelOp = document.querySelectorAll(config.ram.model)[0];
        const storageBrandOp = document.querySelectorAll(config.storage.brand)[0];
        const storageModelOp = document.querySelectorAll(config.storage.model)[0];
        
        //CPU Data: getBrandData -> getModelData
        //GPU Data: getBrandData -> getModelData
        //RAM Data: getRamData(get ram number) -> getBrandData -> getModelData
        //Storage Data: getStorageData(get type and size) -> getBrandData -> getModelData

        Controller.getBrandData("cpu", cpuBrandOp,cpuModelOp, pc);
        Controller.getBrandData("gpu", gpuBrandOp,gpuModelOp, pc);
        Controller.getRamData(ramBrandOp, ramModelOp, pc); 
        Controller.getStorageData(storageBrandOp, storageModelOp, pc); 
    }

    static getBrandData(parts, brandOp, modelOp, pc){ //->String, NodeList, NodeList, Object
        fetch(config.url + parts).then(response=>response.json()).then(function(data){
            brandOp.innerHTML = `<option>-</option>`;
            let brandData = Controller.getBrand(data);
            let modelData = Controller.getModel(data);
            let benchmarkData = Controller.getBenchmark(data);
            for(let brand in brandData){
                let option = document.createElement("option");
                option.value = brandData[brand];
                option.innerText = brandData[brand];
                brandOp.append(option);
            }
            brandOp.addEventListener("change", function(){
                Controller.getModelData(parts, brandOp, modelOp, modelData, benchmarkData, pc);
            });
        })
    }

    static getModelData(parts, brandOp, modelOp, modelData, benchmarkData, pc){ //->String, NodeList, NodeList,Array, Array, Object
        fetch(config.url + parts).then(response=>response.json()).then(function(data){
            modelOp.innerHTML = `<option>-</option>`;
            let selectedBrand = brandOp.value;
            PC.addBrandData(parts, selectedBrand, pc);

            if(parts == "hdd" || parts == "ssd"){
                const storageSizeOp = document.querySelectorAll(config.storage.size)[0];
                let selectedSize = storageSizeOp.value;
                let filteredStorageModel = Controller.filterStorageModel(selectedSize, modelData[selectedBrand]);
                Controller.addOptionList(filteredStorageModel, modelOp);
            }else if(parts == "ram"){
                const ramNumOp = document.querySelectorAll(config.ram.num)[0];
                let selectedNumber = ramNumOp.value;
                let filteredRamModel = Controller.filterRamModel(selectedNumber, modelData[selectedBrand]);
                Controller.addOptionList(filteredRamModel, modelOp);
            } else{
                Controller.addOptionList(modelData[selectedBrand], modelOp)
            }
            
            modelOp.addEventListener("change", function(){
                let selectedModel = modelOp.value;
                let selectedBenchmark = benchmarkData[selectedModel];
                PC.addModelData(parts, selectedModel, pc);
                PC.addBenchmarkData(parts, selectedBenchmark, pc);
            });

        })
    }

    static getRamData(ramBrandOp, ramModelOp, pc){ //->NodeList, NodeList, Object
        const ramNumOp = document.querySelectorAll(config.ram.num)[0];
        ramNumOp.addEventListener("change", function(){
            ramBrandOp.innerHTML = `<option>-</option>`;
            Controller.getBrandData("ram", ramBrandOp, ramModelOp, pc);
        });
    }

    static getStorageData(storageBrandOp, storageModelOp, pc){ //->NodeList, NodeList, Object
        const storageTypeOp = document.querySelectorAll(config.storage.type)[0];
        const storageSizeOp = document.querySelectorAll(config.storage.size)[0];
        storageTypeOp.addEventListener("change", function(){
            storageSizeOp.innerHTML = `<option>-</option>`;
            let selectedStorageType = storageTypeOp.value;
            pc.storageType = selectedStorageType;
            if(selectedStorageType == "HDD"){
                Controller.getStorageSizeData("hdd");
                storageSizeOp.addEventListener("change", function(){
                    storageBrandOp.innerHTML = `<option>-</option>`;
                    let selectedSize = storageSizeOp.value;
                    PC.addStorageSizeData(selectedSize, pc);
                    Controller.getBrandData("hdd", storageBrandOp, storageModelOp, pc);            
                })
            } else{
                Controller.getStorageSizeData("ssd");
                storageSizeOp.addEventListener("change", function(){
                    storageModelOp.innerHTML = `<option>-</option>`;
                    let selectedSize = storageSizeOp.value;
                    PC.addStorageSizeData(selectedSize, pc);
                    Controller.getBrandData("ssd", storageBrandOp, storageModelOp, pc);
                })
            }
        });
    }


    static addOptionList(arr, op){
        arr.forEach(word => {
            let option = document.createElement("option");
            option.value = word;
            option.innerText = word;
            op.append(option);
        });
    }

    static getStorageSizeData(type){ //->String
        fetch(config.url + type).then(response=>response.json()).then(function(data){
            const storageSizeOp = document.querySelectorAll(config.storage.size)[0];
            let storagemodelData = Controller.getStorageModel(data);
            let storageSizeList = Controller.getStorageSizeList(storagemodelData);
            Controller.addOptionList(storageSizeList, storageSizeOp);
        });
    }

    static getStorageSizeList(storageModelData){ //->Object
        let storageModelList = Object.keys(storageModelData); 
        let tbSizeList = [];
        let gbSizeList = [];

        storageModelList.forEach(model =>{
            if(model.includes("TB")) tbSizeList.push(parseFloat(model.replace("TB",'')));
            else gbSizeList.push(parseFloat(model.replace("GB",'')));
        })

        let sortedTb = tbSizeList.sort((a, b) => b - a).map(x => x.toString() + "TB");
        let sortedGb = gbSizeList.sort((a, b) => b - a).map(x => x.toString() + "GB");
        return sortedTb.concat(sortedGb);
    }

    static getBrand(data){ //->Array
        let brandData = {};
        for(let i in data){
            let currentData = data[i];
            if(brandData[currentData.Brand] == undefined) brandData[currentData.Brand] = currentData.Brand;
        }
        return brandData;
    }

    static getModel(data){ //->Array
        let modelData = {};
        for(let i in data){
            let currentData = data[i];
            if(modelData[currentData.Brand] == undefined) modelData[currentData.Brand] = [currentData.Model];
            else modelData[currentData.Brand].push(currentData.Model);
        }
        return modelData;
    }

    static getBenchmark(data){ //->Array
        let benchmarkData = {};
        for(let i in data){
            let currentData = data[i];
            if(benchmarkData[currentData.Model] == undefined) benchmarkData[currentData.Model] = currentData.Benchmark;
        }
        return benchmarkData;
    }

    static getStorageModel(data){ //->Array
        let modelData = {};
        for(let i in data){
            let currentData = Controller.getStorageSizeString(data[i].Model);
            if(modelData[currentData] == undefined) modelData[currentData] = currentData;
        }
        return modelData;
    }

    static getStorageSizeString(storageModel){ //->String
        let storageSize = storageModel.split(' ').filter(word => word.includes("GB") || word.includes("TB")).join('');
        return storageSize;
    }

    static filterStorageModel(size, storageModelData){ //->String, Array
        let storageModelList = Object.values(storageModelData);
        return storageModelList.filter(word => word.includes(' ' + size));
    }

    static filterRamModel(number, ramModelData){ //->String, Array
        let ramModelList = Object.values(ramModelData);
        return ramModelList.filter(word => word.includes(number + 'x'));
    }

    static clickAddPc(pc){ //->Object
        let modelList = [pc.cpuModel, pc.gpuModel, pc.ramModel, pc.storageModel];
        let gamingScore = PC.getGamingBenchmark(pc);
        let workScore = PC.getWorkBenchmark(pc);
        for(let i = 0; i < modelList.length; i++){
            if(modelList[i] == null) return alert("Please fill in all forms.")
        }
        Controller.count++;
        return View.createbuiltPcPage(pc, gamingScore, workScore, Controller.count);
    }
}
Controller.startBuildComputer();