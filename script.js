function calculateOG() {
    let honey = Number(document.getElementById("honey").value);
    let gallons = Number(document.getElementById("gallons").value);

    let gravityPoints = (honey * 35) / gallons;
    let og = 1 + (gravityPoints / 1000);

    document.getElementById("result").innerText =
        "Estimated Original Gravity: " + og.toFixed(3);
}

function calculateABV() {
    let og = Number(document.getElementById("og").value);
    let fg = Number(document.getElementById("fg").value);

    let abv = (og - fg) * 131.25;

    document.getElementById("abvResult").innerText =
        "Estimated ABV: " + abv.toFixed(2) + "%";
}

function calculateHoneyNeeded() {
    let targetOg = Number(document.getElementById("targetOg").value);
    let gallons = Number(document.getElementById("targetGallons").value);

    if (!targetOg || !gallons) {
        document.getElementById("honeyNeededResult").innerText =
            "Please enter a target gravity and batch size.";
        return;
    }

    let gravityPoints = (targetOg - 1) * 1000;
    let honeyNeeded = (gravityPoints * gallons) / 35;

    document.getElementById("honeyNeededResult").innerText =
        "Estimated Honey Needed: " + honeyNeeded.toFixed(2) + " lb";
}

function calculateWaterNeeded() {
    let honey = Number(document.getElementById("waterHoney").value);
    let targetOg = Number(document.getElementById("waterTargetOg").value);

    if (!honey || !targetOg) {
        document.getElementById("waterNeededResult").innerText =
            "Please enter honey amount and target gravity.";
        return;
    }

    let gravityPoints = (targetOg - 1) * 1000;
    let gallons = (honey * 35) / gravityPoints;

    document.getElementById("waterNeededResult").innerText =
        "Estimated Total Batch Volume: " + gallons.toFixed(2) + " gallons";
}

function showSection(sectionId) {
    let sections = document.querySelectorAll(".page-section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");
}

function calculateBatchABV() {
    let startingSg = Number(document.getElementById("startingSg").value);
    let finalSg = Number(document.getElementById("finalSg").value);

    if (!startingSg || !finalSg) {
        document.getElementById("batchAbvResult").innerText =
            "Please enter starting SG and final SG.";
        return;
    }

    let abv = (startingSg - finalSg) * 131.25;

    document.getElementById("batchAbvResult").innerText =
        "Estimated Batch ABV: " + abv.toFixed(2) + "%";
}

function removeRow(button) {
    button.parentElement.remove();
}

function addIngredientField() {
    let ingredientsList = document.getElementById("ingredientsList");

    let row = document.createElement("div");
    row.className = "ingredient-row";

    row.innerHTML = `
        <input type="number" placeholder="Amount">
        <select>
            <option>lb</option>
            <option>oz</option>
            <option>g</option>
            <option>kg</option>
            <option>gal</option>
            <option>tsp</option>
            <option>tbsp</option>
            <option>packet</option>
        </select>
        <input type="text" placeholder="Ingredient">
        <button 
          type="button" 
          class="trash-btn"
          title="Delete Ingredient"
          aria-label="Delete Ingredient"
          onclick="removeRow(this)">
          🗑️
        </button>`;

    ingredientsList.appendChild(row);
}

function addProcessStep() {
    let processStepsList = document.getElementById("processStepsList");

    let row = document.createElement("div");
    row.className = "process-row";

    row.innerHTML = `
        <input type="date">
        <input type="text" placeholder="Next process step">
        <button 
          type="button" 
          class="trash-btn"
          title="Delete Process Step"
          aria-label="Delete Process Step"
          onclick="removeRow(this)">
          🗑️
        </button>
    `;

    processStepsList.appendChild(row);
}

let ratings = {
    aroma: 0,
    flavor: 0,
    clarity: 0,
    sweetness: 0,
    mouthfeel: 0
};

function setRating(category, rating) {
    ratings[category] = rating;

    let starContainer = document.querySelector(`[data-category="${category}"]`);
    let stars = starContainer.querySelectorAll("button");

    stars.forEach(function(star, index) {
        if (index < rating) {
            star.innerText = "★";
        } else {
            star.innerText = "☆";
        }
    });
}

function createNewBatch() {
    document.getElementById("batchForm").classList.remove("hidden");

    document.getElementById("currentBatchId").value = "";
    document.getElementById("batchName").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("batchStatus").value = "Planning";
    document.getElementById("startingSg").value = "";
    document.getElementById("finalSg").value = "";
    document.getElementById("batchAbvResult").innerText = "";
    document.getElementById("tastingNotes").value = "";
    document.getElementById("additionalNotes").value = "";

    loadIngredients([]);
    loadProcessSteps([]);
    loadRatings(null);

    alert("New batch form ready.");
}

function openBatch(batchName) {
    document.getElementById("batchName").value = batchName;

    if (batchName === "Pear Mead V1") {
        document.getElementById("startDate").value = "2026-06-28";
        document.getElementById("batchStatus").value = "Primary Stage";
        document.getElementById("startingSg").value = "1.100";
    }

    if (batchName === "Blackberry Mead") {
        document.getElementById("startDate").value = "2026-06-11";
        document.getElementById("batchStatus").value = "Secondary Stage";
        document.getElementById("startingSg").value = "1.074";
        document.getElementById("finalSg").value = "0.994";
    }

    if (batchName === "Traditional #1") {
        document.getElementById("startDate").value = "2026-06-01";
        document.getElementById("batchStatus").value = "Completed";
        document.getElementById("startingSg").value = "1.090";
        document.getElementById("finalSg").value = "1.000";
    }

    calculateBatchABV();
}

function saveBatch() {
    let currentBatchId = document.getElementById("currentBatchId").value;

    let batch = {
        id: currentBatchId || Date.now().toString(),
        name: document.getElementById("batchName").value,
        startDate: document.getElementById("startDate").value,
        status: document.getElementById("batchStatus").value,
        ingredients: getIngredients(),
        startingSg: document.getElementById("startingSg").value,
        finalSg: document.getElementById("finalSg").value,
        batchAbv: document.getElementById("batchAbvResult").innerText,
        processSteps: getProcessSteps(),
        tastingNotes: document.getElementById("tastingNotes").value,
        additionalNotes: document.getElementById("additionalNotes").value,
        ratings: { ...ratings }
    };

    let savedBatches = JSON.parse(localStorage.getItem("savedBatches")) || [];

    let existingIndex = savedBatches.findIndex(function(item) {
        return item.id === batch.id;
    });

    if (existingIndex >= 0) {
        savedBatches[existingIndex] = batch;
    } else {
        savedBatches.push(batch);
    }

    localStorage.setItem("savedBatches", JSON.stringify(savedBatches));

    document.getElementById("currentBatchId").value = batch.id;

    renderBatchDashboard();

    alert("Batch saved successfully.");
}

function renderBatchDashboard() {
    let savedBatches = JSON.parse(localStorage.getItem("savedBatches")) || [];
    let batchList = document.getElementById("batchList");

    batchList.innerHTML = "";

    savedBatches.forEach(function(batch) {
        let row = document.createElement("div");
        row.className = "batch-row";

        row.onclick = function() {
            loadBatch(batch.id);
        };

        row.innerHTML = `
            <span>${batch.name || "Unnamed Batch"}</span>
            <span class="status primary">${batch.status || "Planning"}</span>
            <span>Start Date: ${batch.startDate || "Not set"}</span>
        `;

        batchList.appendChild(row);
    });
}

function loadBatch(batchId) {
    let savedBatches = JSON.parse(localStorage.getItem("savedBatches")) || [];

    let batch = savedBatches.find(function(item) {
        return item.id === batchId;
    });

    if (!batch) {
        alert("Batch not found.");
        return;
    }

    document.getElementById("batchForm").classList.remove("hidden");

    document.getElementById("currentBatchId").value = batch.id;
    document.getElementById("batchName").value = batch.name;
    document.getElementById("startDate").value = batch.startDate;
    document.getElementById("batchStatus").value = batch.status;
    document.getElementById("startingSg").value = batch.startingSg;
    document.getElementById("finalSg").value = batch.finalSg;
    document.getElementById("batchAbvResult").innerText = batch.batchAbv;
    document.getElementById("tastingNotes").value = batch.tastingNotes;
    document.getElementById("additionalNotes").value = batch.additionalNotes;

    loadIngredients(batch.ingredients || []);
    loadProcessSteps(batch.processSteps || []);
    loadRatings(batch.ratings);

    alert("Batch loaded.");
}

document.addEventListener("DOMContentLoaded", function() {
    renderBatchDashboard();
    document.getElementById("batchForm").classList.add("hidden");
});

function getIngredients() {
    let rows = document.querySelectorAll("#ingredientsList .ingredient-row");
    let ingredients = [];

    rows.forEach(function(row) {
        let amount = row.querySelector("input[type='number']").value;
        let unit = row.querySelector("select").value;
        let ingredient = row.querySelector("input[type='text']").value;

        if (amount || ingredient) {
            ingredients.push({
                amount: amount,
                unit: unit,
                ingredient: ingredient
            });
        }
    });

    return ingredients;
}

function loadIngredients(ingredients) {
    let ingredientsList = document.getElementById("ingredientsList");
    ingredientsList.innerHTML = "";

    ingredients.forEach(function(item) {
        let row = document.createElement("div");
        row.className = "ingredient-row";

        row.innerHTML = `
            <input type="number" placeholder="Amount" value="${item.amount}">
            <select>
                <option ${item.unit === "lb" ? "selected" : ""}>lb</option>
                <option ${item.unit === "oz" ? "selected" : ""}>oz</option>
                <option ${item.unit === "g" ? "selected" : ""}>g</option>
                <option ${item.unit === "kg" ? "selected" : ""}>kg</option>
                <option ${item.unit === "gal" ? "selected" : ""}>gal</option>
                <option ${item.unit === "tsp" ? "selected" : ""}>tsp</option>
                <option ${item.unit === "tbsp" ? "selected" : ""}>tbsp</option>
                <option ${item.unit === "packet" ? "selected" : ""}>packet</option>
            </select>
            <input type="text" placeholder="Ingredient" value="${item.ingredient}">
            <button type="button"
              class="trash-btn"
              title="Delete Ingredient"
              aria-label="Delete Ingredient"
              onclick="removeRow(this)">
              🗑️
            </button>`;

        ingredientsList.appendChild(row);
    });

    if (ingredients.length === 0) {
        addIngredientField();
    }
}

function getProcessSteps() {
    let rows = document.querySelectorAll("#processStepsList .process-row");
    let steps = [];

    rows.forEach(function(row) {
        let date = row.querySelector("input[type='date']").value;
        let step = row.querySelector("input[type='text']").value;

        if (date || step) {
            steps.push({
                date: date,
                step: step
            });
        }
    });

    return steps;
}

function loadProcessSteps(steps) {
    let processStepsList = document.getElementById("processStepsList");
    processStepsList.innerHTML = "";

    steps.forEach(function(item) {
        let row = document.createElement("div");
        row.className = "process-row";

        row.innerHTML = `
            <input type="date" value="${item.date}">
            <input type="text" placeholder="Process step" value="${item.step}">
            <button 
              type="button" 
              class="trash-btn"
              title="Delete Process Step"
              aria-label="Delete Process Step"
              onclick="removeRow(this)">
              🗑️
            </button>`;

        processStepsList.appendChild(row);
    });

    if (steps.length === 0) {
        addProcessStep();
    }
}

function loadRatings(savedRatings) {
    ratings = savedRatings || {
        aroma: 0,
        flavor: 0,
        clarity: 0,
        sweetness: 0,
        mouthfeel: 0
    };

    Object.keys(ratings).forEach(function(category) {
        let rating = ratings[category];
        let starContainer = document.querySelector(`[data-category="${category}"]`);
        let stars = starContainer.querySelectorAll("button");

        stars.forEach(function(star, index) {
            if (index < rating) {
                star.innerText = "★";
            } else {
                star.innerText = "☆";
            }
        });
    });
}