function toggleDetails(row) {
    // Toggle the display of the details row
    const detailsRow = row.nextElementSibling;

    if (detailsRow && detailsRow.classList.contains('details-row')) {
        detailsRow.style.display = detailsRow.style.display === 'table-row' ? 'none' : 'table-row';
    }

    // Toggle the highlighted class on the clicked row
    row.classList.toggle('highlighted');
}
