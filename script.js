const calendar = document.getElementById('calendar');
const totalPacketsElement = document.getElementById('totalPackets');
const costPerPacketElement = document.getElementById('costPerPacket');
const totalCostElement = document.getElementById('totalCost');
const monthSelector = document.getElementById('month-selector');

function createCalendar() {
    const selectedMonth = parseInt(monthSelector.value);
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();

    calendar.innerHTML = ''; // Clear previous calendar

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;

        const input = document.createElement('input');
        input.type = 'number';
        input.min = 0;
        input.max = 9;
        input.value = 2; // Default value of 2 packets per day

        dayElement.appendChild(input);
        calendar.appendChild(dayElement);
    }
}

function calculateTotal() {
    let totalPackets = 0;
    let hasInvalidInput = false;
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        const value = parseInt(input.value);
        if (!isNaN(value) && value >= 0 && value <= 9) {
            totalPackets += value;
        } else {
            alert('Please enter a number between 0 and 9.');
            input.value = 0; // Reset the input field to 0
            hasInvalidInput = true;
        }
    });

    if (!hasInvalidInput) {
        totalPacketsElement.textContent = `Total Packets: ${totalPackets}`;

        // Prompt for cost per packet
        const costPerPacket = parseFloat(prompt("Enter the cost per packet:"));

        if (!isNaN(costPerPacket)) {
            const totalCost = totalPackets * costPerPacket;
            totalCostElement.textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;
        } else {
            alert("Invalid cost per packet. Please enter a valid number.");
            totalCostElement.textContent = '';
        }
    } else {
        totalPacketsElement.textContent = ''; // Clear the total display
        totalCostElement.textContent = '';
    }
}

monthSelector.addEventListener('change', createCalendar);
createCalendar(); // Initial calendar creation