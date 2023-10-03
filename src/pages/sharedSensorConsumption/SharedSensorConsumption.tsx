import "./css/SharedSensorConsumption.css"
import { useEffect, useState } from "react";
import Feed from "./components/Feed";
import SideBar from "../components/sidebar/SideBar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Button, Grid } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SharedSensorConsumptionProps {
    data: any[]
}

const SharedSensorConsumption: React.FC<SharedSensorConsumptionProps> = ({ data }) => {

    let pieData = {
        labels: ['Consommation global', 'Consommation global des capteurs'],
        datasets: [
          {
            label: ' % of Votes',
            data: [60, 40],
            backgroundColor: [
              'rgba(237, 109, 133, 1.0)',
              'rgba(87, 160, 229, 1.0)',
            ],
            borderColor: [
              'rgba(255,255,255, 0.9)',
              'rgba(255,255,255, 0.9)',
            ],
            borderWidth: 2,
          },
        ],
    };

    let fakeFeed = [
        { name: "douche", value: "50 L", },
        { name: "toilette", value: "25 L", },
        { name: "robinet", value: "15 L", },
        { name: "toilette", value: "35 L", },
    ];

    const [median, setMedian] = useState(0);
    const [display, setDisplay] = useState(false);
    const [timeline, setTimeline] = useState("Semaine");
    const [chartData, setChartData] = useState(pieData);

    const medianExtraction = () => {
        if (data.length < 1) return;
        let newMedian = 0;
        data.map(element => newMedian += parseFloat(element.value) );
        const value = parseFloat((newMedian / data.length).toFixed(1));
        setMedian(value);
    };

    const dataFromTimeline = () => {
        switch (timeline) {
            case "Année":
                pieData.datasets[0].data = [80, 20];
                setChartData(pieData); break;
            case "Mois": 
                pieData.datasets[0].data = [30, 70];
                setChartData(pieData); break;
            case "Semaine": 
                pieData.datasets[0].data = [15, 85];
                setChartData(pieData); break;
        }
    }

    // useEffect(medianExtraction, [median]); //NOTE - Will be used later
    useEffect(dataFromTimeline, [timeline, chartData]);

    console.log(`MEDIAN: ${median}`)
    console.log(`TIMELINE: ${timeline}`);

    return (
        <div className="layout-blank row" >
            <SideBar />
            <div>

                <h1 className="title" style={{ fontFamily: 'Arial', marginRight: "20px" }}>Consommation global des capteurs</h1>

                <div className="layout" >
                    <Grid container direction="row" justifyContent="space-between">
                        <div className="legend" >
                            <Grid container direction="column" justifyContent="center" alignItems="flex-start" padding={ "20px" } margin={ "20px 0px" }>
                                <div className="row">
                                    <div className="global-consumption-rect"></div>
                                    <h4>Consommation global</h4>
                                </div>
                                <div className="row">
                                    <div className="sensor-consumption-rect"></div>
                                    <h4>Consommation des capteurs</h4>
                                </div>
                            </Grid>
                        </div>
                        <div className="chart" >
                            <Pie data={chartData} />
                        </div>
                        <div>
                            <div className="dropdown">
                                <Button sx={{ m: 0, p: 0, minWidth:0 }} style={{
                                    width: "300px",
                                    height: "40px",
                                    backgroundColor: "#57a0e5",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    fontFamily: "monospace",
                                    color: "black",
                                    justifyContent: "flex-start",
                                }}
                                variant="contained" onClick={() => setDisplay(!display)} >
                                    <div className="row">
                                        <div>
                                            <ArrowDropDownIcon style={{ fontSize: "50px" }} />
                                        </div>
                                        <div>{timeline}</div>
                                    </div>
                                </Button>
                                <div className={!display ? "hide" : "column selector"}>
                                    <Button style={{ color: "black", justifyContent: "flex-start", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace", }} onClick={() => { setTimeline("Année"); setDisplay(!display); }}>Année</Button>
                                    <Button style={{ color: "black", justifyContent: "flex-start", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace", }} onClick={() => { setTimeline("Mois" ); setDisplay(!display); }}>Mois</Button>
                                    <Button style={{ color: "black", justifyContent: "flex-start", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace", }} onClick={() => { setTimeline("Semaine"); setDisplay(!display); }}>Semaine</Button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </div>

                <div className="layout-minor" >
                    <h2 className="titre" style={{ fontFamily: 'Arial', marginRight: "20px"}}>Dernières activités</h2>
                    <div className="row spacer-vertical">
                        <div className="divider"></div>
                        <Feed data={fakeFeed} />
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default SharedSensorConsumption;
