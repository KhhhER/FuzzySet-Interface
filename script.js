
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const inp1 = document.getElementById("inp1");
    const inp2 = document.getElementById("inp2");
    const inp3 = document.getElementById("inp3");
    const inp4 = document.getElementById("inp4");
    const inp5 = document.getElementById("inp5");
    const hh2 = document.getElementById("hh2");
    var fs;
    var g = {items: {}};


    btn1.addEventListener('click', function btn1Click() 
    {
      fs = new FuzzySet(Number(inp1.value), Number(inp2.value), inp3.value);
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() 
      {
        var data = google.visualization.arrayToDataTable(fs.polyline);
        var options = { title: 'Критерии', is3D: false, hAxis: {title: 'X'}, vAxis: {title: 'Y'}};
        var chart = new google.visualization.LineChart(document.getElementById('func'));
        chart.draw(data, options);
      }
    });

    btn2.addEventListener('click', function btn2Click()
    {
      if ((fs == null) || (inp5.value > 1) || (inp5.value < 0))
      {
        alert('Error');
        return;
      }
      for (let i = 1; i <= fs.polyline.length - 1; i++)
      {
        if (fs.polyline[i][0] == inp4.value)
        {
          fs.polyline.splice(i, 1);
        }
      }
      fs.polyline.push([Number(inp4.value), Number(inp5.value)]);
      fs.polyline.sort((a, b) => a[0] - b[0]);
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() 
      {
        var data = google.visualization.arrayToDataTable(fs.polyline);
        var options = { title: 'Критерии', is3D: false, hAxis: {title: 'X'}, vAxis: {title: 'Y'}};
        var chart = new google.visualization.LineChart(document.getElementById('func'));
        chart.draw(data, options);
      }

      var g = 
      {
        name: fs.polyline[0][1], 
        polyline: fs.polyline.slice(1),
      };

      document.getElementById('hh2').innerHTML = JSON.stringify(g);
    });
 
    class FuzzySet
    {
      constructor(left, right, name)
      {
        this.series.push(name);
        this.polyline.push(this.series);
        this.polyline.push([left, 0]);
        this.polyline.push([right, 0]);
      }
       polyline = [];
       series =['crit'];
    }