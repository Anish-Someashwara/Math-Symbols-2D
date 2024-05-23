

document.addEventListener("DOMContentLoaded", async function() {
    var dropdown = document.getElementById('dropdown');
    var textbox = document.getElementById('textbox');

    try {
        // Fetch data from constants.json file
        const response = await fetch('constants.json');
        const data = await response.json();

        // Flag to track if the first option is added
        var firstOptionAdded = false;

        // Add math symbols to the dropdown
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var symbol = data[key];
                var optionElement = document.createElement("option");
                optionElement.textContent = key + "  =======  " + symbol;
                optionElement.value = symbol;
                
                // Set the first option as selected
                if (!firstOptionAdded) {
                    optionElement.selected = true;
                    firstOptionAdded = true;
                }

                dropdown.appendChild(optionElement);
            }
        }
    } catch (error) {
        console.error('Error fetching constants.json:', error);
    }

    // Event listener to update textbox when an option is selected
    dropdown.addEventListener('change', function() {
        var selectedOption = this.options[this.selectedIndex];
        var selectedValue = selectedOption.value;

        // Get the current cursor position
        var startPos = textbox.selectionStart;
        var endPos = textbox.selectionEnd;

        // Insert the selected value at the cursor position
        var currentValue = textbox.value;
        var newValue = currentValue.substring(0, startPos) + selectedValue + currentValue.substring(endPos);
        textbox.value = newValue;

        // Move the cursor to the end of the inserted text
        textbox.selectionStart = textbox.value.length;
        textbox.selectionEnd = textbox.value.length;
    });
});
