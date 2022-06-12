import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { MotherboardScrap } from '../services/Motherboard.scrap';
import * as qs from 'qs';
import * as fs from 'fs/promises';
import * as cheerio from 'cheerio';
import { GigabyteMotherboardModel } from '../models/gigabyte.model';

export class GigabyteMotherboardsService extends MotherboardScrap<GigabyteMotherboardModel> {
  public constructor(protected readonly axios: HttpService) {
    super(axios);
  }

  public async getMotherboards() {
    const motherboards: GigabyteMotherboardModel[] = [];
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

  protected async readMotherboards(content: any) {
    const motherboardListRaw = content.Products.ProductList;
    const motherboardsRaw = await Promise.all<GigabyteMotherboardModel>(
      motherboardListRaw.map((m: any) => this.extractMotherboardsInfo(m)),
    );

    const motherboards = motherboardsRaw.filter((m) => m !== null);

    return {
      data: motherboards,
      next: motherboardsRaw.length === motherboards.length,
    };
  }

  protected async extractMotherboardsInfo(
    json: any,
  ): Promise<GigabyteMotherboardModel> {
    const processorInfo = json.ComparisonDisplayChipset.split(' ');
    const motherboard = {
      id: json.seq_product,
      name: json.model_name,
      image: 'https:' + json.Images[0].url,
      formFactor: json.ComparisonDisplayFactor,
      publishDate: new Date(json.publish_date),
      processor: {
        brand: processorInfo[0],
        chipset: processorInfo[1],
        socket: json.ComparisonDisplaySocket.replace('Socket ', ''),
      },
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

  protected async getMotherboardDetail(url: string) {
    const { data } = await lastValueFrom(this.axios.get(url));
    return this.extractMotherboardDetail(data);
  }

  protected extractMotherboardDetail(content: string) {
    const $ = cheerio.load(content);
    const labelRow = $('.row-title-container')
      .map((i, row) => $(row).text())
      .toArray()
      .map((l) => l.trim());
    const dataRow = $('.data-row');
    const url =
      'https://www.gigabyte.com' + $('.compare__product-link').attr('href');

    const $find = (label: string) => {
      const index = labelRow.indexOf(label);
      if (index === -1) {
        return null;
      }
      return dataRow.eq(index).text().trim();
    };

    try {
      const memorySupport = $find('Memory');
      const includesGraphics = $find('Onboard Graphics');
      const lan = $find('LAN');
      const slots = $find('Expansion Slots');
      const wireless = $find('Wireless Communication module');
      const multiGraphics = $find('Multi-Graphics Technology');
      const storage = $find('Storage Interface');
      const usb = $find('USB');

      const memoryMaxSupport = Number(
        memorySupport
          .match(/up to \d+ ?GB/g)
          .at(0)
          .replace(/\D/g, ''),
      );

      const memorySlots = Number(memorySupport.match(/\d x/g).at(0).at(0));
      const graphicPorts = includesGraphics?.match(/\d x .+/g);
      const lanInfo = lan
        ?.match(/\([^\(\)]+\)?/g)
        .filter((l) => l.match(/(M|G)(bit|bps)/g) !== null)
        .map((l) => l.replace(/\(|\)/g, ''));
      const lanPorts = lan
        ?.replace(/\([^\(\)]+\)?/g, '')
        .trim()
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      const slotInfo = slots.match(/\d+ x .+/g);

      return {
        url,
        memory: {
          frecuencies: Array.from(memorySupport.match(/\d{4}/g)),
          type: memorySupport.match(/DDR\d/g).at(0),
          format: memorySupport.match(/.DIMM/g).at(0).trim(),
          slots: memorySlots,
          maxSupport: memoryMaxSupport / memorySlots,
          hasDualChannel: memorySupport.includes('Dual channel'),
          hasXMP: memorySupport.includes('XMP'),
        },
        graphics: graphicPorts?.map((g) => ({
          quantity: Number(g[0]),
          port: g.replace(/\d x /g, '').replace(/,.+/g, ''),
          maxResolution: g.match(/\d+x\d+/g)?.at(0),
          frecuency: Number(g.match(/@\d+/g)?.at(0).replace(/\D/g, '')),
        })),
        lan: lanPorts.map((l, i) => ({
          chipset: l,
          velocity: lanInfo[i]?.split('/'),
        })),
        slots: slotInfo.map((s) => {
          const [quantity, name] = s.split(' x ');
          return {
            quantity: Number(quantity),
            name,
          };
        }),
        wireless: {
          hasWifi: wireless?.match(/wi-?fi/i) !== null,
          hasBluetooth: wireless?.match(/bluetooth/i) !== null,
        },
        multigraphics: {
          amd: multiGraphics?.includes('AMD'),
          nvidia: multiGraphics?.includes('NVIDIA'),
        },
        storage: [
          {
            connector: 'SATA',
            slots: Number(
              storage
                .match(/(\d x SATA)/g)
                ?.at(0)
                .at(0),
            ),
            interface: 'SATA',
          },
          {
            connector: 'M.2',
            interface: 'SATA',
            slots: Number(
              storage
                .match(/.+(SATA and).+/g)
                ?.reduce((acc, cur) => acc + Number(cur.at(0)), 0),
            ),
          },
          {
            connector: 'M.2',
            interface: 'PCI Express 4.0 x4',
            slots: Number(
              storage
                .match(/.+(PCIe 4.0).+/g)
                ?.reduce((acc, cur) => acc + Number(cur.at(0)), 0),
            ),
          },
        ],
        usb: usb.match(/\d x .+/g)?.map((u) => ({
          slots: Number(u[0]),
          type: u
            .match(/[A-Z].+(?=ports? )/g)
            ?.at(0)
            .trim(),
          isInBackPanel: u.includes('back panel'),
        })),
      };
    } catch (error: any) {
      console.error('Error en la extraccion de datos ' + url, error);
      return null;
    }
  }
}
