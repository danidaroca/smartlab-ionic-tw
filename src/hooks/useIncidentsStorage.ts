import { useState, useEffect, useCallback } from 'react';
import { Incident } from '../types/incident';

const STORAGE_KEY = 'smartlab_incidents_v1';

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-101',
    title: 'Fallo de enlace en Switch Rack B',
    location: 'Aula 204 - Redes',
    description: 'Pérdida intermitente de paquetes en puertos Gigabit 12 al 16.',
    priority: 'alta',
    status: 'pendiente',
    createdAt: '09:15',
  },
  {
    id: 'INC-102',
    title: 'Actualización de imágenes Docker',
    location: 'Laboratorio DAM 2',
    description: 'Desplegar imagen base Node 22 Alpine en estaciones de trabajo.',
    priority: 'media',
    status: 'pendiente',
    createdAt: '10:30',
  },
  {
    id: 'INC-103',
    title: 'Calibración de proyector láser',
    location: 'Aula Magna',
    description: 'Ajuste trapezoidal y verificación de entrada HDMI.',
    priority: 'baja',
    status: 'resuelta',
    createdAt: 'Ayer',
  },
];

export const useIncidentsStorage = () => {
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('No se pudo cargar incidencias de localStorage:', error);
    }
    return INITIAL_INCIDENTS;
  });

  // Guardar en localStorage cada vez que cambien los datos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }, [incidents]);

  const addIncident = useCallback((newIncident: Incident) => {
    setIncidents((prev) => [newIncident, ...prev]);
  }, []);

  const toggleStatus = useCallback((id: string) => {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'pendiente' ? 'resuelta' : 'pendiente',
            }
          : item
      )
    );
  }, []);

  const deleteIncident = useCallback((id: string) => {
    setIncidents((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateDescription = useCallback((id: string, newDescription: string) => {
    setIncidents((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              description: newDescription,
            }
          : item
      )
    );
  }, []);

  const getIncidentById = useCallback(
    (id: string): Incident | undefined => {
      return incidents.find((item) => item.id === id);
    },
    [incidents]
  );

  const resetToDefault = useCallback(() => {
    setIncidents(INITIAL_INCIDENTS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    incidents,
    setIncidents,
    addIncident,
    toggleStatus,
    deleteIncident,
    updateDescription,
    getIncidentById,
    resetToDefault,
  };
};

export default useIncidentsStorage;
