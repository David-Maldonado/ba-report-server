import {  StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { headerSection } from "./sections/header.section";
import { DateFormatter } from "src/helpers";

interface ReportValues {
    employerName:string;
    employerPosition:string;
    employeeName:string;
    employeePosition:string;
    employeeStartDate:Date;
    employeeHours:number;
    employeeWorkSchedule:string;
    employerCompany:string;
}

const styles: StyleDictionary = {
 header:{
    fontSize:22,
    bold: true,
    alignment: 'center',
    margin: [0,25,0,25]
 },
 body:{
    margin: [0,0,0,50],
    alignment: 'justify'
 },

 signature: {
    fontSize: 14,
    bold:true
 },

 footer:{
    alignment: 'center',
    bold: true,
    fontSize: 12,

 }
}

export const getEmploymentLetterByIdReport = (values:ReportValues): TDocumentDefinitions => {
   
    const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
    } = values;
   
    const docDefinition: TDocumentDefinitions = {
        styles:styles,
        pageMargins: [40,60,40,60],
        header: headerSection({showLogo: true, showDate: true}),
        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'header',
              
            },
            {
                text: `
                Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMYYY(employeeStartDate) }.\n
                Durante su empleo, el Sr./Sra. ${employerName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n
                La jornada laboral del Sr./ Sra. ${employerName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n 
                Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n `,
                style: 'body'
            },
            {
                text: `Atentamente`, style: 'signature'
            },
            {
                text: employerName, style: 'signature'
            },
            {
                text: employerPosition, style: 'signature'
            },
            {
                text: employerCompany, style: 'signature'
            }
            , {
                text: `${DateFormatter.getDDMMYYY(new Date())}`, style: 'signature'
            }
        ],
        footer: {
            text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
            style: 'footer'
        }
    };

    return docDefinition;
    
}