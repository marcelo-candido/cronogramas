import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("turma")
export default class Turma {
  
  // chave primária
  @PrimaryColumn()
  id_turma: string
  
  // chave estrangeira
  @Column()
  fk_curso: string

  // atributos
  @Column({nullable: true})
  data_inicio: Date

  @Column({nullable: true})
  data_fim: Date

  @Column({nullable: true})
  horas_aula_dia: number

  constructor() {
    this.id_turma = uuid()
  }
}

/*
CREATE TABLE "turma" (
  "id_turma" varchar PRIMARY KEY,
  "data_inicio" date NOT NULL,
  "data_fim" date,
  "horas_aula_dia" integer NOT NULL DEFAULT 10,
  "fk_curso" varchar
);
*/