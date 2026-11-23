import React, { useMemo, useRef, useState } from 'react';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react';
import {
  addOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  closeOutline,
  layersOutline,
  refreshOutline,
  searchOutline,
  timeOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { FilterOption, Incident, IncidentPriority } from '../types/incident';
import useIncidentsStorage from '../hooks/useIncidentsStorage';
import KpiCard from '../components/KpiCard';
import IncidentItem from '../components/IncidentItem';

const Home: React.FC = () => {
  const history = useHistory();

  // Gestión de incidencias con almacenamiento persistente sincronizado (localStorage)
  const {
    incidents,
    addIncident,
    toggleStatus,
    deleteIncident,
    resetToDefault,
  } = useIncidentsStorage();

  // Controles de búsqueda, filtro y estado de UI
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('todas');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Formulario modal de creación de incidencias
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<IncidentPriority>('media');

  // Referencia para listas deslizables si fuera necesario
  const listRef = useRef<HTMLIonListElement | null>(null);

  // Cálculo memoizado de indicadores KPI (CE 3.e)
  const metrics = useMemo(() => {
    const total = incidents.length;
    const pending = incidents.filter((item) => item.status === 'pendiente').length;
    const resolved = incidents.filter((item) => item.status === 'resuelta').length;
    const critical = incidents.filter(
      (item) => item.status === 'pendiente' && item.priority === 'alta'
    ).length;
    return { total, pending, resolved, critical };
  }, [incidents]);

  // Filtrado reactivo por término y estado
  const filteredIncidents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return incidents.filter((item) => {
      const matchesStatus =
        activeFilter === 'todas' || item.status === activeFilter;
      const matchesQuery =
        normalizedQuery === '' ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.location.toLowerCase().includes(normalizedQuery) ||
        item.id.toLowerCase().includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [incidents, activeFilter, searchQuery]);

  // Gesto táctil nativo Pull-to-Refresh
  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      setToastMessage('Panel sincronizado y actualizado');
      event.detail.complete();
    }, 600);
  };

  // Alternar estado de incidencia
  const handleToggleStatus = (id: string) => {
    toggleStatus(id);
    setToastMessage('Estado de incidencia modificado');
  };

  // Eliminar incidencia
  const handleDeleteIncident = (id: string) => {
    deleteIncident(id);
    setToastMessage(`Incidencia ${id} eliminada`);
  };

  // Navegar a la ficha técnica
  const handleViewDetails = (id: string) => {
    history.push(`/incident/${id}`);
  };

  // Envío del formulario de creación
  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) {
      setToastMessage('El título y la ubicación son obligatorios');
      return;
    }

    const newIncident: Incident = {
      id: `INC-${Math.floor(104 + Math.random() * 895)}`,
      title: title.trim(),
      location: location.trim(),
      description: description.trim() || 'Sin observaciones adicionales.',
      priority,
      status: 'pendiente',
      createdAt: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    addIncident(newIncident);
    setTitle('');
    setLocation('');
    setDescription('');
    setPriority('media');
    setIsModalOpen(false);
    setToastMessage(`Incidencia ${newIncident.id} creada correctamente`);
  };

  return (
    <IonPage>
      {/* Cabecera Responsiva con contador reactivo */}
      <IonHeader className="ion-no-border shadow-xs">
        <IonToolbar color="primary">
          <div className="flex items-center justify-between px-2 sm:px-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
                <IonIcon icon={layersOutline} className="text-xl" />
              </div>
              <div>
                <IonTitle className="font-bold tracking-tight text-lg sm:text-xl p-0">
                  SmartLab Monitor
                </IonTitle>
                <p className="hidden text-[11px] font-normal text-blue-100 sm:block">
                  Sistema de Gestión Operativa e Incidencias Técnicas
                </p>
              </div>
            </div>

            <IonButtons slot="end">
              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-semibold text-blue-100 md:inline">
                  Pendientes:
                </span>
                <IonBadge
                  color="light"
                  className="px-2.5 py-1 text-xs font-bold text-blue-700 shadow-xs"
                >
                  {metrics.pending}
                </IonBadge>
                <IonButton
                  fill="clear"
                  onClick={() => setIsModalOpen(true)}
                  className="hidden sm:inline-block font-semibold text-white hover:bg-white/10 rounded-lg"
                  aria-label="Añadir nueva incidencia"
                >
                  + Nueva
                </IonButton>
              </div>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-slate-50">
        {/* Pull-to-Refresh para dispositivos táctiles */}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="Desliza para actualizar"
            refreshingSpinner="crescent"
            refreshingText="Sincronizando estado..."
          />
        </IonRefresher>

        {/* Contenedor centralizado y adaptativo RWD (Mobile, Tablet, Desktop) */}
        <main className="mx-auto max-w-6xl px-4 pb-28 pt-5 sm:px-6 lg:px-8">
          {/* Bloque 1: Panel de métricas KPI modularizadas (Tailwind CSS Grid RWD) */}
          <section aria-label="Métricas del centro" className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Estado Operativo del Centro
                </h2>
                <p className="text-xs text-slate-400">
                  Monitorización en tiempo real y persistencia local
                </p>
              </div>
              <button
                type="button"
                onClick={resetToDefault}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-blue-600 focus:outline-hidden"
                title="Restablecer datos de muestra"
              >
                <IonIcon icon={refreshOutline} className="text-sm" />
                <span className="hidden sm:inline">Restablecer</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              <KpiCard
                title="Total"
                value={metrics.total}
                icon={layersOutline}
                iconColorClass="text-blue-600"
                valueColorClass="text-slate-900"
                sublabel="Registradas"
              />
              <KpiCard
                title="Pendientes"
                value={metrics.pending}
                icon={timeOutline}
                iconColorClass="text-amber-500"
                valueColorClass="text-amber-600"
                sublabel="En curso"
              />
              <KpiCard
                title="Críticas"
                value={metrics.critical}
                icon={alertCircleOutline}
                iconColorClass="text-rose-600"
                valueColorClass="text-rose-600"
                sublabel="Alta urgencia"
              />
              <KpiCard
                title="Resueltas"
                value={metrics.resolved}
                icon={checkmarkCircleOutline}
                iconColorClass="text-emerald-600"
                valueColorClass="text-emerald-600"
                sublabel="Finalizadas"
              />
            </div>
          </section>

          {/* Bloque 2: Filtros y Barra de búsqueda (RWD adaptativo) */}
          <section
            aria-label="Filtros y Búsqueda"
            className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-xs"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <IonSearchbar
                  value={searchQuery}
                  onIonInput={(e) => setSearchQuery(e.detail.value ?? '')}
                  placeholder="Buscar por código, título o aula..."
                  debounce={150}
                  className="p-0 custom-searchbar"
                  aria-label="Buscar incidencias"
                />
              </div>

              <div className="w-full md:w-auto md:min-w-[320px]">
                <IonSegment
                  value={activeFilter}
                  onIonChange={(e) =>
                    setActiveFilter((e.detail.value as FilterOption) ?? 'todas')
                  }
                  className="rounded-xl bg-slate-100 p-1"
                >
                  <IonSegmentButton value="todas">
                    <span className="text-xs font-semibold py-1">
                      Todas ({metrics.total})
                    </span>
                  </IonSegmentButton>
                  <IonSegmentButton value="pendiente">
                    <span className="text-xs font-semibold py-1">
                      Pendientes ({metrics.pending})
                    </span>
                  </IonSegmentButton>
                  <IonSegmentButton value="resuelta">
                    <span className="text-xs font-semibold py-1">
                      Resueltas ({metrics.resolved})
                    </span>
                  </IonSegmentButton>
                </IonSegment>
              </div>
            </div>
          </section>

          {/* Bloque 3: Listado de Incidencias modularizadas */}
          <section aria-label="Listado de incidencias registradas">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Incidencias Registradas ({filteredIncidents.length})
                </h2>
                <span className="text-xs text-slate-400">
                  Desliza lateralmente para acciones rápidas o pulsa para ver la ficha
                </span>
              </div>
              {filteredIncidents.length > 0 && (
                <span className="hidden sm:inline-block text-xs font-medium text-slate-400">
                  Mostrando {filteredIncidents.length} de {metrics.total}
                </span>
              )}
            </div>

            {filteredIncidents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-xs">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <IonIcon icon={searchOutline} className="text-2xl" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">
                  No se encontraron incidencias
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  {searchQuery.trim()
                    ? `No hay incidencias que coincidan con "${searchQuery}". Prueba con otros términos.`
                    : 'No hay incidencias en esta categoría.'}
                </p>
                {searchQuery.trim() && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-4 inline-flex items-center rounded-xl bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Limpiar búsqueda
                  </button>
                )}
              </div>
            ) : (
              <IonList
                ref={listRef}
                lines="none"
                className="space-y-3 bg-transparent p-0"
              >
                {filteredIncidents.map((incident) => (
                  <IncidentItem
                    key={incident.id}
                    incident={incident}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDeleteIncident}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </IonList>
            )}
          </section>
        </main>

        {/* Botón flotante accesible FAB (Mobile & Desktop) */}
        <IonFab slot="fixed" vertical="bottom" horizontal="end" className="mb-4 mr-4">
          <IonFabButton
            onClick={() => setIsModalOpen(true)}
            aria-label="Registrar nueva incidencia"
            className="shadow-lg"
          >
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* Modal Accesible de Alta de Incidencias */}
        <IonModal
          isOpen={isModalOpen}
          onDidDismiss={() => setIsModalOpen(false)}
          className="ion-modal-accessible"
        >
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle className="font-semibold text-base sm:text-lg">
                Nueva Incidencia Técnica
              </IonTitle>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Cerrar formulario"
                  className="text-white"
                >
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding bg-slate-50">
            <div className="mx-auto max-w-lg pt-2 pb-6">
              <p className="mb-4 text-xs text-slate-500">
                Completa los datos requeridos para registrar una nueva incidencia en el laboratorio.
              </p>

              <form onSubmit={handleCreateIncident} className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
                  <IonItem lines="none" className="bg-transparent">
                    <IonInput
                      label="Título de la incidencia *"
                      labelPlacement="stacked"
                      placeholder="Ej. Fallo de red en Switch Rack B"
                      value={title}
                      onIonInput={(e) => setTitle(e.detail.value ?? '')}
                      required
                    />
                  </IonItem>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
                  <IonItem lines="none" className="bg-transparent">
                    <IonInput
                      label="Aula o Ubicación *"
                      labelPlacement="stacked"
                      placeholder="Ej. Laboratorio DAM 2 / Aula 204"
                      value={location}
                      onIonInput={(e) => setLocation(e.detail.value ?? '')}
                      required
                    />
                  </IonItem>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
                  <IonItem lines="none" className="bg-transparent">
                    <IonSelect
                      label="Nivel de Prioridad *"
                      labelPlacement="stacked"
                      value={priority}
                      onIonChange={(e) =>
                        setPriority(e.detail.value as IncidentPriority)
                      }
                    >
                      <IonSelectOption value="alta">Alta (Crítica)</IonSelectOption>
                      <IonSelectOption value="media">Media (Operativa)</IonSelectOption>
                      <IonSelectOption value="baja">Baja (Mantenimiento)</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
                  <IonItem lines="none" className="bg-transparent">
                    <IonTextarea
                      label="Descripción técnica detallada"
                      labelPlacement="stacked"
                      rows={4}
                      placeholder="Detalla los síntomas observados o componentes afectados..."
                      value={description}
                      onIonInput={(e) => setDescription(e.detail.value ?? '')}
                    />
                  </IonItem>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus:outline-hidden"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-hidden"
                  >
                    Guardar Incidencia
                  </button>
                </div>
              </form>
            </div>
          </IonContent>
        </IonModal>

        {/* Notificación Toast reactiva */}
        <IonToast
          isOpen={toastMessage !== null}
          message={toastMessage ?? ''}
          duration={2200}
          position="bottom"
          onDidDismiss={() => setToastMessage(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
