import { ImageTypes } from './Enums';

export class Constants {
    public static readonly SERVICE_KEY: string = 'service';
    public static readonly SEARCH_KEY: string = 'search';
    public static readonly IMAGE_LOADING_URL = '../../assets/img/preload640-640.png';
    public static readonly IMAGE_LOADING_URL16_9 = '../../assets/img/preload_640-360.png';
    public static readonly DATA_DOMAIN = 'http://localhost/Nana10MVC/';
    public static readonly NANA_IMAGES_DOMAIN: string = 'http://f.nanafiles.co.il';
    public static readonly SCROLL_POSITION: number = 1000;

    public static readonly DFPADUNITS: { [key: string]: string } = Constants.Init();

    public static Init(): { [key: string]: string } {
        let t = {
            '10tv': 'Desktop_Nana10_Channel10_Inread',
            'bidur': 'Desktop_Nana10_Entertainment_Inread',
            'celebs': 'Desktop_Nana10_Celebs_Inread',
            'Food': 'Desktop_Nana10_Food_Inread',
            'gamer': 'Desktop_Nana10_Gamer_Inread',
            'lifestyle': 'Desktop_Nana10_style_Inread',
            'net': 'Desktop_Nana10_Net_Inread',
            'News': 'Desktop_Nana10_News_Inread',
            'sport': 'Desktop_Nana10_Sport_Inread'
        };
        return t;
    }
    public static GetImagePathByType(mediaStockImageID, item: ImageTypes, mediaStockImageExt?: string): string {
        let currentType: number = 0;
        switch (item) {
            case ImageTypes.Thumbnail_109_59:
                currentType = 28;
                break;
            case ImageTypes.Main_303_165:
            case ImageTypes.Small_303_165:
                currentType = 493;
                break;
            case ImageTypes.Medium_460_258:
                currentType = 693;
                break;
            case ImageTypes.Standard_606_366:
                currentType = 1789;
                break;
            case ImageTypes.Big_768_400:
                currentType = 1677;
                break;
            case ImageTypes.HeadlIne_Big_460_258:
                currentType = 693;
                break;
            case ImageTypes.Article_Default:
                currentType = 1868;
                break;
            case ImageTypes.Headline_Small_303_165:
                currentType = 493;
                break;
            case ImageTypes.Main_450_450:
                currentType = 76;
                break;
            default:
                throw new EvalError('Not implemented ImageType:' + item);
        }
        return this.GetImagePath(mediaStockImageID, currentType, mediaStockImageExt);
    }

    private static GetImagePath(mediaStockImageID: number, mediaStockImageTypeID: number, mediaStockImageExt: string = 'jpg'): string {
        if (mediaStockImageID === 0)
            return '';
        if (mediaStockImageTypeID > 0) {
            return this.NANA_IMAGES_DOMAIN + '/upload/mediastock/img/' + mediaStockImageTypeID + '/' + (mediaStockImageID / 1000000).toFixed(0) +
                '/' + Math.floor((mediaStockImageID % 1000000) / 1000) + '/' + mediaStockImageID + '.' + mediaStockImageExt;
        }
        return this.NANA_IMAGES_DOMAIN + '/upload/mediastock/NOREPLICATION/img/' + (mediaStockImageID / 1000000).toFixed(0) + '/'
            + Math.floor((mediaStockImageID % 1000000) / 1000) + '/' + mediaStockImageID + '_THUMBNAIL.' + mediaStockImageExt;

    }
}
