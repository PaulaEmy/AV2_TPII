import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";

export default class CadastroTelefone extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let ddd = this.entrada.receberTexto('Qual o DDD do telefone?')
        let numero = this.entrada.receberTexto('Qual número?')
        let telefone = new Telefone(ddd, numero)
        this.cliente.Telefones.push(telefone)
    }
}