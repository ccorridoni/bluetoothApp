document.addEventListener("DOMContentLoaded", init, false);

function init() {
    const scanBtn = document.getElementById("scanBtn");
    scanBtn.addEventListener("click", scanBLE);
}

function scanBLE() {
    const deviceList = document.getElementById("deviceList");
    deviceList.innerHTML = "<li>Scanning...</li>";

    if (navigator.bluetooth) {
        // Fallback: Web Bluetooth API
        navigator.bluetooth.requestDevice({
            acceptAllDevices: true
        })
        .then(device => {
            addDevice(device.name || "Unnamed", device.id);
        })
        .catch(error => {
            deviceList.innerHTML = `<li>Web Bluetooth error: ${error}</li>`;
        });
    } else {
        deviceList.innerHTML = "<li>BLE not supported in this environment.</li>";
    }
}

function addDevice(name, id) {
    const deviceList = document.getElementById("deviceList");
    const item = document.createElement("li");
    item.textContent = `${name} (${id})`;
    deviceList.appendChild(item);
}

