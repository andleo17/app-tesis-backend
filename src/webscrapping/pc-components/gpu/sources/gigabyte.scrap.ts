import { lastValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import * as fs from 'fs/promises';
import { GraphicCardScrap } from '../services/GraphicCard.scrap';
import { HttpService } from '@nestjs/axios';
import * as qs from 'qs';
import { GigabyteGPUModel } from '../models/GigabyteGPU.model';

export class GigabyteGraphicsService extends GraphicCardScrap<GigabyteGPUModel> {
  public constructor(protected readonly axios: HttpService) {
    super(axios);
  }

  public async getGraphicCards(): Promise<GigabyteGPUModel[]> {
    const graphicCards = [];
    let next = true;
    let page = 1;
    try {
      do {
        const { data } = await lastValueFrom(
          this.axios.post(
            'https://www.gigabyte.com/Ajax/Product/GetProductList',
            qs.stringify({
              productLine: 3,
              page,
              checked:
                '2-2371-2412-false-false,2-2371-2413-false-false,2-207-345-false-false,3-345-346-false-false,3-345-347-false-false,3-345-348-false-false,3-345-349-false-false,2-207-2430-false-false,3-2430-2714-false-false,3-2430-2431-false-false,3-2430-2495-false-false,3-2430-2432-false-false,3-2430-2496-false-false,3-2430-2435-false-false,3-2430-2450-false-false,3-2430-2452-false-false,3-2430-2536-false-false,2-207-1985-false-false,3-1985-1986-false-false,3-1985-2089-false-false,3-1985-1987-false-false,3-1985-2090-false-false,3-1985-1988-false-false,3-1985-2091-false-false,3-1985-1999-false-false,2-207-2027-false-false,3-2027-2028-false-false,3-2027-2103-false-false,3-2027-2029-false-false,3-2027-2104-false-false,3-2027-2030-false-false,2-207-1304-false-false,3-1304-1696-false-false,3-1304-1305-false-false,3-1304-1868-false-false,3-1304-1306-false-false,3-1304-1307-false-false,3-1304-1346-false-false,3-1304-1347-false-false,2-207-2505-false-false,3-2505-2506-false-false,2-207-332-false-false,3-332-1312-false-false,3-332-334-false-false,3-332-333-false-false,3-332-335-false-false,3-332-1313-false-false,2-207-362-false-false,3-362-367-false-false,3-362-371-false-false,3-362-1315-false-false,2-207-388-false-false,2-207-409-false-false,2-207-420-false-false,3-420-430-false-false,2-251-2443-false-false,3-2443-2451-false-false,3-2443-2444-false-false,3-2443-2445-false-false,3-2443-2466-false-false,3-2443-2498-false-false,3-2443-2507-false-false,3-2443-2535-false-false,2-251-2092-false-false,3-2092-2093-false-false,3-2092-2094-false-false,3-2092-2447-false-false,3-2092-2448-false-false,2-251-2014-false-false,3-2014-2015-false-false,2-251-1802-false-false,3-1802-1803-false-false,3-1802-1816-false-false,2-251-466-false-false,3-466-467-false-false,3-466-468-false-false,2-251-469-false-false,3-469-470-false-false,2-251-1704-false-false,3-1704-2031-false-false,3-1704-1705-false-false,3-1704-1706-false-false,3-1704-1707-false-false,3-1704-1709-false-false,3-1704-1708-false-false,2-251-1316-false-false,3-1316-1317-false-false,3-1316-1318-false-false,3-1316-1319-false-false,2-251-484-false-false,3-484-486-false-false,3-484-1348-false-false,2-251-487-false-false,3-487-492-false-false,2-251-596-false-false,3-596-597-false-false,2-2376-2540-false-false,2-2376-2377-false-false,2-2376-2378-false-false,2-2376-2379-false-false,2-2376-2539-false-false,2-2376-2380-false-false,2-2376-2381-false-false,2-2376-2383-false-false,2-2376-2384-false-false,2-2376-2385-false-false,2-2376-2386-false-false,2-2387-2388-false-false,2-2387-2389-false-false,2-2387-2390-false-false,2-2387-2391-false-false,2-2387-2392-false-false,2-2387-2393-false-false,2-2394-2489-false-false,2-2394-2436-false-false,2-2394-2395-false-false,2-2394-2396-false-false,2-2394-2397-false-false,2-2394-2398-false-false,2-2394-2399-false-false,2-2394-2400-false-false,2-2394-2401-false-false,2-2394-2402-false-false,2-2403-2418-false-false,2-2403-2420-false-false,2-2403-2473-false-false',
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          ),
        );
        const graphicCardsList = await this.readGraphicCards(data);
        graphicCards.push(...graphicCardsList.data);

        next = graphicCardsList.next;
        page++;
      } while (next);
    } catch (error) {
      console.error(error);
    }

    await fs.writeFile(
      'results/graphic-cards/gigabyte.json',
      JSON.stringify(graphicCards),
    );
    return graphicCards;
  }

  protected async readGraphicCards(content: any) {
    const graphicCardsListRaw = content.Products.ProductList;
    const graphicCardsRaw = await Promise.all(
      graphicCardsListRaw.map((g: any) => this.extractGraphicCardsInfo(g)),
    );

    const graphicCards = graphicCardsRaw.filter((g) => g !== null);

    return {
      data: graphicCards,
      next: graphicCardsRaw.length === graphicCards.length,
    };
  }

  protected async extractGraphicCardsInfo(
    json: any,
  ): Promise<GigabyteGPUModel> {
    const graphicCard = {
      id: json.seq_product,
      model: json.model_name,
      url: `https://www.gigabyte.com/Graphics-Card/${json.model_name.replace(
        ' ',
        '-',
      )}`,
      publishDate: new Date(json.publish_date),
      name: json.name,
      chipset: json.ComparisonDisplayChipset,
      vendor: json.ComparisonDisplayVender,
      vram: Number(json.ComparisonDisplayMemory.replace('GB', '').trim()),
      image: 'https:' + json.Images[0].url,
    };

    if (!graphicCard.vram) return null;

    if (
      new Date().getFullYear() - graphicCard.publishDate.getFullYear() >= 7 ||
      graphicCard.chipset.match(/9\d{2}/g)?.length > 0
    ) {
      return null;
    }

    const graphicCardDetail = await this.getGraphicCardDetail(
      'https://www.gigabyte.com/Comparison/Consumer/Result/3?pids=' +
        graphicCard.id,
    );

    return { ...graphicCard, ...graphicCardDetail };
  }

  protected async getGraphicCardDetail(url: string) {
    const { data } = await lastValueFrom(this.axios.get(url));
    return this.extractGraphicCardDetail(data);
  }

  protected extractGraphicCardDetail(html: string) {
    const $ = cheerio.load(html);

    const dataRow = $('.data-row');
    const $getData = (index: number) => dataRow.eq(index).text().trim();

    let i = 1;
    const frecuencyAux = $getData(i++).match(/\d+/g);
    const baseFrecuency = Number(frecuencyAux[1] || frecuencyAux[0]);
    const maxFrecuency = Number(frecuencyAux[0]);
    const cudaCores = Number($getData(i++));
    const memoryClock = Number(
      $getData(i++)
        .match(/\d+/g)
        .at(0),
    );
    i = i + 1;
    let memoryType = $getData(i++);
    if (!memoryType.includes('DDR')) {
      memoryType = $getData(i);
      i = i + 1;
    }
    const memoryBus = Number(
      $getData(i++)
        .match(/\d+/g)
        .at(0),
    );
    const memoryBandwidth = Number(
      $getData(i++)
        .match(/\d+/g)
        .at(0),
    );
    let cardBus = $getData(i++);
    if (!cardBus.includes('PCI')) {
      cardBus = null;
      i = i - 1;
    }
    let maxResolution = $getData(i++);
    if (!maxResolution.includes('x')) {
      maxResolution = null;
      i = i - 1;
    }
    const maxDisplays = Number($getData(i++));
    const cardSizeAux = $getData(i++).match(/\d+/g);
    const cardSize = cardSizeAux && {
      long: Number(cardSizeAux[0]),
      width: Number(cardSizeAux[1]),
      height: Number(cardSizeAux[2]),
    };
    const cardForm = $getData(i++);
    const directXVersion = $getData(i++);
    const openGlVersion = $getData(i++);
    const tdp = Number(
      $getData(i++)
        .match(/\d+/g)
        .at(0),
    );
    const pines = $getData(i++);
    const outputs = $getData(i++)
      .split('\n')
      .flatMap((o) => o.split(','))
      .map((o) => {
        const [type, quantity] = o.split('*');
        return {
          [type.trim()]: Number(quantity?.at(0)),
        };
      });
    const SLISupport = $getData(i++) !== 'N/A';
    i = i + 2;
    const fans = $getData(i);

    return {
      baseFrecuency,
      maxFrecuency,
      cudaCores,
      memoryClock,
      memoryType,
      memoryBus,
      memoryBandwidth,
      cardBus,
      maxResolution,
      maxDisplays,
      cardSize,
      cardForm,
      directXVersion,
      openGlVersion,
      tdp,
      pines,
      outputs,
      SLISupport,
      fans,
    };
  }
}
