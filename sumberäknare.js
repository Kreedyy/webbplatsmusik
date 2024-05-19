// Hämta alla td-element i tredje kolumnen inuti tbody
const tdElements = document.querySelectorAll('tbody td:nth-child(3)');

// Initialisera summan
let sum = 0;

// Loopa igenom varje td-element och lägg till dess värde i summan
tdElements.forEach(td => {
    // Ta bort icke-numeriska tecken och ersätt kommatecken med mellanslag
    const value = parseInt(td.textContent.replace(/[^\d]/g, '').replace(/,/g, ''));
    if (!isNaN(value)) {
        sum += value;
    }
});

// Sätt in summan i elementet med id sumLyssnare, ersätt kommatecken med mellanslag
document.getElementById('sumLyssnare').textContent = sum.toLocaleString().replace(/,/g, ' '); // Konvertera summan till lokal sträng och ersätt kommatecken med mellanslag

// Hämta alla td-element i fjärde kolumnen inuti tbody
const tdElement = document.querySelectorAll('tbody td:nth-child(4)');

// Initialisera summan
let summ = 0;

// Loopa igenom varje td-element och lägg till dess värde i summan
tdElement.forEach(td => {
    // Ta bort icke-numeriska tecken och ersätt kommatecken med mellanslag
    const value = parseInt(td.textContent.replace(/[^\d]/g, '').replace(/,/g, ''));
    if (!isNaN(value)) {
        summ += value;
    }
});

// Sätt in summan i elementet med id sumLåt, ersätt kommatecken med mellanslag
document.getElementById('sumLåt').textContent = summ.toLocaleString().replace(/,/g, ' '); // Konvertera summan till lokal sträng och ersätt kommatecken med mellanslag
