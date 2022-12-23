import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const fitTypes = [
  {
    name: 'Men',
    code: 'men',
  },
  {
    name: 'Women',
    code: 'women',
  },
  {
    name: 'Youth',
    code: 'youth',
  },
];
export default class FitTypeSeeder implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    for (let i = 0; i < fitTypes.length; i++) {
      const fit = connect.getRepository('fit_types').create(fitTypes[i]);
      await connect.getRepository('fit_types').save(fit);
    }
  }
}
