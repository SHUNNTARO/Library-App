// 設定オブジェクト
const config = {
    url: "https://api.recursionist.io/builder/computers?type=",
    parentId: "resultsArea",
    cpuBrandBtnId: "cpuBrand",
    cpuModelBtnId: "cpuModel",
    gpuBrandBtnId: "gpuBrand",
    gpuModelBtnId: "gpuModel",
    memoryCountId: "memoryCount",
    memoryBrandId: "memoryBrand",
    memoryModelId: "memoryModel",
    storageTypeId: "storageType",
    storageSizeId: "storageSize",
    storageBrandId: "storageBrand",
    storageModelId: "storageModel",
    addPcBtnId: "addPcBtn"
};

// コンポーネントデータ
let componentsData = {};
// ベンチマークデータ
let benchmarks = {};

// ドキュメント読み込み完了時に実行
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM読み込み完了");
    
    // 初期設定
    setupInitialDropdowns();
    setupEventListeners();
});

// 初期ドロップダウン設定
function setupInitialDropdowns() {
    // CPU取得ボタン設定
    setupFetchButton("cpu-fetch", "cpuタイプデータを取得", "cpu", config.cpuBrandBtnId, config.cpuModelBtnId);
    
    // GPU取得ボタン設定
    setupFetchButton("gpu-fetch", "gpuタイプデータを取得", "gpu", config.gpuBrandBtnId, config.gpuModelBtnId);
    
    // RAM取得ボタン設定
    setupFetchButton("ram-fetch", "ramタイプデータを取得", "ram", config.memoryBrandId, config.memoryModelId);
    
    // ストレージタイプドロップダウン設定
    const storageTypeSelect = document.getElementById(config.storageTypeId);
    if (storageTypeSelect) {
        storageTypeSelect.innerHTML = '<option selected disabled>タイプを選択</option>';
        
        // HDDとSSDオプションを追加
        const storageTypes = ["HDD", "SSD"];
        for (const type of storageTypes) {
            const option = document.createElement("option");
            option.value = type.toLowerCase();
            option.textContent = type;
            storageTypeSelect.appendChild(option);
        }
    }
}

// 取得ボタンを設定する関数
function setupFetchButton(buttonId, buttonText, dataType, brandSelectId, modelSelectId) {
    // 取得ボタンを作成
    const fetchButton = document.createElement("button");
    fetchButton.id = buttonId;
    fetchButton.textContent = buttonText;
    fetchButton.className = "btn btn-primary btn-sm mb-2";
    
    // ドロップダウンの前に挿入
    const brandSelect = document.getElementById(brandSelectId);
    if (brandSelect && brandSelect.parentNode) {
        brandSelect.parentNode.insertBefore(fetchButton, brandSelect);
    }
    
    // ボタンのイベントリスナー
    fetchButton.addEventListener("click", function() {
        fetchComponentData(dataType, brandSelectId, modelSelectId);
    });
}

// イベントリスナーを設定
function setupEventListeners() {
    // ストレージタイプ変更時の処理
    const storageTypeSelect = document.getElementById(config.storageTypeId);
    if (storageTypeSelect) {
        storageTypeSelect.addEventListener("change", function() {
            const selectedType = this.value; // hdd または ssd
            fetchComponentData(selectedType, config.storageBrandId, config.storageModelId);
        });
    }
    
    // Add PCボタンのイベントリスナー
    const addPcBtn = document.getElementById(config.addPcBtnId);
    if (addPcBtn) {
        addPcBtn.addEventListener("click", function() {
            addPcToResults();
        });
    }
}

// コンポーネントデータを取得
function fetchComponentData(type, brandSelectId, modelSelectId) {
    console.log(`${type}データを取得中...`);
    
    // 取得ボタンを無効化（二重クリック防止）
    const fetchButton = document.getElementById(`${type}-fetch`);
    if (fetchButton) {
        fetchButton.disabled = true;
        fetchButton.textContent = "読み込み中...";
    }
    
    // APIからデータを取得
    fetch(config.url + type)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`${type}データ取得成功: ${data.length}件`);
            
            // データをグローバル変数に保存
            componentsData[type] = data;
            
            // ベンチマークデータを保存
            for (const item of data) {
                const key = `${type}-${item.Brand}-${item.Model}`;
                benchmarks[key] = item.Benchmark;
            }
            
            // ブランドドロップダウンを更新
            updateBrandDropdown(type, brandSelectId, modelSelectId);
            
            // 取得ボタンを再有効化
            if (fetchButton) {
                fetchButton.disabled = false;
                fetchButton.textContent = `${type}データ更新`;
            }
        })
        .catch(error => {
            console.error(`データ取得エラー:`, error);
            
            // 取得ボタンをエラー状態に
            if (fetchButton) {
                fetchButton.disabled = false;
                fetchButton.textContent = `${type}取得失敗 - 再試行`;
                fetchButton.className = "btn btn-danger btn-sm mb-2";
            }
        });
}

// ブランドドロップダウンを更新
function updateBrandDropdown(type, brandSelectId, modelSelectId) {
    const data = componentsData[type];
    const brandSelect = document.getElementById(brandSelectId);
    
    if (!brandSelect) {
        console.error(`ブランドドロップダウンが見つかりません: ${brandSelectId}`);
        return;
    }
    
    // ドロップダウンをクリア
    brandSelect.innerHTML = "";
    
    // デフォルトオプション
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "ブランドを選択";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    brandSelect.appendChild(defaultOption);
    
    // ブランド名を取得（重複排除）
    const brands = [];
    for (const item of data) {
        if (item.Brand && !brands.includes(item.Brand)) {
            brands.push(item.Brand);
        }
    }
    
    // ブランドオプションを追加
    for (const brand of brands) {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
    }
    
    // ブランド選択イベントを設定
    brandSelect.addEventListener("change", function() {
        updateModelDropdown(type, this.value, modelSelectId);
    });
}

// モデルドロップダウンを更新
function updateModelDropdown(type, brand, modelSelectId) {
    const data = componentsData[type];
    const modelSelect = document.getElementById(modelSelectId);
    
    if (!modelSelect) {
        console.error(`モデルドロップダウンが見つかりません: ${modelSelectId}`);
        return;
    }
    
    // ドロップダウンをクリア
    modelSelect.innerHTML = "";
    
    // デフォルトオプション
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "モデルを選択";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    modelSelect.appendChild(defaultOption);
    
    // 選択されたブランドのモデルをフィルタリング
    const models = [];
    for (const item of data) {
        if (item.Brand === brand) {
            models.push(item);
        }
    }
    
    // モデルオプションを追加
    for (const item of models) {
        const option = document.createElement("option");
        option.value = item.Model;
        option.textContent = item.Model;
        option.dataset.benchmark = item.Benchmark;
        modelSelect.appendChild(option);
    }
}

// PCを結果に追加
function addPcToResults() {
    // 選択されたコンポーネントを収集
    const selectedComponents = {
        cpu: {
            brand: getSelectedValue(config.cpuBrandBtnId),
            model: getSelectedValue(config.cpuModelBtnId),
            benchmark: getSelectedBenchmark("cpu")
        },
        gpu: {
            brand: getSelectedValue(config.gpuBrandBtnId),
            model: getSelectedValue(config.gpuModelBtnId),
            benchmark: getSelectedBenchmark("gpu")
        },
        memory: {
            count: getSelectedValue(config.memoryCountId) || "1",
            brand: getSelectedValue(config.memoryBrandId),
            model: getSelectedValue(config.memoryModelId),
            benchmark: getSelectedBenchmark("ram"),
            specs: extractMemorySpecs(getSelectedValue(config.memoryModelId))
        },
        storage: {
            type: getSelectedValue(config.storageTypeId),
            size: getSelectedValue(config.storageSizeId),
            brand: getSelectedValue(config.storageBrandId),
            model: getSelectedValue(config.storageModelId),
            benchmark: getSelectedBenchmark(getSelectedValue(config.storageTypeId))
        }
    };
    
    // 必須コンポーネントが選択されているか確認
    if (!validateSelectedComponents(selectedComponents)) {
        alert("少なくともCPU、GPU、メモリ、ストレージを選択してください。");
        return;
    }
    
    // パフォーマンススコアを計算
    const scores = calculatePerformanceScores(selectedComponents);
    
    // 結果エリアに表示
    const resultsArea = document.getElementById(config.parentId);
    resultsArea.appendChild(generatePcCard(selectedComponents, scores));
}

// PCカードを生成
function generatePcCard(components, scores) {
    // 新しいカード要素を作成
    const card = document.createElement("div");
    card.className = "pc-specs-card mb-3";
    
    // 既存のPC数を取得
    const existingCards = document.querySelectorAll('.pc-specs-card');
    const pcNumber = existingCards.length + 1;
    
    // メモリ情報を整形
    const memorySpecs = components.memory.specs || { slots: 1, size: 8 };
    const memoryCount = parseInt(components.memory.count) || 1;
    const totalMemory = memorySpecs.slots * memorySpecs.size * memoryCount;
    const memoryInfo = `${components.memory.brand} ${components.memory.model} (${totalMemory}GB) × ${memoryCount}`;
    
    // ストレージ情報を整形
    const storageInfo = `${components.storage.type} ${components.storage.size} ${components.storage.brand} ${components.storage.model}`;
    
    // カードのHTMLを設定
    card.innerHTML = `
        <h3>PC${pcNumber} 仕様</h3>
        <div class="specs-details">
            <p><strong>CPU:</strong> ${components.cpu.brand} ${components.cpu.model}</p>
            <p><strong>GPU:</strong> ${components.gpu.brand} ${components.gpu.model}</p>
            <p><strong>メモリ:</strong> ${memoryInfo}</p>
            <p><strong>ストレージ:</strong> ${storageInfo}</p>
        </div>
        <div class="performance-metrics">
            <div class="metric">ゲーミング: ${scores.gaming}%</div>
            <div class="metric">ワーク: ${scores.work}%</div>
        </div>
    `;
    
    return card;
}

// 選択された値を取得
function getSelectedValue(elementId) {
    const element = document.getElementById(elementId);
    return element && element.value !== "" && !element.disabled ? element.value : null;
}

// 選択されたコンポーネントのベンチマークを取得
function getSelectedBenchmark(type) {
    let brand, model;
    
    switch(type) {
        case "cpu":
            brand = getSelectedValue(config.cpuBrandBtnId);
            model = getSelectedValue(config.cpuModelBtnId);
            break;
        case "gpu":
            brand = getSelectedValue(config.gpuBrandBtnId);
            model = getSelectedValue(config.gpuModelBtnId);
            break;
        case "ram":
            brand = getSelectedValue(config.memoryBrandId);
            model = getSelectedValue(config.memoryModelId);
            break;
        case "hdd":
        case "ssd":
            brand = getSelectedValue(config.storageBrandId);
            model = getSelectedValue(config.storageModelId);
            break;
        default:
            return null;
    }
    
    if (!brand || !model) return null;
    
    // ベンチマークデータを取得
    const key = `${type}-${brand}-${model}`;
    return benchmarks[key] || null;
}

// メモリの仕様を抽出
function extractMemorySpecs(model) {
    if (!model) return { slots: 1, size: 8 }; // デフォルト値
    
    // 例: "Ripjaws 4 DDR4 2400 C14 8x16GB"
    // slotCountとsizePerSlotを抽出
    const specsRegex = /(\d+)x(\d+)GB/i;
    const match = model.match(specsRegex);
    
    if (match) {
        return {
            slots: parseInt(match[1]) || 1,
            size: parseInt(match[2]) || 8
        };
    }
    
    // パターンが見つからない場合はデフォルト値を返す
    return { slots: 1, size: 8 };
}

// ストレージサイズを抽出
function extractStorageSize(model) {
    if (!model) return null;
    
    // "500GB"や"1TB"などのパターンを探す
    const sizeRegex = /(\d+\s*[GT]B)/i;
    const match = model ? model.match(sizeRegex) : null;
    
    return match ? match[0] : null;
}

// 選択されたコンポーネントを検証
function validateSelectedComponents(components) {
    return components.cpu.brand && components.cpu.model &&
           components.gpu.brand && components.gpu.model &&
           components.memory.brand && components.memory.model &&
           components.storage.type && components.storage.brand && components.storage.model;
}

// パフォーマンススコアを計算
function calculatePerformanceScores(components) {
    // ベンチマーク値の取得（デフォルト値を設定）
    const cpuBenchmark = components.cpu.benchmark || 75;
    const gpuBenchmark = components.gpu.benchmark || 75;
    const ramBenchmark = components.memory.benchmark || 75;
    const storageBenchmark = components.storage.benchmark || 50;
    
    // メモリスロット数と容量を取得
    const memorySpecs = components.memory.specs || { slots: 1, size: 8 };
    const memoryCount = parseInt(components.memory.count) || 1;
    
    // 合計メモリ容量を計算（GB）
    const totalMemory = memorySpecs.slots * memorySpecs.size * memoryCount;
    
    // メモリボーナス（16GB以上で追加ボーナス）
    const memoryBonus = totalMemory >= 16 ? 5 : 0;
    
    // 調整されたRAMスコア
    const adjustedRamScore = ramBenchmark + memoryBonus;
    
    // ストレージボーナス（SSDの場合）
    const storageBonus = components.storage.type && components.storage.type.toLowerCase() === "ssd" ? 10 : 0;
    
    // 調整されたストレージスコア
    const adjustedStorageScore = storageBenchmark + storageBonus;
    
    // ゲーミングスコアの計算（GPU 60%, CPU 25%, RAM 12.5%, ストレージ 2.5%）
    const gamingScore = Math.floor(
        (gpuBenchmark * 0.6) +
        (cpuBenchmark * 0.25) +
        (adjustedRamScore * 0.125) +
        (adjustedStorageScore * 0.025)
    );
    
    // ワークスコアの計算（CPU 60%, GPU 25%, RAM 10%, ストレージ 5%）
    const workScore = Math.floor(
        (cpuBenchmark * 0.6) +
        (gpuBenchmark * 0.25) +
        (adjustedRamScore * 0.1) +
        (adjustedStorageScore * 0.05)
    );
    
    return {
        gaming: gamingScore,
        work: workScore
    };
}