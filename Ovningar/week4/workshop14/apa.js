const ctx = document.getElementById('myChart');

fetch('https://raw.githubusercontent.com/SkillWebDemo/ChartDemo/refs/heads/main/skelleftea.json')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        const labels = Object.keys(data); // Get the keys (months)
        const values = Object.values(data); // Get the values (temperatures)

        new Chart(ctx, {
            type: 'line',
            data:{
                labels: labels,
                datasets: [{
                    label: '#degrees',
                    data: values,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    });