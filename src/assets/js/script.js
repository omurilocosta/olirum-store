    // variavel modalKey sera global
    let modalKey = 0

    // variavel para controlar a quantidade inicial de catalogs na modal
    let quantcatalogs = 1

    let click = false

    let cart = [] //carrinho

    // funções auxiliares ou uteis
    const seleciona = (elemento) => document.querySelector(elemento)
    const selecionaTodos = elemento => document.querySelectorAll(elemento)

    const formatoReal = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const formatoMonetario = (valor) => {
        if(valor) {
            return valor.toFixed(2)
        }
    }
    const abrirModal = () => {
        seleciona('.catalogWindowArea').style.opacity = 0
        seleciona('.catalogWindowArea').style.display = 'flex'
        setTimeout(() => seleciona('.catalogWindowArea').style.opacity = 1, 150)
    }
    const fecharModal = () => {
        seleciona('.catalogWindowArea').style.opacity = 0
        setTimeout(() => seleciona('.catalogWindowArea').style.display = 'none', 500)
    }
    const botoesFechar = () => {
        selecionaTodos('.catalogInfo--cancelButton, .catalogInfo--cancelMobileButton').forEach((item) => {
            item.addEventListener('click', fecharModal)
        })
    }
    const preencherDadoscatalogs = (catalogItem, item, index) => {
        catalogItem.setAttribute('data-key', index)
        catalogItem.querySelector('.catalog-item--img img').src = item.imagem   
        catalogItem.querySelector('.catalog-item--price').innerHTML = formatoReal(item.preco)
        catalogItem.querySelector('.catalog-item--name').innerHTML = item.nome
    }
    const preencheDadosModal = (item) => {
        seleciona('.catalogInfo h1').innerHTML = item.nome
        seleciona('.catalogBig img').src = item.imagem
        seleciona('.catalogInfo--actualPrice').innerHTML = formatoReal(item.preco)
    }
    const pegarKey = (e) => {
        let key = e.target.closest('.catalog-item').getAttribute('data-key')

        quantcatalogs = 1
        modalKey = key
        return key
    }
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
    const adicionarNoCarrinho = () => {
        seleciona('.catalogInfo--addButton').addEventListener('click', () => {
            console.log('Adicionar no carrinho');
    
            console.log('catalog ' + modalKey);
    
            console.log('Quant. ' + quantcatalogs);
    
            let price = seleciona('.catalogInfo--actualPrice').innerHTML.replace('R$&nbsp;','');
    
            let size = 1
            let identificador = catalogJson[modalKey].id + 't' + size;
            let itemIndex = cart.findIndex(item => item.identificador === identificador);
    
            if (itemIndex !== -1) {
                cart[itemIndex].qt += quantcatalogs;
            } else {
                let catalog = {
                    identificador,
                    id: catalogJson[modalKey].id,
                    qt: quantcatalogs,
                    price: parseFloat(price)
                };
                cart.push(catalog);
            }
    
            fecharModal();
            abrirCarrinho()
            atualizarCarrinho(); 
        });
    };

    catalogJson.map((item, index ) => {
        //console.log(item)
        let catalogItem = document.querySelector('.models .catalog-item').cloneNode(true)
        //console.log(catalogItem)
        seleciona('.catalog-area').append(catalogItem)

        // preencher os dados de cada catalog
        preencherDadoscatalogs(catalogItem, item, index)

        // catalog clicada

        catalogItem.querySelector('.catalog-item a').addEventListener('click', (e) => {
            e.preventDefault()

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
