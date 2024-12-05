
fetch('https://parseapi.back4app.com/parse/classes/dados', {
    headers: {
        'X-Parse-Application-Id': 'LuHDHbf3p1GkPmUqkvDJj1mRachmOkr3YvoHBzHF',
        'X-Parse-REST-API-Key': 'W2n6avO8584kcK3KaESX3vD3vdNGR3Y9NHwscEJR'
    }
})
.then(response => response.json())
.then(data => {
    const teatroData = {}; // Objeto para agrupar tipos e contar peças por teatro

    const resultados = data.results || data; // Garantir que estamos trabalhando com os resultados
    resultados.forEach(item => {
        const teatro = item.teatro; // Nome do teatro
        const tipo = item.tipo; // Tipo da peça (e.g., "Infantil", "Drama")
        const nome = item.nome; // Nome da peça
        if (teatro && tipo && nome) {
            // Inicializa o teatro se não existir
            if (!teatroData[teatro]) {
                teatroData[teatro] = {};
            }
            // Inicializa o tipo dentro do teatro se não existir
            if (!teatroData[teatro][tipo]) {
                teatroData[teatro][tipo] = 0;
            }
            // Incrementa a contagem de peças do tipo no teatro
            teatroData[teatro][tipo]++;
        }
    });

    console.log("Dados agrupados por teatro e tipo:", teatroData);

    // Primeiro gráfico - Quantidade total de peças por teatro
    const labels1 = Object.keys(teatroData); // Nomes dos teatros
    const data_chart1 = labels1.map(teatro => {
        const tipos = teatroData[teatro];
        return Object.values(tipos).reduce((sum, count) => sum + count, 0); // Soma total de peças por teatro
    });

    // Segundo gráfico - Quantidade de peças por tipo em cada teatro
    const tiposTooltip = labels1.map(teatro => {
        const tipos = teatroData[teatro];
        return Object.entries(tipos)
            .map(([tipo, count]) => `${tipo}: ${count} peças`)
            .join(", ");
    });

    console.log("Labels (Teatros) Gráfico 1:", labels1);
    console.log("Data Chart (Contagem de Peças) Gráfico 1:", data_chart1);
    console.log("Tipos para Tooltip Gráfico 2:", tiposTooltip);

    // Renderizar o primeiro gráfico (Total de Peças por Teatro)
    var ctx1 = document.getElementById("chart1").getContext("2d");
    var chart1 = new Chart(ctx1, {
        type: "pie",
        data: {
            labels: labels1, // Teatros
            datasets: [{
                label: "Quantidade de Peças por Teatro",
                data: data_chart1, // Contagem de peças por teatro
                backgroundColor: ["#3c096c", "#5a189a", "#7b2cbf", "#9d4edd", "#c77dff"],
                borderColor: "#FFFFFF",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const teatro = tooltipItem.label;
                            const index = tooltipItem.dataIndex;
                            return `Teatro: ${teatro}, Quantidade de Peças: ${data_chart1[index]}`;
                        }
                    }
                }
            }
        }
    });

    // Renderizar o segundo gráfico (Quantidade de Peças por Tipo em cada Teatro)
    var ctx2 = document.getElementById("chart2").getContext("2d");
    var chart2 = new Chart(ctx2, {
        type: "pie",
        data: {
            labels: labels1, // Teatros
            datasets: [{
                label: "Quantidade de Peças por Tipo",
                data: data_chart1, // Usando a mesma contagem, pois é o total de peças por teatro
                backgroundColor: ["#9d0208", "#dc2f02", "#e85d04", "#f48c06", "#faa307"],
                borderColor: "#FFFFFF",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const teatro = tooltipItem.label;
                            const index = tooltipItem.dataIndex;
                            return `${teatro}: ${tiposTooltip[index]}`;
                        }
                    }
                }
            }
        }
    });

})
.catch(error => {
    console.error('Erro:', error);
});

fetch('https://parseapi.back4app.com/parse/classes/dados', {
    headers: {
        'X-Parse-Application-Id': 'LuHDHbf3p1GkPmUqkvDJj1mRachmOkr3YvoHBzHF',
        'X-Parse-REST-API-Key': 'W2n6avO8584kcK3KaESX3vD3vdNGR3Y9NHwscEJR'
    }
})
.then(response => response.json())
.then(data => {
    const teatroData = {}; // Objeto para agrupar tipos e contar peças por teatro
    const horarioData = {}; // Objeto para agrupar horários e contar peças por teatro

    const resultados = data.results || data; // Garantir que estamos trabalhando com os resultados
    resultados.forEach(item => {
        const teatro = item.teatro; // Nome do teatro
        const horario = item.horario; // Horário da peça
        const nome = item.nome; // Nome da peça
        if (teatro && horario && nome) {
            // Agrupar dados para teatro e horário
            if (!horarioData[teatro]) {
                horarioData[teatro] = {};
            }
            if (!horarioData[teatro][horario]) {
                horarioData[teatro][horario] = 0;
            }
            horarioData[teatro][horario]++;

            // Agrupando para o gráfico de barras
            if (!teatroData[teatro]) {
                teatroData[teatro] = {};
            }
            if (!teatroData[teatro][horario]) {
                teatroData[teatro][horario] = 0;
            }
            teatroData[teatro][horario]++;
        }
    });

    console.log("Dados agrupados por teatro e horário:", horarioData);

    // Preparar os dados para o gráfico de barras
    const labels2 = Object.keys(horarioData); // Nomes dos teatros (labels para o eixo X)
    const horarios = Object.keys(resultados.reduce((acc, item) => {
        acc[item.horario] = true;
        return acc;
    }, {})); // Lista única de horários

    const datasets = horarios.map(horario => {
        return {
            label: `Horário: ${horario}`,
            data: labels2.map(teatro => teatroData[teatro][horario] || 0), // Quantidade de peças para cada teatro e horário
            backgroundColor: "#b30027",
            borderColor: "#FFFFFF",
            borderWidth: 2
        };
    });

    console.log("Horários (labels) para o gráfico de barras:", horarios);
    console.log("Datasets (dados das peças por horário e teatro):", datasets);

    // Renderizar o gráfico de barras
    var ctx3 = document.getElementById("chart3").getContext("2d");
    var chart3 = new Chart(ctx3, {
        type: "bar",
        data: {
            labels: labels2, // Teatros
            datasets: datasets // Dados agrupados por horário e teatro
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const teatro = tooltipItem.label;
                            const dataset = tooltipItem.datasetIndex;
                            const horario = horarios[dataset];
                            return `${teatro} - Horário: ${horario}, Quantidade de Peças: ${tooltipItem.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Teatros'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Quantidade de Peças'
                    },
                    beginAtZero: true
                }
            }
        }
    });
})
.catch(error => {
    console.error('Erro:', error);
});

function listarDados() {
    fetch('https://parseapi.back4app.com/parse/classes/dados', {
        headers: {
            'X-Parse-Application-Id': 'LuHDHbf3p1GkPmUqkvDJj1mRachmOkr3YvoHBzHF',
            'X-Parse-REST-API-Key': 'W2n6avO8584kcK3KaESX3vD3vdNGR3Y9NHwscEJR'
        }
    })
    .then(response => response.json())
    .then(data => {
        const resultados = data.results || [];
        const listaContainer = document.getElementById('lista-teatros');
        listaContainer.innerHTML = '';

        resultados.forEach(item => {
            const nome = item.nome || "Nome indisponível";
            const horario = item.horario || "Horário indisponível";
            const teatro = item.teatro || "Teatro indisponível";

            const listItem = document.createElement('div');
            listItem.classList.add('list-item');
            listItem.innerHTML = `
                <strong>Nome:</strong> ${nome}<br>
                <strong>Horário:</strong> ${horario}<br>
                <strong>Teatro:</strong> ${teatro}
            `;
            listaContainer.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar os dados:', error);
    });
}

listarDados();