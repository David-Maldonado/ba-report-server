import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello( @Res() response: Response ) {
    
    const pdfDoc =  this.basicReportsService.hello();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola mundo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employment( @Res() response: Response ) {
    const pdfDoc =  this.basicReportsService.employmentLetter();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async countries( @Res() response: Response ) {
    const pdfDoc =  await this.basicReportsService.getPaises();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentById(
     @Res() response: Response,
     @Param('employeeId') employeeId: string
     ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(+employeeId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }



  
}
