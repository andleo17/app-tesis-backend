import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';

export enum DeltronComponent {
  CPU = 'CPU',
  RAM = 'MEM',
  GPU = 'VID',
  POWER_SUPPLY = 'PSCS',
  HDD = 'HD',
  SSD = 'HDES',
  MOTHERBOARD = 'MBD',
}

@Injectable()
export class DeltronService {
  constructor(private readonly httpService: HttpService) {}

  async getComponentList(component: DeltronComponent): Promise<any[]> {
    const componentList = [];
    let page = 1;
    let next = true;

    do {
      const response = await lastValueFrom(
        this.httpService
          .get<string>(
            'https://www.deltron.com.pe/modulos/productos/items/ctBuscador/templates/contenedor_web_2016.php',
            {
              params: {
                tamPag: 70,
                GrupoLineaId: component,
                page,
              },
            },
          )
          .pipe(),
      );

      const { hasNext, components } = await this.extractListComponents(
        response.data,
      );
      if (hasNext) page++;
      else next = false;

      componentList.push(...components);
    } while (next);

    return componentList;
  }

  private async getComponentManufacturerCode(id: string): Promise<string> {
    const response = await lastValueFrom(
      this.httpService
        .get(
          'https://www.deltron.com.pe/modulos/productos/items/producto.php',
          {
            params: {
              item_number: id,
            },
          },
        )
        .pipe(),
    );

    return this.extractManufacturerCode(response.data);
  }

  private async extractListComponents(html: string) {
    const $ = cheerio.load(html);

    const totalComponents = parseInt($('.control_act').text().match(/\d+/g)[0]);
    const pageInfo = $('.control').text().match(/\d+/g);
    const page = pageInfo ? parseInt(pageInfo[0]) : 1;

    const components = await Promise.all(
      $('.container-item-busc-dg')
        .map(async (_, element) => {
          const image = $(element).find('img').attr('src');
          const componentData = $(element)
            .find('p')
            .map((_, element) => {
              return $(element).text();
            })
            .toArray();

          const name = $(element).find('h5').text();
          const code = componentData[1].replace('Código: ', '').trim();
          const minicode = componentData[2].replace('Mini Código:', '').trim();
          const hasStock = componentData[3] !== 'Stock: 0';

          const manufacturerCode = await this.getComponentManufacturerCode(
            code,
          );

          return {
            image,
            name,
            code,
            minicode,
            manufacturerCode,
            hasStock,
          };
        })
        .toArray(),
    );

    return { hasNext: totalComponents - page >= 70, components };
  }

  private extractManufacturerCode(html: string): string {
    const $ = cheerio.load(html);
    const code = $($('.product-price')[0]).text();
    return code.trim();
  }
}
