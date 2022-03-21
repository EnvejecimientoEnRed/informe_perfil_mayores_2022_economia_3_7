//Desarrollo de las visualizaciones
import * as d3 from 'd3';
//import { numberWithCommas2 } from './helpers';
//import { getInTooltip, getOutTooltip, positionTooltip } from './modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage, setCustomCanvas, setChartCustomCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

//Colores fijos
const COLOR_PRIMARY_1 = '#F8B05C', 
COLOR_PRIMARY_2 = '#E37A42', 
COLOR_ANAG_1 = '#D1834F', 
COLOR_ANAG_2 = '#BF2727', 
COLOR_COMP_1 = '#528FAD', 
COLOR_COMP_2 = '#AADCE0', 
COLOR_GREY_1 = '#B5ABA4', 
COLOR_GREY_2 = '#64605A', 
COLOR_OTHER_1 = '#B58753', 
COLOR_OTHER_2 = '#731854';

export function initChart(iframe) {
    //Desarrollo del gráfico
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe_perfil_mayores_2022_economia_3_8/main/data/riesgo_pobreza_edad_sexo_v2.csv', function(error,data) {
        if (error) throw error;
        
        let ambosSexos = data.filter(function(item) {if(item.Sexo == 'Ambos sexos'){return item;}});
        let hombres = data.filter(function(item) {if(item.Sexo == 'Hombres'){return item;}});
        let mujeres = data.filter(function(item) {if(item.Sexo == 'Mujeres'){return item;}});

        function init() {

        }

        function animateChart() {

        }

        /////
        /////
        // Resto - Chart
        /////
        /////
        init();

        //Animación del gráfico
        document.getElementById('replay').addEventListener('click', function() {
            animateChart();
        });

        /////
        /////
        // Resto
        /////
        /////

        //Iframe
        setFixedIframeUrl('informe_perfil_mayores_economia_3_8','evolucion_tasa_pobreza');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('evolucion_tasa_pobreza');

        //Captura de pantalla de la visualización
        setChartCanvas();
        setCustomCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('evolucion_tasa_pobreza');
            setChartCustomCanvasImage('evolucion_tasa_pobreza');
        });

        //Altura del frame
        setChartHeight(iframe);
    });       
}