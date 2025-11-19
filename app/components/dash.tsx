'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from './ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  FaCar, 
  FaUser, 
  FaFileAlt, 
  FaExclamationTriangle,
  FaFilter,
  FaDownload,
  FaShieldAlt,
  FaSearch,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaPlus,
  FaEdit,
  FaIdCard,
  FaGraduationCap,
  FaBook,
  FaCarSide,
  FaTrash,
  FaTimes,
  FaCheck,
  FaSlidersH
} from 'react-icons/fa';

// Datos de ejemplo
const initialVehicleData = [
  { 
    id: 1,
    placa: 'ABC123', 
    propietario: 'Juan Pérez', 
    tipo: 'Particular', 
    estado: 'Activo', 
    vencimiento: '2024-12-31',
    marca: 'Toyota',
    modelo: 'Corolla',
    año: '2020'
  },
  { 
    id: 2,
    placa: 'DEF456', 
    propietario: 'María García', 
    tipo: 'Público', 
    estado: 'Activo', 
    vencimiento: '2024-11-15',
    marca: 'Chevrolet',
    modelo: 'Spark',
    año: '2021'
  },
  { 
    id: 3,
    placa: 'GHI789', 
    propietario: 'Carlos Rodríguez', 
    tipo: 'Particular', 
    estado: 'Inactivo', 
    vencimiento: '2023-08-20',
    marca: 'Mazda',
    modelo: 'CX-5',
    año: '2019'
  },
  { 
    id: 4,
    placa: 'JKL012', 
    propietario: 'Ana Martínez', 
    tipo: 'Oficial', 
    estado: 'Activo', 
    vencimiento: '2024-10-30',
    marca: 'Ford',
    modelo: 'Explorer',
    año: '2022'
  },
];

const multasData = [
  {
    id: 'M001',
    placa: 'ABC123',
    infraccion: 'Exceso de velocidad',
    fecha: '2024-01-15',
    valor: 450000,
    estado: 'Pendiente'
  },
  {
    id: 'M002',
    placa: 'DEF456',
    infraccion: 'Parqueo prohibido',
    fecha: '2024-01-10',
    valor: 180000,
    estado: 'Pagada'
  },
  {
    id: 'M003',
    placa: 'GHI789',
    infraccion: 'Semáforo en rojo',
    fecha: '2024-01-20',
    valor: 650000,
    estado: 'Pendiente'
  },
  {
    id: 'M004',
    placa: 'JKL012',
    infraccion: 'Exceso de velocidad',
    fecha: '2024-01-18',
    valor: 450000,
    estado: 'Pagada'
  }
];

const licenciasData = [
  {
    id: 'L001',
    cedula: '123456789',
    nombre: 'Juan Pérez',
    categoria: 'B1',
    fechaExpedicion: '2022-05-15',
    fechaVencimiento: '2027-05-15',
    estado: 'Vigente',
    restricciones: 'Ninguna'
  },
  {
    id: 'L002',
    cedula: '987654321',
    nombre: 'María García',
    categoria: 'C1',
    fechaExpedicion: '2023-02-20',
    fechaVencimiento: '2028-02-20',
    estado: 'Vigente',
    restricciones: 'Lentes'
  },
  {
    id: 'L003',
    cedula: '456789123',
    nombre: 'Carlos López',
    categoria: 'A2',
    fechaExpedicion: '2021-11-10',
    fechaVencimiento: '2026-11-10',
    estado: 'Vencida',
    restricciones: 'Ninguna'
  },
  {
    id: 'L004',
    cedula: '789123456',
    nombre: 'Laura Sánchez',
    categoria: 'B1',
    fechaExpedicion: '2023-08-15',
    fechaVencimiento: '2028-08-15',
    estado: 'Vigente',
    restricciones: 'Lentes'
  }
];

// Tipos para filtros
interface FiltrosVehiculos {
  tipo: string;
  estado: string;
  marca: string;
}

interface FiltrosMultas {
  estado: string;
  infraccion: string;
  fechaDesde: string;
  fechaHasta: string;
}

interface FiltrosLicencias {
  categoria: string;
  estado: string;
  restricciones: string;
}

export default function RUNTDashboard() {
  const [activeTab, setActiveTab] = useState('vehiculos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCursoModal, setShowCursoModal] = useState(false);
  const [cursoTipo, setCursoTipo] = useState<'teorico' | 'practico' | ''>('');
  const [vehicleData, setVehicleData] = useState(initialVehicleData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<{id: number, placa: string, propietario: string} | null>(null);
  const [showFiltros, setShowFiltros] = useState(false);
  
  // Estados para filtros
  const [filtrosVehiculos, setFiltrosVehiculos] = useState<FiltrosVehiculos>({
    tipo: '',
    estado: '',
    marca: ''
  });
  
  const [filtrosMultas, setFiltrosMultas] = useState<FiltrosMultas>({
    estado: '',
    infraccion: '',
    fechaDesde: '',
    fechaHasta: ''
  });
  
  const [filtrosLicencias, setFiltrosLicencias] = useState<FiltrosLicencias>({
    categoria: '',
    estado: '',
    restricciones: ''
  });

  // Funciones para las operaciones
  const registrarVehiculo = () => {
    console.log('Registrar vehículo');
  };

  const transferirVehiculo = (placa: string) => {
    console.log('Transferir vehículo:', placa);
  };

  const verMultas = (placa: string) => {
    console.log('Ver multas de:', placa);
    setActiveTab('multas');
  };

  const solicitarCurso = (tipo: 'teorico' | 'practico', cedula: string) => {
    setCursoTipo(tipo);
    setShowCursoModal(true);
    console.log(`Solicitar curso ${tipo} para cédula: ${cedula}`);
  };

  const confirmarCurso = () => {
    console.log(`Curso ${cursoTipo} confirmado`);
    setShowCursoModal(false);
    setCursoTipo('');
  };

  // Función para eliminar vehículo
  const eliminarVehiculo = (vehicle: {id: number, placa: string, propietario: string}) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  const confirmarEliminacion = () => {
    if (vehicleToDelete) {
      setVehicleData(prev => prev.filter(v => v.id !== vehicleToDelete.id));
      console.log(`Vehículo ${vehicleToDelete.placa} eliminado`);
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    }
  };

  const cancelarEliminacion = () => {
    setShowDeleteModal(false);
    setVehicleToDelete(null);
  };

  // Funciones para manejar filtros
  const aplicarFiltrosVehiculos = () => {
    setShowFiltros(false);
  };

  const aplicarFiltrosMultas = () => {
    setShowFiltros(false);
  };

  const aplicarFiltrosLicencias = () => {
    setShowFiltros(false);
  };

  const limpiarFiltros = () => {
    if (activeTab === 'vehiculos') {
      setFiltrosVehiculos({ tipo: '', estado: '', marca: '' });
    } else if (activeTab === 'multas') {
      setFiltrosMultas({ estado: '', infraccion: '', fechaDesde: '', fechaHasta: '' });
    } else if (activeTab === 'licencias') {
      setFiltrosLicencias({ categoria: '', estado: '', restricciones: '' });
    }
    setShowFiltros(false);
  };

  // Funciones de filtrado
  const filtrarVehiculos = vehicleData.filter(vehicle => {
    const coincideBusqueda = 
      vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.propietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase());

    const coincideTipo = !filtrosVehiculos.tipo || vehicle.tipo === filtrosVehiculos.tipo;
    const coincideEstado = !filtrosVehiculos.estado || vehicle.estado === filtrosVehiculos.estado;
    const coincideMarca = !filtrosVehiculos.marca || vehicle.marca.toLowerCase().includes(filtrosVehiculos.marca.toLowerCase());

    return coincideBusqueda && coincideTipo && coincideEstado && coincideMarca;
  });

  const filtrarMultas = multasData.filter(multa => {
    const coincideBusqueda = 
      multa.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      multa.infraccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      multa.id.toLowerCase().includes(searchTerm.toLowerCase());

    const coincideEstado = !filtrosMultas.estado || multa.estado === filtrosMultas.estado;
    const coincideInfraccion = !filtrosMultas.infraccion || multa.infraccion.toLowerCase().includes(filtrosMultas.infraccion.toLowerCase());
    
    let coincideFecha = true;
    if (filtrosMultas.fechaDesde) {
      coincideFecha = coincideFecha && multa.fecha >= filtrosMultas.fechaDesde;
    }
    if (filtrosMultas.fechaHasta) {
      coincideFecha = coincideFecha && multa.fecha <= filtrosMultas.fechaHasta;
    }

    return coincideBusqueda && coincideEstado && coincideInfraccion && coincideFecha;
  });

  const filtrarLicencias = licenciasData.filter(licencia => {
    const coincideBusqueda = 
      licencia.cedula.includes(searchTerm) ||
      licencia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licencia.categoria.toLowerCase().includes(searchTerm.toLowerCase());

    const coincideCategoria = !filtrosLicencias.categoria || licencia.categoria === filtrosLicencias.categoria;
    const coincideEstado = !filtrosLicencias.estado || licencia.estado === filtrosLicencias.estado;
    const coincideRestricciones = !filtrosLicencias.restricciones || 
      licencia.restricciones.toLowerCase().includes(filtrosLicencias.restricciones.toLowerCase());

    return coincideBusqueda && coincideCategoria && coincideEstado && coincideRestricciones;
  });

  // Obtener opciones únicas para los filtros
  const tiposVehiculo = [...new Set(vehicleData.map(v => v.tipo))];
  const estadosVehiculo = [...new Set(vehicleData.map(v => v.estado))];
  const marcasVehiculo = [...new Set(vehicleData.map(v => v.marca))];
  const estadosMulta = [...new Set(multasData.map(m => m.estado))];
  const infracciones = [...new Set(multasData.map(m => m.infraccion))];
  const categoriasLicencia = [...new Set(licenciasData.map(l => l.categoria))];
  const estadosLicencia = [...new Set(licenciasData.map(l => l.estado))];
  const restriccionesLicencia = [...new Set(licenciasData.map(l => l.restricciones))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center">
                <FaCar className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RUNT Colombia</h1>
                <p className="text-sm text-gray-500">Gestión de Vehículos, Multas y Licencias</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Agente: CA-00123</p>
                <p className="text-xs text-gray-500">Cuerpo de Agentes Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'vehiculos', label: 'Vehículos', icon: FaCar },
              { key: 'multas', label: 'Multas', icon: FaMoneyBillWave },
              { key: 'licencias', label: 'Licencias', icon: FaIdCard },
              { key: 'transferencias', label: 'Transferencias', icon: FaExchangeAlt }
            ].map((tab) => (
              <button
                key={tab.key}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Barra de búsqueda y acciones */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={
                  activeTab === 'vehiculos' ? 'Buscar por placa...' :
                  activeTab === 'multas' ? 'Buscar por placa...' :
                  activeTab === 'licencias' ? 'Buscar por cédula, nombre o categoría...' :
                  'Buscar...'
                }
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFiltros(!showFiltros)}
              >
                <FaSlidersH className="h-4 w-4 mr-2" />
                Filtros
                {(filtrosVehiculos.tipo || filtrosVehiculos.estado || filtrosVehiculos.marca ||
                  filtrosMultas.estado || filtrosMultas.infraccion || filtrosMultas.fechaDesde ||
                  filtrosLicencias.categoria || filtrosLicencias.estado || filtrosLicencias.restricciones) && (
                  <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </Button>

              {/* Panel de Filtros */}
              {showFiltros && (
                <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">Filtros Avanzados</h3>
                    <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
                      Limpiar
                    </Button>
                  </div>

                  {activeTab === 'vehiculos' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={filtrosVehiculos.tipo}
                          onChange={(e) => setFiltrosVehiculos(prev => ({...prev, tipo: e.target.value}))}
                        >
                          <option value="">Todos los tipos</option>
                          {tiposVehiculo.map(tipo => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={filtrosVehiculos.estado}
                          onChange={(e) => setFiltrosVehiculos(prev => ({...prev, estado: e.target.value}))}
                        >
                          <option value="">Todos los estados</option>
                          {estadosVehiculo.map(estado => (
                            <option key={estado} value={estado}>{estado}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={filtrosVehiculos.marca}
                          onChange={(e) => setFiltrosVehiculos(prev => ({...prev, marca: e.target.value}))}
                        >
                          <option value="">Todas las marcas</option>
                          {marcasVehiculo.map(marca => (
                            <option key={marca} value={marca}>{marca}</option>
                          ))}
                        </select>
                      </div>
                      <Button onClick={aplicarFiltrosVehiculos} className="w-full">
                        Aplicar Filtros
                      </Button>
                    </div>
                  )}

                  {activeTab === 'multas' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={filtrosMultas.estado}
                          onChange={(e) => setFiltrosMultas(prev => ({...prev, estado: e.target.value}))}
                        >
                          <option value="">Todos los estados</option>
                          {estadosMulta.map(estado => (
                            <option key={estado} value={estado}>{estado}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Infracción</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={filtrosMultas.infraccion}
                          onChange={(e) => setFiltrosMultas(prev => ({...prev, infraccion: e.target.value}))}
                        >
                          <option value="">Todas las infracciones</option>
                          {infracciones.map(infraccion => (
                            <option key={infraccion} value={infraccion}>{infraccion}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                          <Input
                            type="date"
                            value={filtrosMultas.fechaDesde}
                            onChange={(e) => setFiltrosMultas(prev => ({...prev, fechaDesde: e.target.value}))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                          <Input
                            type="date"
                            value={filtrosMultas.fechaHasta}
                            onChange={(e) => setFiltrosMultas(prev => ({...prev, fechaHasta: e.target.value}))}
                          />
                        </div>
                      </div>
                      <Button onClick={aplicarFiltrosMultas} className="w-full">
                        Aplicar Filtros
                      </Button>
                    </div>
                  )}

                  {activeTab === 'licencias' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={filtrosLicencias.categoria}
                          onChange={(e) => setFiltrosLicencias(prev => ({...prev, categoria: e.target.value}))}
                        >
                          <option value="">Todas las categorías</option>
                          {categoriasLicencia.map(categoria => (
                            <option key={categoria} value={categoria}>{categoria}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={filtrosLicencias.estado}
                          onChange={(e) => setFiltrosLicencias(prev => ({...prev, estado: e.target.value}))}
                        >
                          <option value="">Todos los estados</option>
                          {estadosLicencia.map(estado => (
                            <option key={estado} value={estado}>{estado}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Restricciones</label>
                        <select 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          value={filtrosLicencias.restricciones}
                          onChange={(e) => setFiltrosLicencias(prev => ({...prev, restricciones: e.target.value}))}
                        >
                          <option value="">Todas las restricciones</option>
                          {restriccionesLicencia.map(restriccion => (
                            <option key={restriccion} value={restriccion}>{restriccion}</option>
                          ))}
                        </select>
                      </div>
                      <Button onClick={aplicarFiltrosLicencias} className="w-full">
                        Aplicar Filtros
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {activeTab === 'vehiculos' && (
            <Button onClick={registrarVehiculo}>
              <FaPlus className="h-4 w-4 mr-2" />
              Registrar Vehículo
            </Button>
          )}
        </div>

        {/* Contador de resultados */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Mostrando {
              activeTab === 'vehiculos' ? filtrarVehiculos.length :
              activeTab === 'multas' ? filtrarMultas.length :
              activeTab === 'licencias' ? filtrarLicencias.length : 0
            } resultados
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vehículos Registrados</CardTitle>
              <FaCar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicleData.length}</div>
              <p className="text-xs text-green-600">+5% este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Multas Activas</CardTitle>
              <FaExclamationTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-red-600">+12% este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Licencias Vigentes</CardTitle>
              <FaIdCard className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,847</div>
              <p className="text-xs text-green-600">+8% este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Solicitados</CardTitle>
              <FaGraduationCap className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-purple-600">+15% este mes</p>
            </CardContent>
          </Card>
        </div>

        {/* Contenido por pestaña */}
        {activeTab === 'vehiculos' && (
          <Card>
            <CardHeader>
              <CardTitle>Registro de Vehículos</CardTitle>
              <CardDescription>
                Gestión de vehículos registrados en el sistema RUNT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Placa</TableHead>
                    <TableHead>Propietario</TableHead>
                    <TableHead>Marca/Modelo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Vencimiento SOAT</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrarVehiculos.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.placa}</TableCell>
                      <TableCell>{vehicle.propietario}</TableCell>
                      <TableCell>{vehicle.marca} {vehicle.modelo}</TableCell>
                      <TableCell>{vehicle.tipo}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vehicle.estado === 'Activo' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {vehicle.estado}
                        </span>
                      </TableCell>
                      <TableCell>{vehicle.vencimiento}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => transferirVehiculo(vehicle.placa)}
                          >
                            <FaExchangeAlt className="h-3 w-3 mr-1" />
                            Transferir
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => verMultas(vehicle.placa)}
                          >
                            <FaMoneyBillWave className="h-3 w-3 mr-1" />
                            Multas
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => eliminarVehiculo({
                              id: vehicle.id,
                              placa: vehicle.placa,
                              propietario: vehicle.propietario
                            })}
                          >
                            <FaTrash className="h-3 w-3 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'multas' && (
          <Card>
            <CardHeader>
              <CardTitle>Registro de Multas</CardTitle>
              <CardDescription>
                Gestión de multas y sanciones de tránsito
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Multa</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead>Infracción</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrarMultas.map((multa, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{multa.id}</TableCell>
                      <TableCell>{multa.placa}</TableCell>
                      <TableCell>{multa.infraccion}</TableCell>
                      <TableCell>{multa.fecha}</TableCell>
                      <TableCell>${multa.valor.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          multa.estado === 'Pagada' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {multa.estado}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FaEdit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm">
                            <FaDownload className="h-3 w-3 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'licencias' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Registro de Licencias de Conducción</CardTitle>
                  <CardDescription>
                    Gestión de licencias y solicitud de cursos
                  </CardDescription>
                </div>
                <Button>
                  <FaPlus className="h-4 w-4 mr-2" />
                  Nueva Licencia
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cédula</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Expedición</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Restricciones</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrarLicencias.map((licencia, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{licencia.cedula}</TableCell>
                      <TableCell>{licencia.nombre}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {licencia.categoria}
                        </span>
                      </TableCell>
                      <TableCell>{licencia.fechaExpedicion}</TableCell>
                      <TableCell>{licencia.fechaVencimiento}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          licencia.estado === 'Vigente' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {licencia.estado}
                        </span>
                      </TableCell>
                      <TableCell>{licencia.restricciones}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => solicitarCurso('teorico', licencia.cedula)}
                          >
                            <FaBook className="h-3 w-3 mr-1" />
                            Curso Teórico
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => solicitarCurso('practico', licencia.cedula)}
                          >
                            <FaCarSide className="h-3 w-3 mr-1" />
                            Curso Práctico
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'transferencias' && (
          <Card>
            <CardHeader>
              <CardTitle>Transferencias de Vehículos</CardTitle>
              <CardDescription>
                Gestión de cambios de propietario de vehículos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FaExchangeAlt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Módulo de Transferencias
                </h3>
                <p className="text-gray-500 mb-4">
                  Sistema de transferencia de vehículos entre propietarios
                </p>
                <Button>
                  <FaExchangeAlt className="h-4 w-4 mr-2" />
                  Iniciar Transferencia
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Modal para eliminar vehículo */}
      {showDeleteModal && vehicleToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold">Confirmar Eliminación</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              ¿Está seguro que desea eliminar el vehículo con placa <strong>{vehicleToDelete.placa}</strong>?
            </p>

            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
              <p className="text-sm text-red-800 font-medium">
                ⚠️ Esta acción no se puede deshacer
              </p>
              <p className="text-xs text-red-700 mt-1">
                Propietario: {vehicleToDelete.propietario}
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={cancelarEliminacion}
              >
                <FaTimes className="h-3 w-3 mr-1" />
                Cancelar
              </Button>
              <Button 
                variant="destructive"
                onClick={confirmarEliminacion}
              >
                <FaCheck className="h-3 w-3 mr-1" />
                Confirmar Eliminación
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para solicitar curso */}
      {showCursoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <FaGraduationCap className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Solicitar Curso</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              ¿Está seguro que desea solicitar el curso <strong>{cursoTipo}</strong>?
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <p className="text-sm text-blue-800">
                El solicitante será contactado para coordinar fecha y lugar del curso.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowCursoModal(false)}
              >
                Cancelar
              </Button>
              <Button onClick={confirmarCurso}>
                Confirmar Solicitud
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-blue-600" />
              <span className="text-sm text-gray-600">
                Sistema RUNT - CA Colombia ER:LC
              </span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Simulación RUNT - Proyecto de ficción
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}