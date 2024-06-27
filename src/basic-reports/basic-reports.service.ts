import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterReport, getHelloWorlReport, getEmploymentLetterByIdReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // console.log('Connected to the database');
  }

  constructor(
    private readonly printerService: PrinterService
  ){
    super();
  }



   hello() {
   const docDefinition = getHelloWorlReport({name: 'David'});
    return this.printerService.createPdf(docDefinition)
   
  }

  employmentLetter(){
    const docDefinition = getEmploymentLetterReport();
    return this.printerService.createPdf(docDefinition)
  }

  async employmentLetterById(employeeId:number){
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId
      }
    });

    // console.log(employee)


    if(!employee) throw new NotFoundException(`Employee with id ${employeeId} not found`)

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'David Maldonado',
      employerPosition: 'Gerente de RRHH',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp. S.A',
    });
    return this.printerService.createPdf(docDefinition)
  }
}
