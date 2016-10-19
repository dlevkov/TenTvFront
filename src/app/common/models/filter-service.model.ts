export class FilterServiceModel {
    StripeColor: string;
    ServiceName: string;
    ServiceID: number;
    HebServiceName: string;
    Checked: boolean = true;
    constructor(data) {
        this.HebServiceName = data.HebServiceName;
        this.ServiceID = data.ServiceID;
        this.ServiceName = data.ServiceName;
        this.StripeColor = data.StripeColor;
    }
}
