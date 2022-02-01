import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import axios from 'axios';
import { useState, useEffect } from 'react';


const BarChart = () => {
    const nodeJsApi = process.env.NEXT_PUBLIC_NODEJS_API;
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getCompanies();
    }, []);

    const getCompanies = () => {
        axios.get(`${nodeJsApi}/api/companies`)
            .then(res => setCompanies(res.data))
            .catch(err => console.log(err));
    };

    const data = {
        labels: companies.map(company => company.name),
        datasets: [{
            label: "Entreprises par potentiel d'embauche",
            data: companies.map(company => company.stars),
            backgroundColor: ['lightblue'],
        }]
    };

    return (
        <Bar data={data} />
    );
};

export default BarChart;