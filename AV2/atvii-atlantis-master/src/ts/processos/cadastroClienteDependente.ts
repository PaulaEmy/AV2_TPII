import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastrarTelefoneCliente from "./cadastrarTelefoneCliente";
import CadastroEnderecoDependente from "./cadastroEnderecoDependente";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente...')
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        this.processo = new CadastroEnderecoDependente(cliente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        this.processo = new CadastrarTelefoneCliente(cliente)
        this.processo.processar()

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
            console.log('Titular inválido!')
            return
        }

        cliente.Titular = titular
        titular.Dependentes.push(cliente)

        armazem.Clientes.push(cliente)

        console.log('Finalizando o cadastro do cliente...')
    }
}