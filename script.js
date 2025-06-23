const apiKey = "5ff57be54d3f43dd96b30c66eb613342";
let latestRates = {};

async function getRates() {
  const base = document.getElementById("baseCurrency").value;
  const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&base=${base}`;

  const resultsDiv = document.getElementById("results");
  const fullTableDiv = document.getElementById("fullTable");
  const viewMoreBtn = document.getElementById("viewMoreBtn");

  resultsDiv.innerHTML = "<p>⏳ Fetching latest rates...</p>";
  fullTableDiv.style.display = "none";
  viewMoreBtn.style.display = "none";

  try {
    const response = await fetch(url);
    const data = await response.json();

    latestRates = data.rates; // Save full rates for later

    resultsDiv.innerHTML = `
      <strong>Date:</strong> ${data.date}<br/>
      <strong>Base Currency:</strong> ${data.base}<br/><br/>
      <strong>Top Exchange Rates:</strong>
      <ul>
        <li>INR (₹): ${data.rates.INR}</li>
        <li>EUR (€): ${data.rates.EUR}</li>
        <li>JPY (¥): ${data.rates.JPY}</li>
        <li>GBP (£): ${data.rates.GBP}</li>
        <li>MXN (Mexican Peso): ${data.rates.MXN}</li>
        <li>FJD (Fiji Dollar): ${data.rates.FJD}</li>
      </ul>
    `;

    viewMoreBtn.style.display = "inline-block";
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsDiv.innerHTML = "<p style='color:red;'>Failed to fetch exchange rates.</p>";
  }
}

function showAllRates() {
  const tableHTML = Object.entries(latestRates)
    .map(([currency, rate]) => `<tr><td>${currency}</td><td>${rate}</td></tr>`)
    .join("");

  document.getElementById("fullTable").innerHTML = `
    <h3>📊 Full Currency Rate Table</h3>
    <div class="table-container">
      <table>
        <thead>
          <tr><th>Currency</th><th>Rate</th></tr>
        </thead>
        <tbody>${tableHTML}</tbody>
      </table>
    </div>
  `;
  document.getElementById("fullTable").style.display = "block";
}

