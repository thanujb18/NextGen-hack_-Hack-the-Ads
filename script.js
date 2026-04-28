function analyzeURL() {
  const url = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");
  const status = document.getElementById("status");
  const score = document.getElementById("score");
  const details = document.getElementById("details");

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  // Fake analysis (for demo)
  let randomScore = Math.floor(Math.random() * 100);

  let resultText = "";
  if (randomScore > 70) {
    resultText = "🟢 Safe";
  } else if (randomScore > 40) {
    resultText = "🟡 Suspicious";
  } else {
    resultText = "🔴 Malicious";
  }

  status.innerText = resultText;
  score.innerText = "Score: " + randomScore;

  details.innerHTML = `
    <li>Domain Age: ${Math.random() > 0.5 ? "Old" : "New"}</li>
    <li>HTTPS: ${url.startsWith("https") ? "Yes" : "No"}</li>
    <li>Blacklist Check: ${Math.random() > 0.5 ? "Clean" : "Flagged"}</li>
  `;

  resultDiv.classList.remove("hidden");
}
