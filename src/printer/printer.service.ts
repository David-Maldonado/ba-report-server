import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';



var fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Bold.ttf',
      italic: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  
    }
  }


@Injectable()
export class PrinterService {

//private porque no quiero que se accedar directamente al objeto
 private printer = new PdfPrinter(fonts);

 createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},

 ): PDFKit.PDFDocument { 
    return this.printer.createPdfKitDocument(docDefinition, options);
 }
 




}
