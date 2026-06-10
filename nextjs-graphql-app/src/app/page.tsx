'use client';

import React, { useState } from 'react';
import { ApolloProvider, useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo-client';

// 1. GraphQL Queries and Mutations
const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    astronauts {
      id
      name
      role
      status
      avatarUrl
      missionsCount
    }
    missions {
      id
      name
      destination
      status
      launchDate
      durationDays
      crew {
        id
        name
        role
        avatarUrl
      }
      description
    }
  }
`;

const ADD_MISSION = gql`
  mutation AddMission(
    $name: String!
    $destination: String!
    $launchDate: String!
    $durationDays: Int!
    $crewIds: [ID!]!
    $description: String!
  ) {
    addMission(
      name: $name
      destination: $destination
      launchDate: $launchDate
      durationDays: $durationDays
      crewIds: $crewIds
      description: $description
    ) {
      id
      name
      destination
      status
      launchDate
      durationDays
      crew {
        id
        name
        role
        avatarUrl
      }
      description
    }
  }
`;

const TOGGLE_MISSION_STATUS = gql`
  mutation ToggleMissionStatus($id: ID!, $status: String!) {
    toggleMissionStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

const DELETE_MISSION = gql`
  mutation DeleteMission($id: ID!) {
    deleteMission(id: $id)
  }
`;

// Types matching GraphQL Schema
interface Astronaut {
  id: string;
  name: string;
  role: string;
  status: string;
  avatarUrl: string;
  missionsCount: number;
}

interface Mission {
  id: string;
  name: string;
  destination: string;
  status: string;
  launchDate: string;
  durationDays: number;
  crew: Astronaut[];
  description: string;
}

interface DashboardData {
  astronauts: Astronaut[];
  missions: Mission[];
}

function SpaceDashboardContent() {
  const { loading, error, data } = useQuery<DashboardData>(GET_DASHBOARD_DATA);

  // Mutations
  const [addMission] = useMutation(ADD_MISSION, {
    refetchQueries: [{ query: GET_DASHBOARD_DATA }],
  });

  const [toggleStatus] = useMutation(TOGGLE_MISSION_STATUS);

  const [deleteMission] = useMutation(DELETE_MISSION, {
    refetchQueries: [{ query: GET_DASHBOARD_DATA }],
  });

  // Client States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  // Form States
  const [formName, setFormName] = useState('');
  const [formDestination, setFormDestination] = useState('');
  const [formLaunchDate, setFormLaunchDate] = useState('');
  const [formDuration, setFormDuration] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCrewIds, setFormCrewIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(168, 85, 247, 0.2)',
            borderTopColor: '#a855f7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem'
          }} />
          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Synchronizing Cosmic Feeds...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ color: 'var(--accent-rose)', fontSize: '2rem', marginBottom: '1rem' }}>Telemetry Link Severed</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{error?.message || 'Failed to fetch spacecraft systems.'}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Re-establish Connection</button>
      </div>
    );
  }

  // Handle Form Submission
  const handleAddMissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formDestination || !formLaunchDate || !formDuration || formCrewIds.length === 0) {
      alert('Please fill out all required fields and select at least one crew member.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addMission({
        variables: {
          name: formName,
          destination: formDestination,
          launchDate: formLaunchDate,
          durationDays: parseInt(formDuration, 10),
          crewIds: formCrewIds,
          description: formDescription,
        },
      });

      // Clear Form
      setFormName('');
      setFormDestination('');
      setFormLaunchDate('');
      setFormDuration('');
      setFormDescription('');
      setFormCrewIds([]);
    } catch (err: any) {
      alert('Failed to launch mission: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCrewSelection = (id: string) => {
    if (formCrewIds.includes(id)) {
      setFormCrewIds(formCrewIds.filter(cid => cid !== id));
    } else {
      setFormCrewIds([...formCrewIds, id]);
    }
  };

  const handleStatusCycle = async (missionId: string, currentStatus: string) => {
    let nextStatus = 'Scheduled';
    if (currentStatus === 'Scheduled') nextStatus = 'In Transit';
    else if (currentStatus === 'In Transit') nextStatus = 'Completed';
    else if (currentStatus === 'Completed') nextStatus = 'Scheduled';

    try {
      await toggleStatus({
        variables: { id: missionId, status: nextStatus },
        optimisticResponse: {
          toggleMissionStatus: {
            __typename: 'Mission',
            id: missionId,
            status: nextStatus,
          },
        },
      });
    } catch (err: any) {
      alert('Failed to update mission status: ' + err.message);
    }
  };

  const handleDelete = async (missionId: string) => {
    if (confirm('Are you sure you want to scrub this space mission from the logs?')) {
      try {
        await deleteMission({
          variables: { id: missionId },
        });
      } catch (err: any) {
        alert('Failed to delete mission: ' + err.message);
      }
    }
  };

  // Filters
  const filteredMissions = data.missions.filter(mission => {
    const matchesSearch =
      mission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mission.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'ALL' ||
      mission.status.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container animate-fade-in">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <div className="logo-badge">GQ-X</div>
          <h1 className="logo-title">Space Explorers Hub</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            System Status: <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>ONLINE</span>
          </span>
          <a
            href="/api/graphql"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
          >
            GraphQL Sandbox API ↗
          </a>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Side: Missions Panel */}
        <div>
          {/* Filters Bar */}
          <div className="glass-panel search-controls" style={{ marginBottom: '2rem' }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Search missions by name or destination..."
                className="text-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{ width: '200px' }}>
              <select
                className="select-input"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Sectors</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="IN TRANSIT">In Transit</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Missions List */}
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Active Missions ({filteredMissions.length})
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Hover cards for telemetry controls</span>
          </h2>
          
          {filteredMissions.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No active spacecraft match your search queries.</p>
            </div>
          ) : (
            <div className="missions-grid">
              {filteredMissions.map(mission => (
                <article key={mission.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{mission.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', fontWeight: 500 }}>{mission.destination}</p>
                    </div>
                    <span 
                      onClick={() => handleStatusCycle(mission.id, mission.status)}
                      className={`status-pill status-${mission.status.toLowerCase().replace(' ', '')}`}
                      style={{ cursor: 'pointer' }}
                      title="Click to cycle status"
                    >
                      {mission.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>{mission.description}</p>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Launch Date:</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{mission.launchDate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Duration:</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{mission.durationDays} Earth Days</span>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>CREW LOG</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {mission.crew.map(member => (
                        <img
                          key={member.id}
                          src={member.avatarUrl}
                          alt={member.name}
                          className="crew-avatar"
                          style={{ width: '32px', height: '32px', border: '1.5px solid var(--accent-purple)' }}
                          title={`${member.name} - ${member.role}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions overlay panel */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                  }}>
                    <button 
                      onClick={() => handleStatusCycle(mission.id, mission.status)}
                      className="btn btn-secondary" 
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', borderRadius: '8px' }}
                    >
                      Cycle Status
                    </button>
                    <button 
                      onClick={() => handleDelete(mission.id)}
                      className="btn btn-secondary" 
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', borderRadius: '8px', color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.2)' }}
                    >
                      Scrub
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* New Mission Form Section */}
          <div className="glass-panel" style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Launch New Manned Mission</h2>
            
            <form onSubmit={handleAddMissionSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Mission Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Artemis V Gateway"
                    className="text-input"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Destination Orbit/Body *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Titan (Saturnian Moon)"
                    className="text-input"
                    value={formDestination}
                    onChange={e => setFormDestination(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group">
                  <label className="input-label">Launch Window Date *</label>
                  <input
                    type="date"
                    required
                    className="text-input"
                    value={formLaunchDate}
                    onChange={e => setFormLaunchDate(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Mission Duration (Days) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 365"
                    className="text-input"
                    value={formDuration}
                    onChange={e => setFormDuration(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Mission Brief & Objectives</label>
                <textarea
                  placeholder="Summarize target orbital parameters, exploration goals, and research objectives..."
                  className="textarea-input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                />
              </div>

              <div className="input-group" style={{ marginBottom: '2rem' }}>
                <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Assemble Crew (Select Astronauts) *</label>
                <div className="avatar-checkbox-grid">
                  {data.astronauts.map(astro => {
                    const isSelected = formCrewIds.includes(astro.id);
                    return (
                      <div
                        key={astro.id}
                        onClick={() => handleCrewSelection(astro.id)}
                        className={`avatar-checkbox-card ${isSelected ? 'selected' : ''}`}
                      >
                        <img src={astro.avatarUrl} alt={astro.name} className="avatar-checkbox-img" />
                        <span className="avatar-checkbox-name">{astro.name}</span>
                        <span className="avatar-checkbox-role">{astro.role}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {isSubmitting ? 'Transmitting Launch Code...' : 'Authorize Space Mission'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Crew Manifest Panel */}
        <aside className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>Crew Manifest</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status roster of all flight-certified astronauts.</p>
          </div>

          <div className="crew-list">
            {data.astronauts.map(astro => (
              <div key={astro.id} className="crew-item">
                <img src={astro.avatarUrl} alt={astro.name} className="crew-avatar" />
                <div className="crew-info">
                  <div className="crew-name">{astro.name}</div>
                  <div className="crew-role">{astro.role}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                  <span className="crew-badge">{astro.missionsCount} missions</span>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: astro.status === 'Active' ? 'var(--accent-emerald)' : astro.status === 'Retired' ? 'var(--text-muted)' : 'var(--accent-amber)'
                  }}>
                    ● {astro.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function SpaceDashboardPage() {
  return (
    <ApolloProvider client={client}>
      <main style={{ minHeight: '100vh' }}>
        <SpaceDashboardContent />
      </main>
    </ApolloProvider>
  );
}
