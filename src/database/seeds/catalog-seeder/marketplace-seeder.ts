import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
const markets = [
  {
    name: '.com',
    code: 'US',
    currency: 'USD',
  },
  {
    name: '.co.uk',
    code: 'GB',
    currency: 'GBP',
  },
  {
    name: '.de',
    code: 'DE',
    currency: 'EUR',
  },
  {
    name: '.fr',
    code: 'FR',
    currency: 'EUR',
  },
  {
    name: '.it',
    code: 'IT',
    currency: 'EUR',
  },
  {
    name: '.es',
    code: 'ES',
    currency: 'EUR',
  },
  {
    name: '.co.jp',
    code: 'JP',
    currency: 'JPY',
  },
];
export default class MarketPlaceSeeder implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    for (let i = 0; i < markets.length; i++) {
      const element = await connect
        .getRepository('marketplaces')
        .create(markets[i]);
      await connect.getRepository('marketplaces').save(element);
    }
  }
}
