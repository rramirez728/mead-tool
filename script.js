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

    // Validation
    if (!targetOg || !gallons) {
        document.getElementById("honeyNeededResult").innerText =
            "Please enter a target gravity and batch size.";
        return;
    }

    // Calculation
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
    `;

    ingredientsList.appendChild(row);
}

function addProcessStep() {
    let processStepsList = document.getElementById("processStepsList");

    let row = document.createElement("div");
    row.className = "process-row";

    row.innerHTML = `
        <input type="date">
        <input type="text" placeholder="Next process step">
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
    document.getElementById("batchName").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("batchStatus").value = "Planning";
    document.getElementById("startingSg").value = "";
    document.getElementById("finalSg").value = "";
    document.getElementById("batchAbvResult").innerText = "";

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
    let batch = {
        name: document.getElementById("batchName").value,
        startDate: document.getElementById("startDate").value,
        status: document.getElementById("batchStatus").value,
        startingSg: document.getElementById("startingSg").value,
        finalSg: document.getElementById("finalSg").value,
        batchAbv: document.getElementById("batchAbvResult").innerText,
        tastingNotes: document.getElementById("tastingNotes").value,
        additionalNotes: document.getElementById("additionalNotes").value
    };

    localStorage.setItem("savedBatch", JSON.stringify(batch));

    alert("Batch saved successfully.");
}

function loadSavedBatch() {
    let savedBatch = localStorage.getItem("savedBatch");

    if (!savedBatch) {
        alert("No saved batch found.");
        return;
    }

    let batch = JSON.parse(savedBatch);

    document.getElementById("batchName").value = batch.name;
    document.getElementById("startDate").value = batch.startDate;
    document.getElementById("batchStatus").value = batch.status;
    document.getElementById("startingSg").value = batch.startingSg;
    document.getElementById("finalSg").value = batch.finalSg;
    document.getElementById("batchAbvResult").innerText = batch.batchAbv;
    document.getElementById("tastingNotes").value = batch.tastingNotes;
    document.getElementById("additionalNotes").value = batch.additionalNotes;

    alert("Saved batch loaded.");
}