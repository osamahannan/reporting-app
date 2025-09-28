import React, { useState, useEffect } from 'react';
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

const ReportDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    activeUsers: 0,
    revenue: 0,
    utilization: 0
  });
  const [recentBookings, setRecentBookings] = useState<BookingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

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
            <div className="mock-chart">
              <div className="chart-placeholder">
                <div className="chart-placeholder-icon">📈</div>
                <div className="chart-placeholder-text">Booking Trends Chart</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
                  (Chart visualization would be implemented with a library like Chart.js or Recharts)
                </div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Facility Utilization</h3>
            </div>
            <div className="mock-chart">
              <div className="chart-placeholder">
                <div className="chart-placeholder-icon">🏢</div>
                <div className="chart-placeholder-text">Utilization by Facility</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
                  (Pie chart showing facility usage distribution)
                </div>
              </div>
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