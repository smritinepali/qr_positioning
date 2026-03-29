const reader = new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner() {
    scannerOn = !scannerOn;

    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
            try {
                const item = JSON.parse(text);

                // Show inventory info instead of map marker
                displayItem(item);

                toggleScanner(); // stop scanner after successful scan
            } catch (error) {
                console.error("Invalid QR data:", error);
            }
        }
    ).catch(function (err) {
        console.error(err);
    });
}

function stopScanner() {
    reader.stop();
}

// NEW FUNCTION: Display inventory data
function displayItem(item) {
    const nameEl = document.getElementById("name");
    const stockEl = document.getElementById("stock");
    const priceEl = document.getElementById("price");

    nameEl.textContent = "Name: " + item.name;

    stockEl.textContent =
        "In store: " + (item.in_store ? "Yes" : "No");

    priceEl.textContent =
        "Price: €" + item.price;
}
