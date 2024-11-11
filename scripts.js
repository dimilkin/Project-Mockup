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
                    data: [10, 10, 20, 40, 20], // Values for each section
                    backgroundColor: ["#56c9ab", "#56c9ab", "#56c9ab", "#36a2eb", "#ff6384"], // Colors for the segments
                    label: 'Консервативен етап',
                    hoverLabels: ["Първичен Преглед", "КОХ Почистване", "Обтурация 14", "Ендо 36", "Изграждане 36"],
                    segmentLabels: ["Завършени", "Завършени", "Завършени", "Настоящ", "Предстоящ"]
                },
                {
                    data: [30, 10, 60],
                    backgroundColor: ["#ff6384", "#ff6384", "#ff6384"],
                    label: 'Протетичен етап',
                    hoverLabels: ["Временна Коронка 36", "Отпечатъци 36", "Постоянна коронка 36"],
                    segmentLabels: ["Предстоящ", "Предстоящ", "Предстоящ"]
                }
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Your Dental Treatment Plan Progress',
                    color: '#fff',       // Set the title color
                    font: {
                        size: 20,           // Set the title font size
                        family: 'Arial',    // Optionally, set the font family
                        weight: 'bold'      // Optionally, set the font weight
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const dataset = context.dataset;
                            const hoverLabels = dataset.hoverLabels;
                            const segmentLabels = dataset.segmentLabels;
                            const labelIndex = context.dataIndex;
                            const customLabel = `${segmentLabels[labelIndex]}: ${hoverLabels[labelIndex]}`;
                            return `${dataset.label}: ${customLabel} (${context.raw})`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            parsing: {
                key: 'value'
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

function toggleProcedureDetails(tabElement) {
    // Toggle the 'expanded' class on the procedure tab
    tabElement.classList.toggle("expanded");

    // Find the .extra-info element inside the clicked tab
    const extraInfo = tabElement.querySelector(".extra-info");
    if (extraInfo) {
        // Toggle the 'hidden' class to show or hide additional details
        extraInfo.classList.toggle("hidden");
    }
}
