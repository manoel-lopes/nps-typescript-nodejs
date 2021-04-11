import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class Survey {
  
  @PrimaryColumn()
  readonly id: string

  @Column()
  title: string
  
  @Column()
  description: string
  
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  update_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
