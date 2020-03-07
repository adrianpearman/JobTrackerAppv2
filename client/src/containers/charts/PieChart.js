import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import _ from "lodash";

class PieChart extends React.Component {
  initChart() {
    am4core.useTheme(am4themesAnimated);
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    let pieSeries = chart.series.push(new am4charts.PieSeries());

    if (!this.props.recruiter) {
      chart.data = this.props.data;

      pieSeries.dataFields.value = "applications";
      pieSeries.dataFields.category = "status";
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      // Disable tooltips
      pieSeries.slices.template.tooltipText = "";

      // Add a legend
      chart.legend = new am4charts.Legend();
    } else {
      chart.data = [
        {
          country: "Lithuania",
          litres: 501.9
        },
        {
          country: "Czech Republic",
          litres: 301.9
        },
        {
          country: "Ireland",
          litres: 201.1
        },
        {
          country: "Germany",
          litres: 165.8
        },
        {
          country: "Australia",
          litres: 139.9
        },
        {
          country: "Austria",
          litres: 128.3
        },
        {
          country: "UK",
          litres: 99
        },
        {
          country: "Belgium",
          litres: 60
        },
        {
          country: "The Netherlands",
          litres: 50
        }
      ];

      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      // Disable tooltips
      pieSeries.slices.template.tooltipText = "";

      // Add a legend
      chart.legend = new am4charts.Legend();
    }

    this.chart = chart;
  }

  componentDidMount() {
    this.initChart();
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.data, this.props.data)) {
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

export default PieChart;
