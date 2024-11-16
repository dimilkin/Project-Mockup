window.onload = function() {
    initializeDoughnutChart();
    initializeDiagram();
    setupNodeClickScroll();
};

function expandTab(tab) {
    const texts = tab.querySelectorAll('.procedure-text');
    texts.forEach(text => {
        // Retrieve and display the original text
        const originalText = text.getAttribute('data-original-text');
        if (originalText) {
            text.textContent = originalText;
        }
    });

    // Show additional fields
    const additionalFields = tab.querySelector('.additional-fields');
    additionalFields.style.display = 'block';

    // Disable further clicks on this tab
    tab.onclick = null;
}


function initializeDoughnutChart() {
    const img = new Image();
    img.src = 'https://image.pngaaa.com/306/4771306-middle.png'; // Replace with your image URL

    // Register a plugin to draw the image as a background layer
    const backgroundImagePlugin = {
        id: 'backgroundImage',
        beforeDatasetDraw(chart) {
            if (chart.config.type === 'doughnut' && img.complete) {
                const ctx = chart.ctx;
                const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                const imageSize = 100;

                // Draw the image at the center before datasets are drawn
                ctx.drawImage(img, centerX - imageSize / 2, centerY - imageSize / 2, imageSize, imageSize);
            }
        }
    };

    // Register the plugin
    Chart.register(backgroundImagePlugin);

    // Doughnut chart configuration
    const config = {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: [30, 20, 50], // Values for each section
                    backgroundColor: ["#56c9ab", "#36a2eb", "#ff6384"], // Colors for the segments
                    label: 'Протетичен етап',
                    hoverLabels: ["Първичен Преглед", "КОХ Почистване", "Обтурация 14"],
                    borderColor: 'white',  // White border between segments
                    borderWidth: 5
                },
                {
                    data: [60, 10, 30],
                    backgroundColor: ["#56c9ab", "#36a2eb", "#ff6384"],
                    label: 'Консервативен етап',
                    hoverLabels: ["Completed", "Current", "Upcoming"],
                    borderColor: 'white',  // White border between segments
                    borderWidth: 5
                }
            ]
        },
        options: {
            responsive: true,
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            tooltips: {
                callbacks: {
                    label: function(item, data) {
                        const hoverLabels = data.datasets[item.datasetIndex].hoverLabels;
                        const customLabel = hoverLabels ? hoverLabels[item.index] : data.labels[item.index];
                        return `${data.datasets[item.datasetIndex].label}: ${customLabel}`;
                    }
                }
            }
        }
    };

    // Initialize the chart
    const ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, config);
}

function initializeDiagram() {
    const canvas = document.getElementById('lineCanvas');
    const diagramContainer = document.getElementById('diagram');
    const contextHolder = document.getElementById('context');

    // Set canvas size to match the diagram container
    canvas.width = contextHolder.offsetWidth;
    canvas.height = contextHolder.offsetHeight;

    const ctxLine = canvas.getContext('2d');
    ctxLine.strokeStyle = '#fff';
    ctxLine.lineWidth = 2;

    // Get all node elements
    const nodes = document.querySelectorAll('.node');

    // Helper function to draw line between two nodes
    function drawLine(startNode, endNode) {
        const startRect = startNode.getBoundingClientRect();
        const endRect = endNode.getBoundingClientRect();
        const containerRect = diagramContainer.getBoundingClientRect();

        const startX = startRect.left + startRect.width / 2 - containerRect.left;
        const startY = startRect.top + startRect.height / 10 - containerRect.top;
        const endX = endRect.left + endRect.width / 2 - containerRect.left;
        const endY = endRect.top + endRect.height / 10 - containerRect.top;

        ctxLine.beginPath();
        ctxLine.moveTo(startX, startY);
        ctxLine.lineTo(endX, endY);
        ctxLine.stroke();
    }

    // Draw lines sequentially from Node 1 to Node 7
    drawLine(nodes[0], nodes[1]);
    drawLine(nodes[1], nodes[2]);
    drawLine(nodes[3], nodes[4]);
    drawLine(nodes[4], nodes[5]);
    drawLine(nodes[5], nodes[6]);
    drawLine(nodes[6], nodes[7]);

    // Additional line connecting Node 3 to Node 5
    drawLine(nodes[2], nodes[4]);
}

function setupNodeClickScroll() {
    const nodes = document.querySelectorAll('.node');
    const procedureTabs = document.querySelectorAll('.procedure-tab');

    nodes.forEach(node => {
        node.addEventListener('click', function() {
            const targetId = node.getAttribute('data-id');
            const targetTab = document.querySelector(`.procedure-tab[data-id="${targetId}"]`);
            if (targetTab) {
                // Remove highlight from all procedure tabs
                procedureTabs.forEach(tab => tab.classList.remove('highlight'));

                // Add highlight to the target tab and scroll into view
                targetTab.classList.add('highlight');
                targetTab.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}

function expandTab(tab) {
    // Find the next sibling element which contains the additional fields
    const additionalFields = tab.nextElementSibling;

    // Toggle the visibility of the additional fields
    if (additionalFields.style.display === 'none' || additionalFields.style.display === '') {
        additionalFields.style.display = 'block'; // Show additional fields
    } else {
        additionalFields.style.display = 'none';  // Hide additional fields
    }

    // Optional: scroll to the expanded tab for visibility
    tab.scrollIntoView({ behavior: 'smooth', block: 'center' });
}