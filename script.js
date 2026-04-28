let chart;

function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    let formData = new FormData();
    formData.append("file", file);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        renderChart(data.labels, data.values);
    });
}

function renderChart(labels, values) {
    const ctx = document.getElementById("chart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Sales Data",
                data: values
            }]
        }
    });
}
