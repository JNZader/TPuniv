import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "../models/baseEntity";
import { DataSource } from "typeorm";

export class BaseService<E extends BaseEntity> {
  protected repository: Repository<E>;
  protected dataSource: DataSource; // Cambiado a 'protected' para que pueda ser usado en clases derivadas

  constructor(
    private getEntity: EntityTarget<E>, 
    dataSource: DataSource
  ) {
    this.dataSource = dataSource;
    this.repository = this.dataSource.getRepository(getEntity);
  }

  // Método para cerrar la conexión
  async closeConnection(): Promise<void> {
    await this.dataSource.destroy();
  }
}