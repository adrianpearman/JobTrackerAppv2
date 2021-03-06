import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import _ from "lodash";

class LineChart extends React.Component {
  initChart() {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.data = this.props.data;
    chart.cursor = new am4charts.XYCursor();

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }
  componentDidMount() {
    this.initChart();
  }

  componentDidUpdate(prevProps) {
    if (_.isEqual(prevProps.data, this.props.data)) {
      if (!this.chart._disposed) {
        this.chart.dispose();
      }
      this.initChart();
    }
  }

  componentWillUnmount() {
    this.chart.dispose();
  }
  render() {
    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
  }
}

export default LineChart;
