import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemDependentes extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('Iniciando a listagem dos clientes dependentes do titular...')

        let armazem = Armazem.InstanciaUnica
        let clientes = armazem.Clientes

        let titulares = clientes.filter(c => !c.Titular)

        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado.')
            return
        }

        console.log('Escolha um titular:')

        titulares.forEach((c, index) => {
            console.log(`${index} - ${c.Nome}`)
        })

        let indice = this.entrada.receberNumero('Digite o número do titular:')
        let titular = titulares[indice]

        if (!titular) {
            console.log('Titular inválido! >:(')
            return
        }
        this.clientes.forEach(cliente => {
            if (cliente.Titular === titular) {
                this.impressor = new ImpressaorCliente(cliente)
                console.log(this.impressor.imprimir())
            }
        })
    }
    private dependente(cliente: Cliente): boolean {
        return cliente.Titular !== undefined
    }
}