import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "../models/baseEntity";
import { DataSource } from "typeorm";

export class BaseService<e extends BaseEntity> {
  public execRepository: Promise<Repository<e>>;

  constructor(
    private getEntity: EntityTarget<e>,
    private dataSource: DataSource
  ) {
    this.execRepository = this.initRepository(getEntity);
  }

  async initRepository<T>(en: EntityTarget<e>): Promise<Repository<e>> {
    return this.dataSource.manager.getRepository(en);
  }

  async closeConnection(): Promise<void> {
    await this.dataSource.destroy();
  }
}
