import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Positions from './components/Positions';
import RecruiterDashboard from './components/RecruiterDashboard';
import { 
  getPositionData, 
  getCandidatesByPosition, 
  updateCandidateStage,
  getDummyPositionData,
  getDummyCandidates,
  PositionData,
  Candidate
} from './services/positionService';

// Componente para el detalle de posición con interfaz kanban
const PositionDetail: React.FC = () => {
  // Por ahora usamos window.location para obtener el ID
  const pathParts = window.location.pathname.split('/');
  const positionId = pathParts[pathParts.length - 1];
  
  // Estados para los datos
  const [positionData, setPositionData] = useState<PositionData | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el drag & drop
  const [draggedCandidate, setDraggedCandidate] = useState<number | null>(null);
  const [dragOverStep, setDragOverStep] = useState<string | null>(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadPositionData();
  }, [positionId]);

  const loadPositionData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Intentar cargar datos reales de la API
      const [position, candidatesData] = await Promise.all([
        getPositionData(parseInt(positionId)),
        getCandidatesByPosition(parseInt(positionId))
      ]);
      
      setPositionData(position);
      setCandidates(candidatesData);
      console.log('Datos cargados exitosamente desde la API');
      
    } catch (error) {
      console.log('Error al cargar datos de la API, usando datos dummy:', error);
      // En caso de error, cargar datos dummy
      setPositionData(getDummyPositionData());
      setCandidates(getDummyCandidates());
      setError('No se pudo conectar con el backend. Mostrando datos de ejemplo.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return '#28a745'; // Verde
    if (score >= 2) return '#ffc107'; // Amarillo
    return '#dc3545'; // Rojo
  };

  const getScoreText = (score: number) => {
    if (score >= 4) return 'Alto';
    if (score >= 2) return 'Medio';
    return 'Bajo';
  };

  // Funciones de drag & drop
  const handleDragStart = (e: React.DragEvent, candidateId: number) => {
    setDraggedCandidate(candidateId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, stepName: string) => {
    e.preventDefault();
    setDragOverStep(stepName);
  };

  const handleDragLeave = () => {
    setDragOverStep(null);
  };

  const handleDrop = async (e: React.DragEvent, targetStepName: string) => {
    e.preventDefault();
    
    if (draggedCandidate) {
      const candidate = candidates.find(c => c.id === draggedCandidate);
      if (!candidate) return;

      try {
        // Actualizar el estado local inmediatamente para feedback visual
        setCandidates(prevCandidates => 
          prevCandidates.map(c => 
            c.id === draggedCandidate 
              ? { ...c, currentInterviewStep: targetStepName }
              : c
          )
        );

        // Intentar actualizar en el backend
        await updateCandidateStage(draggedCandidate, {
          applicationId: candidate.applicationId.toString(),
          currentInterviewStep: targetStepName
        });

        console.log(`Candidato ${draggedCandidate} movido exitosamente a ${targetStepName}`);
        
      } catch (error) {
        console.error('Error al actualizar en el backend:', error);
        
        // Revertir el cambio local si falla la API
        setCandidates(prevCandidates => 
          prevCandidates.map(c => 
            c.id === draggedCandidate 
              ? { ...c, currentInterviewStep: candidate.currentInterviewStep }
              : c
          )
        );
        
        // Mostrar mensaje de error
        alert('Error al actualizar la etapa del candidato. Los cambios no se guardaron.');
      }
    }

    // Limpiar estados
    setDraggedCandidate(null);
    setDragOverStep(null);
  };

  if (loading) {
    return (
      <div style={{padding: '50px', textAlign: 'center', backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
        <div style={{fontSize: '24px', color: '#6c757d'}}>🔄 Cargando datos...</div>
        <div style={{marginTop: '20px', color: '#6c757d'}}>Conectando con el backend...</div>
      </div>
    );
  }

  if (!positionData) {
    return (
      <div style={{padding: '50px', textAlign: 'center', backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
        <div style={{fontSize: '24px', color: '#dc3545'}}>❌ Error al cargar la posición</div>
        <a href="/positions" style={{
          display: 'inline-block',
          padding: '15px 30px', 
          fontSize: '18px', 
          backgroundColor: '#6c757d', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px', 
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          ← Volver a Posiciones
        </a>
      </div>
    );
  }

  return (
    <div style={{padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
      {/* Header con navegación */}
      <div style={{marginBottom: '30px'}}>
        <a href="/positions" style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: '#6c757d', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px', 
          cursor: 'pointer',
          marginBottom: '20px'
        }}>
          ← Volver a Posiciones
        </a>
        <h1 style={{color: '#333', marginBottom: '10px'}}>🎯 {positionData.positionName}</h1>
        <p style={{color: '#6c757d', fontSize: '16px'}}>Gestiona los candidatos por fase del proceso de contratación</p>
        <p style={{color: '#28a745', fontSize: '14px', marginTop: '10px'}}>
          💡 <strong>Drag & Drop:</strong> Arrastra los candidatos entre columnas para cambiar su fase
        </p>
        {error && (
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '5px',
            padding: '10px',
            marginTop: '10px',
            color: '#856404'
          }}>
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Interfaz Kanban */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        {positionData.interviewFlow.interviewSteps.map((step) => {
          const stepCandidates = candidates.filter(c => c.currentInterviewStep === step.name);
          
          return (
            <div 
              key={step.id} 
              style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                minHeight: '400px',
                border: dragOverStep === step.name ? '3px dashed #007bff' : '1px solid #e9ecef',
                transition: 'all 0.2s ease'
              }}
              onDragOver={(e) => handleDragOver(e, step.name)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, step.name)}
            >
              {/* Header de la columna */}
              <div style={{
                borderBottom: '2px solid #e9ecef',
                paddingBottom: '15px',
                marginBottom: '20px'
              }}>
                <h3 style={{color: '#495057', marginBottom: '5px'}}>{step.name}</h3>
                <span style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '14px'
                }}>
                  {stepCandidates.length} candidato{stepCandidates.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Lista de candidatos */}
              <div style={{minHeight: '300px'}}>
                {stepCandidates.length > 0 ? (
                  stepCandidates.map((candidate) => (
                    <div 
                      key={candidate.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, candidate.id)}
                      style={{
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '15px',
                        border: '1px solid #e9ecef',
                        cursor: 'grab',
                        opacity: draggedCandidate === candidate.id ? 0.5 : 1,
                        transform: draggedCandidate === candidate.id ? 'scale(0.95)' : 'scale(1)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <h4 style={{color: '#495057', marginBottom: '8px', fontSize: '16px'}}>
                        {candidate.fullName}
                      </h4>
                      <div style={{
                        backgroundColor: getScoreColor(candidate.averageScore),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        display: 'inline-block'
                      }}>
                        Puntuación: {candidate.averageScore} ({getScoreText(candidate.averageScore)})
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{
                    textAlign: 'center',
                    color: '#6c757d',
                    padding: '40px 20px',
                    fontStyle: 'italic',
                    border: '2px dashed #e9ecef',
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa'
                  }}>
                    {dragOverStep === step.name ? 'Suelta aquí el candidato' : 'No hay candidatos en esta fase'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecruiterDashboard />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/positions/:id" element={<PositionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
