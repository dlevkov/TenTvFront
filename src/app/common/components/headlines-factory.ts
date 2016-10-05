import { HeadlineItemTypes } from '../Enums';
import { HearlineBigComponent } from './headline-big.component';
export class HeadlineFactory {
    public static GetHedlineByEnum(currentEnum: HeadlineItemTypes) {
        switch (currentEnum) {
            case HeadlineItemTypes.Big:
             
                break;
            case HeadlineItemTypes.Small:

                break;
            default:
                throw new EvalError('HeadlineFactory got not implemented case: ' + currentEnum);
        }
    }
}