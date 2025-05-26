
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Filter, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  age: number;
  enrollmentDate: string;
  currentStage: number;
  adherence: number;
  status: 'active' | 'completed' | 'dropped_out' | 'on_hold';
  lastUpdate: string;
  nextAppointment?: string;
  riskLevel: 'low' | 'medium' | 'high';
}

const PatientsMonitoring: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'João Silva',
      age: 45,
      enrollmentDate: '2023-11-01',
      currentStage: 3,
      adherence: 95,
      status: 'active',
      lastUpdate: '2024-01-10',
      nextAppointment: '2024-01-15',
      riskLevel: 'low'
    },
    {
      id: '2',
      name: 'Maria Santos',
      age: 52,
      enrollmentDate: '2023-12-01',
      currentStage: 2,
      adherence: 78,
      status: 'active',
      lastUpdate: '2024-01-08',
      nextAppointment: '2024-01-20',
      riskLevel: 'medium'
    },
    {
      id: '3',
      name: 'Pedro Costa',
      age: 38,
      enrollmentDate: '2023-10-15',
      currentStage: 4,
      adherence: 100,
      status: 'completed',
      lastUpdate: '2024-01-05',
      riskLevel: 'low'
    },
    {
      id: '4',
      name: 'Ana Lima',
      age: 61,
      enrollmentDate: '2023-11-20',
      currentStage: 1,
      adherence: 45,
      status: 'active',
      lastUpdate: '2024-01-03',
      nextAppointment: '2024-01-12',
      riskLevel: 'high'
    },
    {
      id: '5',
      name: 'Carlos Oliveira',
      age: 49,
      enrollmentDate: '2023-09-01',
      currentStage: 2,
      adherence: 0,
      status: 'dropped_out',
      lastUpdate: '2023-12-15',
      riskLevel: 'high'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'dropped_out':
        return 'bg-red-100 text-red-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'completed':
        return 'Concluído';
      case 'dropped_out':
        return 'Abandonou';
      case 'on_hold':
        return 'Pausado';
      default:
        return status;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'high':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return CheckCircle;
      case 'medium':
        return TrendingUp;
      case 'high':
        return AlertTriangle;
      default:
        return CheckCircle;
    }
  };

  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 80) return 'text-green-600';
    if (adherence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    completed: patients.filter(p => p.status === 'completed').length,
    dropped_out: patients.filter(p => p.status === 'dropped_out').length,
    on_hold: patients.filter(p => p.status === 'on_hold').length
  };

  return (
    <Layout title="Acompanhar Pacientes">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/researcher')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Painel</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/researcher/register')}
            className="bg-green-600 hover:bg-green-700"
          >
            Cadastrar Novo Paciente
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                </div>
                <Users className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ativos</p>
                  <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Concluídos</p>
                  <p className="text-2xl font-bold text-blue-600">{statusCounts.completed}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Abandonaram</p>
                  <p className="text-2xl font-bold text-red-600">{statusCounts.dropped_out}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pausados</p>
                  <p className="text-2xl font-bold text-yellow-600">{statusCounts.on_hold}</p>
                </div>
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar paciente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativos</option>
                  <option value="completed">Concluídos</option>
                  <option value="dropped_out">Abandonaram</option>
                  <option value="on_hold">Pausados</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
            <CardDescription>
              {filteredPatients.length} paciente(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => {
                const RiskIcon = getRiskIcon(patient.riskLevel);
                
                return (
                  <div
                    key={patient.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          <span className="text-sm text-gray-500">{patient.age} anos</span>
                          <Badge className={getStatusColor(patient.status)}>
                            {getStatusText(patient.status)}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <RiskIcon className={`h-4 w-4 ${getRiskColor(patient.riskLevel)}`} />
                            <span className={`text-xs ${getRiskColor(patient.riskLevel)}`}>
                              Risco {patient.riskLevel === 'low' ? 'Baixo' : patient.riskLevel === 'medium' ? 'Médio' : 'Alto'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Etapa:</span> {patient.currentStage}/4
                          </div>
                          <div>
                            <span className="font-medium">Adesão:</span> 
                            <span className={`ml-1 ${getAdherenceColor(patient.adherence)}`}>
                              {patient.adherence}%
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Início:</span> {formatDate(patient.enrollmentDate)}
                          </div>
                          <div>
                            <span className="font-medium">Última atualização:</span> {formatDate(patient.lastUpdate)}
                          </div>
                        </div>
                        
                        {patient.nextAppointment && (
                          <div className="text-sm text-blue-600">
                            Próxima consulta: {formatDate(patient.nextAppointment)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientsMonitoring;
