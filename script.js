// Seleciona os elementos do formulário

const amount = document.getElementById('amount');


// Capturando o evento de input para formatar o valor.
amount.oninput = () => {
    // Obtém o valor atual do input e remove os caracteres não numéricos.
    let value = amount.value.replace(/\D/g, "");

    // Transformar o valor em centavos
    value = Number(value) / 100;

    // Atualiza o valor do input.
    amount.value = formatCurrencyBRL(value);
}

function formatCurrencyBRL(value){
    // Foremata o valor no padrão BRL
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}