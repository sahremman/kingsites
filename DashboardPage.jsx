import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import { fetchDashboardData } from '../services/dashboardService';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalClasses: 0,
    totalStudents: 0,
    recentQuizzes: [],
    gradeDistribution: null
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      }
    };

    loadDashboardData();
  }, []);

  const gradeDistributionChart = {
    labels: ['A', 'B', 'C', 'D', 'F'],
    datasets: [{
      label: 'Grade Distribution',
      data: dashboardData.gradeDistribution || [0, 0, 0, 0, 0],
      backgroundColor: [
        'green', 'lightgreen', 'yellow', 'orange', 'red'
      ]
    }]
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.totalClasses}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.totalStudents}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.recentQuizzes.map(quiz => (
              <div key={quiz.id}>{quiz.name}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={gradeDistributionChart} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
