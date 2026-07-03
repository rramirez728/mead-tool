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