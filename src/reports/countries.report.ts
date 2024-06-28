//es una función
import { TDocumentDefinitions } from "pdfmake/interfaces"
import { headerSection } from "./sections/header.section";
import { countries as Pais } from "@prisma/client"; 

interface ReportOptions {
    title?: string;
    subtitle?: string;
    paises: Pais[]
}


export const getCountriesReport = (options: ReportOptions): TDocumentDefinitions => {

    const { title, subtitle, paises } = options;
    const docDefinition: TDocumentDefinitions = {
        pageOrientation: 'landscape',
        header: headerSection({
            title: title ?? 'Reporte de paises',
            subtitle: subtitle ?? 'Lista de paises',
            showLogo:true,
        }),
        pageMargins: [40,110,40,60],
        content: [{
            layout: 'lightHorizontalLines',
            table: {
                headerRows:1,
                // widths: ['*', 'auto', 100, '*'],
                //el encabezado tiene que tener la misma cantidad de elementos del widths
                widths : [50,50,50,'*','auto','*'],
                body: [
                    ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
                    ...paises.map((pais) => [
                        pais.id.toString(),
                        pais.iso2,
                        pais.iso3,
                        {text: pais.name, bold: true},
                        pais.continent,
                        pais.local_name
                ])
               
                ]
            }
        }]
      }

      return docDefinition;
}