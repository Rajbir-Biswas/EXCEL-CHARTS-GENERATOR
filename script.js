console.log("JS LOADED");

let chart;

function generateChart() {

    const text = document.getElementById("pasteInput").value;

    fetch("/paste", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(data => {

        const ctx = document.getElementById("chart");

        if (chart) chart.destroy();

        const colors = [
            "#4cc9f0",
            "#4895ef",
            "#4361ee",
            "#3a0ca3",
            "#7209b7",
            "#f72585"
        ];

        chart = new Chart(ctx, {
            type: "pie",   // 🔥 now pie chart
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Data",
                    data: data.values,
                    backgroundColor: colors
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: "black"
                        }
                    }
                }
            }
        });
    });
}
