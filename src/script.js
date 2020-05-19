(function () {
    var isIE;
    if ( navigator.userAgent.indexOf('MSIE') !== -1
        || navigator.appVersion.indexOf('Trident/') > -1 ) {
        isIE = true;
    }
    else {
        isIE = false;
    }
    if ( !Array.prototype.forEach ) {
        Array.prototype.forEach = function (fun /*, thisp*/) {
            var len = this.length;

            if ( typeof fun != "function" )
                throw new TypeError();

            var thisp = arguments[ 1 ];

            for ( var i = 0; i < len; i++ ) {
                if ( i in this )
                    fun.call(thisp, this[ i ], i, this);
            }
        };
    }


    // CALCULATOR
    var chartCanvas = document.getElementById('myChart');
    if ( chartCanvas ) {
        var data = {
            "A": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
            "B": ["", "", "Moduł MOC", "Oprocentowanie BNP", "Liczba rat", "Opłata montażowa brutto 8%", "Opłata montażowa brutto 23%", "Cena Instalacji netto do 10 kW", "Cena Instalacji netto plus 10-20kW", "Cena Instalacji netto 20-50 kW", "Ubezpieczenie (% ceny zestawu netto)", "Monitoring 24/7 (% ceny zestawu netto)", "Gwarancja 4x25 lat (% ceny zestawu netto)", "Panele Full Black (PLN za panel)", "", " Optymalny plan", " Liczba paneli", " Powieżchnia potrzebna m2", " Moc wymagana", " Moc W", " Zapas", " Moc kW", " Cena zestawu Netto Podstawowa", " Ubezpieczenie", " Monitoring 24/7", " Gwarancja 4x25 lat", " Panele Full Black", " Wybór klienta( Cena Netto Podstawowa + dodatki)", " Kwota finansowania Brutto 8%", " Kwota finansowania Brutto 23%", " Vat 8%", " Vat 23%", "Nazwa Planu"],
            "C": ["", "", "310", "0.0037", "120", "1900", "2100", "4900", "4500", "4300", "0.03", "0.02", "0.08", "150", "", " x", "10.00", "17.00", "2000.00", "3100.00", "-1100.00", "3.10", "15190.00", "455.70", "303.80", "1215.20", "1500.00", "18664.70", "18257.88", "20857.58", "188.69", "215.56", "Plan S"],
            "D": ["", "", "W", "", "", "zł", "zł", "zł/kW", "zł/kW", "zł/kW", "", "", "", "", "", "  -      ", "12.00", "20.40", "2000.00", "3720.00", "-1720.00", "3.72", "18228.00", "546.84", "364.56", "1458.24", "1800.00", "22397.64", "22289.45", "25449.10", "230.36", "263.01", "Plan S+"],
            "E": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "14.00", "23.80", "2000.00", "4340.00", "-2340.00", "4.34", "21266.00", "637.98", "425.32", "1701.28", "2100.00", "26130.58", "26321.03", "30040.61", "272.03", "310.47", "Plan M"],
            "F": ["", "", "Twój miesięczny rachunek za energię", "Roczne koszty zuzycia energii", "Twój plan Edison", "Plan edison", "Oszczędności dzięki instalacji PV", "Gwarantowane oszczędności z Edison", "Wzrost cen prądu", "", "", "", "", "", "", "  -      ", "16.00", "27.20", "2000.00", "4960.00", "-2960.00", "4.96", "24304.00", "729.12", "486.08", "1944.32", "2400.00", "29863.52", "30352.60", "34632.13", "313.69", "357.92", "Plan M+"],
            "G": ["", "", "250", "2000", "3.1", "18258", "97361", "121701", "0.035", "", "", "", "", "", "", "  -      ", "18.00", "30.60", "2000.00", "5580.00", "-3580.00", "5.58", "27342.00", "820.26", "546.84", "2187.36", "2700.00", "33596.46", "34384.18", "39223.65", "355.36", "405.37", "Plan L"],
            "H": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "20.00", "34.00", "2000.00", "6200.00", "-4200.00", "6.20", "30380.00", "911.40", "607.60", "2430.40", "3000.00", "37329.40", "38415.75", "43815.16", "397.02", "452.83", "Plan L+"],
            "I": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "24.00", "40.80", "2000.00", "7440.00", "-5440.00", "7.44", "36456.00", "1093.68", "729.12", "2916.48", "3600.00", "44795.28", "46478.90", "52998.19", "480.36", "547.73", "Plan XL"],
            "J": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "28.00", "47.60", "2000.00", "8680.00", "-6680.00", "8.68", "42532.00", "1275.96", "850.64", "3402.56", "4200.00", "52261.16", "54542.05", "62181.23", "563.69", "642.64", "Plan XL+"],
            "K": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "32.00", "54.40", "2000.00", "9920.00", "-7920.00", "9.92", "48608.00", "1458.24", "972.16", "3888.64", "4800.00", "59727.04", "62605.20", "71364.26", "647.02", "737.55", "Plan XXL"],
            "L": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "34.00", "57.80", "2000.00", "10540.00", "-8540.00", "10.54", "47430.00", "1422.90", "948.60", "3794.40", "5100.00", "58695.90", "61491.57", "70095.96", "635.51", "724.44", "Plan XXL+"],
            "M": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "40.00", "68.00", "2000.00", "12400.00", "-10400.00", "12.40", "55800.00", "1674.00", "1116.00", "4464.00", "6000.00", "69054.00", "72678.32", "82836.42", "751.13", "856.11", "Plan Indywidualny"],
            "N": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "44.00", "74.80", "2000.00", "13640.00", "-11640.00", "13.64", "61380.00", "1841.40", "1227.60", "4910.40", "6600.00", "75959.40", "80136.15", "91330.06", "828.20", "943.89", "Plan Indywidualny"],
            "O": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "50.00", "85.00", "2000.00", "15500.00", "-13500.00", "15.50", "69750.00", "2092.50", "1395.00", "5580.00", "7500.00", "86317.50", "91322.90", "104070.53", "943.82", "1075.56", "Plan Indywidualny"],
            "P": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "56.00", "95.20", "2000.00", "17360.00", "-15360.00", "17.36", "78120.00", "2343.60", "1562.40", "6249.60", "8400.00", "96675.60", "102509.65", "116810.99", "1059.43", "1207.23", "Plan Indywidualny"],
            "Q": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "60.00", "102.00", "2000.00", "18600.00", "-16600.00", "18.60", "83700.00", "2511.00", "1674.00", "6696.00", "9000.00", "103581.00", "109967.48", "125304.63", "1136.51", "1295.02", "Plan Indywidualny"],
            "R": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "70.00", "119.00", "2000.00", "21700.00", "-19700.00", "21.70", "93310.00", "2799.30", "1866.20", "7464.80", "10500.00", "115940.30", "123315.52", "140506.57", "1274.46", "1452.13", "Plan Indywidualny"],
            "S": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "80.00", "136.00", "2000.00", "24800.00", "-22800.00", "24.80", "106640.00", "3199.20", "2132.80", "8531.20", "12000.00", "132503.20", "141203.46", "160878.94", "1459.33", "1662.67", "Plan Indywidualny"],
            "T": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "90.00", "153.00", "2000.00", "27900.00", "-25900.00", "27.90", "119970.00", "3599.10", "2399.40", "9597.60", "13500.00", "149066.10", "159091.39", "181251.30", "1644.20", "1873.22", "Plan Indywidualny"],
            "U": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "100.00", "170.00", "2000.00", "31000.00", "-29000.00", "31.00", "133300.00", "3999.00", "2666.00", "10664.00", "15000.00", "165629.00", "176979.32", "201623.67", "1829.07", "2083.77", "Plan Indywidualny"],
            "V": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "120.00", "204.00", "2000.00", "37200.00", "-35200.00", "37.20", "159960.00", "4798.80", "3199.20", "12796.80", "18000.00", "198754.80", "212755.18", "242368.40", "2198.81", "2504.86", "Plan Indywidualny"],
            "W": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "128.00", "217.60", "2000.00", "39680.00", "-37680.00", "39.68", "170624.00", "5118.72", "3412.48", "13649.92", "19200.00", "212005.12", "227065.53", "258666.30", "2346.71", "2673.30", "Plan Indywidualny"],
            "X": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "140.00", "238.00", "2000.00", "43400.00", "-41400.00", "43.40", "186620.00", "5598.60", "3732.40", "14929.60", "21000.00", "231880.60", "248531.05", "283113.14", "2568.55", "2925.96", "Plan Indywidualny"],
            "Y": ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "  -      ", "160.00", "272.00", "2000.00", "49600.00", "-47600.00", "49.60", "213280.00", "6398.40", "4265.60", "17062.40", "24000.00", "265006.40", "284306.91", "323857.87", "2938.30", "3347.05", "Plan Indywidualny"]
        }

        var calculatorCustomData = JSON.parse(chartCanvas.dataset.calculator);

        var dataColumns = "CDEFGHIJKLMNOPQRSTUVWXY".split("");

        var table = document.querySelector("[data-table-calculator]");

        var renderTable = function (data, table) {
            var numOfRows = data.A.length;

            for ( var i = 0; i < numOfRows; i++ ) {
                var row = document.createElement("TR");
                row.dataset.row = i;
                table.appendChild(row);

                var rowIndex = i;
                var colIndex = 0;
                for ( var colKey in data ) {
                    var cell;
                    if ( rowIndex === 0 ) {
                        cell = document.createElement("TH");
                        cell.setAttribute("scope", "col");
                        cell.innerHTML = colKey;
                    }
                    else {
                        if ( colIndex === 0 ) {
                            cell = document.createElement("TH");
                            cell.setAttribute("scope", "row");
                        }
                        else {
                            cell = document.createElement("TD");
                        }
                        cell.innerHTML = data[ colKey ][ rowIndex ];
                    }

                    cell.dataset.col = colKey;
                    cell.dataset.cell = colKey + rowIndex;
                    cell.setAttribute("title", colKey + rowIndex);
                    row.appendChild(cell);

                    colIndex++;
                }
                ;

            }
        }

        var pmt = function (rate_per_period, number_of_payments, present_value, future_value, type) {
            if ( rate_per_period != 0.0 ) {
                // Interest rate exists
                var q = Math.pow(1 + rate_per_period, number_of_payments);
                return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

            }
            else if ( number_of_payments != 0.0 ) {
                // No interest rate, but number of payments exists
                return -(future_value + present_value) / number_of_payments;
            }

            return 0;
        }

        data.C[ 2 ] = parseFloat(calculatorCustomData.calc_moc);
        data.C[ 3 ] = parseFloat(calculatorCustomData.calc_bnp_percent) / 100;
        data.C[ 4 ] = parseFloat(calculatorCustomData.calc_installments);
        data.C[ 5 ] = parseFloat(calculatorCustomData.calc_assembly_fee_8);
        data.C[ 6 ] = parseFloat(calculatorCustomData.calc_assembly_fee_23);
        data.C[ 7 ] = parseFloat(calculatorCustomData.calc_installation_price_10);
        data.C[ 8 ] = parseFloat(calculatorCustomData.calc_installation_price_20);
        data.C[ 9 ] = parseFloat(calculatorCustomData.calc_installation_price_50);
        data.C[ 10 ] = parseFloat(calculatorCustomData.calc_insurance) / 100;
        data.C[ 11 ] = parseFloat(calculatorCustomData.calc_monitoring) / 100;
        data.C[ 12 ] = parseFloat(calculatorCustomData.calc_warranty) / 100;
        data.C[ 13 ] = parseFloat(calculatorCustomData.calc_full_black);

        var winnerPlan;

        var calcPlans = function (colKey) {
            var col = data[ colKey ];

            col[ 17 ] = parseFloat(col[ 16 ]) * 1.7;
            col[ 18 ] = parseFloat(data.G[ 3 ]);
            col[ 19 ] = parseFloat(col[ 16 ]) * parseFloat(data.C[ 2 ]);
            col[ 20 ] = parseFloat(col[ 18 ]) - parseFloat(col[ 19 ]);
            col[ 21 ] = parseFloat(col[ 19 ]) / 1000;
            col[ 22 ] = col[ 21 ] <= 10 ? parseFloat(col[ 21 ]) * parseFloat(data.C[ 7 ]) : (col[ 21 ] <= 20 ? parseFloat(col[ 21 ]) * parseFloat(data.C[ 8 ]) : parseFloat(col[ 21 ]) * parseFloat(data.C[ 9 ]));
            col[ 23 ] = parseFloat(col[ 22 ]) * parseFloat(data.C[ 10 ]);
            col[ 24 ] = parseFloat(col[ 22 ]) * parseFloat(data.C[ 11 ]);
            col[ 25 ] = parseFloat(col[ 22 ]) * parseFloat(data.C[ 12 ]);
            col[ 26 ] = parseFloat(col[ 16 ]) * parseFloat(data.C[ 13 ]);
            col[ 27 ] = parseFloat(col[ 22 ]) + parseFloat(col[ 23 ]) + parseFloat(col[ 24 ]) + parseFloat(col[ 25 ]) + parseFloat(col[ 26 ]);
            col[ 28 ] = parseFloat(col[ 27 ]) * 1.08 - parseFloat(data.C[ 5 ]);
            col[ 29 ] = parseFloat(col[ 27 ]) * 1.23 - parseFloat(data.C[ 6 ]);
            col[ 30 ] = -pmt(parseFloat(data.C[ 3 ]), parseFloat(data.C[ 4 ]), col[ 28 ], 0, 0);
            col[ 31 ] = -pmt(parseFloat(data.C[ 3 ]), parseFloat(data.C[ 4 ]), col[ 29 ], 0, 0);

            var optimalPlan = isOptimalPlan(colKey);

            col[ 15 ] = optimalPlan ? "X" : "-";

            if ( optimalPlan ) {
                data.G[ 4 ] = col[ 19 ] / 1000;
                winnerPlan = optimalPlan;
            }

        }

        function getGuranteedSavingsValueString() {
            return data.G[ 7 ].toLocaleString("pl-PL", {maximumFractionDigits: 0}) + " zł";
        }

        var isOptimalPlan = function (colKey) {
            if ( colKey === "C" ) {
                return data[ colKey ][ 18 ] < data[ colKey ][ 19 ] ? data[ colKey ] : false;
            }
            else {
                var prevCol = dataColumns[ dataColumns.indexOf(colKey) - 1 ];
                return data[ colKey ][ 20 ] * data[ prevCol ][ 20 ] <= 0 ? data[ colKey ] : false;
            }
        }

        var updateData = function (row, value) {
            data.G[ row ] = value;

            data.G[ 3 ] = parseFloat(data.G[ 2 ]) * 12 / 0.6;

            for ( var i = 0; i < dataColumns.length; i++ ) {
                var letter = dataColumns[ i ];
                calcPlans(letter);
            }
            ;

            data.G[ 6 ] = data.G[ 4 ] * 1000 * 25 * (0.6 * Math.pow((1 + parseFloat(data.G[ 8 ])), 25));
            data.G[ 7 ] = data.G[ 6 ] * 1.25;
        }

        // ---------------------------------------------------------------------

        updateData();

        // range input

        var rangeInputPrice = document.getElementById('rangeInputPrice');
        var rangeInputPriceIncrease = document.getElementById('rangeInputPriceIncrease');

        var rangeInput = function (input, unit) {
            var inputWrapper = input.parentNode;
            var output = input.nextElementSibling;

            inputWrapper.classList.add('js');

            input.addEventListener('input', function () {
                output.value = input.value + unit;
                inputWrapper.style.setProperty('--val', +input.value);
                output.classList.add('active');
                if ( unit === " %" ) {
                    updateData("8", parseFloat(input.value) / 100);
                }
                else {
                    updateData("2", parseFloat(input.value));
                }

                savingsOutput.innerText = getGuranteedSavingsValueString();
                guaranteedSavingsLabelVal.innerText = getGuranteedSavingsValueString();
                winnerOutputVal.innerText = winnerPlan[ 30 ].toFixed(0) + " zł";
                winnerOutput.innerText = winnerPlan[ 32 ];

                updateChart(mixedChart, [winnerPlan[ 30 ] * 12 / 0.75], [data.G[ 7 ]]);

            }, false)

//             if ( isIE ) {
//                 input.addEventListener('change', function () {
//                     output.innerText = input.value + unit;
//                     inputWrapper.style.setProperty('--val', +input.value);
//                     output.classList.add('active');
//                     if ( unit === " %" ) {
//                         updateData("8", parseFloat(input.value) / 100);
//                     }
//                     else {
//                         updateData("2", parseFloat(input.value));
//                     }
//
//                     savingsOutput.innerText = data.G[ 7 ].toLocaleString("pl-PL", {maximumFractionDigits: 0}) + " zł";
//                     winnerOutputVal.innerText = winnerPlan[ 30 ].toFixed(0) + " zł";
//                     winnerOutput.innerText = winnerPlan[ 32 ];
//
//                     updateChart(mixedChart, [ winnerPlan[ 30 ] * 12 / 0.75 ], calcAnnualCosts());
//
//                 }, false);
//             }
//             else {
// ;
//             }
        };

        if ( rangeInputPrice ) {
            rangeInput(rangeInputPrice, " zł");
            rangeInput(rangeInputPriceIncrease, " %");

            var savingsOutput = document.querySelector("[data-savings]");
            var winnerOutput = document.querySelector("[data-winner]");
            var winnerOutputVal = document.querySelector("[data-winner-value]");
            var guaranteedSavingsLabel = document.querySelector(".guaranteed-savings-col-label");
            var guaranteedSavingsLabelVal = document.querySelector(".guaranteed-savings-col-label .value");


            savingsOutput.innerText = getGuranteedSavingsValueString();
            guaranteedSavingsLabelVal.innerText = getGuranteedSavingsValueString();
            winnerOutputVal.innerText = winnerPlan[ 30 ].toFixed(0) + " zł";
            winnerOutput.innerText = winnerPlan[ 32 ];
        }


        // calc price increment

        var calcAnnualCosts = function () {
            var calcs = [];
            var annualCosts = [];
            for ( var i = 0; i <= 10; i++ ) {
                if ( i === 0 ) {
                    annualCosts.push(data.G[ 3 ]);
                    calcs.push(data.G[ 3 ]);
                }
                else {
                    var rise = calcs[ i - 1 ] + calcs[ i - 1 ] * data.G[ 8 ];
                    calcs.push(parseFloat(rise.toFixed(0)));
                    if ( i === 4 || i === 7 || i === 10 ) {
                        annualCosts.push(parseFloat(rise.toFixed(0)));
                    }
                }
            }
            ;
            return annualCosts;
        }


        // chart

        var ctx = chartCanvas.getContext('2d');
        var mixedChart;
        var img = new Image();
        img.src = 'data:image/png;base64,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';
        img.onload = function () {
            var fillPattern = ctx.createPattern(img, 'repeat');

            mixedChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [
                        {
                            xAxisID: "bar-x",
                            yAxisID: "bar-1",
                            label: 'Plan Edison',
                            backgroundColor: "#C6DAE7",
                            hoverBackgroundColor: '#C6DAE7',
                            data: [winnerPlan[ 30 ] * 12 / 0.75]
                        },
                        {
                            yAxisID: "bar-2",
                            label: 'Gwarantowana oszczędność',
                            backgroundColor: "#fff",
                            hoverBackgroundColor: '#fff',
                            data: [data.G[ 7 ]]
                        }
                    ]
                },
                options: {
                    legend: {display: false},
                    scales: {
                        xAxes: [
                            {
                                id: "bar-x",
                                display: true,
                                categoryPercentage: 1.0,
                                barPercentage: 0.6
                            },
                        ],
                        yAxes: [
                            {
                                id: 'bar-1',
                                display: false,
                                position: 'left',
                                // minBarLength: 70,
                                type: 'logarithmic',
                                ticks: {
                                    // stepSize: 1000,
                                    min: 200,
                                    max: 2000000,
                                }
                            },
                            {
                                id: 'bar-2',
                                display: false,
                                type: 'logarithmic',
                                minBarLength: 200,
                                position: 'right',
                                ticks: {
                                    // stepSize: 300000,
                                    min: 5000,
                                    max: 4400000,

                                },
                                gridLines: {
                                    drawOnChartArea: false
                                }
                            }
                        ]
                    },
                    tooltips: {
                        enabled: false
                    },
                }
            });
        }

        function updateChart(chart, data1, data2) {
            chart.data.datasets[ 0 ].data = data1;
            chart.data.datasets[ 1 ].data = data2;
            chart.update();
        }

        if ( table ) {
            renderTable(data, table);
        }
    }

    // content animation

    /*!
    * Determine if an element is in the viewport
    * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
    * @param  {Node}    elem The element
    * @return {Boolean}      Returns true if element is in the viewport
    */
    var isInViewport = function (elem) {
        var distance = elem.getBoundingClientRect();
        return (
            distance.top >= 0 &&
            distance.left >= 0 &&
            distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            distance.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    var animatedElements = document.querySelectorAll("[data-animated-el]");

    var animate = function (elements) {
        var counter = 0;
        for ( var i = 0; i < elements.length; i++ ) {
            var el = elements[ i ];
            if ( !el.classList.contains("come-in") ) {
                if ( isInViewport(el) ) {
                    el.classList.add("come-in");
                    el.style.transitionDelay = counter * 0.2 + "s";
                    counter++;
                }
            }
        }
    };
    animate(animatedElements);

    window.addEventListener('scroll', function (event) {
        animate(animatedElements);
    }, false);



})();