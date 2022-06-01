import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type * as cheerio from 'cheerio';

@Injectable()
export abstract class MotherboardScrap<T> {
  constructor(protected readonly axios: HttpService) {}

  public abstract getMotherboards(): Promise<T[]>;
  protected abstract readMotherboards(content: string | any): Promise<any>;
  protected abstract extractMotherboardsInfo(
    htmlArgs:
      | {
          el: cheerio.Element;
          $: cheerio.CheerioAPI;
        }
      | any,
  ): any;
  protected abstract getMotherboardDetail(url: string): Promise<any>;
  protected abstract extractMotherboardDetail(content: string): any;
}
