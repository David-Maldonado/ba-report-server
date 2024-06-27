//es una función
import { TDocumentDefinitions } from "pdfmake/interfaces"


interface ReportOptions {
    name:string;
}
export const getHelloWorlReport = (
    options: ReportOptions
): TDocumentDefinitions => {

    const {name } = options;
    const docDefinition: TDocumentDefinitions = {
        content: [`Hola mundo ${name}`]
      }

      return docDefinition;
}