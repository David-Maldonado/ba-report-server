//es una función
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { countries as Pais } from '@prisma/client';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  paises: Pais[];
}

export const getCountriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, paises } = options;
  const docDefinition: TDocumentDefinitions = {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Reporte de paises',
      subtitle: subtitle ?? 'Lista de paises',
      showLogo: true,
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'customLayout01',
        table: {
          headerRows: 1,
          // widths: ['*', 'auto', 100, '*'],
          //el encabezado tiene que tener la misma cantidad de elementos del widths
          widths: [50, 50, 50, '*', 'auto', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Nombre', 'Continente', 'Nombre local'],
            ...paises.map((pais) => [
              pais.id.toString(),
              pais.iso2,
              pais.iso3,
              { text: pais.name, bold: true },
              pais.continent,
              pais.local_name,
            ]),
            ["","","","","",""],
            ["","","","","Total", {
                text: `${paises.length} paises`,
                bold: true
            }],
          ],
        },
      },

        //Tabla de totales
        {
            text: 'Totales',
            style: {
                fontSize: 18,
                bold:true,
                margin: [0,40,0,0]
            }
        },
        {
            layout: 'noBorders',
            table:{
                headerRows: 1,
                //los objetos vacios abajo es porque tiene que tener la misma cantidad de elementos definidos
                widths: [50, 50, 50, '*', 'auto', '*'],
                body:[
                    [
                        {
                            text: 'Total de paises',
                            colSpan: 3,
                            bold:true
                        },
                        {},
                        {},
                        {
                            text: `${paises.length} paises`,
                            bold:true
                        },
                        {},
                        {}
                    ]
                ]
            }
        }
    ],
  

  };

  return docDefinition;
};
