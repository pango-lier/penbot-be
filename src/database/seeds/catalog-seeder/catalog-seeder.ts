import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

const catalogs = [
  {
    name: 'Standard t-shirt',
    code: 'STANDARD_TSHIRT',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_TSHIRT/front.jpg',
    print_areas: [
      [
        'Front (4500x5400)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_TSHIRT/front.jpg',
      ],
      [
        'Back (4500x5400)',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_TSHIRT/front.jpg',
      ],
    ],
    catalog_fit_types: ['men', 'women', 'youth'],
    colors: [
      'asphalt',
      'baby_blue',
      'black',
      'cranberry',
      'heather_grey',
      'kelly_green',
      'lemon',
      'navy',
      'olive',
      'orange',
      'pink',
      'purple',
      'red',
      'royal',
      'white',
    ],
    color_japans: [
      'brown',
      'dark_heather',
      'grass',
      'heather_blue',
      'silver',
      'slate',
    ],
    market_places: ['US', 'GB', 'DE', 'FR', 'IT', 'ES', 'JP'],
  },
  {
    name: 'Premium t-shirt',
    code: 'PREMIUM_TSHIRT',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/PREMIUM_TSHIRT/front.jpg',
    print_areas: [
      [
        'Front (4500x5400)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/PREMIUM_TSHIRT/front.jpg',
      ],
      [
        'Back (4500x5400)',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/PREMIUM_TSHIRT/front.jpg',
      ],
    ],
    catalog_fit_types: ['men', 'women', 'youth'],
    colors: [
      'asphalt',
      'baby_blue',
      'black',
      'brown',
      'cranberry',
      'dark_heather',
      'grass',
      'heather_blue',
      'heather_grey',
      'kelly_green',
      'lemon',
      'navy',
      'olive',
      'orange',
      'pink',
      'purple',
      'red',
      'royal',
      'silver',
      'slate',
      'white',
    ],
    color_japans: [],
    market_places: ['US'],
  },
  {
    name: 'V-neck t-shirt',
    code: 'VNECK',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/VNECK/front.jpg',
    print_areas: [
      [
        'Front (4500x5400)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/VNECK/front.jpg',
      ],
      [
        'Back (4500x5400)',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/VNECK/front.jpg',
      ],
    ],
    catalog_fit_types: ['women'],
    colors: [
      'baby_blue',
      'black',
      'dark_heather',
      'forest_green',
      'heather_grey',
      'navy',
      'pink',
      'purple',
      'red',
      'royal',
      'sapphire',
    ],
    color_japans: [],
    market_places: ['US', 'GB', 'DE', 'FR', 'IT', 'ES'],
  },
  {
    name: 'Tank top',
    code: 'TANK_TOP',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/TANK_TOP/front.jpg',
    print_areas: [
      [
        'Front (4500x5400)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/TANK_TOP/front.jpg',
      ],
      [
        'Back (4500x5400)',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/TANK_TOP/front.jpg',
      ],
    ],
    catalog_fit_types: ['men', 'women'],
    colors: [
      'black',
      'dark_heather ',
      'heather_grey',
      'navy',
      'neon_pink',
      'purple',
      'red',
      'royal',
      'sapphire',
      'white',
    ],
    color_japans: [],
    market_places: ['US', 'GB', 'DE', 'FR', 'IT', 'ES'],
  },
  {
    name: 'Long sleeve t-shirt',
    code: 'STANDARD_LONG_SLEEVE',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_LONG_SLEEVE/front.jpg',
    print_areas: [
      [
        'Front (4500x5400)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_LONG_SLEEVE/front.jpg',
      ],
      [
        'Back (4500x5400)',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_LONG_SLEEVE/front.jpg',
      ],
    ],
    catalog_fit_types: [],
    colors: ['black', 'heather_grey', 'navy', 'royal'],
    color_japans: ['dark_heather'],
    market_places: ['US', 'GB', 'DE', 'FR', 'IT', 'ES', 'JP'],
  },
  {
    name: 'Raglan',
    code: 'RAGLAN',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/RAGLAN/front.jpg',
    print_areas: [
      [
        'Front (4500x5400)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/RAGLAN/front.jpg',
      ],
      [
        'Back (4500x5400)',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/RAGLAN/front.jpg',
      ],
    ],
    catalog_fit_types: ['men', 'women'],
    colors: [
      'black_athletic_heather',
      'black_white',
      'dark_heather_white',
      'navy_athletic_heather',
      'navy_white',
      'red_white',
      'royal_blue_white',
    ],
    color_japans: [],
    market_places: ['US', 'GB', 'DE', 'FR', 'IT', 'ES'],
  },
  {
    name: 'Sweatshirt',
    code: 'STANDARD_SWEATSHIRT',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_SWEATSHIRT/front.jpg',
    print_areas: [
      [
        'Front (4500x5400)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_SWEATSHIRT/front.jpg',
      ],
      [
        'Back (4500x5400)',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_SWEATSHIRT/front.jpg',
      ],
    ],
    catalog_fit_types: [],
    colors: ['black', 'heather_grey', 'navy', 'royal'],
    color_japans: ['dark_heather'],
    market_places: ['US', 'GB', 'DE', 'FR', 'IT', 'ES', 'JP'],
  },
  {
    name: 'Pullover hoodie',
    code: 'STANDARD_PULLOVER_HOODIE',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_PULLOVER_HOODIE/front.jpg',
    print_areas: [
      [
        'Front (4500x4050)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_PULLOVER_HOODIE/front.jpg',
      ],
      [
        'Back (4500x5400)',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/STANDARD_PULLOVER_HOODIE/front.jpg',
      ],
    ],
    catalog_fit_types: [],
    colors: ['black', 'heather_grey', 'navy', 'royal'],
    color_japans: ['dark_heather'],
    market_places: ['US', 'GB', 'DE', 'FR', 'IT', 'ES', 'JP'],
  },
  {
    name: 'Zip hoodie',
    code: 'ZIP_HOODIE',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/ZIP_HOODIE/front.jpg',
    print_areas: [
      [
        'Guidelines (4500x4050)',
        'Guidelines',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/ZIP_HOODIE/front.jpg',
      ],
      [
        'Front (4500x4050)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/ZIP_HOODIE/front.jpg',
      ],
      [
        'Back (4500x5400)',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/ZIP_HOODIE/front.jpg',
      ],
    ],
    catalog_fit_types: [],
    colors: ['black', 'heather_grey', 'navy', 'purple', 'red', 'royal'],
    color_japans: ['dark_heather', 'forest_green'],
    market_places: ['US', 'GB', 'DE', 'FR', 'IT', 'ES', 'JP'],
  },
  {
    name: 'PopSockets grip',
    code: 'POP_SOCKET',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/POP_SOCKET/front.png',
    print_areas: [
      [
        'Guidelines (485x485)',
        'Guidelines',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/POP_SOCKET/front.png',
      ],
      [
        'Front (485x485)',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/POP_SOCKET/front.png',
      ],
      [
        'Side (485x485)',
        'Side',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/POP_SOCKET/front.png',
      ],
      [
        'Collapsed (485x485)',
        'Collapsed',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/POP_SOCKET/front.png',
      ],
    ],
    catalog_fit_types: [],
    colors: [],
    color_japans: [],
    market_places: ['US', 'GB', 'DE', 'FR', 'IT', 'ES'],
  },
  {
    name: 'iPhone cases',
    code: 'PHONE_CASE_APPLE_IPHONE',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/PHONE_CASE_APPLE_IPHONE/front.jpg',
    print_areas: [
      [
        '1800x3200',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/PHONE_CASE_APPLE_IPHONE/front.jpg',
      ],
    ],
    catalog_fit_types: [],
    colors: [],
    color_japans: [],
    market_places: ['US'],
  },
  {
    name: 'Samsung Galaxy cases',
    code: 'PHONE_CASE_SAMSUNG_GALAXY',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/PHONE_CASE_SAMSUNG_GALAXY/front.jpg',
    print_areas: [
      [
        '1800x3200',
        'Back',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/PHONE_CASE_SAMSUNG_GALAXY/front.jpg',
      ],
    ],
    catalog_fit_types: [],
    colors: [],
    color_japans: [],
    market_places: ['US'],
  },
  {
    name: 'Tote bag',
    code: 'TOTE_BAG',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/TOTE_BAG/front.jpg',
    print_areas: [
      [
        '2925x2925',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/TOTE_BAG/front.jpg',
      ],
    ],
    catalog_fit_types: [],
    colors: [],
    color_japans: [],
    market_places: ['US'],
  },
  {
    name: 'Throw pillows',
    code: 'THROW_PILLOW',
    background:
      'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/THROW_PILLOW/front.jpg',
    print_areas: [
      [
        '2925x2925',
        'Front',
        'https://merch-manager.s3.ap-southeast-1.amazonaws.com/mockup/THROW_PILLOW/front.jpg',
      ],
    ],
    catalog_fit_types: [],
    colors: [],
    color_japans: [],
    market_places: ['US'],
  },
];
export default class CatalogSeeder implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    //connection.getRepository('users').
    await connect.getRepository('catalogs');
    for (let i = 0; i < catalogs.length; i++) {
      const catalog = catalogs[i];
      const _catalog = await connect.getRepository('catalogs').create({
        name: catalog.name,
        code: catalog.code,
        background: catalog.background,
      });
      const catalogSave = await connect
        .getRepository('catalogs')
        .save(_catalog);
      for (let i = 0; i < catalog.print_areas.length; i++) {
        const _catalog = await connect
          .getRepository('catalog_print_areas')
          .create({
            name: catalog.print_areas[i][0],
            code: catalog.print_areas[i][1].toUpperCase(),
            catalog_id: catalogSave.id,
            image: catalog.print_areas[i][2],
          });
        await connect.getRepository('catalog_print_areas').save(_catalog);
      }

      for (let i = 0; i < catalog.catalog_fit_types.length; i++) {
        const fitTypeSave = await connect
          .getRepository('fit_types')
          .findOneBy({ code: catalog.catalog_fit_types[i] });
        const _catalog = await connect
          .getRepository('catalog_fit_types')
          .create({
            catalog_id: catalogSave.id,
            fit_type_id: fitTypeSave.id,
          });
        await connect.getRepository('catalog_fit_types').save(_catalog);
      }
      //color
      for (let i = 0; i < catalog.colors.length; i++) {
        const color = await connect
          .getRepository('colors')
          .findOneBy({ name: catalog.colors[i] });
        const catalog_colors = await connect
          .getRepository('catalog_colors')
          .create({
            catalog_id: catalogSave.id,
            color_id: color.id,
          });
        await connect.getRepository('catalog_colors').save(catalog_colors);
      }

      // color japan
      for (let i = 0; i < catalog.color_japans.length; i++) {
        const color_japans = await connect
          .getRepository('colors')
          .findOneBy({ name: catalog.color_japans[i] });
        const catalog_colors_jp = await connect
          .getRepository('catalog_colors')
          .create({
            catalog_id: catalogSave.id,
            color_id: color_japans.id,
            japan_color: false,
          });
        await connect.getRepository('catalog_colors').save(catalog_colors_jp);
      }

      // color japan
      for (let i = 0; i < catalog.market_places.length; i++) {
        const market_places = await connect
          .getRepository('marketplaces')
          .findOneBy({ code: catalog.market_places[i] });
        const market = await connect.getRepository('catalog_markets').create({
          catalog_id: catalogSave.id,
          market_id: market_places.id,
        });
        await connect.getRepository('catalog_markets').save(market);
      }
    }
  }
}
