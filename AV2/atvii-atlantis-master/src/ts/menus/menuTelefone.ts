import Menu from "../interfaces/menu";

export default class MenuTelefone implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Deseja cadastrar um telefone? `)
        console.log(`----------------------`)
        console.log(`| 1 - Sim`)
        console.log(`| 0 - Finalizar cadastro de telefone`)
        console.log(`----------------------`)
    }
}