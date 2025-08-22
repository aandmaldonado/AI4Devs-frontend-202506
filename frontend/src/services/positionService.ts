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

// Función para manejar errores de API y devolver datos dummy según la posición
export const getDummyPositionData = (positionId: number): PositionData => {
  console.log(`Cargando datos dummy para posición ${positionId}...`);
  
  const positions = {
    1: {
      positionName: "Senior Backend Engineer",
      interviewFlow: {
        id: 1,
        description: "Standard development interview process",
        interviewSteps: [
          { id: 1, name: "LLamada telefónica", orderIndex: 1 },
          { id: 2, name: "Entrevista técnica", orderIndex: 2 },
          { id: 3, name: "Entrevista cultural", orderIndex: 3 },
          { id: 4, name: "Entrevista manager", orderIndex: 4 }
        ]
      }
    },
    2: {
      positionName: "Junior Android Engineer",
      interviewFlow: {
        id: 2,
        description: "Mobile development interview process",
        interviewSteps: [
          { id: 1, name: "LLamada telefónica", orderIndex: 1 },
          { id: 2, name: "Entrevista técnica", orderIndex: 2 },
          { id: 3, name: "Entrevista cultural", orderIndex: 3 },
          { id: 4, name: "Entrevista manager", orderIndex: 4 }
        ]
      }
    },
    3: {
      positionName: "Product Manager",
      interviewFlow: {
        id: 3,
        description: "Product management interview process",
        interviewSteps: [
          { id: 1, name: "LLamada telefónica", orderIndex: 1 },
          { id: 2, name: "Entrevista técnica", orderIndex: 2 },
          { id: 3, name: "Entrevista cultural", orderIndex: 3 },
          { id: 4, name: "Entrevista manager", orderIndex: 4 }
        ]
      }
    }
  };

  return positions[positionId as keyof typeof positions] || positions[1];
};

export const getDummyCandidates = (positionId: number): Candidate[] => {
  console.log(`Cargando candidatos dummy para posición ${positionId}...`);
  
  const candidatesByPosition = {
    1: [ // Senior Backend Engineer
      { id: 1, fullName: "Jane Smith", currentInterviewStep: "Entrevista técnica", averageScore: 4, applicationId: 1 },
      { id: 2, fullName: "Carlos García", currentInterviewStep: "LLamada telefónica", averageScore: 2, applicationId: 2 },
      { id: 3, fullName: "John Doe", currentInterviewStep: "Entrevista manager", averageScore: 5, applicationId: 3 }
    ],
    2: [ // Junior Android Engineer
      { id: 4, fullName: "María López", currentInterviewStep: "LLamada telefónica", averageScore: 3, applicationId: 4 },
      { id: 5, fullName: "David Chen", currentInterviewStep: "Entrevista técnica", averageScore: 1, applicationId: 5 },
      { id: 6, fullName: "Ana Rodríguez", currentInterviewStep: "Entrevista cultural", averageScore: 4, applicationId: 6 }
    ],
    3: [ // Product Manager
      { id: 8, fullName: "Sarah Johnson", currentInterviewStep: "LLamada telefónica", averageScore: 5, applicationId: 8 },
      { id: 9, fullName: "Roberto Silva", currentInterviewStep: "Entrevista técnica", averageScore: 2, applicationId: 9 },
      { id: 10, fullName: "Elena Fernández", currentInterviewStep: "Entrevista cultural", averageScore: 3, applicationId: 10 }
    ]
  };

  return candidatesByPosition[positionId as keyof typeof candidatesByPosition] || candidatesByPosition[1];
};
