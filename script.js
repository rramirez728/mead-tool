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