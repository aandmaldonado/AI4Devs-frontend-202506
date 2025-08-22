import axios from 'axios';

// Tipos para la API
export interface InterviewStep {
  id: number;
  name: string;
  orderIndex: number;
}

export interface InterviewFlow {
  id: number;
  description: string;
  interviewSteps: InterviewStep[];
}

export interface PositionData {
  positionName: string;
  interviewFlow: InterviewFlow;
}

export interface Candidate {
  id: number;
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
  applicationId: number;
}

export interface CandidateStageUpdate {
  applicationId: string;
  currentInterviewStep: string;
}

// Configuración de la API
const API_BASE_URL = 'http://localhost:3010';

// Función para obtener datos de la posición
export const getPositionData = async (positionId: number): Promise<PositionData> => {
  try {
    console.log(`Obteniendo datos de posición ${positionId}...`);
    const response = await axios.get<PositionData>(`${API_BASE_URL}/positions/${positionId}/interviewflow`);
    console.log('Datos de posición obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de la posición:', error);
    throw new Error('Error al obtener datos de la posición');
  }
};

// Función para obtener candidatos por posición
export const getCandidatesByPosition = async (positionId: number): Promise<Candidate[]> => {
  try {
    console.log(`Obteniendo candidatos de posición ${positionId}...`);
    const response = await axios.get<Candidate[]>(`${API_BASE_URL}/positions/${positionId}/candidates`);
    console.log('Candidatos obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener candidatos:', error);
    throw new Error('Error al obtener candidatos');
  }
};

// Función para actualizar la etapa de un candidato
export const updateCandidateStage = async (candidateId: number, stageUpdate: CandidateStageUpdate): Promise<any> => {
  try {
    console.log(`Actualizando etapa del candidato ${candidateId} a ${stageUpdate.currentInterviewStep}...`);
    const response = await axios.put<any>(`${API_BASE_URL}/candidates/${candidateId}/stage`, stageUpdate);
    console.log('Etapa actualizada exitosamente:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar etapa del candidato:', error);
    throw new Error('Error al actualizar etapa del candidato');
  }
};

// Función para manejar errores de API y devolver datos dummy
export const getDummyPositionData = (): PositionData => {
  console.log('Cargando datos dummy para desarrollo...');
  return {
    positionName: "Senior Backend Engineer",
    interviewFlow: {
      id: 1,
      description: "Standard development interview process",
      interviewSteps: [
        { id: 1, name: "Initial Screening", orderIndex: 1 },
        { id: 2, name: "Technical Interview", orderIndex: 2 },
        { id: 3, name: "Manager Interview", orderIndex: 3 }
      ]
    }
  };
};

export const getDummyCandidates = (): Candidate[] => {
  console.log('Cargando candidatos dummy para desarrollo...');
  return [
    { id: 1, fullName: "Jane Smith", currentInterviewStep: "Technical Interview", averageScore: 4, applicationId: 1 },
    { id: 2, fullName: "Carlos García", currentInterviewStep: "Initial Screening", averageScore: 0, applicationId: 2 },
    { id: 3, fullName: "John Doe", currentInterviewStep: "Manager Interview", averageScore: 5, applicationId: 3 }
  ];
};
