import { Factory, Seeder, runSeeder } from 'typeorm-seeding';
import ColorSeeder from './catalog-seeder/color-seeder';
import FitTypeSeeder from './catalog-seeder/fit-type-seeder';
import MarketPlaceSeeder from './catalog-seeder/marketplace-seeder';
import CatalogSeeder from './catalog-seeder/catalog-seeder';
import { Connection } from 'typeorm';

export default class Seeds implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    try {
      await runSeeder(ColorSeeder);
      await runSeeder(FitTypeSeeder);
      await runSeeder(MarketPlaceSeeder);
      await runSeeder(CatalogSeeder);
    } catch (error) {
      console.log(error);
    }
  }
}
