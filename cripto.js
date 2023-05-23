// Função para carregar as opções de criptomoedas
function loadCryptoOptions() {
    var cryptoSelect = document.getElementById('cryptoSelect');

    // Faz uma solicitação à API CoinGecko para obter a lista de criptomoedas
    var url = 'https://api.coingecko.com/api/v3/coins/list';

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Itera sobre a lista de criptomoedas e adiciona as opções ao elemento select
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement('option');
                option.value = data[i].id;
                option.text = data[i].name;
                cryptoSelect.appendChild(option);
            }
        })
        .catch(function(error) {
            console.log('Erro ao carregar as opções de criptomoedas:', error);
        });
}

// Função para carregar as opções de moedas
function loadCurrencyOptions() {
    var currencySelect = document.getElementById('currencySelect');

    // Lista de moedas convencionais
    var currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'BRL'];

    // Adiciona as opções de moedas ao elemento select
    for (var i = 0; i < currencies.length; i++) {
        var option = document.createElement('option');
        option.value = currencies[i];
        option.text = currencies[i];
        currencySelect.appendChild(option);
    }
}

// Chama as funções para carregar as opções de criptomoedas e moedas ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    loadCryptoOptions();
    loadCurrencyOptions();
});

// Função para obter o valor da criptomoeda e atualizar a exibição
function getCryptoValue() {
    // Obtém a criptomoeda selecionada
    var cryptoSelect = document.getElementById('cryptoSelect');
    var selectedCrypto = cryptoSelect.value;

    // Obtém a moeda selecionada
    var currencySelect = document.getElementById('currencySelect');
    var selectedCurrency = currencySelect.value;

    // Obtém a quantidade de criptomoedas inserida pelo usuário
    var amountInput = document.getElementById('amountInput');
    var amount = parseFloat(amountInput.value);

    // Verifica se a quantidade de criptomoedas é válida
    if (isNaN(amount) || amount <= 0) {
        var resultDiv = document.getElementById('ValorResult');
        resultDiv.innerHTML = 'Insira uma quantidade válida de criptomoedas.';
        return;
    }

    // Faz uma solicitação à API para obter o valor da criptomoeda em relação à moeda selecionada
    var url = `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=${selectedCurrency}`;

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Verifica se a resposta contém os dados corretos
            if (data[selectedCrypto] && data[selectedCrypto][selectedCurrency]) {
                var cryptoValue = data[selectedCrypto][selectedCurrency];
                var convertedValue = amount * cryptoValue;

                var resultDiv = document.getElementById('ValorResult');
                resultDiv.innerHTML = `${amount} ${selectedCrypto.toUpperCase()} = ${convertedValue} ${selectedCurrency.toUpperCase()}`;
            } else {
                var resultDiv = document.getElementById('ValorResult');
                resultDiv.innerHTML = 'Não foi possível obter o valor da criptomoeda em relação à moeda selecionada.';
            }
        })
        .catch(function(error) {
            var resultDiv = document.getElementById('ValorResult');
            resultDiv.innerHTML = 'Erro ao obter o valor da criptomoeda: ' + error;
        });
}

// Adiciona um evento de clique ao botão para chamar a função getCryptoValue()
var buttonCripto = document.getElementById('cripto');
buttonCripto.addEventListener('click', getCryptoValue);
