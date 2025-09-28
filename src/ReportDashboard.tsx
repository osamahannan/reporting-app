import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, PieLabelRenderProps } from 'recharts';
import './styles.css';

interface DashboardStats {
  totalBookings: number;
  activeUsers: number;
  revenue: number;
  utilization: number;
}

interface BookingData {
  id: string;
  facility: string;
  date: string;
  duration: number;
  status: 'active' | 'inactive' | 'pending';
  revenue: number;
}

interface BookingTrendData {
  date: string;
  bookings: number;
  revenue: number;
}

interface FacilityUtilizationData {
  name: string;
  value: number;
  color: string;
  [key: string]: any; // Add index signature for Recharts compatibility
}

const ReportDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    activeUsers: 0,
    revenue: 0,
    utilization: 0
  });
  const [recentBookings, setRecentBookings] = useState<BookingData[]>([]);
  const [bookingTrends, setBookingTrends] = useState<BookingTrendData[]>([]);
  const [facilityUtilization, setFacilityUtilization] = useState<FacilityUtilizationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Function to generate mock data based on selected period
  const generateTrendData = (period: string) => {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate realistic booking and revenue data
      const baseBookings = 15 + Math.random() * 20;
      const baseRevenue = baseBookings * (80 + Math.random() * 40);
      
      data.push({
        date: dateStr,
        bookings: Math.round(baseBookings),
        revenue: Math.round(baseRevenue)
      });
    }
    
    return data;
  };

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalBookings: 1247,
        activeUsers: 89,
        revenue: 45680,
        utilization: 78
      });

      setRecentBookings([
        {
          id: '1',
          facility: 'Conference Room A',
          date: '2024-01-15',
          duration: 2,
          status: 'active',
          revenue: 150
        },
        {
          id: '2',
          facility: 'Training Room',
          date: '2024-01-14',
          duration: 3,
          status: 'active',
          revenue: 200
        },
        {
          id: '3',
          facility: 'Boardroom',
          date: '2024-01-13',
          duration: 1.5,
          status: 'pending',
          revenue: 100
        },
        {
          id: '4',
          facility: 'Meeting Room 1',
          date: '2024-01-12',
          duration: 1,
          status: 'inactive',
          revenue: 75
        },
        {
          id: '5',
          facility: 'Auditorium',
          date: '2024-01-11',
          duration: 4,
          status: 'active',
          revenue: 300
        }
      ]);

      // Generate booking trends data based on selected period
      setBookingTrends(generateTrendData(selectedPeriod));

      // Mock facility utilization data
      setFacilityUtilization([
        { name: 'Conference Room A', value: 35, color: '#667eea' },
        { name: 'Training Room', value: 25, color: '#764ba2' },
        { name: 'Boardroom', value: 20, color: '#f093fb' },
        { name: 'Meeting Room 1', value: 12, color: '#f5576c' },
        { name: 'Auditorium', value: 8, color: '#4facfe' }
      ]);

      setIsLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="reporting-container">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="reporting-container">
      <div className="reporting-card">
        <div className="reporting-header">
          <span className="reporting-icon">📊</span>
          <h1 className="reporting-title">Analytics Dashboard</h1>
          <p className="reporting-subtitle">Comprehensive insights and reporting</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">📅</span>
            <div className="stat-value">{stats.totalBookings.toLocaleString()}</div>
            <div className="stat-label">Total Bookings</div>
            <div className="stat-change positive">+12% from last month</div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <div className="stat-value">{stats.activeUsers}</div>
            <div className="stat-label">Active Users</div>
            <div className="stat-change positive">+5% from last week</div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💰</span>
            <div className="stat-value">{formatCurrency(stats.revenue)}</div>
            <div className="stat-label">Total Revenue</div>
            <div className="stat-change positive">+18% from last month</div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📈</span>
            <div className="stat-value">{stats.utilization}%</div>
            <div className="stat-label">Utilization Rate</div>
            <div className="stat-change neutral">+2% from last week</div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Booking Trends</h3>
              <div className="chart-period">
                <button 
                  className={`period-button ${selectedPeriod === '7d' ? 'active' : ''}`}
                  onClick={() => setSelectedPeriod('7d')}
                >
                  7 Days
                </button>
                <button 
                  className={`period-button ${selectedPeriod === '30d' ? 'active' : ''}`}
                  onClick={() => setSelectedPeriod('30d')}
                >
                  30 Days
                </button>
                <button 
                  className={`period-button ${selectedPeriod === '90d' ? 'active' : ''}`}
                  onClick={() => setSelectedPeriod('90d')}
                >
                  90 Days
                </button>
              </div>
            </div>
            <div className="chart-container-inner">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    yAxisId="bookings"
                    orientation="left"
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    yAxisId="revenue"
                    orientation="right"
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    formatter={(value: any, name: any) => [
                      name === 'bookings' ? value : `$${value}`,
                      name === 'bookings' ? 'Bookings' : 'Revenue'
                    ]}
                  />
                  <Legend />
                  <Line 
                    yAxisId="bookings"
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#667eea" 
                    strokeWidth={3}
                    dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2 }}
                    name="Bookings"
                  />
                  <Line 
                    yAxisId="revenue"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#764ba2" 
                    strokeWidth={3}
                    dot={{ fill: '#764ba2', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#764ba2', strokeWidth: 2 }}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Facility Utilization</h3>
            </div>
            <div className="chart-container-inner">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={facilityUtilization}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: PieLabelRenderProps) => {
                      const { name, percent } = props;
                      return `${name} ${((percent as number) * 100).toFixed(0)}%`;
                    }}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {facilityUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: any, name: any) => [`${value}%`, 'Utilization']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="table-container">
          <div className="table-header">
            <h3 className="table-title">Recent Bookings</h3>
            <div className="table-actions">
              <button className="action-button refresh-button">
                🔄 Refresh
              </button>
              <button className="action-button export-button">
                📥 Export
              </button>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>Date</th>
                <th>Duration (hrs)</th>
                <th>Status</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.facility}</td>
                  <td>{formatDate(booking.date)}</td>
                  <td>{booking.duration}</td>
                  <td>
                    <span className={`status-badge status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>{formatCurrency(booking.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;