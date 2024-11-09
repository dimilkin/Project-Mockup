window.onload = function() {
    initializeDoughnutChart();
    initializeDiagram();
};

function initializeDoughnutChart() {
    const config = {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: [30, 20, 50], // Values for each section
                    backgroundColor: ["#56c9ab", "#36a2eb", "#ff6384"], // Colors for the segments
                    label: 'Протетичен етап',
                    hoverLabels: ["Първичен Преглед", "КОХ Почистване", "Обтурация 14"] // Custom labels for hover
                },
                {
                    data: [60, 10, 30],
                    backgroundColor: ["#56c9ab", "#36a2eb", "#ff6384"],
                    label: 'Консервативен етап',
                    hoverLabels: ["Completed", "Current", "Upcoming"]
                }
            ],
            labels: ["Завършени", "Настоящ", "Предстоящ"]
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
            callbacks: {
                label: function(item, data) {
                    // Fetch hoverLabels for the specific dataset
                    const dataset = data.datasets[item.datasetIndex];
                    const hoverLabels = dataset.hoverLabels;
                    const customLabel = hoverLabels ? hoverLabels[item.index] : data.labels[item.index];
                    // Display custom label only, without any numerical value
                    return `${dataset.label}: ${customLabel}`;
                }
            }
        }
    };

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
    ctxLine.strokeStyle = 'white';
    ctxLine.lineWidth = 2;

    // Get all node elements
    const nodes = document.querySelectorAll('.node');

    // Helper function to draw line between two nodes
    function drawLine(startNode, endNode) {
        const startRect = startNode.getBoundingClientRect();
        const endRect = endNode.getBoundingClientRect();
        const containerRect = diagramContainer.getBoundingClientRect();

        const startX = startRect.left + startRect.width / 2 - containerRect.left;
        const startY = startRect.top + startRect.height / 2 - containerRect.top;
        const endX = endRect.left + endRect.width / 2 - containerRect.left;
        const endY = endRect.top + endRect.height / 2 - containerRect.top;

        ctxLine.beginPath();
        ctxLine.moveTo(startX, startY);
        ctxLine.lineTo(endX, endY);
        ctxLine.stroke();
    }

    // Draw lines sequentially from Node 1 to Node 7
    drawLine(nodes[0], nodes[1]);
    drawLine(nodes[1], nodes[2]);
    drawLine(nodes[3], nodes[4]);
    drawLine(nodes[5], nodes[6]);
    drawLine(nodes[5], nodes[7]);
    drawLine(nodes[4], nodes[7]);

    // Additional line connecting Node 3 to Node 5
    drawLine(nodes[2], nodes[4]);
}