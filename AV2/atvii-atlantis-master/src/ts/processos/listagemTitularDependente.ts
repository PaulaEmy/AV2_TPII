import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemTitularDependente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.clear()
        console.log('Iniciando a listagem do titular de um dependente...')

        let armazem = Armazem.InstanciaUnica
        let clientes = armazem.Clientes

        let dependentes = clientes.filter(c => c.Titular !== undefined)

        if (dependentes.length === 0) {
            console.log('Nenhum dependente cadastrado :(')
            return
        }

        console.log('Escolha um dependente:')

        dependentes.forEach((c, index) => {
            console.log(`${index} - ${c.Nome}`)
        })

        let indice = this.entrada.receberNumero('Digite o número do dependente:')
        let dependente = dependentes[indice]

        if (!dependente) {
            console.log('Dependente inválido! >:(')
            return
        }

        let titular = dependente.Titular

        if (!titular) {
            console.log('Dependente sem titular :O')
            return
        }

        console.log('Titular do dependente:')
        this.impressor = new ImpressaorCliente(titular)
        console.log(this.impressor.imprimir())
    }
}