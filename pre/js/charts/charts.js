//Desarrollo de las visualizaciones
import * as d3 from 'd3';
import { numberWithCommas3 } from '../helpers';
import { getInTooltip, getOutTooltip, positionTooltip } from '../modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

//Colores fijos
const COLOR_PRIMARY_1 = '#F8B05C',
COLOR_ANAG_PRIM_1 = '#BA9D5F', 
COLOR_ANAG_PRIM_2 = '#9E6C51',
COLOR_ANAG_PRIM_3 = '#9E3515';
let tooltip = d3.select('#tooltip');

export function initChart() {
    //Desarrollo del gráfico
    d3.csv('https://raw.githubusercontent.com/CarlosMunozDiazCSIC/informe_perfil_mayores_2022_economia_3_7/main/data/riesgo_pobreza_edad_sexo_v2.csv', function(error,data) {
        if (error) throw error;

        ///// Desarrollo de los tres gráficos
        let paths;
        let currentSex = 'Ambos sexos';

        let margin = {top: 12.5, right: 10, bottom: 25, left: 27.5},
            width = document.getElementById('chart').clientWidth - margin.left - margin.right,
            height = document.getElementById('chart').clientHeight - margin.top - margin.bottom;

        let sumstat = d3.nest()
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

        let xAxis = function(g) {
            g.call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ if(i == 0 || i == 3 || i == 6 || i == 9 || i == 12){ return d; } })));
            g.call(function(g){g.selectAll('.tick line').remove()});
            g.call(function(g){g.select('.domain').remove()});
        }

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add Y axis
        let y = d3.scaleLinear()
            .domain([0, 35])
            .range([ height, 0 ]);
        
        let yAxis = function(svg) {
            svg.call(d3.axisLeft(y).ticks(5).tickFormat(function(d,i) { return numberWithCommas3(d); }));
            svg.call(function(g) {
                g.call(function(g){
                    g.selectAll('.tick line')
                        .attr('class', function(d,i) {
                            if (d == 0) {
                                return 'line-special';
                            }
                        })
                        .attr('x1', '0%')
                        .attr('x2', `${width}`)
                });
            });
        }

        svg.append("g")
            .attr("class", "yaxis")
            .call(yAxis);

        // color palette
        let res = sumstat.map(function(d){ return d.key; });
        let color = d3.scaleOrdinal()
            .domain(res)
            .range([COLOR_PRIMARY_1, COLOR_ANAG_PRIM_1, COLOR_ANAG_PRIM_2, COLOR_ANAG_PRIM_3]);

        function init() {
            //Líneas
            svg.selectAll(".line")
                .data(sumstat)
                .enter()
                .append("path")
                .attr('class', 'lines')
                .attr("fill", "none")
                .attr("stroke", function(d){ return color(d.key) })
                .attr("opacity", function(d) {
                    if(d.key.split('-')[0] == 'Ambos sexos') {
                        return '1';
                    } else {
                        return '0';
                    }
                })
                .attr("stroke-width", function(d) {
                    if(d.key.split('-')[0] == 'Ambos sexos') {
                        return '3';
                    } else {
                        return '0';
                    }
                })
                .attr("d", function(d){
                    return d3.line()
                        .x(function(d) { return x(d.Periodo) + x.bandwidth() / 2; })
                        .y(function(d) { return y(+d.Total); })
                        (d.values)
                });

            //Paths para animación
            paths = svg.selectAll('.lines');
    
            paths.attr("stroke-dasharray", 1000 + " " + 1000)
                .attr("stroke-dashoffset", 1000)
                .transition()
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
                .duration(2000);

            //Círculos
            svg.selectAll('circles')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', function(d) {
                    return 'circle circle-' + d.Periodo + '-' + d.Sexo.split(' ')[0];
                })
                .attr('cx', function(d) {
                    return x(d.Periodo) + x.bandwidth() / 2;
                })
                .attr('cy', function(d) {
                    return y(+d.Total);
                })
                .attr('r', 3)
                .attr('stroke', 'none')
                .attr('fill', function(d) {
                    if(currentSex == d.Sexo) {
                        return 'transparent';
                    } else {
                        return 'none';
                    }
                })
                .on('mouseover', function(d,i,e) {
                    //Opacidad en círculos
                    let css = e[i].getAttribute('class').split(' ')[1];
                    let circles = svg.selectAll('.circle');
                    
                    //Solo mostramos los círculos para ese año y para el sexo seleccionado
                    circles.each(function() {
                        //this.style.stroke = '0.4';
                        let split = this.getAttribute('class').split(" ")[1];
                        if(split == `${css}`) {
                            this.style.stroke = 'black';
                            this.style.strokeWidth = '1';
                        }
                    });

                    console.log(d);

                    //Texto
                    let html = '<p class="chart__tooltip--title">' + d.Edad + ' (' + d.Periodo + ')</p>' + 
                        '<p class="chart__tooltip--text">El <b>' + numberWithCommas3(parseFloat(d.Total).toFixed(1)) + '</b>% de <b>' + d.Sexo.toLowerCase() + '</b> está en riesgo de pobreza para este grupo de edad y año</p>';
                
                    tooltip.html(html);

                    //Tooltip
                    positionTooltip(window.event, tooltip);
                    getInTooltip(tooltip);                                      
                })
                .on('mouseout', function(d,i,e) {
                    //Quitamos los estilos de la línea
                    let circles = svg.selectAll('.circle');
                    circles.each(function() {
                        this.style.stroke = 'none';
                    });
                
                    //Quitamos el tooltip
                    getOutTooltip(tooltip); 
                });
        }

        function animateChart() {
            paths.attr("stroke-dasharray", 1000 + " " + 1000)
                .attr("stroke-dashoffset", 1000)
                .transition()
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
                .duration(2000);
        }

        function setChart(sex) {
            //Líneas
            svg.selectAll(".lines")
                .attr("fill", "none")
                .attr("stroke", function(d){ return color(d.key) })
                .attr("opacity", function(d) {
                    if(d.key.split('-')[0] == sex) {
                        return '1';
                    } else {
                        return '0';
                    }
                })
                .attr("stroke-width", function(d) {
                    if(d.key.split('-')[0] == sex) {
                        return '3';
                    } else {
                        return '0';
                    }
                })
                .attr("d", function(d){
                    return d3.line()
                        .x(function(d) { return x(d.Periodo) + x.bandwidth() / 2; })
                        .y(function(d) { return y(+d.Total); })
                        (d.values)
                });

            //Círculos
            svg.selectAll('.circle')
                .attr('cx', function(d) {
                    return x(d.Periodo) + x.bandwidth() / 2;
                })
                .attr('cy', function(d) {
                    return y(+d.Total);
                })
                .attr('r', 3)
                .attr('stroke', 'none')
                .attr('fill', function(d) {
                    if(currentSex == d.Sexo) {
                        return 'transparent';
                    } else {
                        return 'none';
                    }
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

            setTimeout(() => {
                setChartCanvas();
            }, 4000);
        });

        document.getElementById('viz_sex').addEventListener('change', function(e) {
            if(currentSex != e.target.value) {
                currentSex = e.target.value;
                setChart(currentSex);

                setTimeout(() => {
                    setChartCanvas();
                }, 4000);
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
        setTimeout(() => {
            setChartCanvas();
        }, 4000);

        let pngDownload = document.getElementById('pngImage');

        pngDownload.addEventListener('click', function(){
            setChartCanvasImage('evolucion_tasa_pobreza');
        });

        //Altura del frame
        setChartHeight();
    });       
}