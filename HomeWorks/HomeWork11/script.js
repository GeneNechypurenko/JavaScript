function Marker(color) {
    this.color = color;
    this.ink = 100;
}

Marker.prototype.print = function(text) {
    let printableText = '';
    let inkUsed = 0;

    for (let char of text) {
        if (char === ' ') {
            printableText += char;
        } else {
            inkUsed += 0.5;
            if (inkUsed <= this.ink) {
                printableText += char;
            } else {
                console.log("Недостаточно чернил для печати всего текста.");
                alert("Чернила в маркере закончились.");
                inkUsed -= 0.5;
                break;
            }
        }
    }

    this.ink -= inkUsed;
    document.getElementById('output').innerHTML += `<span style="color:${this.color}">${printableText}</span>`;
    if (this.ink < 0) {
        this.ink = 0;
    }
    document.getElementById('ink-level').textContent = `Чернила: ${this.ink}%`;
};

function RefillableMarker(color) {
    Marker.call(this, color);
}

RefillableMarker.prototype.__proto__ = Marker.prototype;

RefillableMarker.prototype.refill = function(inkAmount) {
    this.ink = Math.min(this.ink + inkAmount, 100);
    document.getElementById('ink-level').textContent = `Чернила: ${this.ink}%`;
};

let marker;

function printText() {
    const text = document.getElementById('text').value;
    const color = document.getElementById('color').value;

    if (!marker || marker.color !== color) {
        marker = new Marker(color);
    }
    marker.print(text);
}

function refillMarker() {
    const inkAmount = parseFloat(prompt("Введите количество чернил для заправки:"));
    if (!isNaN(inkAmount) && inkAmount > 0) {
        if (!marker) {
            const color = document.getElementById('color').value;
            marker = new RefillableMarker(color);
        } else if (!(marker instanceof RefillableMarker)) {
            const color = marker.color;
            marker = new RefillableMarker(color);
        }
        marker.refill(inkAmount);
        alert(`Текущее количество чернил: ${marker.ink}%`);
    } else {
        alert("Введите корректное значение для заправки.");
    }
}

function clearOutput() {
    document.getElementById('output').innerHTML = '';
}
