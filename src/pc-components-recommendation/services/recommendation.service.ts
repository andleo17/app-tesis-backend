import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/databases/questions/prisma.service';
import { ComponentModel } from 'src/pc-components/models/component.model';
import { FormInput } from '../inputs/form.input';

@Injectable()
export class RecommendationService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecommendation(userAnswers: FormInput[]): Promise<ComponentModel[]> {
    console.log({ userAnswers });
    return [
      {
        id: 1,
        typeId: 1,
        type: {
          id: 1,
          name: 'Procesador',
          description: 'Procesador',
          slug: 'processor',
        },
        brand: 'Intel',
        model: 'i7-11700k',
        image: 'https://m.media-amazon.com/images/I/71idAEIDhvL._AC_SY450_.jpg',
        deltronId: '1',
        frabricId: '1',
        rgb: false,
        suggestedPrice: 20,
      },
      {
        id: 2,
        typeId: 2,
        type: {
          id: 2,
          name: 'Place madre',
          description: 'Place madre',
          slug: 'motherboard',
        },
        brand: 'MSI',
        model: 'B240',
        image:
          'https://m.media-amazon.com/images/I/91dF8lSJnZL._AC_SL1500_.jpg',
        deltronId: '1',
        frabricId: '1',
        rgb: false,
        suggestedPrice: 20,
      },
      {
        id: 3,
        typeId: 3,
        type: {
          id: 3,
          name: 'Memoria RAM',
          description: 'Memoria RAM',
          slug: 'ram',
        },
        brand: 'G.Skill',
        model: 'Ultra 5 16GB',
        image:
          'https://www.sercoplus.com/24357-medium_default/memoria-ddr4-2800-8gb-g-skill-rip-jaws.jpg',
        deltronId: '1',
        frabricId: '1',
        rgb: false,
        suggestedPrice: 20,
      },
      {
        id: 4,
        typeId: 4,
        type: {
          id: 4,
          name: 'Tarjeta de video',
          description: 'Tarjeta de video',
          slug: 'gpu',
        },
        brand: 'Nvidia',
        model: 'RTX 2080 Ti',
        image:
          'https://cyccomputer.pe/36646-large_default/msi-geforce-rtx-3080-ti-12gb-gddr6x-384bits-gaming-x-trio-pn912-v389-058.jpg',
        deltronId: '1',
        frabricId: '1',
        rgb: false,
        suggestedPrice: 20,
      },
      {
        id: 5,
        typeId: 5,
        type: {
          id: 5,
          name: 'Almacenamiento',
          description: 'Almacenamiento',
          slug: 'storage',
        },
        brand: 'Western Digital',
        model: 'Blue 1TB',
        image:
          'https://www.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/wd-blue-desktop-sata-hdd/gallery/wd-blue-pc-desktop-hard-drive-500gb.png.thumb.1280.1280.png',

        deltronId: '1',
        frabricId: '1',
        rgb: false,
        suggestedPrice: 20,
      },
      {
        id: 6,
        typeId: 6,
        type: {
          id: 6,
          name: 'Fuente de poder',
          description: 'Fuente de poder',
          slug: 'power-supply',
        },
        brand: 'Thermaltake',
        model: 'Pro Ultra Pingón 500W',
        image:
          'https://thermaltake.azureedge.net/pub/media/catalog/product/cache/6bf0ed99c663954fafc930039201ed07/db/imgs/pdt/angle/PS-TPG-0750FPCGxx-R_f3967ef8725e4f0a8a1443531eb29d58.jpg',
        deltronId: '1',
        frabricId: '1',
        rgb: false,
        suggestedPrice: 20,
      },
    ];
  }
}
