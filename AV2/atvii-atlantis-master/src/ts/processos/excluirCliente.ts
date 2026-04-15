import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExcluirCliente extends Processo{
    processar(): void {
        console.log("Excluindo cliente...")
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
            console.log('Cliente inválido! >:(')
            return
        }
        
        armazem.Clientes.splice(indice, 1)

        console.log('Finalizando exclusão do cliente...')
    }
}