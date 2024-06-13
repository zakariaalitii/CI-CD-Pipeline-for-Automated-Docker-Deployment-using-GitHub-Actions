// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}



// Area Chart Example
var ctx = document.getElementById("myAreaChart");
const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {

        datasets: [{
            label: "Accuracy",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "green",
            pointRadius: 3,
            pointBackgroundColor: "green",
            pointBorderColor: "green",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,

        }],
    },
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                time: {
                    unit: 'date'
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    maxTicksLimit: 7
                }
            }],
            yAxes: [{
                ticks: {
                    maxTicksLimit: 5,
                    padding: 10,
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return '' + number_format(value);
                    }
                },
                gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                }
            }],
        },
        legend: {
            display: false
        },
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
                }
            }
        }
    }
});
// loss Chart-----------------------------------------------------------

var ctx_loss = document.getElementById("myAreaChartLoss");
const myLineChartLoss = new Chart(ctx_loss, {
    type: 'line',
    data: {

        datasets: [{
            label: "Loss",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "red",
            pointRadius: 3,
            pointBackgroundColor: "red",
            pointBorderColor: "red",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,

        }],
    },
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                time: {
                    unit: 'date'
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    maxTicksLimit: 7
                }
            }],
            yAxes: [{
                ticks: {
                    maxTicksLimit: 5,
                    padding: 10,
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return '' + number_format(value);
                    }
                },
                gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                }
            }],
        },
        legend: {
            display: false
        },
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
                label: function (tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
                }
            }
        }
    }
});

// End loss Chart-----------------------------------------------------------

const containerBody = document.getElementById('AccuracyChart');


function addData(label, data) {
    myLineChart.data.labels.push(label);
    myLineChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    myLineChart.update();
    if (myLineChart.data.labels.length > 30) {
        containerBody.style.width = '1690px';
    }
}



const containerBodyLoss = document.getElementById('LossChart');
function addDataLoss(label, data) {
    myLineChartLoss.data.labels.push(label);
    myLineChartLoss.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    myLineChartLoss.update();
    if (myLineChartLoss.data.labels.length > 30) {
        containerBodyLoss.style.width = '1690px';
    }
}



window.onload = function () {
    myLineChart.data.labels = [];
    myLineChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    myLineChartLoss.data.labels = [];
    myLineChartLoss.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    $.getJSON('http://127.0.0.1:5003/get_data_clients',
        function (data) {
            for (let index = 1; index < data.length; index++) {
                var versionLinks = document.getElementById("versionLinks");
                console.log("versionLinks1", versionLinks)
                GenerateHref(versionLinks, data[index]['Account'])
            }
            showModelInfo(data[1]['Account'], data[1]['data']['Acc'], data[1]['data']['Loss'], data[1]['data']['Count_row'], data[1]['data']['Round'], data[1]['data']['f1'], data[1]['data']['Confusion_matrix'], data[1]['data']['data_set']['Rows'])

        });
};





function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}



function filterFunction() {
    var input, filter, div, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        var txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";

        }
    }
}
var GlobalVar;
function showModelInfo(version, Acc, Loss, Count_row, Round, f1, Confusion_matrix, data_set) {

    GlobalVar = version;
    myLineChart.data.labels = [];
    myLineChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    myLineChartLoss.data.labels = [];
    myLineChartLoss.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    let last_val = Acc.length

    //modelInfoElement.innerHTML = "Account : " + version + "Acc: " + Acc[last_val - 1] + "Loss: " + Loss[last_val - 1];
    document.getElementById('Count_row').textContent = Count_row;
    document.getElementById('f1').textContent = f1;
    document.getElementById('Accuracyy').textContent = Acc[last_val - 1];
    document.getElementById('Losss').textContent = Loss[last_val - 1];
    document.getElementById('TP').textContent = Confusion_matrix["TP"];
    document.getElementById('FP').textContent = Confusion_matrix["FP"];
    document.getElementById('FN').textContent = Confusion_matrix["FN"];
    document.getElementById('TN').textContent = Confusion_matrix["TN"];
    for (let index = 0; index < Acc.length; index++) {
        addData(Round[index], Acc[index]);
    }
    for (let index = 0; index < Loss.length; index++) {
        addDataLoss(Round[index], Loss[index]);
    }
    document.getElementById("myDropdown").classList.remove("show");


    // Assuming you have an array of data called "data_set" containing the table rows

    var tableBody = document.getElementById('tableBody');
    var htmlContent = `
    ${generateTableRows(data_set)} <!-- Call the generateTableRows function here -->
  `
        ;
    function generateTableRows(dataSet) {
        var rowContent = '';
        for (var i = 0; i < dataSet.length; i++) {
            var rowData = dataSet[i];
            var row = `
        <tr>
          <td>${rowData[0]}</td>
          <td>${rowData[1]}</td>
          <td>${rowData[4]}</td>
          <td>${rowData[5]}</td>
         
        </tr>
      `;
            rowContent += row;
        }
        return rowContent;
    }


    tableBody.innerHTML = htmlContent;
}

function GenerateHref(versionLinksContainer, numVersions) {
    var version = numVersions;
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = version;
    link.addEventListener('click', function () {
        // Make an AJAX request to Flask
        $.getJSON('http://127.0.0.1:5003/get_data_clients', { version: version })
            .done(function (data) {
                for (let j = 0; j < data.length; j++) {
                    if (data[j]['Account'] == version) {
                        showModelInfo(version, data[j]['data']['Acc'], data[j]['data']['Loss'], data[j]['data']['Count_row'], data[j]['data']['Round'], data[j]['data']['f1'], data[j]['data']['Confusion_matrix'], data[j]['data']['data_set']['Rows']);
                    }
                }
            })
            .fail(function (error) {
                console.error('Error:', error);
            });
    });

    if (numVersions !== "") {
        myLineChart.data.labels = [];
        myLineChart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
        myLineChartLoss.data.labels = [];
        myLineChartLoss.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });

        versionLinksContainer.appendChild(link);
    }
}

var socket = io.connect(); // Connect to the server

socket.on('connect2', function () {
    console.log('Connected to server');
});


socket.on("send_data_clients_Account", function (data) {
    if (GlobalVar == data['Added']) {
        console.log("Alhamdolilah");

        var versionLinks = document.getElementById("versionLinks");
        addData(data['data']['Round'], data['data']['Acc']);
        addDataLoss(data['data']['Round'], data['data']['Loss']);
        document.getElementById('Count_row').textContent = data['data']['Count_row'];
        document.getElementById('f1').textContent = data['data']['f1'];
        document.getElementById('Accuracyy').textContent = data['data']['Acc'];
        document.getElementById('Losss').textContent = data['data']['Loss'];
        document.getElementById('TP').textContent = data['data']['Confusion_matrix']["TP"];
        document.getElementById('FP').textContent = data['data']['Confusion_matrix']["FP"];
        document.getElementById('FN').textContent = data['data']['Confusion_matrix']["FN"];
        document.getElementById('TN').textContent = data['data']['Confusion_matrix']["TN"];

        var tableBody = document.getElementById('tableBody');
        var htmlContent = `
         ${generateTableRows(data['data']['data_set']['Rows'])}
        `
            ;
        function generateTableRows(dataSet) {
            var rowContent = '';
            for (var i = 0; i < dataSet.length; i++) {
                var rowData = dataSet[i];
                var row = `
            <tr>
            <td>${rowData[0]}</td>
            <td>${rowData[1]}</td>
            <td>${rowData[4]}</td>
            <td>${rowData[5]}</td>
            
            </tr>
        `;
                rowContent += row;
            }
            return rowContent;
        }
        tableBody.innerHTML = htmlContent;


    }
    var versionLinks = document.getElementById("versionLinks");
    console.log("version Links version Links1", versionLinks)
    GenerateHref(versionLinks, data['Account'],)
});


socket.on("send_data_packet_Account", function (data) {
    console.log("data", data[1]['data']['data_set']['Rows']);
    rows = data[1]['data']['data_set']['Rows'];
    rows.reverse();
    if (GlobalVar == data[1]['Account']) {
        console.log("data", rows)
        var tableBody = document.getElementById('tableBody');
        var htmlContent = `
         ${generateTableRows(rows)}
        `
            ;
        function generateTableRows(dataSet) {
            var rowContent = '';
            for (var i = 0; i < dataSet.length; i++) {
                var rowData = dataSet[i];
                var row = `
            <tr>
            <td>${rowData[0]}</td>
            <td>${rowData[1]}</td>
            <td>${rowData[4]}</td>
            <td>${rowData[5]}</td>
            
            </tr>
        `;
                rowContent += row;
            }
            return rowContent;
        }
        tableBody.innerHTML = htmlContent;


    }
});