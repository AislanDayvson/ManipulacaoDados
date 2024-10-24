import countBy from "./countBy.js";

type TransacaoValor = Transacao & {valor: number}
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
    return transacao.valor !== null
}

export default class Estatisticas{
    private transacoes;
    public total;
    public pagamento;
    public status;
    public semana;
    public melhorDia;
    constructor(transacoes: Transacao[]){
        this.transacoes = transacoes
        this.total = this.setTotal()
        this.pagamento = this.setPagamento()
        this.status = this.setStatus()
        this.semana = this.setSemana()
        this.melhorDia = this.setMelhorDia()
    }
    private setTotal(){
        return this.transacoes.filter(filtrarValor)
        .reduce((acc, item) => {
            return acc + item.valor;
        }, 0)
    }
    private setPagamento(){
        return countBy(this.transacoes.map(({pagamento}) => pagamento))
    }
    private setStatus(){
        return countBy(this.transacoes.map(({status}) => status))
    }
    private setSemana(){
        const semana =  {
            ['Domingo']: 0,
            ['Segunda']: 0,
            ['Terça-Feira']: 0,
            ['Quarta-Feira']: 0,
            ['Quinta-Feira']: 0,
            ['Sexta-Feira']: 0,
            ['Sábado']: 0
        }
        for(let i = 0; i < this.transacoes.length; i++){
            const day = this.transacoes[i].data.getDay()
            if(day === 0 ) semana['Domingo'] += 1
            if(day === 1 ) semana['Segunda'] += 1
            if(day === 2 ) semana['Terça-Feira'] += 1
            if(day === 3 ) semana['Quarta-Feira'] += 1
            if(day === 4 ) semana['Quinta-Feira'] += 1
            if(day === 5 ) semana['Sexta-Feira'] += 1
            if(day === 6 ) semana['Sábado'] += 1
        }
        return semana
    }
    private setMelhorDia(){
       return Object.entries(this.semana).sort((a, b) =>{
            return b[1] - a[1]
        })[0]
    }
}

