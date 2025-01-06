document.getElementById("downloadBtn").addEventListener("click", async () => {
  const urlInput = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");

  if (!urlInput) {
    resultDiv.innerHTML = "<p style='color: red;'>Please enter a valid Instagram URL!</p>";
    return;
  }

  try {
    const response = await fetch("/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: urlInput }),
    });

    const data = await response.json();

    if (data.mediaUrl) {
      resultDiv.innerHTML = `
        <p>Download your media:</p>
        <a href="${data.mediaUrl}" target="_blank" download>Click here to download</a>
      `;
    } else {
      resultDiv.innerHTML = `<p style='color: red;'>${data.error || "An error occurred!"}</p>`;
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "<p style='color: red;'>Failed to fetch media. Try again later!</p>";
  }
});
