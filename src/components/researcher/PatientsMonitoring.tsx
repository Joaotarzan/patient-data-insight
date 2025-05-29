import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Filter, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Research {
  id: string;
  name: string;
  type: string;
  startDate: string;
  currentStage: number;
  progress: number;
  status: 'active' | 'completed' | 'paused' | 'planning';
  lastUpdate: string;
  nextEvaluation?: string;
  riskLevel: 'low' | 'medium' | 'high';
}

const PatientsMonitoring: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [research] = useState<Research[]>([
    {
      id: '1',
      name: 'Estudo Hipertensão Arterial',
      type: 'Ensaio Clínico',
      startDate: '2023-11-01',
      currentStage: 3,
      progress: 95,
      status: 'active',
      lastUpdate: '2024-01-10',
      nextEvaluation: '2024-01-15',
      riskLevel: 'low'
    },
    {
      id: '2',
      name: 'Pesquisa Cardiopatia Congênita',
      type: 'Estudo Observacional',
      startDate: '2023-12-01',
      currentStage: 2,
      progress: 78,
      status: 'active',
      lastUpdate: '2024-01-08',
      nextEvaluation: '2024-01-20',
      riskLevel: 'medium'
    },
    {
      id: '3',
      name: 'Estudo Insuficiência Cardíaca',
      type: 'Ensaio Clínico',
      startDate: '2023-10-15',
      currentStage: 4,
      progress: 100,
      status: 'completed',
      lastUpdate: '2024-01-05',
      riskLevel: 'low'
    },
    {
      id: '4',
      name: 'Pesquisa Arritmia Cardíaca',
      type: 'Estudo Piloto',
      startDate: '2023-11-20',
      currentStage: 1,
      progress: 45,
      status: 'active',
      lastUpdate: '2024-01-03',
      nextEvaluation: '2024-01-12',
      riskLevel: 'high'
    },
    {
      id: '5',
      name: 'Estudo Diabetes Cardiovascular',
      type: 'Estudo Observacional',
      startDate: '2023-09-01',
      currentStage: 2,
      progress: 0,
      status: 'paused',
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
      case 'paused':
        return 'bg-red-100 text-red-800';
      case 'planning':
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
      case 'paused':
        return 'Pausado';
      case 'planning':
        return 'Planejamento';
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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleViewDetails = (id: string) => {
    navigate(`/researcher/research/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/researcher/research/${id}`);
  };

  const filteredResearch = research.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: research.length,
    active: research.filter(p => p.status === 'active').length,
    completed: research.filter(p => p.status === 'completed').length,
    paused: research.filter(p => p.status === 'paused').length,
    planning: research.filter(p => p.status === 'planning').length
  };

  return (
    <Layout title="Acompanhar Pesquisas">
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
            Cadastrar Nova Pesquisa
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
                  <p className="text-sm font-medium text-gray-600">Ativas</p>
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
                  <p className="text-sm font-medium text-gray-600">Concluídas</p>
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
                  <p className="text-sm font-medium text-gray-600">Pausadas</p>
                  <p className="text-2xl font-bold text-red-600">{statusCounts.paused}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Planejamento</p>
                  <p className="text-2xl font-bold text-yellow-600">{statusCounts.planning}</p>
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
                    placeholder="Buscar pesquisa..."
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
                  <option value="active">Ativas</option>
                  <option value="completed">Concluídas</option>
                  <option value="paused">Pausadas</option>
                  <option value="planning">Planejamento</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research List */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Lista de Pesquisas</CardTitle>
            <CardDescription>
              {filteredResearch.length} pesquisa(s) encontrada(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredResearch.map((item) => {
                const RiskIcon = getRiskIcon(item.riskLevel);
                
                return (
                  <div
                    key={item.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <span className="text-sm text-gray-500">{item.type}</span>
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusText(item.status)}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <RiskIcon className={`h-4 w-4 ${getRiskColor(item.riskLevel)}`} />
                            <span className={`text-xs ${getRiskColor(item.riskLevel)}`}>
                              Risco {item.riskLevel === 'low' ? 'Baixo' : item.riskLevel === 'medium' ? 'Médio' : 'Alto'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Etapa:</span> {item.currentStage}/4
                          </div>
                          <div>
                            <span className="font-medium">Progresso:</span> 
                            <span className={`ml-1 ${getProgressColor(item.progress)}`}>
                              {item.progress}%
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Início:</span> {formatDate(item.startDate)}
                          </div>
                          <div>
                            <span className="font-medium">Última atualização:</span> {formatDate(item.lastUpdate)}
                          </div>
                        </div>
                        
                        {item.nextEvaluation && (
                          <div className="text-sm text-blue-600">
                            Próxima avaliação: {formatDate(item.nextEvaluation)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(item.id)}
                        >
                          Ver Detalhes
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
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
