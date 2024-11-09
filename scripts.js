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
                    data: [
                        {procedure: 'Първичен Преглед', value: 10},
                        {procedure: 'КОХ Почистване', value: 10},
                        {procedure: 'Обтурация 14', value: 20},
                        {procedure: 'Ендо 36', value: 40},
                        {procedure: 'Изграждане 36', value: 20}
                    ], // Values for each section
                    backgroundColor: ["#56c9ab", "#36a2eb", "#ff6384"], // Colors for the segments
                    label: 'Консервативен етап',
                    hoverLabels: ["Първичен Преглед", "КОХ Почистване", "Обтурация 14", 'Ендо 36', 'Изграждане 36']                },
                {
                    data: [
                        {procedure: 'Временна Коронка 36', value: 30},
                        {procedure: 'Отпечатъци 36', value: 10},
                        {procedure: 'Постоянна коронка 36', value: 60}
                    ],
                    backgroundColor: ["#56c9ab", "#36a2eb", "#ff6384"],
                    label: 'Протетичен етап',
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
            parsing: {
                key: 'value',
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const dataset = context.dataset;
                            const hoverLabels = dataset.hoverLabels;
                            const customLabel = hoverLabels ? hoverLabels[context.dataIndex] : context.label;
                            return `${dataset.label}: ${customLabel}`;
                        }
                    }
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