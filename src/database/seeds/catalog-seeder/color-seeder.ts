import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
const colors = [
  {
    display_name: 'Asphalt',
    name: 'asphalt',
    code: '#3f3e3c',
  },
  {
    display_name: 'Baby Blue',
    name: 'baby_blue',
    code: '#8fb8db',
  },
  {
    display_name: 'Black',
    name: 'black',
    code: '#000000',
  },
  {
    display_name: 'Cranberry',
    name: 'cranberry',
    code: '#6e0a25',
  },
  {
    display_name: 'Heather Grey',
    name: 'heather_grey',
    code: 'url("https://m.media-amazon.com/images/G/01//gear/designerapp/swatch/heather-grey-swatch._CB1198675309_.png")',
  },
  {
    display_name: 'Kelly Green',
    name: 'kelly_green',
    code: '#006136',
  },
  {
    display_name: 'Lemon',
    name: 'lemon',
    code: '#f0e87b',
  },
  {
    display_name: 'Navy',
    name: 'navy',
    code: '#15232b',
  },
  {
    display_name: 'Olive',
    name: 'olive',
    code: '#4a4f26',
  },
  {
    display_name: 'Orange',
    name: 'orange',
    code: '#FF5C39',
  },
  {
    display_name: 'Pink',
    name: 'pink',
    code: '#f8A3BC',
  },
  {
    display_name: 'Purple',
    name: 'purple',
    code: '#514689',
  },
  {
    display_name: 'Red',
    name: 'red',
    code: '#b71111',
  },
  {
    display_name: 'Royal',
    name: 'royal',
    code: '#1c4086',
  },
  {
    display_name: 'White',
    name: 'white',
    code: '#ffffff',
  },
  {
    display_name: 'Brown',
    name: 'brown',
    code: '#31261d',
  },
  {
    display_name: 'Dark Heather',
    name: 'dark_heather',
    code: 'url("https://m.media-amazon.com/images/G/01//gear/designerapp/swatch/dark-heather-swatch._CB1198675309_.png")',
  },
  {
    display_name: 'Grass',
    name: 'grass',
    code: '#5e9444',
  },
  {
    display_name: 'Heather Blue',
    name: 'heather_blue',
    code: 'url("https://m.media-amazon.com/images/G/01//gear/designerapp/swatch/heather-blue-swatch._CB1198675309_.png")',
  },
  {
    display_name: 'Silver',
    name: 'silver',
    code: '#cfd1d1',
  },
  {
    display_name: 'Slate',
    name: 'slate',
    code: '#818189',
  },
  {
    display_name: 'Forest Green',
    name: 'forest_green',
    code: '#0f5b20',
  },
  {
    display_name: 'Sapphire',
    name: 'sapphire',
    code: '#0067A5',
  },
  {
    display_name: 'Neon Pink',
    name: 'neon_pink',
    code: '#FE5BAC',
  },
  {
    display_name: 'Black Athletic Heather',
    name: 'black_athletic_heather',
    code: 'url("https://m.media-amazon.com/images/G/01/gear/designerapp/swatch/black-heather-swatch._CB1553637889_.svg")',
  },
  {
    display_name: 'Black White',
    name: 'black_white',
    code: 'url("https://m.media-amazon.com/images/G/01/gear/designerapp/swatch/black-white-swatch._CB1553637922_.svg")',
  },
  {
    display_name: 'Dark Heather White',
    name: 'dark_heather_white',
    code: 'url("https://m.media-amazon.com/images/G/01/gear/designerapp/swatch/dark-heather-white-swatch._CB1553637957_.svg")',
  },
  {
    display_name: 'Navy Athletic Heather',
    name: 'navy_athletic_heather',
    code: 'url("https://m.media-amazon.com/images/G/01/gear/designerapp/swatch/navy-heather-swatch._CB1553637989_.svg")',
  },
  {
    display_name: 'Navy White',
    name: 'navy_white',
    code: 'url("https://m.media-amazon.com/images/G/01/gear/designerapp/swatch/navy-white-swatch._CB1553638060_.svg")',
  },
  {
    display_name: 'Red White',
    name: 'red_white',
    code: 'url("https://m.media-amazon.com/images/G/01/gear/designerapp/swatch/Swatch_White_Red_1x._CB1553628394_.svg")',
  },
  {
    display_name: 'Royal Blue White',
    name: 'royal_blue_white',
    code: 'url("https://m.media-amazon.com/images/G/01/gear/designerapp/swatch/royal-white-swatch._CB1553638086_.svg")',
  },
];
export default class ColorSeeder implements Seeder {
  public async run(factory: Factory, connect: Connection): Promise<any> {
    for (let i = 0; i < colors.length; i++) {
      const color = connect.getRepository('colors').create(colors[i]);
      await connect.getRepository('colors').save(color);
    }
  }
}
