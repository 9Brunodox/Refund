// Seleciona os elementos do formulário

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

// Capturando o evento de input para formatar o valor.
amount.oninput = () => {
  // Obtém o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // Transformar o valor em centatos (exemplo: 150/100 = 1.5 é equivalente a R$ 1,50)
  value = Number(value) / 100;

  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Foremata o valor no padrão BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

// Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (e) => {
  // Previne o comportamento padrão de recarregar a página.
  e.preventDefault();

  // Cria um objeto com os detalhes da nova despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  // Chama a função que irá adicionar o item na lista
  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar na lista.
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // Cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Cria o valor da despesa.
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // Cria o ícone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", `img/remove.svg`);
    removeIcon.setAttribute("alt", "remover");

    // Adiciona os itens dentro da div
    expenseInfo.append(expenseName, expenseCategory);

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adiciona o item na lista
    expenseList.append(expenseItem);

    // Limpa o formulário
    formClear()

    // Atualiza os totais
    updateTotals();

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}

function updateTotals(){
  try{
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children

    // Atualiza a quantidade de itens da lista.
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"} `

    // Variável para incrementar o total
    let total = 0

    // Percorre cada item (li) da lista (ul)
    for(let item = 0; item < items.length; item++){
      const itemAmount= items[item].querySelector(".expense-amount")

      // Remover caracteres não uméricos e substitui a vírgula pelo ponto
      let value = itemAmount.textContent
      .replace(/[^\d,]/g, "")
      .replace(",", ".")

      // Converte o valor para float.
      value = parseFloat(value)

      if(isNaN(value)){
        return alert("O valor não é um número")
      }
      
      // Soma o valor ao total
      total += Number(value)
      
    }

    // Cria a span para adicionar o R$ formatado.
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    expensesTotal.innerHTML = ""
    expensesTotal.append(symbolBRL, total)


  }catch(error){
    console.log(error);
    alert("Não foi possível atualizar os totais.");
  }
}

expenseList.addEventListener("click", function (event){
  // Verifica se o elemento clicado é o ícone de remover
  if(event.target.classList.contains("remove-icon")){
    const item = event.target.closest(".expense")
    item.remove()
  }

  updateTotals()
})

function formClear(){
  expense.value = ""
  category.value = ""
  amount.value = ""

  expense.focus()
}
