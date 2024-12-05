document.getElementById('adicionar_btn').addEventListener('click', async function(event) {
    event.preventDefault();
    //pega os dados do form
    const nomeDaPeca = document.getElementById('nome').value;
    const horarioDaPeca = document.getElementById('horario').value;
    const teatroNome = document.getElementById('teatro').value; 
    const tipoDePeca = document.getElementById('tipo').value;

    try {
         adicionar(nomeDaPeca, horarioDaPeca, teatroNome, tipoDePeca);
    } catch (error) {
        console.error('Erro ao adicionar peça:', error);
    }
});
document.getElementById('listar_btn').addEventListener('click', async function(event) {
    event.preventDefault();
    try {
        listar();
    } catch (error) {
        console.error('Erro ao listar peças:', error);
    }
});

document.getElementById('remover_btn').addEventListener('click', async function(event) {
    const nomeDaPeca = document.getElementById('nome').value;
    const horarioDaPeca = document.getElementById('horario').value;
    const teatroNome = document.getElementById('teatro').value
    const tipoDePeca = document.getElementById('tipo').value;

    try {
        //procura o item baseado no objectId dele
        const objectId = await buscaObjectId(nomeDaPeca, horarioDaPeca, teatroNome,tipoDePeca);
        if (objectId) {
            //chama a função pra remover o item baseado no objectId
           remover(objectId);
           
        } else {
            alert('Peça não encontrada.');
        }
    } catch (error) {
        console.error('Erro ao remover a peça:', error);
    }
});


//chamando o back4app
const headers = {
    'X-Parse-Application-Id': 'LuHDHbf3p1GkPmUqkvDJj1mRachmOkr3YvoHBzHF',
    'X-Parse-REST-API-Key': 'W2n6avO8584kcK3KaESX3vD3vdNGR3Y9NHwscEJR',
    'Content-Type': 'application/json'
};


async function adicionar(nome, horario,teatro,tipo) {
    try {
        const response = await fetch('https://parseapi.back4app.com/classes/dados', {
            method: 'POST',
            headers,
            body: JSON.stringify({ nome, horario, teatro,tipo}),
        });
        if (response.ok) {
            alert('Peça adicionada com sucesso!');
        } else {
            const errorResponse = await response.json();
            console.error('Erro ao adicionar peça:', errorResponse);
            alert('Erro ao adicionar peça.');
        }
    } catch (error) {
        console.error('Erro ao adicionar peça:', error);
        alert('Erro ao adicionar peça.');
    }
}
async function buscaObjectId(nome, horario, teatro,tipo) {
    try {
        const busca = `?where=${encodeURIComponent(JSON.stringify({ nome, horario, teatro,tipo}))}`;
        const url = `https://parseapi.back4app.com/classes/dados${busca}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers
        });
        
        if (response.ok) {
            const jsonResponse = await response.json();
            //verifica se realmente tem algum item
            if (jsonResponse.results && jsonResponse.results.length > 0) {
                //retorna o objectId do item encontrado
                return jsonResponse.results[0].objectId;
            } else {
                return null; 
            }
        } else {
            const errorResponse = await response.json();
            console.error('Erro ao buscar dados:', errorResponse);
            throw new Error('Erro ao buscar dados.');
        }
    } catch (error) {
        console.error('Erro ao buscar ObjectId:', error);
        throw error;
    }
}
//listar para visualização e edição dos dados
async function listar() {
    try {
        const url = 'https://parseapi.back4app.com/classes/dados';
        const response = await fetch(url, {
            method: 'GET',
            headers
        });   
        if (response.ok) {
            const jsonResponse = await response.json()
            //verifica se possui item e adiciona ele numa lista pra visualização
            if (jsonResponse.results && jsonResponse.results.length > 0) {
                let listaHTML = '<ul>';  
                for (let i = 0; i < jsonResponse.results.length; i++) {
                    const item = jsonResponse.results[i];
                    listaHTML += `<li>${item.nome} - ${item.horario} - ${item.teatro} - ${item.tipo}</li>`;
                }
                listaHTML += '</ul>';  
                document.getElementById('lista_pecas').innerHTML = listaHTML;
            } else {
                document.getElementById('lista_pecas').innerHTML = 'Nenhuma peça encontrada.';
            }
        } else {
            const errorResponse = await response.json();
            console.error('Erro ao buscar peças:', errorResponse);
            alert('Erro ao listar peças.');
        }
    } catch (error) {
        console.error('Erro ao listar peças:', error);
        alert('Erro ao listar peças.');
    }
}
//remove uma peça baseada no objectId
async function remover(objectId) {
    try {
        const url = `https://parseapi.back4app.com/classes/dados/${objectId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers
        });
        if (response.ok) {
            alert('Peça removida com sucesso!');
        } else {
            const errorResponse = await response.json();
            console.error('Erro ao remover peça:', errorResponse);
            alert('Erro ao remover peça.');
        }
    } catch (error) {
        console.error('Erro ao remover peça:', error);
        alert('Erro ao remover peça.');
    }
    window.location.reload();
}
