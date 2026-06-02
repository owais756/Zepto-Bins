const container = document.getElementById("grid-container");

const rows = [
    { prefix: "BLU", colorClass: "blue" },
    { prefix: "GRN", colorClass: "green" },
    { prefix: "WHT", colorClass: "white" },
    { prefix: "YLW", colorClass: "yellow" },
    { prefix: "RED", colorClass: "red" }
];

// Generate Boxes

rows.forEach(rowData => {

    const row = document.createElement("div");
    row.className = "row";

    for(let i = 1; i <= 9; i++){

        const label = `${rowData.prefix}_${i}`;

        const box = document.createElement("div");
        box.className = `box ${rowData.colorClass}`;
        box.textContent = label;

        box.addEventListener("click", () => {
            showQRBarcode(label);
        });

        row.appendChild(box);
    }

    container.appendChild(row);
});

// Elements

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-btn");
const itemText = document.getElementById("itemText");
const toast = document.getElementById("toast");

// Function

function showQRBarcode(text){

    // Copy Text
    navigator.clipboard.writeText(text);

    // Toast
    toast.textContent = `${text} copied!`;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

    // Modal Text
    itemText.textContent = text;

    // Clear Previous QR
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";

    // Generate QR
    new QRCode(qrContainer,{
        text:text,
        width:200,
        height:200
    });

    // Generate Barcode
    JsBarcode("#barcode", text, {
        format:"CODE128",
        width:2,
        height:80,
        displayValue:true
    });

    modal.style.display = "flex";
}

// Close Modal

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if(e.target === modal){
        modal.style.display = "none";
    }
});