
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, CheckCircle, Clock, ArrowLeft, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Stage {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  startDate?: string;
  endDate?: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

const CurrentStage: React.FC = () => {
  const navigate = useNavigate();

  const stages: Stage[] = [
    {
      id: 1,
      title: "Avaliação Inicial",
      description: "Exames e consultas para diagnóstico completo",
      status: 'completed',
      startDate: '2023-11-01',
      endDate: '2023-11-15',
      tasks: [
        { id: '1', title: 'Consulta inicial', completed: true },
        { id: '2', title: 'Exames de sangue', completed: true },
        { id: '3', title: 'Eletrocardiograma', completed: true },
        { id: '4', title: 'Avaliação cardiológica', completed: true }
      ]
    },
    {
      id: 2,
      title: "Início do Tratamento",
      description: "Implementação do plano terapêutico inicial",
      status: 'completed',
      startDate: '2023-11-16',
      endDate: '2023-12-15',
      tasks: [
        { id: '5', title: 'Início da medicação', completed: true },
        { id: '6', title: 'Ajuste de dosagem', completed: true },
        { id: '7', title: 'Monitoramento semanal', completed: true },
        { id: '8', title: 'Avaliação de eficácia', completed: true }
      ]
    },
    {
      id: 3,
      title: "Monitoramento Intensivo",
      description: "Acompanhamento próximo da resposta ao tratamento",
      status: 'current',
      startDate: '2023-12-16',
      endDate: '2024-02-15',
      tasks: [
        { id: '9', title: 'Consulta mensal', completed: true },
        { id: '10', title: 'Exames de controle', completed: true },
        { id: '11', title: 'Ajuste fino da medicação', completed: false, dueDate: '2024-01-20' },
        { id: '12', title: 'Avaliação de efeitos colaterais', completed: false, dueDate: '2024-01-25' }
      ]
    },
    {
      id: 4,
      title: "Manutenção",
      description: "Tratamento de longo prazo e acompanhamento regular",
      status: 'upcoming',
      startDate: '2024-02-16',
      tasks: [
        { id: '13', title: 'Consultas trimestrais', completed: false },
        { id: '14', title: 'Exames semestrais', completed: false },
        { id: '15', title: 'Acompanhamento contínuo', completed: false }
      ]
    }
  ];

  const currentStage = stages.find(stage => stage.status === 'current')!;
  const completedTasks = currentStage.tasks.filter(task => task.completed).length;
  const totalTasks = currentStage.tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'current':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'current':
        return 'Em Andamento';
      case 'upcoming':
        return 'Próxima';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Layout title="Etapa Atual do Tratamento">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/patient')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Painel</span>
          </Button>
        </div>

        {/* Progresso Geral */}
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Progresso do Tratamento</h2>
                <p className="text-gray-600">Etapa 3 de 4 - {progressPercentage.toFixed(0)}% da etapa atual</p>
              </div>
              <TrendingUp className="h-12 w-12 text-blue-600" />
            </div>
            
            <Progress value={75} className="h-3 mb-2" />
            <p className="text-sm text-gray-600">75% do tratamento completo</p>
          </CardContent>
        </Card>

        {/* Etapa Atual */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader className="bg-blue-50/50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Etapa Atual: {currentStage.title}</span>
                </CardTitle>
                <CardDescription>{currentStage.description}</CardDescription>
              </div>
              <Badge className={getStatusColor(currentStage.status)}>
                {getStatusText(currentStage.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Período: {formatDate(currentStage.startDate!)} - {formatDate(currentStage.endDate!)}</span>
                <span>{completedTasks} de {totalTasks} tarefas concluídas</span>
              </div>
              
              <Progress value={progressPercentage} className="h-2" />
              
              <div className="space-y-3">
                {currentStage.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      task.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-orange-600" />
                      )}
                      <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-900'}>
                        {task.title}
                      </span>
                    </div>
                    
                    {task.dueDate && !task.completed && (
                      <span className="text-sm text-orange-600">
                        Prazo: {formatDate(task.dueDate)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline das Etapas */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Timeline do Tratamento</CardTitle>
            <CardDescription>
              Visão completa de todas as etapas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stages.map((stage, index) => (
                <div key={stage.id} className="relative">
                  {index < stages.length - 1 && (
                    <div className="absolute left-4 top-8 h-16 w-0.5 bg-gray-300"></div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      stage.status === 'completed' 
                        ? 'bg-green-600 text-white' 
                        : stage.status === 'current'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {stage.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-bold">{stage.id}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{stage.title}</h3>
                        <Badge className={getStatusColor(stage.status)}>
                          {getStatusText(stage.status)}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                      
                      {stage.startDate && (
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {formatDate(stage.startDate)}
                            {stage.endDate && ` - ${formatDate(stage.endDate)}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CurrentStage;
