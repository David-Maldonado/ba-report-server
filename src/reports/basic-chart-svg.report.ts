import fs from 'fs';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from '../helpers/chart-utils';
//el svg hay que leer desde el filesystem, no como con las imagenes con la ruta directamente'src/assets/...'

const svgContent = fs.readFileSync('src/assets/ford.svg',  'utf-8')


const generateChartImage = async () => {
   const chartConfig = {
    type: 'bar',
    data: {
        labels: [2012, 2013, 2014, 2015, 2016], // set x-axis labels
        datasets: [
            {
                label: 'Users',
                data: [120, 60, 50, 180, 120], // set y-axis values
                
            },
        ],
    },

};
return Utils.chartJsToImage(chartConfig, { width: 500, height: 300 });
};


const generateDonutChartImage = async () => {
    const chartConfig = {
     type: 'doughnut',
     data: {
         labels: ['Red', 'Blue', 'Yellow'], // set x-axis labels
         datasets: [
             {
                 label: 'Colors',
                 data: [120, 60, 50], // set y-axis values
                 backgroundColor: Utils.CHART_COLORS,
             },
         ],
     },
 
 };
 return Utils.chartJsToImage(chartConfig, { width: 500, height: 300 });
 }


export const getBasicChartSvgReport =
async (): Promise<TDocumentDefinitions> =>{
//? es una manera de hacer que se ejecuten en paralelo, es decir, que se ejecuten al mismo tiempo
    const [chart, chartDonut] = await Promise.all([
        //? esto es para generar las imagenes de los charts
        generateChartImage(),
        generateDonutChartImage(),
    ]);

    //? esto es para generar las imagenes de los charts
    // const chart = await generateChartImage();
    // const chartDonut = await generateDonutChartImage();

    
    return {
        content: [
        {
            svg: svgContent,
            width: 200,
            fit: [100,100]
        },
        {
            image: chart,
            width: 500,
            
        },
        {
            image: chartDonut,
            width: 500,
            
        },
        ]
    }
}