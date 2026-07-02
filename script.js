    function calculateOG() {
      let honey = Number(document.getElementById("honey").value);
      let gallons = Number(document.getElementById("gallons").value);

      let gravityPoints = (honey * 35) / gallons;
      let og = 1 + (gravityPoints / 1000);

      document.getElementById("result").innerText =
        honey + " lb of honey in " + gallons + " gallon(s) gives an estimated OG of " + og.toFixed(3);
    }

    function calculateOG() {
    let honey = Number(document.getElementById("honey").value);
    let gallons = Number(document.getElementById("gallons").value);

    let gravityPoints = (honey * 35) / gallons;
    let og = 1 + (gravityPoints / 1000);

    document.getElementById("result").innerText =
      honey + " lb of honey in " + gallons + " gallon(s) gives an estimated OG of " + og.toFixed(3);
  }

  function calculateABV() {
    let og = Number(document.getElementById("og").value);
    let fg = Number(document.getElementById("fg").value);

    let abv = (og - fg) * 131.25;

    document.getElementById("abvResult").innerText =
      "Estimated ABV: " + abv.toFixed(2) + "%";
  }