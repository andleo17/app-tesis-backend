import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type * as cheerio from 'cheerio';

@Injectable()
export abstract class GraphicCardScrap<T> {
  constructor(protected readonly axios: HttpService) {}

  public abstract getGraphicCards(): Promise<T[]>;
  protected abstract readGraphicCards(content: string | any): Promise<any>;
  protected abstract extractGraphicCardsInfo(
    htmlArgs:
      | {
          el: cheerio.Element;
          $: cheerio.CheerioAPI;
        }
      | any,
  ): any;
  protected abstract getGraphicCardDetail(url: string): Promise<any>;
  protected abstract extractGraphicCardDetail(content: string): any;
}
