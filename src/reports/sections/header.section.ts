import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

interface HeaderOptions {
    title?: string;
    subtitle?:string;
    showLogo?:boolean;
    showDate?: boolean;
}

const currentDate: Content = {
        text: DateFormatter.getDDMMYYY(new Date()),
        alignment: 'right',
        margin: [20,30],
        width:150
}
const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0,0,0,20]
}

export const headerSection =(options: HeaderOptions): Content => {
    const {
        title, subtitle, showLogo = true, showDate = true
    } = options;

    const headerLogo: Content = showLogo ? logo : null;
    const headerDate: Content = showDate ?  currentDate : null;

    const headarSubTitle: Content = subtitle ? {
            text: subtitle,
            alignment: 'center',
            margin: [0,2,0,0],
            style: {
                    bold:true,
                    fontSize: 16
            }
    }: null;

    const headarTitle: Content = title ? {
        stack: [
            {
                text: title,
                alignment: 'center',
                margin: [0,15,0,0],
                style: {
                    bold:true,
                    fontSize: 22
                }
            },
            headarSubTitle
        ]
    }: null

    

    return { columns: [headerLogo, headarTitle, headerDate]};
}   
