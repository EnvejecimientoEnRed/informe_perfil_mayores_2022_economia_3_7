import 'url-search-params-polyfill';
import './modules/tabs';
import * as charts from './charts/charts';

//Necesario para importar los estilos de forma automática en la etiqueta 'style' del html final
import '../css/main.scss';

/////////////
//////// RECOGIDA DE PARÁMETROS DE LA URL
/////////////
getUrlParams();

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    //Visualización y tipo de iframe
    const viz = params.get('chart');
    const iframe = params.get('iframe');

    setChart(viz, iframe);
}

function setChart(viz, iframe) {
    pymChild.onMessage('viewport-iframe-position', onScroll);    

    function onScroll(parentInfo) {
        let steps = parentInfo.split(" ");

        if(steps[2] != 0 && !isChartActive) {
            switch(viz){
                //Economía
                case '3_1':
                    charts.initChart3_1(iframe, steps[2]);
                    break;
                case '3_2':
                    charts.initChart3_2(iframe, steps[2]);
                    break;
                case '3_3':
                    charts.initChart3_3(iframe, steps[2]);
                    break;
                case '3_4':
                    charts.initChart3_4(iframe, steps[2]);
                    break;
                case '3_5':
                    charts.initChart3_5(iframe, steps[2]);
                    break;
                case '3_6':
                    charts.initChart3_6(iframe, steps[2]);
                    break;
                case '3_7':
                    charts.initChart3_7(iframe, steps[2]);
                    break;
                case '3_8':
                    charts.initChart3_8(iframe, steps[2]);
                    break;
                case '3_9':
                    charts.initChart3_9(iframe, steps[2]);
                    break;
                case '3_10':
                    charts.initChart3_10(iframe, steps[2]);
                    break;
                default: //Si no hay parámetros en la URL
                    charts.initChart3_1('responsive', steps[2]);
                        break;                
            }
            isChartActive = true;
        }
    }    
}