import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { MotherboardScrap } from '../services/Motherboard.scrap';
import * as qs from 'qs';
import * as fs from 'fs/promises';
import * as cheerio from 'cheerio';

export class GigabyteMotherboardsService extends MotherboardScrap<any> {
  public constructor(protected readonly axios: HttpService) {
    super(axios);
  }

  public async getMotherboards(): Promise<any[]> {
    const motherboards = [];
    let next = true;
    let page = 1;

    try {
      do {
        const { data } = await lastValueFrom(
          this.axios.post(
            'https://www.gigabyte.com/Ajax/Product/GetProductList',
            qs.stringify({
              productLine: 2,
              page,
              checked:
                '2-755-1067-false-false,2-755-1068-false-false,2-755-1070-false-false,2-755-1071-false-false,2-260-2054-false-false,2-260-1720-false-false,2-260-358-false-false,2-260-262-false-false,2-260-263-false-false,2-260-2517-false-false,2-260-2369-false-false,2-260-359-false-false,2-260-267-false-false,2-260-265-false-false,2-260-266-false-false,2-260-336-false-false,2-260-532-false-false,2-260-533-false-false,2-260-534-false-false,2-260-535-false-false,2-260-1711-false-false,2-260-536-false-false,2-260-537-false-false,2-260-538-false-false,2-260-539-false-false,2-309-2518-false-false,2-309-2538-false-false,2-309-2459-false-false,2-309-2471-false-false,2-309-2214-false-false,2-309-2215-false-false,2-309-2320-false-false,2-309-1993-false-false,2-309-1941-false-false,2-309-1940-false-false,2-309-1942-false-false,2-309-1718-false-false,2-309-1864-false-false,2-309-1690-false-false,2-309-1691-false-false,2-309-1692-false-false,2-309-540-false-false,2-309-541-false-false,2-309-1208-false-false,2-309-1209-false-false,2-309-2055-false-false,2-309-2060-false-false,2-309-543-false-false,2-309-1210-false-false,2-309-544-false-false,2-309-545-false-false,2-309-551-false-false,2-309-546-false-false,2-309-564-false-false,2-309-547-false-false,2-309-548-false-false,2-309-549-false-false,2-309-550-false-false,2-309-552-false-false,2-309-553-false-false,2-309-554-false-false,2-309-555-false-false,2-309-2056-false-false,2-309-565-false-false,2-309-2218-false-false,2-309-2085-false-false,2-309-2219-false-false,2-309-2429-false-false,2-309-2086-false-false,2-309-1974-false-false,2-309-2167-false-false,2-309-1712-false-false,2-309-566-false-false,2-309-568-false-false,2-309-567-false-false,2-309-569-false-false,2-309-570-false-false,2-309-571-false-false,2-361-1417-false-false,2-361-1418-false-false,2-361-1419-false-false,2-361-1420-false-false,2-361-1421-false-false,2-361-2057-false-false,2-361-2061-false-false,2-756-1086-false-false,2-756-1087-false-false,2-756-1088-false-false,2-756-1080-false-false,2-756-1081-false-false,2-756-1099-false-false,2-756-1082-false-false,2-756-1089-false-false,2-756-1083-false-false,2-756-1084-false-false,2-756-1090-false-false,2-756-1085-false-false,2-756-1091-false-false,2-756-1092-false-false,2-756-1093-false-false,2-756-1094-false-false,2-756-1095-false-false,2-756-1096-false-false,2-756-1097-false-false,2-756-1098-false-false,2-219-1422-false-false,2-219-1423-false-false,2-219-1424-false-false,2-219-1425-false-false,2-219-1426-false-false,2-219-1427-false-false,2-291-1428-false-false,2-291-1429-false-false,2-291-1430-false-false,2-291-1431-false-false,2-291-1432-false-false,2-291-1433-false-false,2-291-1434-false-false,2-291-1435-false-false',
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          ),
        );
        const motherboardList = await this.readMotherboards(data);
        motherboards.push(...motherboardList.data);

        next = motherboardList.next;
        page++;
      } while (next);
    } catch (error) {
      console.log(error);
    }

    await fs.writeFile(
      'results/motherboards/gigabyte.json',
      JSON.stringify(motherboards),
    );
    return motherboards;
  }

  protected async readMotherboards(content: any): Promise<any> {
    const motherboardListRaw = content.Products.ProductList;
    const motherboardsRaw = await Promise.all(
      motherboardListRaw.map((m: any) => this.extractMotherboardsInfo(m)),
    );

    const motherboards = motherboardsRaw.filter((m) => m !== null);

    return {
      data: motherboards,
      next: motherboardsRaw.length === motherboards.length,
    };
  }

  protected async extractMotherboardsInfo(json: any) {
    const motherboard = {
      id: json.seq_product,
      model: json.model_name,
      publishDate: new Date(json.publish_date),
      name: json.name,
      chipset: json.ComparisonDisplayChipset,
      socket: json.ComparisonDisplaySocket,
      factor: json.ComparisonDisplayFactor,
      image: 'https:' + json.Images[0].url,
    };

    if (new Date().getFullYear() - motherboard.publishDate.getFullYear() > 5) {
      return null;
    }

    const motherboardDetail = await this.getMotherboardDetail(
      'https://www.gigabyte.com/Comparison/Consumer/Result/2?pids=' +
        motherboard.id,
    );

    return { ...motherboard, ...motherboardDetail };
  }

  protected async getMotherboardDetail(url: string): Promise<any> {
    const { data } = await lastValueFrom(this.axios.get(url));
    return this.extractMotherboardDetail(data);
  }

  protected extractMotherboardDetail(content: string) {
    const $ = cheerio.load(content);

    const dataRow = $('.data-row');

    const cpuSupport = dataRow.eq(0).text().trim();
    const cpuSocket = dataRow.eq(1).text().trim();
    const cpuChipset = dataRow.eq(2).text().trim();
    const memorySupport = dataRow.eq(3).text().trim();
    const includesGraphics = dataRow.eq(4).text().trim();
    const audio = dataRow.eq(5).text().trim();
    const lan = dataRow.eq(6).text().trim();
    const slots = dataRow.eq(7).text().trim();
    const wireless = dataRow.eq(8).text().trim();
    const multiGraphics = dataRow.eq(9).text().trim();
    const storage = dataRow.eq(10).text().trim();
    const usb = dataRow.eq(11).text().trim();
    const internalIO = dataRow.eq(12).text().trim();
    const backPanel = dataRow.eq(13).text().trim();
    const formFactor = dataRow.eq(15).text().trim();

    return {
      cpuSupport,
      cpuSocket,
      cpuChipset,
      memorySupport,
      includesGraphics,
      audio,
      lan,
      slots,
      wireless,
      multiGraphics,
      storage,
      usb,
      internalIO,
      backPanel,
      formFactor,
    };
  }
}
