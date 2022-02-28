//Desarrollo de las visualizaciones
//import * as d3 from 'd3';
//import { numberWithCommas2 } from './helpers';
//import { getInTooltip, getOutTooltip, positionTooltip } from './modules/tooltip';
import { setChartHeight } from '../modules/height';
import { setChartCanvas, setChartCanvasImage } from '../modules/canvas-image';
import { setRRSSLinks } from '../modules/rrss';
import { setFixedIframeUrl } from './chart_helpers';

export function initChart3_1(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Pensiones contributivas del sistema de la Seguridad Social por tipo de régimen y clase de pensión, 20XX';
    document.getElementById('subtitle').textContent = 'Tabla 3.1.';
    document.getElementById('data-source').textContent = 'Boletín de Estadísticas Laborales del Ministerio de Trabajo y Asuntos Sociales';
    document.getElementById('data-note').textContent = 'Las pensiones del Régimen de Empleados de Hogar forman parte del Régimen General desde junio de 2013. 1) Seguro obligatorio de Vejez e Invalidez.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('pensiones_contributivas');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('pensiones_contributivas');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('pensiones_contributivas');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart3_2(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Pensiones contributivas del sistema de la Seguridad Social por clase de pensión y tipo de régimen. Pensiones de jubilación';
    document.getElementById('subtitle').textContent = 'Figura 3.1. Importe medio €/mes.';
    document.getElementById('data-source').textContent = 'Boletín de Estadísticas Laborales del Ministerio de Trabajo y Asuntos Sociales';
    document.getElementById('data-note').textContent = 'Las pensiones del Régimen de Empleados de Hogar forman parte del Régimen General desde junio de 2013. SOVI: Seguro Obligatorio de Vejez e Invalidez.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('pensiones_contibutivas_jubilacion');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('Título del gráfico 3.2');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('titulo_grafico_3_2');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart3_3(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Importe medio mensual de las pensiones de jubilación. Por comunidad autónoma, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 3.2. En euros.';
    document.getElementById('data-source').textContent = 'Seguridad Social. Pensiones contributivas (PEN-23 y PEN-24)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('importe_mensual_pensiones');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('importe_mensual_pensiones');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('importe_mensual_pensiones');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart3_4(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Brecha de género en las pensiones. Europa, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 3.3. Porcentaje en que la pensión de la mujer es más baja que la del hombre.';
    document.getElementById('data-source').textContent = 'Eurostat (Gender pension gap by age group)';
    document.getElementById('data-note').textContent = 'Datos para personas de 65 y más años.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('brecha_genero_pensiones');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('brecha_genero_pensiones');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('brecha_genero_pensiones');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart3_5(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Evolución de la distribución porcentual de la población ocupada por grupo de edad en España.';
    document.getElementById('subtitle').textContent = 'Figura 3.4. Evolución entre 1970 y 2017. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Censos de población y Encuesta de Población Activa)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('evolucion_poblacion_ocupada');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('evolucion_poblacion_ocupada');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('evolucion_poblacion_ocupada');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart3_6(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Años esperados de vida después de la edad de jubilación en países de la OCDE, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 3.5. Datos en años.';
    document.getElementById('data-source').textContent = 'OECD (Pensions at a Glance, 2019)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('edv_tras_jubilacion');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('edv_tras_jubilacion');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('edv_tras_jubilacion');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart3_7(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Distribución porcentual del gasto medio por hogar por grupo de gasto y edad del sustentador principal, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 3.6. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Encuesta de Presupuestos Familiares)';
    document.getElementById('data-note').textContent = 'El grupo "Ocio, hoteles y restauración" incluye: Ocio, espectáculos y cultura, hoteles, cafés y restaurantes. El grupo "Resto de bienes y servicios" incluye: bebidas alcohólicas, tabaco, narcóticos, mobiliario, equipamiento del hogar y gastos corrientes, transportes, comunicaciones, enseñanza y otros bienes y servicios.';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('distribucion_gasto_hogar');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('distribucion_gasto_hogar');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('distribucion_gasto_hogar');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart3_8(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Distribución porcentual del régimen de tenencia de vivienda principal por edad de la persona de referencia, 20XX';
    document.getElementById('subtitle').textContent = 'Figura 3.7.';
    document.getElementById('data-source').textContent = 'INE (Encuesta de Condiciones de Vida)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('distribucion_regimen_tenencia');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('distribucion_regimen_tenencia');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('distribucion_regimen_tenencia');
    });

    //Altura del frame
    setChartHeight(iframe);
}

export function initChart3_9(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Evolución de la tasa de riesgo de pobreza por grupo de edad en España';
    document.getElementById('subtitle').textContent = 'Figura 3.8. Evolución 2008-2018. Datos en porcentajes.';
    document.getElementById('data-source').textContent = 'INE (Encuesta de Condiciones de Vida)';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('evolucion_tasa_pobreza');

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
}

export function initChart3_10(iframe, position) {
    //Desarrollo de funciones asociadas al gráfico > Título, subtítulo, notas, fuente de datos
    document.getElementById('title').textContent = 'Ejemplo sobre el umbral de pobreza';
    document.getElementById('subtitle').textContent = 'Figura 3.9. Ilustración.';
    document.getElementById('data-source').textContent = 'Datos inventados';
    document.getElementById('data-note').textContent = '';

    //Desarrollo del gráfico   


    //Animación del gráfico
    document.getElementById('replay').addEventListener('click', function() {
        animateChart();
    });

    //Iframe
    setFixedIframeUrl('ejemplo_umbral_pobreza');

    //Redes sociales > Antes tenemos que indicar cuál sería el texto a enviar
    setRRSSLinks('ejemplo_umbral_pobreza');

    //Captura de pantalla de la visualización
    setChartCanvas();

    let pngDownload = document.getElementById('pngImage');

    pngDownload.addEventListener('click', function(){
        setChartCanvasImage('ejemplo_umbral_pobreza');
    });

    //Altura del frame
    setChartHeight(iframe);
}