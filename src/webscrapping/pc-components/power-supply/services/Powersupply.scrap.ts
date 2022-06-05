import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type * as cheerio from 'cheerio';

@Injectable()
export abstract class PowersupplyScrap<T> {
  constructor(protected readonly axios: HttpService) {}

  public abstract getPowersupplys(): Promise<T[]>;
  protected abstract readPowersupplies(content: string | any): Promise<any>;
  protected abstract extractPowersuppliesInfo(
    htmlArgs:
      | {
          el: cheerio.Element;
          $: cheerio.CheerioAPI;
        }
      | any,
  ): any;
  protected abstract getPowersupplyDetail(url: string): Promise<any>;
  protected abstract extractPowersupplyDetail(content: string): any;
}
