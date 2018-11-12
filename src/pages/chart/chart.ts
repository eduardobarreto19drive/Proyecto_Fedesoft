import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import 'chart.js/src/chart';

import {MyService} from'../../providers/myService';
declare var Chart;

@Component({
    selector: 'chart',
    templateUrl: 'chart.html'
})

export class ChartPage {

    @ViewChild('canvas1') canvas1:ElementRef;
    @ViewChild('canvas2') canvas2:ElementRef;
    @ViewChild('canvas3') canvas3:ElementRef;
    @ViewChild('canvas4') canvas4:ElementRef;
    @ViewChild('canvas5') canvas5:ElementRef;
    @ViewChild('canvas6') canvas6:ElementRef;
    mylevel:any;

    mydata:any;

    chart1;
    chart2;
    chart3;
    chart4;
    chart5;
    chart6;

    easyLevelId = [];
    easyLevelScore = [];
    easyPercentage = 0;
    mediumLevelId = [];
    mediumLevelScore = [];
    mediumPercentage = 0;
    hardLevelId = [];
    hardLevelScore = [];
    hardPercentage = 0;

    //Modify the color to change the chart color
    easyChartColor: string = "rgba(73,14,125,1)";
    easyChartColor_a: string = "rgba(73,14,125,0.3)";
    mediumChartColor: string = "rgba(125,14,39,1)";
    mediumChartColor_a: string = "rgba(125,14,39,0.3)";
    hardChartColor: string = "rgba(24,125,14,1)";
    hardChartColor_a: string = "rgba(24,125,14,0.3)";
    totalColor:string = "rgba(130,130,130,1)";

    constructor(public navCtrl:NavController, public myService:MyService) {
        myService.getLevels().subscribe((data) => {
            this.mydata = data;
            console.log("Inside const: ", this.mydata);
        });

    }

    ionViewDidLoad() {
        this.mylevel = "easy";
    }

    ionViewDidEnter() {
        this.createDataset();
        this.chart1 = this.canvas1.nativeElement;
        this.chart2 = this.canvas2.nativeElement;
        this.chart3 = this.canvas3.nativeElement;
        this.chart4 = this.canvas4.nativeElement;
        this.chart5 = this.canvas5.nativeElement;
        this.chart6 = this.canvas6.nativeElement;
        this.setEasyLevelChart(this.chart1, this.chart4);
    }

    //Get your data from server and calculate the percentage here
    createDataset() {
        let easyCount = 0;
        let mediumCount = 0;
        let hardCount = 0;
        let easyTotal = 0;
        let mediumTotal = 0;
        let hardTotal = 0;
        for (let easy of  this.mydata[0].difficulty[0].details) {
            this.easyLevelId.push(easy.id);
            this.easyLevelScore.push(easy.percentage);
            if (easy.percentage != "NaN") {
                easyCount += 1;
                easyTotal += parseInt(easy.percentage);
            }
        }
        for (let medium of  this.mydata[0].difficulty[1].details) {
            this.mediumLevelId.push(medium.id);
            this.mediumLevelScore.push(medium.percentage);
            if (medium.percentage != "NaN") {
                mediumCount += 1;
                mediumTotal += parseInt(medium.percentage);
            }
        }
        for (let hard of  this.mydata[0].difficulty[2].details) {
            this.hardLevelId.push(hard.id);
            this.hardLevelScore.push(hard.percentage);
            if (hard.percentage != "NaN") {
                hardCount += 1;
                hardTotal += parseInt(hard.percentage);
            }
        }
        this.easyPercentage = easyTotal / easyCount;
        this.mediumPercentage = mediumTotal / mediumCount;
        this.hardPercentage = hardTotal / hardCount;

        console.log("whta? ", this.easyPercentage, this.mediumPercentage, this.hardPercentage);
    }

    //Switch to variuos segments on segment button click
    showChart(level) {
        this.mylevel = level;
        switch (level) {
            case "easy":
                this.setEasyLevelChart(this.chart1, this.chart4);
                break;
            case "medium":
                this.setMediumLevelChart(this.chart2, this.chart5);
                break;
            case "hard":
                this.setHardLevelChart(this.chart3, this.chart6);
                break;
        }
    }

    //Load chart for easy segment
    setEasyLevelChart(mychart1, mychart4) {
        new Chart(mychart1, {
            type: 'line',
            data: {
                labels: this.easyLevelId,
                datasets: [{
                    label: "Easy",
                    backgroundColor: this.easyChartColor_a,
                    borderColor: this.easyChartColor,
                    data: this.easyLevelScore,
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Levels'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Score'
                        }
                    }]
                }
            }
        });
        new Chart(mychart4, {
            type: 'doughnut',
            data: {
                labels: ['Percentage', 'Total'],
                datasets: [{
                    backgroundColor: [this.easyChartColor, this.totalColor],
                    borderColor: [this.easyChartColor, this.totalColor],
                    data: [this.easyPercentage, 100]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                }
            },
            animation: {
                animateScale: true
            }
        });
    }

    //load chart for medium segment
    setMediumLevelChart(mychart1, mychart5) {
        new Chart(mychart1, {
            type: 'line',
            data: {
                labels: this.mediumLevelId,
                datasets: [{
                    label: "Medium",
                    fill: true,
                    backgroundColor: this.mediumChartColor_a,
                    borderColor: this.mediumChartColor,
                    data: this.mediumLevelScore,
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Levels'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Score'
                        }
                    }]
                }
            }
        });
        new Chart(mychart5, {
            type: 'doughnut',
            data: {
                labels: ['Percentage', 'Total'],
                datasets: [{
                    backgroundColor: [this.mediumChartColor, this.totalColor],
                    borderColor: [this.mediumChartColor, this.totalColor],
                    data: [this.mediumPercentage, 100]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                }
            },
            animation: {
                animateScale: true
            }
        });
    }

    //load chart for hard segment
    setHardLevelChart(mychart1, mychart6) {
        new Chart(mychart1, {
            type: 'line',
            data: {
                labels: this.hardLevelId,
                datasets: [{
                    label: "Hard",
                    fill: true,
                    backgroundColor: this.hardChartColor_a,
                    borderColor: this.hardChartColor,
                    data: this.hardLevelScore,
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Levels'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Score'
                        }
                    }]
                }
            }
        });
        new Chart(mychart6, {
            type: 'doughnut',
            data: {
                labels: ['Percentage', 'Total'],
                datasets: [{
                    backgroundColor: [this.hardChartColor, this.totalColor],
                    borderColor: [this.hardChartColor, this.totalColor],
                    data: [this.hardPercentage, 100]
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                }
            },
            animation: {
                animateScale: true
            }
        });
    }
}
