import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
   async onModuleInit() {
        await this.$connect()
    }
    constructor(
        private printeService: PrinterService
    ){
        super();
    }
 
   async getOrderReportByOrderId(orderId:number){
        

     const order = await this.orders.findUnique({
        where: {
            order_id: orderId
          },
          //"join" con prisma
          include: {
            customers:true,
            order_details:{
                include: {
                    products:true
                }
            }
          }
     })

     if(!order){
        throw new NotFoundException(`Order with id ${orderId} not found`)
     }


        const docDefinition = orderByIdReport({
            data:order as any
        })

        const doc = this.printeService.createPdf(docDefinition)

        return doc;
    }

}
