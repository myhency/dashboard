export const chartContents = {
    /*
    content: mandatory
    resource: mandatory
    type: optional
    options: optional
    responsiveOptions: optional
  */
    barDifficulty: {
        content: 'barChart',
        resource: 'txPerBlock',
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                      suggestedMin: 0,
                      suggestedMax: 5,
                      fontColor: 'black'
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Transactions per Block'
                    },
                    gridLines: {
                        display: false,
                        color: 'dimgray'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: false,
                        labelString: 'Block No.'
                    },
                    ticks: {
                        fontColor: 'black',
                        maxRotation: 0,
                        autoSkip: false,
                        callback: function(value, index, values) {
                            if(index == 0 || index === values.length-1 || index === parseInt((values.length-1)/2)) {
                                return value;
                            } else {
                                return "";
                            }
                        },
                    },
                    gridLines: {
                        display: false,
                        color: 'dimgray'
                    }
                }]
            },
            animation: {
                duration: 0, // general animation time
            },
            hover: {
                animationDuration: 0, // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0, // animation duration after a resize
            maintainAspectRatio: false,
            stacked: true,
            legend: {
                display: false
            }
        }
    }

};

export const url_TransactionPerBlock = "/api/block/?page_size=60&page=1";