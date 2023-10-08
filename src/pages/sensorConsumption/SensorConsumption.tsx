import './css/SensorConsumption.css'
import { useEffect, useState } from "react";
import Feed from "../sharedSensorConsumption/components/Feed";
import SideBar from "../components/sidebar/SideBar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Button, Grid } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SensorConsumptionProps {
    data: any[]
}

const SensorConsumption: React.FC<SensorConsumptionProps> = ({ data }) => {

    let pieData = {
        labels: ['Douche du haut', 'Robinet cuisine', 'Toilette du haut', 'Robinet salle de bain du haut', 'Douche du bas'],
        datasets: [
          {
            label: ' % of Votes',
            data: [15, 40, 20, 10, 15],
            backgroundColor: [
              'rgba(237, 109, 133, 1.0)',
              'rgba(87, 160, 229, 1.0)',
              'rgba(241, 163, 84, 1.0)',
              'rgba(247, 207, 107, 1.0)',
              'rgba(109, 189, 191, 1.0)'
            ],
            borderColor: [
              'rgba(255,255,255, 0.9)',
              'rgba(255,255,255, 0.9)',
              'rgba(255,255,255, 0.9)',
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
    const [timelinedisplay, setTimelineDisplay] = useState(false);
    const [sensorSelectorDisplay, setSensorSelectorDisplay] = useState(false);
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
                pieData.datasets[0].data = [15, 40, 20, 10, 15];
                setChartData(pieData); break;
            case "Mois": 
                pieData.datasets[0].data = [15, 40, 20, 10, 15];
                setChartData(pieData); break;
            case "Semaine": 
                pieData.datasets[0].data = [15, 40, 20, 10, 15]
                setChartData(pieData); break;
        }
    }

    useEffect(medianExtraction, [median]);
    useEffect(dataFromTimeline, [timeline, chartData]);

    console.log(`MEDIAN: ${median}`)
    console.log(`TIMELINE: ${timeline}`);

    return (
        <div className="layout-blank-unique row" >
            <SideBar />
            <div>
                <h1 className="title-unique">Répartition de la consommation des capteurs</h1>

                <div className="layout-unique" >
                    <Grid container direction="row" justifyContent="space-between">
                        <div className="dropdown">
                                <Button sx={{ m: 0, p: 0, minWidth:0 }} style={{
                                    width: "250px",
                                    height: "35px",
                                    backgroundColor: "#57a0e5",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    fontFamily: "monospace",
                                    color: "black",
                                    justifyContent: "flex-start",
                                }}
                                variant="contained" onClick={() => setSensorSelectorDisplay(!sensorSelectorDisplay)} >
                                    <div className="row">
                                        <div>
                                            <ArrowDropDownIcon style={{ fontSize: "50px" }} />
                                        </div>
                                        <div style={{ marginLeft: "30px" }}>Mes capteurs</div>
                                    </div>
                                </Button>
                                <div className={!sensorSelectorDisplay ? "hide" : "selector-sensor-list"}>
                                    <div className='row'>
                                        <div className='divider' style={{ height: "25vh", marginRight: "5px", marginLeft: "5px" }}/>
                                        <div className='column'>
                                            {pieData.labels.map((element, index) => {
                                                return pieData.datasets.map((sets) => {
                                                    return (
                                                        <div className='row' style={{ padding: "5px", margin: "8px 0px" }}>
                                                            <div style={{ width: "20px", height: "20px", backgroundColor: sets.backgroundColor[index], marginRight: "10px" }}></div>
                                                            <div style={{ fontWeight: "bold" }}>{element}</div>
                                                        </div>
                                                    );
                                                })
                                            })}
                                        </div>
                                    </div>
                                </div>
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
                                variant="contained" onClick={() => setTimelineDisplay(!timelinedisplay)} >
                                    <div className="row">
                                        <div>
                                            <ArrowDropDownIcon style={{ fontSize: "50px" }} />
                                        </div>
                                        <div>{timeline}</div>
                                    </div>
                                </Button>
                                <div className={!timelinedisplay ? "hide" : "column selector"}>
                                    <Button style={{ color: "black", justifyContent: "flex-start", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace", }} onClick={() => { setTimeline("Année"); setTimelineDisplay(!timelinedisplay); }}>Année</Button>
                                    <Button style={{ color: "black", justifyContent: "flex-start", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace", }} onClick={() => { setTimeline("Mois" ); setTimelineDisplay(!timelinedisplay); }}>Mois</Button>
                                    <Button style={{ color: "black", justifyContent: "flex-start", fontSize: "14px", fontWeight: "bold", fontFamily: "monospace", }} onClick={() => { setTimeline("Semaine"); setTimelineDisplay(!timelinedisplay); }}>Semaine</Button>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </div>

                <div className="layout-minor-unique" >
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

export default SensorConsumption;
