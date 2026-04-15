import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Endereco from "../modelos/endereco";

export default class EditarCliente extends Processo {
    processar(): void {
        console.log("Editando cliente...")

        let armazem = Armazem.InstanciaUnica
        let clientes = armazem.Clientes

        if (clientes.length === 0) {
            console.log('Nenhum cliente cadastrado.')
            return
        }

        console.log('Escolha um cliente:')

        clientes.forEach((c, index) => {
            console.log(`${index} - ${c.Nome}`)
        })

        let indice = this.entrada.receberNumero('Digite o número do cliente:')
        let cliente = clientes[indice]

        if (!cliente) {
            console.log('Cliente inválido!')
            return
        }

        console.log('\nO que deseja editar?')
        console.log('1 - Nome')
        console.log('2 - Nome Social')
        console.log('3 - Endereço')
        console.log('0 - Sair')

        let opcao = this.entrada.receberNumero('Escolha uma opção:')

        switch (opcao) {

            case 1:
                let novoNome = this.entrada.receberTexto('Novo nome:')
                cliente.alterarNome(novoNome)
                break

            case 2:
                let novoNomeSocial = this.entrada.receberTexto('Novo nome social:')
                cliente.alterarNomeSocial(novoNomeSocial)
                break

            case 3:
                let rua = this.entrada.receberTexto('Rua:')
                let bairro = this.entrada.receberTexto('Bairro:')
                let cidade = this.entrada.receberTexto('Cidade:')
                let estado = this.entrada.receberTexto('Estado:')
                let pais = this.entrada.receberTexto('País:')
                let codigoPostal = this.entrada.receberTexto('Código Postal:')

                let endereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal)
                cliente.Endereco = endereco
                break

            default:
                console.log('Opção inválida! >:(')
                return
        }

        console.log('Cliente atualizado com sucesso! :D')
    }
}