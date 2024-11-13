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

    // Prompt for cost per packet with validation
    let costPerPacket;
    do {
      costPerPacket = parseFloat(prompt("Enter the price per packet (between 10 and 200):"));
      if (isNaN(costPerPacket) || costPerPacket < 10 || costPerPacket > 200) {
        alert("Invalid price! A milk packet price will be between 10 and 200 INR");
      }
    } while (isNaN(costPerPacket) || costPerPacket < 10 || costPerPacket > 200);

    const totalCost = totalPackets * costPerPacket;
    totalCostElement.textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;
  } else {
    totalPacketsElement.textContent = ''; // Clear the total display
    totalCostElement.textContent = '';
  }
}

monthSelector.addEventListener('change', createCalendar);
createCalendar(); // Initial calendar creation
