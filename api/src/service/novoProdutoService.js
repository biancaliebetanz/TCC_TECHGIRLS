

export function lerValorFrete(frete) {
    if (frete === 'Normal')
        return 10.0;
    else
        return 25.0;
}


export function criarNovoPedido(usuario, info, idcartao) {
    
    let agora = new Date();
    let valorFrete = lerValorFrete(info.frete);

    return {
        usuario: usuario,
        endereco: info.endereco,
        cartao:   idcartao.id,
        tipoFrete: info.tipoFrete,
        situacao: 'Aguardando Pagamento',
        data: agora,
        frete: valorFrete
    }
}