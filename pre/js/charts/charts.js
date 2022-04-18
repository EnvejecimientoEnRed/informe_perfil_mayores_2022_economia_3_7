//Desarrollo de las visualizaciones
import * as d3 from 'd3';
//import { numberWithCommas2 } from './helpers';
//import { getInTooltip, getOutTooltip, positionTooltip } from './modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage } from '../modules/canvas-image';
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
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe_perfil_mayores_2022_economia_3_7/main/data/riesgo_pobreza_edad_sexo_v2.csv', function(error,data) {
        if (error) throw error;

        data = data.filter(function(item){if(item.Sexo != 'Ambos sexos'){ return item; }});

        ///// Desarrollo de los tres gráficos
        let currentSex = 'Mujeres';

        let margin = {top: 10, right: 10, bottom: 30, left: 35},
            width = document.getElementById('chart').clientWidth - margin.left - margin.right,
            height = document.getElementById('chart').clientHeight - margin.top - margin.bottom;

        let sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d.Sexo + '-' + d.Edad;})
            .entries(data);

        let svg = d3.select("#chart")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        let x = d3.scaleBand()
            .domain(d3.map(data, function(d) { return d.Periodo; }).keys())
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        let y = d3.scaleLinear()
            .domain([0, 35])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y).ticks(7));

        // color palette
        let res = sumstat.map(function(d){ return d.key; });
        let color = d3.scaleOrdinal()
            .domain(res)
            .range([COLOR_COMP_2, COLOR_PRIMARY_1, COLOR_COMP_1, COLOR_OTHER_2]);        

        function init() {
            svg.selectAll(".line")
                .data(sumstat)
                .enter()
                .append("path")
                .attr('class', 'lines')
                .attr("fill", "none")
                .attr("stroke", function(d){ return color(d.key) })
                .attr("opacity", function(d) {
                    if(d.key.split('-')[0] == 'Mujeres') {
                        return '1';
                    } else {
                        return '0.5';
                    }
                })
                .attr("stroke-width", function(d) {
                    if(d.key.split('-')[0] == 'Mujeres') {
                        return '3';
                    } else {
                        return '2';
                    }
                })
                .attr("d", function(d){
                    return d3.line()
                        .x(function(d) { return x(d.Periodo) + x.bandwidth() / 2; })
                        .y(function(d) { return y(+d.Total); })
                        (d.values)
                });
        }

        function animateChart() {

        }

        function setChart(sex) {
            svg.selectAll(".lines")
                .attr("fill", "none")
                .attr("stroke", function(d){ return color(d.key) })
                .attr("opacity", function(d) {
                    if(d.key.split('-')[0] == sex) {
                        return '1';
                    } else {
                        return '0.5';
                    }
                })
                .attr("stroke-width", function(d) {
                    if(d.key.split('-')[0] == sex) {
                        return '3';
                    } else {
                        return '2';
                    }
                })
                .attr("d", function(d){
                    return d3.line()
                        .x(function(d) { return x(d.Periodo) + x.bandwidth() / 2; })
                        .y(function(d) { return y(+d.Total); })
                        (d.values)
                });
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

        document.getElementById('viz_sex').addEventListener('change', function(e) {
            if(currentSex != e.target.value) {
                currentSex = e.target.value;
                setChart(currentSex);
            }            
        });

        /////
        /////
        // Resto
        /////
        /////

        //Iframe
        setFixedIframeUrl('informe_perfil_mayores_economia_3_7','evolucion_tasa_pobreza');

        //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
        setRRSSLinks('evolucion_tasa_pobreza');

        //Captura de pantalla de la visualización
        setChartCanvas();

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('evolucion_tasa_pobreza');
        });

        //Altura del frame
        setChartHeight(iframe);
    });       
}