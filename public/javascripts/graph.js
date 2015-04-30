$(function () {
    // Give the points a 3D feel by adding a radial gradient
    Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.4,
                cy: 0.3,
                r: 0.5
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
            ]
        };
    });

    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo:  'graph',
            margin: 0,
            type: 'scatter',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 30,
                depth: 500,
                viewDistance: 5,

                frame: {
                    bottom: { size: 10, color: 'rgba(0,0,0,0.1)' },
                    back: { size: 10, color: 'rgba(0,0,0,0.1)' },
                    side: { size: 10, color: 'rgba(0,0,0,0.1)' }
                }
            }
        },
        title: {
            text: null
        },
        plotOptions: {
            scatter: {
                depth: 50
            }
        },
        yAxis: {
            min: 0,
            max: 50
        },
        xAxis: {
            min: 0,
            max: 50,
            gridLineWidth: 1
        },
        zAxis: {
            min: 0,
            max: 50,
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Data Point',
            colorByPoint: true,
            data: data
        }]
    });

    // Add mouse events for rotation
    $(chart.container).bind('mousedown.hc touchstart.hc', function (e) {
        e = chart.pointer.normalize(e);

        var posX = e.pageX,
            posY = e.pageY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            newAlpha,
            newBeta,
            sensitivity = 5; // lower is more sensitive

        $(document).bind({
            'mousemove.hc touchdrag.hc': function (e) {
                // Run beta
                newBeta = beta + (posX - e.pageX) / sensitivity;
                newBeta = Math.min(100, Math.max(-100, newBeta));
                chart.options.chart.options3d.beta = newBeta;

                // Run alpha
                newAlpha = alpha + (e.pageY - posY) / sensitivity;
                newAlpha = Math.min(100, Math.max(-100, newAlpha));
                chart.options.chart.options3d.alpha = newAlpha;

                chart.redraw(false);
            },
            'mouseup touchend': function () {
                $(document).unbind('.hc');
            }
        });
    });
});
