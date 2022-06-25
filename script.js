function calcularMedia(notas) {

    let soma = 0;
    for (c = 0; c < notas.length; c++) {
        soma += notas[c];
    }

    media = soma / notas.length;

    return media;

}

let media; // escopo global

function aprovacao(notas) {

    let media = calcularMedia(notas); // escopo da função

    let condicao = media >= 8 ? "aprovado" : "reprovado";

    return 'Média: ' + media + ' - Resultado: ' + condicao;

}


// Função Recursivas

function contagemRegressiva(numero) {

    console.log(numero);

    let proximoNumero = numero - 1;

    if (proximoNumero > 0)
        contagemRegressiva(proximoNumero);

}

// contagemRegressiva(50);

/* 
 * Formulário envio de dados para cálculo da média 
 */
const formulario2 = document.getElementById('formulario-02');

if (formulario2)
    formulario2.addEventListener('submit', function (evento) {
        evento.preventDefault();
        evento.stopPropagation();

        if (this.getAttribute('class').match(/erro/)) {
            return false;
        }

        let dados = new FormData(this);

        for (let key of dados.keys()) {

            let numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)) : 0; // é um número

            if (!isNaN(numero)) {
                notas.push(numero);
            }

        }

        console.log(notas);

        texto = aprovacao(notas)

        document.getElementById('resultado').innerHTML = texto;

    });


function validaCampo(elemento) {

    elemento.addEventListener('focusout', function (event) {

        event.preventDefault();

        if (this.value == "") {
            document.querySelector('.mensagem').innerHTML = "Verifique o preenchimento dos campos em destaque.";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        } else {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        }

    });

}

function validaCampoNumerico(elemento) {

    elemento.addEventListener('focusout', function (event) {

        event.preventDefault();

        let numero = this.value.match(/^[\d]5-[\d]3/) ? this.value.replace(/-/, "") : this.value;

        if (numero != "" && numero.match(/[0-9]*/) && numero >= 0) {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "Verifique o preenchimento dos campos CEP ou Telefone. Incluir apenas números.";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }

    });

}


function validaEmail(elemento) {

    elemento.addEventListener('focusout', function (event) {

        event.preventDefault();

        const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
        if (this.value.match(emailValido)) {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "Verifique o preenchimento do campo de email - Apenas emails válidos.";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }

    });

}

function validaUF(elemento) {
    elemento.addEventListener('focusout', function (event) {
        event.preventDefault();

        const ufValido = /\d/i;

        if (!this.value.match(ufValido) && this.value.length == 2) {
            document.querySelector('.mensagem').innerHTML = "";
            this.classList.remove('erro');
            this.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "Verifique o preenchimento do campo UF - Apenas letras e no máximo dois dígitos.";
            this.classList.add('erro');
            this.parentNode.classList.add('erro');
            return false;
        }

    });

}



let camposObrigatorios = document.querySelectorAll('input.obrigatorio');
let camposNumericos = document.querySelectorAll('input.numerico');
let camposEmail = document.querySelectorAll('input.email');
let campoUF = document.querySelectorAll('input.uf')

for (let emFoco of campoUF) {
    validaUF(emFoco)
}

for (let emFoco of camposObrigatorios) {
    validaCampo(emFoco);
}

for (let emFoco of camposNumericos) {
    validaCampoNumerico(emFoco);
}

for (let emFoco of camposEmail) {
    validaEmail(emFoco);
}

function checkInputs(inputs) {
    var filled = true;

    inputs.forEach(function (input) {

        if (input.value === "") {
            filled = false;
        }

    });

    return filled;

}
var inputs = document.querySelectorAll("input");
var button = document.querySelector("button");
inputs.forEach(function (input) {
    // alteramos button.disabled = true | false para button.style.visibility='hidden' | 'block';
    input.addEventListener("keyup", function () {
        if (checkInputs(inputs)) {
            button.style.visibility = 'visible'; // mudou aqui
            document.querySelector('.mensagem').innerHTML = "";
        } else {
            button.style.visibility = 'hidden'; // mudou aqui também
        }
    });
});

function validar() {
    document.querySelector('.mensagem').innerHTML = "Cadastro feito com sucesso!";
}
