// Adicionando o escopo DOMContentLoaded para garantir que o conteudo do HTML seja carregado antes do Javascript:

document.addEventListener("DOMContentLoaded", function() {

// Dados da tabela de classificação do IMC
    const data = [
        { 
            min: 0,
            max: 18.4,
            classification: "Menor que 18.5",
            info: "Magreza",
            obesity: "0",
        },
        { 
            min: 18.5,
            max: 24.9,
            classification: "Entre 18.5 e 24.9",
            info: "Normal",
            obesity: "0",
        },
        { 
            min: 25,
            max: 29.9,
            classification: "Entre 25 e 29.9",
            info: "Sobrepeso",
            obesity: "I",
        },
        { 
            min: 30,
            max: 39.9,
            classification: "Entre 30 e 39.9",
            info: "Obesidade",
            obesity: "II",
        },
        { 
            min: 40,
            max: 99,
            classification: "Maior que 40",
            info: "Obesidade grave",
            obesity: "III",
        }
    ];

    // Seleção dos elementos do DOM

    //Elemento Lista
    const imcTable = document.querySelector("#imc-table");

    //Elementos para adicionar Peso e Altura:
    const heightInput = document.querySelector("#height");
    const weightInput = document.querySelector("#weight");
    //Elementos dos botões Calcular e Limpar:
    const calcBtn = document.querySelector("#calc-btn");
    const clearBtn = document.querySelector("#clear-btn");

    //Elementos showOrHideResult - transição para tabela após o calculo:
    const calcContainer = document.querySelector("#calc-container");
    const resultContainer = document.querySelector("#result-container");


    //Elementos para visualização do número IMC e classificação:
    const imcNumber = document.querySelector("#imc-number span");
    const imcInfo = document.querySelector("#imc-info span");

    //Elemento botão voltar:
    const backBtn = document.querySelector("#back-btn");

    // Função para criar a tabela com os dados de classificação do IMC
    function createTable(data) {
        data.forEach((item) => {

            // Cria uma nova linha da tabela
            const row = document.createElement("div");
            row.classList.add("table-data");

            // Cria e adiciona as colunas da tabela
            const classification = document.createElement("p");
            classification.innerText = item.classification;

            const info = document.createElement("p");
            info.innerText = item.info;

            const obesity = document.createElement("p");
            obesity.innerText = item.obesity;

            row.appendChild(classification);
            row.appendChild(info);
            row.appendChild(obesity);

            // Adiciona a linha na tabela
            imcTable.appendChild(row);
        });

        // Após criar a tabela, exibir o botão "Voltar"
        backBtn.style.display = "block";
        backBtn.addEventListener("click", () =>{
            cleanInputs();
            showOrHideResults();
        });
    }

    // Chama a função para criar a tabela
    createTable(data);
    
    // Função para limpar os campos de entrada e os resultados
    function cleanInputs(){
        heightInput.value = "";
        weightInput.value = "";
        imcNumber.classList = "";
        imcInfo.classList = "";
    }

    //Função que valide apenas digitos:
    function validDigits(text){
        return text.replace(/[^0-9,]/g, "");
    }

    //Função de calculo:
    function calcImc(weight, height){
        return (weight / (height * height)).toFixed(1);
    }

    // Função para mostrar ou esconder os resultados
    function showOrHideResults(){
        calcContainer.classList.toggle("hide");
        resultContainer.classList.toggle("hide");
    }


    // Eventos

    //Evento que valida digitos passados pelo usuário:
    [heightInput, weightInput].forEach((el) => {
        el.addEventListener("input", (e) => {
            const updatedValue = validDigits(e.target.value);
            e.target.value = updatedValue;
        });
    });

    // Evento para o botão de calcular o IMC
    calcBtn.addEventListener('click', (e) => {
        e.preventDefault();

         // Obtém e valida os valores inseridos pelo usuário
        const weight = +weightInput.value.replace(",",".");
        const height = +heightInput.value.replace(",",".");

        // Valida se os valores são válidos
        if (!weight || !height) return;

        // Calcula o IMC
        const imc = calcImc(weight, height);
        
        // Determina a classificação e a situação com base no IMC calculado
        let info;

        data.forEach((item) => {
            if (imc >= item.min && imc <= item.max){
                info = item.info;
            }
        });

        if (!info) return;

        // Exibe o valor do IMC
        imcNumber.innerText = imc;

        // Exibe a situação baseada no IMC
        imcInfo.innerText = info;

        // Ajusta as cores com base na classificação
        switch(info){
            case "Magreza":
                imcNumber.classList.add("low");
                imcInfo.classList.add("low");
                break;
            
            case "Normal":
                imcNumber.classList.add("good");
                imcInfo.classList.add("good");
                break;
            case "Sobrepeso":
                imcNumber.classList.add("low");
                imcInfo.classList.add("low");
                break;
            case "Obesidade":
                imcNumber.classList.add("medium");
                imcInfo.classList.add("medium");
                break;
            case "Obesidade grave":
                imcNumber.classList.add("high");
                imcInfo.classList.add("high");
                break;
        }

        //Evento para retornar a pagina inicial após clicar no botão Voltar:
        showOrHideResults();
    });

    //Adicinando evento cleanInputs ao botão Limpar:
    clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        cleanInputs();
    });

});
