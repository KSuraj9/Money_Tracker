let expenses = []  // Array to store expense entries
let totalAmount = 0;  // Variable to store the total amount

// Getting elements from the DOM
const categorySelect = document.getElementById('category_select')
const amountInput = document.getElementById('amount_input')
const InfoInput = document.getElementById('info')
const dateInput = document.getElementById('date_input')
const addBtn = document.getElementById('add_btn')
const expenseTableBody = document.getElementById('expense-table-body')
const totalAmountCell = document.getElementById('total-amount')

// Event listener for 'Add' button click
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;  // Get selected category
    const info = InfoInput.value;  // Get info input value
    const amount = Number(amountInput.value);  // Get amount input value and convert to number
    const date = dateInput.value;  // Get selected date

    // Validation checks for input fields
    if (category === '') {
        alert('please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('please enter a valid amount');
        return;
    }
    if (info === '') {
        alert('please enter a valid amount info');
        return;
    }
    if (date === '') {
        alert('please select a date');
        return;
    }

    // Adding new expense to the expenses array
    expenses.push({category, amount, info, date})
    
    // Updating total amount based on category
    if (category === 'Income') {
        totalAmount += amount;
    }
    if (category === 'Expense') {
        totalAmount -= amount;
    }

    // Update the total amount cell in the table
    totalAmountCell.textContent = totalAmount;

    // Creating a new row in the expense table
    const newRow = expenseTableBody.insertRow();

    // Adding cells to the new row
    const categoryCell = newRow.insertCell();
    const AmountCell = newRow.insertCell();
    const InfoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    // Create a delete button for each row
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Event listener for delete button click
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);  // Remove the expense from the array

        // Update total amount when deleting an entry
        if (category === 'Income') {
            totalAmount -= amount;
        }
        if (category === 'Expense') {
            totalAmount += amount;
        }

        totalAmountCell.textContent = totalAmount;  // Update the total amount cell
        expenseTableBody.removeChild(newRow)  // Remove the row from the table
    })

    // Getting the last expense added
    const expense = expenses[expenses.length - 1];

    // Fill the new row cells with the expense data
    categoryCell.textContent = expense.category;
    AmountCell.textContent = expense.amount;
    InfoCell.textContent = expense.info;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
});

// Recalculate and add rows for existing expenses (if any)
for (const expense of expenses) {
    // Update the total amount based on category
    if (expense.category === 'Income') {
        totalAmount += expense.amount;
    }
    if (expense.category === 'Expense') {
        totalAmount -= expense.amount;
    }

    totalAmountCell.textContent = totalAmount;  // Update the total amount cell

    // Create a new row in the expense table
    const newRow = expenseTableBody.insertRow();

    // Adding cells to the new row
    const categoryCell = newRow.insertCell();
    const AmountCell = newRow.insertCell();
    const InfoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    // Create a delete button for each row
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Event listener for delete button click
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);  // Remove the expense from the array

        // Update total amount when deleting an entry
        if (expense.category === 'Income') {
            totalAmount -= expense.amount;
        } 
        if (expense.category === 'Expense') {
            totalAmount += expense.amount;
        }

        totalAmountCell.textContent = totalAmount;  // Update the total amount cell
        expenseTableBody.removeChild(newRow)  // Remove the row from the table
    })

    // Fill the new row cells with the expense data
    categoryCell.textContent = expense.category;
    AmountCell.textContent = expense.amount;
    InfoCell.textContent = expense.info;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}
