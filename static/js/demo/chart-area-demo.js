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

const containerBody = document.querySelector('.chart-area');
const containerBodyLoss = document.getElementById('AreaLoss');

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
function addDataLoss(label, data) {
  myLineChartLoss.data.labels.push(label);
  myLineChartLoss.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  myLineChartLoss.update();
  if (myLineChartLoss.data.labels.length > 30) {
    containerBodyLoss.style.width = '1690px';
    console.log('Helllllo')
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

  $.getJSON('http://127.0.0.1:5003/send_data_js',
    function (data) {

      for (let index = 0; index < data['chart_data']['Accu'].length; index++) {
        addData(data['chart_data']['Round'][index], data['chart_data']['Accu'][index]);
      }
      for (let index = 0; index < data['chart_data']['Accu'].length; index++) {
        addDataLoss(data['chart_data']['Round'][index], data['chart_data']['Loss'][index]);
      }
      document.getElementById('Num_Client').textContent = data['client_data']['Num_Client'];
      document.getElementById('Num_Client_selected').textContent = data['client_data']['Num_Client_selected'];
      document.getElementById('verified_clients').textContent = data['client_data']['verified_clients'];
      document.getElementById('Rejected_clients').textContent = data['client_data']['Rejected_clients'];
      var startTime = new Date(data['time']).getTime();
      countdownTimer(startTime);
      var last;
      var accuracy;
      var loss;
      var precision;
      var Confusion_matrix;
      for (let index = 0; index < data['chart_data']['Round'].length; index++) {
        var versionLinks = document.getElementById("versionLinks");
        GenerateHref(versionLinks, data['chart_data']['Round'][index])
        last = data['chart_data']['Round'][index];
        accuracy = Number(data['chart_data']['Accu'][index]);
        loss = Number(data['chart_data']['Loss'][index]);
        precision = Number(data['chart_data']['Round'][index]);
        Confusion_matrix = data['chart_data']['Confusion_matrix'][index];
      }
      showModelInfo(last, accuracy, loss, precision, data['data_set']['Rows'], Confusion_matrix)
    });
};

//connect to the socket server.
var socket = io.connect();

//receive details from server
socket.on("data_update", function (data) {

  addData(data['chart_data']['Round'], data['chart_data']['Accu']);
  addDataLoss(data['chart_data']['Round'], data['chart_data']['Loss']);
  document.getElementById('Num_Client').textContent = data['client_data']['Num_Client'];
  document.getElementById('Num_Client_selected').textContent = data['client_data']['Num_Client_selected'];
  document.getElementById('verified_clients').textContent = data['client_data']['verified_clients'];
  document.getElementById('Rejected_clients').textContent = data['client_data']['Rejected_clients'];
});






var countdownElement = document.getElementById("timer");
function countdownTimer(targetTime) {
  var countdownInterval = setInterval(function () {
    var currentTime = new Date().getTime();
    var timeLeft = targetTime - currentTime;
    if (timeLeft > 0) {
      var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      countdownElement.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
    } else {
      clearInterval(countdownInterval);
      countdownElement.innerHTML = 'Round started...';
    }
  }, 1000);
}

socket.on("data_update", function (data) {
  var startTime = new Date(data['time']).getTime();
  countdownTimer(startTime);
});


function downloadPDF() {
  var link = document.createElement('a');
  link.href = '/static/public_keys.pdf';
  link.download = 'public_keys.pdf';
  link.click();
}




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

function showModelInfo(version, accuracy, loss, precision, data_set, Confusion_matrix) {
  var modelInfoElement = document.getElementById("modelInfo");
  // Confusion matrix image URL or data URI
  //var confusionMatrixImage = "static/img/image.png";


  var htmlContent = `
  
  <div class="row">
    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Version:</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                            <span id="">${version}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Accuracy:</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                            <span id="">${ Number(accuracy)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Earnings (Monthly) Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Loss:</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                            <span id="">${ Number(loss)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Pending Requests Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Precision:</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                            <span id="">${ Number(precision)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>


  


  <div class="card shadow mb-4">
  <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Dataset Examples
      </h6>
  </div>
  <div class="card-body">
      <div class="table-responsive">
          <table class="table table-bordered"
              width="100%" cellspacing="0">
              <thead>
                  <tr>
                      <th>Src_IP</th>
                      <th>Dst_IP</th>
                      <th>Sub_Cat</th>
                      <th>Cat</th>
                      <th>Timestamp</th>
                      <th>Label</th>
                  </tr>
              </thead>
             
              <tbody>
                ${generateTableRows(data_set)} <!-- Call the generateTableRows function here -->
              </tbody>
          </table>
      </div>
  </div>
</div>

    <h3>Confusion Matrix</h3>
        <div class="row Matrix_center">
            <div class="col-lg-6">
                <div class="card shadow mb-4">
                    <div class="confusion-matrix flex-container">
                        <h4 class="rotate-div">Actual</h4>
                        <table>
                            <tr>
                                <td class="td_TP" style="color: white;">${Confusion_matrix["TP"]}<span id="TP"></span></td>
                                <td class="td_FP" style="color: black;">${Confusion_matrix["FP"]}<span id="FP"></span></td>
                            </tr>
                            <tr>
                                <td class="td_FN" style="color: black;">${Confusion_matrix["FN"]}<span id="FN"></span></td>
                                <td class="td_TN" style="color: white;">${Confusion_matrix["TN"]}<span id="TN"></span></td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <h4 class="Predicted_Class">Predicted</h4>
                    </div>
                </div>
            </div>
        </div>
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
          <td>${rowData[2]}</td>
          <td>${rowData[3]}</td>
          <td>${rowData[4]}</td>
          <td>${rowData[5]}</td>
         
        </tr>
      `;
      rowContent += row;
    }
    return rowContent;
  }


  modelInfoElement.innerHTML = htmlContent;
}

function GenerateHref(versionLinksContainer, numVersions) {
  var version = "Version " + numVersions;
  var link = document.createElement("a");
  link.href = "#";
  link.textContent = version;
  link.addEventListener('click', function () {
    $.getJSON('http://127.0.0.1:5003/send_data_js', function (data) {
      console.log(data);
      let accuracy_1 =  Number(data['chart_data']['Accu'][numVersions - 1]);
      let loss_1 = loss = Number(data['chart_data']['Loss'][numVersions - 1]);
      let precision_1 = Number(data['chart_data']['precision'][numVersions - 1]);
      var Confusion_matrix = data['chart_data']['Confusion_matrix'][numVersions - 1];
      console.log("Confusion_matrix", Confusion_matrix);
      showModelInfo(numVersions, accuracy_1, loss_1, precision_1, data['data_set']['Rows'], Confusion_matrix);
    });
  });
  versionLinksContainer.appendChild(link);
}


socket.on("data_update", function (data) {
  var versionLinks = document.getElementById("versionLinks");
  var numVersions = data['chart_data']['Round'];
  GenerateHref(versionLinks, numVersions)
  showModelInfo(numVersions,  Number(data['chart_data']['Accu']), Number(data['chart_data']['Loss']), Number(data['chart_data']['precision']), data['data_set']['Rows'], data['chart_data']['Confusion_matrix']);

});

