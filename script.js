let ratings = {
    aroma: 0,
    flavor: 0,
    clarity: 0,
    sweetness: 0,
    mouthfeel: 0
};

function showSection(sectionId) {
    let sections = document.querySelectorAll(".page-section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");
}

function calculateOG() {
    let honey = Number(document.getElementById("honey").value);
    let gallons = Number(document.getElementById("gallons").value);

    if (!honey || !gallons) {
        document.getElementById("result").innerText =
            "Enter honey and gallons to reveal the original gravity.";
        return;
    }

    let gravityPoints = (honey * 35) / gallons;
    let og = 1 + (gravityPoints / 1000);

    document.getElementById("result").innerText =
        "Estimated Original Gravity: " + og.toFixed(3);
}

function calculateABV() {
    let og = Number(document.getElementById("og").value);
    let fg = Number(document.getElementById("fg").value);

    if (!og || !fg) {
        document.getElementById("abvResult").innerText =
            "Enter original gravity and final gravity.";
        return;
    }

    let abv = (og - fg) * 131.25;

    document.getElementById("abvResult").innerText =
        "Estimated ABV: " + abv.toFixed(2) + "%";
}

function calculateHoneyNeeded() {
    let targetOg = Number(document.getElementById("targetOg").value);
    let gallons = Number(document.getElementById("targetGallons").value);

    if (!targetOg || !gallons) {
        document.getElementById("honeyNeededResult").innerText =
            "Enter a target gravity and batch size.";
        return;
    }

    let gravityPoints = (targetOg - 1) * 1000;
    let honeyNeeded = (gravityPoints * gallons) / 35;

    document.getElementById("honeyNeededResult").innerText =
        "Estimated Honey Required: " + honeyNeeded.toFixed(2) + " lb";
}

function calculateWaterNeeded() {
    let honey = Number(document.getElementById("waterHoney").value);
    let targetOg = Number(document.getElementById("waterTargetOg").value);

    if (!honey || !targetOg) {
        document.getElementById("waterNeededResult").innerText =
            "Enter honey amount and target gravity.";
        return;
    }

    let gravityPoints = (targetOg - 1) * 1000;
    let gallons = (honey * 35) / gravityPoints;

    document.getElementById("waterNeededResult").innerText =
        "Estimated Total Batch Volume: " + gallons.toFixed(2) + " gallons";
}

function calculateBatchABV() {
    let startingSg = Number(document.getElementById("startingSg").value);
    let finalSg = Number(document.getElementById("finalSg").value);

    if (!startingSg || !finalSg) {
        document.getElementById("batchAbvResult").innerText =
            "Enter starting SG and final SG.";
        return;
    }

    let abv = (startingSg - finalSg) * 131.25;

    document.getElementById("batchAbvResult").innerText =
        "Estimated Batch ABV: " + abv.toFixed(2) + "%";
}

function removeRow(button) {
    button.parentElement.remove();
}

function addIngredientField(amount = "", unit = "lb", ingredient = "") {
    let ingredientsList = document.getElementById("ingredientsList");

    let row = document.createElement("div");
    row.className = "ingredient-row";

    row.innerHTML = `
        <input type="number" placeholder="Amount" value="${amount}">
        <select>
            <option ${unit === "lb" ? "selected" : ""}>lb</option>
            <option ${unit === "oz" ? "selected" : ""}>oz</option>
            <option ${unit === "g" ? "selected" : ""}>g</option>
            <option ${unit === "kg" ? "selected" : ""}>kg</option>
            <option ${unit === "gal" ? "selected" : ""}>gal</option>
            <option ${unit === "tsp" ? "selected" : ""}>tsp</option>
            <option ${unit === "tbsp" ? "selected" : ""}>tbsp</option>
            <option ${unit === "packet" ? "selected" : ""}>packet</option>
        </select>
        <input type="text" placeholder="Ingredient" value="${ingredient}">
        <button type="button" class="trash-btn" title="Delete row" aria-label="Delete row" onclick="removeRow(this)">🗑️</button>
    `;

    ingredientsList.appendChild(row);
}

function addProcessStep(date = "", step = "") {
    let processStepsList = document.getElementById("processStepsList");

    let row = document.createElement("div");
    row.className = "process-row";

    row.innerHTML = `
        <input type="date" value="${date}">
        <input type="text" placeholder="Process step" value="${step}">
        <button type="button" class="trash-btn" title="Delete row" aria-label="Delete row" onclick="removeRow(this)">🗑️</button>
    `;

    processStepsList.appendChild(row);
}

function setRating(category, rating) {
    ratings[category] = rating;

    let starContainer = document.querySelector(`[data-category="${category}"]`);
    let stars = starContainer.querySelectorAll("button");

    stars.forEach(function(star, index) {
        star.innerText = index < rating ? "★" : "☆";
    });
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

        if (!starContainer) return;

        let stars = starContainer.querySelectorAll("button");

        stars.forEach(function(star, index) {
            star.innerText = index < rating ? "★" : "☆";
        });
    });
}

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

    if (!ingredients || ingredients.length === 0) {
        addIngredientField();
        return;
    }

    ingredients.forEach(function(item) {
        addIngredientField(item.amount, item.unit, item.ingredient);
    });
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

    if (!steps || steps.length === 0) {
        addProcessStep();
        return;
    }

    steps.forEach(function(item) {
        addProcessStep(item.date, item.step);
    });
}

function updateBatchTimeline() {
    let startDateValue = document.getElementById("startDate").value;
    let timeline = document.getElementById("batchTimeline");

    if (!startDateValue) {
        timeline.innerText = "Enter a start date to reveal the batch age.";
        return;
    }

    let startDate = new Date(startDateValue);
    let today = new Date();

    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    let difference = today - startDate;
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));

    let omen = "";

    if (days < 0) {
        omen = "This batch is planned for the future.";
    } else if (days <= 7) {
        omen = "Primary fermentation may be active. Watch for bubbling and gravity movement.";
    } else if (days <= 21) {
        omen = "Begin watching gravity readings. Stable readings may signal the next rite.";
    } else if (days <= 45) {
        omen = "This batch may be ready for racking, stabilization, or conditioning.";
    } else {
        omen = "This batch may be entering its aging and refinement stage.";
    }

    timeline.innerText = "Day " + days + " — " + omen;
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
    updateBatchTimeline();

    alert("A new batch record has been opened.");
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
        ratings: { ...ratings },
        lastSaved: new Date().toLocaleString()
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

    alert("Batch sealed into the grimoire.");
}

function renderBatchDashboard() {
    let savedBatches = JSON.parse(localStorage.getItem("savedBatches")) || [];
    let batchList = document.getElementById("batchList");

    batchList.innerHTML = "";

    if (savedBatches.length === 0) {
        batchList.innerHTML = `<p>No batches recorded yet. Begin the first rite.</p>`;
        return;
    }

    savedBatches.forEach(function(batch) {
        let row = document.createElement("div");
        row.className = "batch-row";

        row.onclick = function() {
            loadBatch(batch.id);
        };

        row.innerHTML = `
            <span>${batch.name || "Unnamed Batch"}</span>
            <span class="status">${batch.status || "Planning"}</span>
            <span>Started: ${batch.startDate || "Not set"}</span>
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
    document.getElementById("batchName").value = batch.name || "";
    document.getElementById("startDate").value = batch.startDate || "";
    document.getElementById("batchStatus").value = batch.status || "Planning";
    document.getElementById("startingSg").value = batch.startingSg || "";
    document.getElementById("finalSg").value = batch.finalSg || "";
    document.getElementById("batchAbvResult").innerText = batch.batchAbv || "";
    document.getElementById("tastingNotes").value = batch.tastingNotes || "";
    document.getElementById("additionalNotes").value = batch.additionalNotes || "";

    loadIngredients(batch.ingredients || []);
    loadProcessSteps(batch.processSteps || []);
    loadRatings(batch.ratings);
    updateBatchTimeline();
}

function exportBatches() {
    let savedBatches = localStorage.getItem("savedBatches");

    if (!savedBatches) {
        alert("There are no batches to export.");
        return;
    }

    let blob = new Blob([savedBatches], { type: "application/json" });
    let url = URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.href = url;
    link.download = "crystal-raven-batches.json";
    link.click();

    URL.revokeObjectURL(url);
}

function importBatches(event) {
    let file = event.target.files[0];

    if (!file) return;

    let reader = new FileReader();

    reader.onload = function(e) {
        try {
            let importedBatches = JSON.parse(e.target.result);

            if (!Array.isArray(importedBatches)) {
                alert("This grimoire file is not valid.");
                return;
            }

            localStorage.setItem("savedBatches", JSON.stringify(importedBatches));
            renderBatchDashboard();

            alert("Grimoire imported successfully.");
        } catch (error) {
            alert("Could not import this file.");
        }
    };

    reader.readAsText(file);
}

document.addEventListener("DOMContentLoaded", function() {
    renderBatchDashboard();

    let batchForm = document.getElementById("batchForm");
    if (batchForm) {
        batchForm.classList.add("hidden");
    }

    let startDate = document.getElementById("startDate");
    if (startDate) {
        startDate.addEventListener("change", updateBatchTimeline);
    }
});