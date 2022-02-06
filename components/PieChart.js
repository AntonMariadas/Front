import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import axios from 'axios';
import { useState, useEffect } from 'react';


const PieChart = () => {
    const nodeJsApi = process.env.NEXT_PUBLIC_NODEJS_API;
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getCompanies();
    }, []);

    const getCompanies = () => {
        axios.get(`${nodeJsApi}/api/companies`)
            .then(res => {
                setCompanies(res.data);
            })
            .catch(err => console.log(err));
    };

    const data = {
        labels: ['administration', 'conseil', 'defense', 'direction', 'developpement', 'support', 'maintenance', 'production', 'redaction'],
        datasets: [{
            label: "Entreprises par domaine",
            data: [
                companies.filter(company => company.matched_rome_label === "Administration de systèmes d'information").length,
                companies.filter(company => company.matched_rome_label === "Conseil et maîtrise d'ouvrage en systèmes d'information").length,
                companies.filter(company => company.matched_rome_label === "Défense et conseil juridique").length,
                companies.filter(company => company.matched_rome_label === "Direction des systèmes d'information").length,
                companies.filter(company => company.matched_rome_label === "Études et développement informatique").length,
                companies.filter(company => company.matched_rome_label === "Expertise et support en systèmes d'information").length,
                companies.filter(company => company.matched_rome_label === "Maintenance informatique et bureautique").length,
                companies.filter(company => company.matched_rome_label === "Production et exploitation de systèmes d'information").length,
                companies.filter(company => company.matched_rome_label === "Rédaction technique").length
            ],
            backgroundColor: ['LightBlue', 'LightPink', 'LemonChiffon', 'LightCoral', 'MediumPurple', 'LightSalmon', 'LightSeaGreen', 'RosyBrown', 'DarkGoldenRod']
        }]
    };

    return (
        <div style={{ maxWidth: 700, margin: 'auto' }}>
            <Pie data={data} />
        </div>
    );
};

export default PieChart;