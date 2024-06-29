import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { CurrencyFormatter, DateFormatter } from "src/helpers";
import { footerSection } from "./sections/footer.section";


const logo:Content = {
    image: 'src/assets/tucan-banner.png',
    width:100,
    height: 30,
    margin: [10,30]
}

const style:StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [0,30,0,0]
    },
    subHedear:{
        fontSize: 14,
        bold: true,
        margin: [0,20,0,0]
    }
}


interface ReportValue {
     title?: string;
    subtitle?: string;
    data: ReportData;
}

export interface ReportData {
    order_id:      number;
    customer_id:   number;
    order_date:    string;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        string;
}


export const orderByIdReport = (value: ReportValue) : TDocumentDefinitions => {

    const { data } = value;
    const { customers, order_details } = data;

    const subTotal = order_details.reduce(
        (acc, detail) => acc + detail.quantity * +detail.products.price, 0
    );

    const total = subTotal * 1.25;


 

    return {
        styles: style,
        header: logo,
        pageMargins: [40,60,40,60],
        footer: footerSection,
        content: [
            //headers
        {
            text: 'Tucan Code',
            style: 'header'
        },
        {

            //direccion y nro recibo
            columns: [
                {
                  text: 'Sacramento 2279,\ncasi Tte. Silverio Molinas,\nAsuncion Paraguay'  
                },
                {
                   
                    text: [
                     {   text:
                            `Recibo No. ${data.order_id}\n`,
                            bold:true
                    },
                        `Fecha del recibo: ${DateFormatter.getDDMMYYY(data.order_date)}\nPagar antes de: ${DateFormatter.getDDMMYYY(new Date())}`
                    ],
                    alignment:'right'
                }
            ],

            
        },
        {
            qr: 'https://devtalles.com', fit: 75,
            alignment: 'right',
            margin: [0,15,0,0]
        },
        //dirección del cliente

        {
            text: [
                {text: 'Cobrar a:\n', style: 'subHedear'},
                `Razón social: ${customers.customer_name}
                Contacto: ${customers.contact_name}
                Dirección: ${customers.address}`

            ],
        },

        // Tabla del detalle de la órden
            {
                layout: 'headerLineOnly',
                margin: [0,20],
                table: {
                    headerRows: 1,
                    widths: [50,'*','auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
                        ...order_details.map((detail) => [
                            detail.order_detail_id.toString(),
                            detail.products.product_name,
                            detail.quantity.toString(),
                            {
                                text: CurrencyFormatter.formatCurrency(+detail.products.price),
                                alignment: 'right'
                            },
                            {
                                text: CurrencyFormatter.formatCurrency(+detail.products.price * detail.quantity),
                                alignment: 'right'
                            }
                            

                        ]),
                    ]
                }
            },
            //otra manera valida de hacer saltos de linea
            '\n',
            // tabla totales
            {
                columns: [
                    {
                        width: '*',
                        text:''
                    },
                    {
                        width: 'auto',
                        layout:'noBorders',
                        table: {
                            body: [
                                ['Subtotal', {
                                    text: CurrencyFormatter.formatCurrency(subTotal),
                                    alignment: 'right'
                                }],
                                [{text:'Total', bold:true}, {
                                    text: CurrencyFormatter.formatCurrency(total),
                                    alignment: 'right',
                                    bold:true
                                }],
                            ]
                        }
                    },

                ]
            }



        ]
    }
}