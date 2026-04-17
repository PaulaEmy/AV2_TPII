import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class DesvincularDependente extends Processo {
    processar(): void {
        console.log('Desvinculando dependente...')

        let armazem = Armazem.InstanciaUnica
        let clientes = armazem.Clientes

        let titulares = clientes.filter(c => c.Titular === undefined)

        if (titulares.length === 0) {
            console.log('Nenhum titular cadastrado.')
            return
        }

        console.log('Escolha um titular:')

        titulares.forEach((t, index) => {
            console.log(`${index} - ${t.Nome}`)
        })

        let indice = this.entrada.receberNumero('Digite o número do titular:')
        let titular = titulares[indice]

        if (!titular) {
            console.log('Titular inválido!')
            return
        }

        if (titular.Dependentes.length === 0) {
            console.log('Este titular não possui dependentes.')
            return
        }

        console.log('\nDependentes:')

        titular.Dependentes.forEach((d, index) => {
            console.log(`${index} - ${d.Nome}`)
        })

        let indiceDep = this.entrada.receberNumero('Qual dependente deseja desvincular?')
        let dependente = titular.Dependentes[indiceDep]

        if (!dependente) {
            console.log('Dependente inválido!')
            return
        }

        titular.Dependentes.splice(indiceDep, 1)

        dependente.desvincularTitular()

        console.log('Dependente desvinculado com sucesso!')
    }
}