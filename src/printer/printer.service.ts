import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, CustomTableLayout, TDocumentDefinitions } from 'pdfmake/interfaces';

var fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Bold.ttf',
      italic: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  
    }
  }

  //record es propio de ts
  const customTableLayouts: Record<string, CustomTableLayout> = {
    customLayout01: {
      hLineWidth: function (i, node) {
        if (i === 0 || i === node.table.body.length) {
          return 0;
        }
        return (i === node.table.headerRows) ? 2 : 1;
      },
      vLineWidth: function (i) {
        return 0;
      },
      hLineColor: function (i) {
        return i === 1 ? 'black' : '#aaa';
      },
      paddingLeft: function (i) {
        return i === 0 ? 0 : 8;
      },
      paddingRight: function (i, node) {
        return (i === node.table.widths.length - 1) ? 0 : 8;
      },
      //colorear el primer registro
      fillColor: function(i, node){
        if(i === 0){
          return '#7b90be'
        }
      //  colorear el último registro
        if(i === node.table.body.length - 1){
            return '#7b90be'
        }
        return i % 2 === 0 ? '#f3f3f3' : null
      }
    }
  }

@Injectable()
export class PrinterService {

//private porque no quiero que se accedar directamente al objeto
 private printer = new PdfPrinter(fonts);

 createPdf(
    docDefinition: TDocumentDefinitions,
    //el custom se puede o no pasar, es para ayudar a dar estilos personalizados
    options: BufferOptions = {
      tableLayouts: customTableLayouts
    },

 ): PDFKit.PDFDocument { 
    return this.printer.createPdfKitDocument(docDefinition, options);
 }
 




}
