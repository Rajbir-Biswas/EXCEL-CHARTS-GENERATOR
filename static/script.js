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

        if (data.error) {
            alert(data.error);
            return;
        }

        const ctx = document.getElementById("chart");

        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        "#4cc9f0",
                        "#4895ef",
                        "#4361ee",
                        "#3a0ca3",
                        "#7209b7",
                        "#f72585"
                    ]
                }]
            }
        });
    });
}
