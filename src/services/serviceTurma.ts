import { AppDataSource } from "../databases/connections/data-source"
import Turma from "../databases/models/turma"

// 1) Estabelece conexão com a tabela alvo no banco de dados através de um cursor

const cursor = AppDataSource.getRepository(Turma)

// 2) Recebe dados da Requisição HTTP lá do FRONTEND

type newTurmaRequest = {
  data_inicio: Date
  data_fim: Date
  horas_aula_dia: number
  fk_curso: string
}

type findOneTurmaRequest = {
  id_turma: string
}

// 3) Classes CRUD

export class CreateTurmaService {
  // passa os dados da requisição como parametro do método "execute()"
  async execute({
    data_inicio,
    data_fim,
    horas_aula_dia,
    fk_curso,
  }: newTurmaRequest): Promise<Turma | Error> {
    
    // Cria um objeto (APP) para ser salvo como registro (BD)
    const turma = cursor.create({
      data_inicio,
      data_fim,
      horas_aula_dia,
      fk_curso,
    })

    // Faz um INSERT lá na tabela "turma"
    // com os dados informados pelo usuário
    await cursor.save(turma)

    // Devolve pro frontend o objeto criado da classe "Curso"
    return turma
  }
}

export class ReadAllTurmaService {
  async execute() {
    // Executa a consulta "SELECT * FROM turma" no BD
    // Armazena todos os registros do Result Set na variável "turma"
    // Neste caso, esta variável é uma lista de turma
    const turma = await cursor.find()
    return turma
  }
}

export class ReadOneTurmaService {
  // Recebe o ID da turma como parâmetro da Requisição do usuário
  async execute({ id_turma }: findOneTurmaRequest) {
    // Vê se a turma existe na tabela no BD - SELECT * FROM turma WHERE id_turma = ??
    const turma = await cursor.findOne({ where: { id_turma } })
    // Se a turma não for encontrado no Result Set retorna um erro para o usuário
    if (!turma) {
      return new Error("Turma não encontrada!")
    }
    // Se a turma for encontrado retorna para o usuário a turma
    return turma
  }
}

export class UpdateCursoService {}

export class DeleteCursoService {
  // Recebe o ID da turma como parâmetro da Requisição do usuário
  async execute({ id_turma }: findOneTurmaRequest) {
    // Vê se a turma existe na tabela no BD - SELECT * FROM turma WHERE id_turma = ??
    const turma = await cursor.findOne({ where: { id_turma } })
    // Se a turma não for encontrada no Result Set retorna um erro para o usuário
    if (!turma) {
      return new Error("Turma não encontrada!")
    }
    // Se a turma for encontrado, deleta do BD - DELETE FROM turma WHERE id_turma = ??
    await cursor.delete(turma.id_turma)
    // Retorna para o usuário o curso que foi deletado
    return turma
  }
}
