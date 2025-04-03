    // variavel modalKey sera global
    let modalKey = 0

    // variavel para controlar a quantidade inicial do produto na modal
    let quantcatalogs = 1

    // funções auxiliares ou uteis
    const seleciona = (elemento) => document.querySelector(elemento)
    const selecionaTodos = elemento => document.querySelectorAll(elemento)

    // função para formatar preço no formato correto
    const formatoReal = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    // função para abrir o modal
    const abrirModal = () => {
        seleciona('.catalogWindowArea').style.opacity = 0
        seleciona('.catalogWindowArea').style.display = 'flex'
        setTimeout(() => seleciona('.catalogWindowArea').style.opacity = 1, 50)
    }

    //função para fechar o modal
    const fecharModal = () => {
        seleciona('.catalogWindowArea').style.opacity = 0
        setTimeout(() => seleciona('.catalogWindowArea').style.display = 'none', 500)
    }

    //função que atribui a função de fechar o modal nos botões
    const botoesFechar = () => {
        selecionaTodos('.catalogInfo--cancelButton, .catalogInfo--cancelMobileButton').forEach((item) => {
            item.addEventListener('click', fecharModal)
        })
    }

    // função para preencher os dados de cada produto no catalgo
    const preencherDadoscatalogs = (catalogItem, item, index) => {
        catalogItem.setAttribute('data-key', index)
        catalogItem.querySelector('.catalog-item--img img').src = item.imagem   
        catalogItem.querySelector('.catalog-item--price').innerHTML = formatoReal(item.preco)
        catalogItem.querySelector('.catalog-item--name').innerHTML = item.nome
    }

    // função para preencher os dados do modal pelo produto clicado
    const preencheDadosModal = (item) => {
        seleciona('.catalogInfo h1').innerHTML = item.nome
        seleciona('.catalogBig img').src = item.imagem
        seleciona('.catalogInfo--actualPrice').innerHTML = formatoReal(item.preco)
    }

    // função para pegar o produto clicado no catalogo
    const pegarKey = (e) => {
        let key = e.target.closest('.catalog-item').getAttribute('data-key')
        quantcatalogs = 1
        modalKey = key
        return key
    }

    // função para aumentar e diminuir quantidade no modal
    const mudarQuantidade = () => {
        seleciona('.catalogInfo--qtmais').addEventListener('click', () => {
            quantcatalogs++
            seleciona('.catalogInfo--qt').innerHTML = quantcatalogs
        })

        seleciona('.catalogInfo--qtmenos').addEventListener('click', () => {
            if(quantcatalogs > 1) {
                quantcatalogs--
                seleciona('.catalogInfo--qt').innerHTML = quantcatalogs
            }
        })
    }

    // função para fechar o modal ao clicar em adicionar produto
    const adicionarNoCarrinho = () => {
        seleciona('.catalogInfo--addButton').addEventListener('click', () => {
            fecharModal();
        });
    };

    // fazendo um mapeamento 
    catalogJson.map((item, index ) => {
        let catalogItem = document.querySelector('.models .catalog-item').cloneNode(true)
        seleciona('.catalog-area').append(catalogItem)

        // preencher os dados de cada produto no catalogo
        preencherDadoscatalogs(catalogItem, item, index)

        // pega o produto clicado
        catalogItem.querySelector('.catalog-item a').addEventListener('click', (e) => {
            e.preventDefault()

            // chamando a função de pegar produto clicado pelo data-key
            pegarKey(e)

            //abrir janela modal
            abrirModal()

            // preenchimento dos dados
        preencheDadosModal(item)

        seleciona('.catalogInfo--qt').innerHTML = quantcatalogs

        

        })
        
        botoesFechar()
        
    })
    mudarQuantidade()  
    adicionarNoCarrinho()
