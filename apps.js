document.getElementById('teste').addEventListener('submit', function(event){
    event.preventDefault();
    //coletando os dados necessarios no formulario
    const nomeDaPeca = document.getElementById('nome').value
    const horarioDaPeca = document.getElementById('horario').value
    const dataDeCriacao = document.getElementById('datacriacao').value
    adicionar(nomeDaPeca, horarioDaPeca, dataDeCriacao)
})    
    
// iniciando o CRUD (nao vou terminar agora, to aprendendo ainda e falta falar com vcs pra ver se os dados vao ser esses mesmo)
const headers = {
    'X-Parse-Application-Id': 'PobsilDKuNcuuWiy5XWQbhqOM5CojkziJ5jDauQx',
    'X-Parse-REST-API-Key': '9UdaVeLPmwdW6nQHLepEO7zHFlNrPIRgkAR2vWvG',
    'Content-Type': 'application/json'
}

async function adicionar(nome, horario, data) {
    try{
        const response = await fetch('https://parseapi.back4app.com/classes/Pecas', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                nome: nome,
                horario: horario,
                data: data
            })
        });
            if (response.ok) {
                const jsonResponse = await response.json();
                alert('Peça adicionada com sucesso!');
            } else {
                const errorResponse = await response.json();
                console.error('Erro ao adicionar peça:', errorResponse);
                alert('Erro ao adicionar peça.');
            }
    } catch (error) {
        console.error('Erro', error);
        alert('Erro');
    }
}

