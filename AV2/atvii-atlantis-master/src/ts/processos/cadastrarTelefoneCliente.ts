import Processo from "../abstracoes/processo";
import MenuTelefone from "../menus/menuTelefone";
import Cliente from "../modelos/cliente";
import CadastroTelefone from "./cadastroTelefone";

export default class CadastrarTelefoneCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuTelefone()
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de telefone...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.processo = new CadastroTelefone(this.cliente)
                    this.processo.processar()
                    break;
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}