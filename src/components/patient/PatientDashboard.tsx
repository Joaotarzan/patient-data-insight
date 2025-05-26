
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Pill, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Próxima Consulta",
      value: "15 Jan",
      description: "Dr. Maria Santos",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Medicamentos Ativos",
      value: "3",
      description: "2 tomados hoje",
      icon: Pill,
      color: "text-green-600"
    },
    {
      title: "Progresso",
      value: "75%",
      description: "Etapa 3 de 4",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Última Atualização",
      value: "Hoje",
      description: "10:30",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    {
      title: "Ver Consultas",
      description: "Histórico e próximas consultas",
      action: () => navigate('/patient/consultations'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Meus Medicamentos",
      description: "Controle de medicação",
      action: () => navigate('/patient/medications'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Etapa Atual",
      description: "Progresso do tratamento",
      action: () => navigate('/patient/current-stage'),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <Layout title="Painel do Paciente">
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
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Consulta agendada</p>
                  <p className="text-sm text-gray-600">15 de Janeiro às 14:00</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Pill className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Medicamento tomado</p>
                  <p className="text-sm text-gray-600">Paracetamol 500mg - Hoje às 08:00</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Progresso atualizado</p>
                  <p className="text-sm text-gray-600">Avançou para etapa 3 do tratamento</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
