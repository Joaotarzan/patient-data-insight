
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, FileText, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResearcherDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Pacientes Ativos",
      value: "24",
      description: "+3 este mês",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Taxa de Adesão",
      value: "87%",
      description: "+5% vs mês anterior",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Consultas Hoje",
      value: "8",
      description: "4 concluídas",
      icon: Calendar,
      color: "text-purple-600"
    },
    {
      title: "Relatórios Pendentes",
      value: "3",
      description: "Para revisão",
      icon: FileText,
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    {
      title: "Acompanhar Pacientes",
      description: "Monitorar progresso e dados",
      action: () => navigate('/researcher/patients'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Cadastrar Paciente",
      description: "Adicionar novo participante",
      action: () => navigate('/researcher/register'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Gerar Relatórios",
      description: "Análises e estatísticas",
      action: () => navigate('/researcher/reports'),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  const recentActivity = [
    {
      type: "patient_progress",
      message: "João Silva avançou para etapa 3",
      time: "2 horas atrás",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      type: "new_patient",
      message: "Maria Santos foi cadastrada no estudo",
      time: "4 horas atrás",
      icon: Users,
      color: "text-blue-600"
    },
    {
      type: "consultation",
      message: "Consulta com Pedro Costa concluída",
      time: "6 horas atrás",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  return (
    <Layout title="Painel do Pesquisador">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse rapidamente as principais funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.action}
                  className={`h-20 ${action.color} text-white flex flex-col items-center justify-center space-y-1`}
                >
                  <span className="font-semibold">{action.title}</span>
                  <span className="text-xs opacity-90">{action.description}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Pacientes em Destaque</CardTitle>
              <CardDescription>
                Pacientes que necessitam atenção
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Ana Costa</p>
                      <p className="text-sm text-gray-600">Atraso na medicação</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Carlos Lima</p>
                      <p className="text-sm text-gray-600">Consulta amanhã</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Preparar
                    </Button>
                  </div>
                </div>
                
                <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Roberto Silva</p>
                      <p className="text-sm text-gray-600">Excelente progresso</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Relatório
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ResearcherDashboard;
