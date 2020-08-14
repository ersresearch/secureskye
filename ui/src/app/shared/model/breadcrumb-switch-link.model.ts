export class BreadcrumbSwitchLink {
    text: string;
    disabled: boolean;
    icon: string;
    routerLink: any[] | string;

    static create(text: string, disabled: boolean, icon: string, routerLink: any[] | string) {
        const link = new BreadcrumbSwitchLink();
        link.text = text;
        link.disabled = disabled;
        link.icon = icon;
        link.routerLink = routerLink;
        return link;
    }
}
