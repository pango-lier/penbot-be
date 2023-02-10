import { Factory, Seeder, runSeeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import UserSeeder from './user';

export default class Seeds implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    try {
      await runSeeder(UserSeeder);
    } catch (error) {
      console.log(error);
    }
  }
}
