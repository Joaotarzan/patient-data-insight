
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Pill, TrendingUp, Clock, Heart, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const healthMetrics = [
    {
      title: "Próxima Consulta",
      value: "15 Jan",
      subtitle: "Dr. Maria Santos - Cardiologista",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      title: "Medicamentos Ativos",
      value: "3",
      subtitle: "2 tomados hoje",
      icon: Pill,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700"
    },
    {
      title: "Progresso do Estudo",
      value: "75%",
      subtitle: "Etapa 3 de 4",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    {
      title: "Última Atualização",
      value: "Hoje",
      subtitle: "10:30 - Dados sincronizados",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    }
  ];

  const quickActions = [
    {
      title: "Minhas Consultas",
      description: "Histórico e próximas consultas cardíacas",
      action: () => navigate('/patient/consultations'),
      gradient: "from-blue-500 to-indigo-600",
      icon: Calendar
    },
    {
      title: "Medicamentos",
      description: "Controle de medicação cardiovascular",
      action: () => navigate('/patient/medications'),
      gradient: "from-emerald-500 to-teal-600",
      icon: Pill
    },
    {
      title: "Etapa Atual",
      description: "Progresso do estudo cardíaco",
      action: () => navigate('/patient/current-stage'),
      gradient: "from-purple-500 to-violet-600",
      icon: Heart
    }
  ];

  const recentActivities = [
    {
      type: "appointment",
      title: "Consulta agendada com sucesso",
      description: "15 de Janeiro às 14:00 - Dr. Maria Santos",
      time: "2 horas atrás",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      type: "medication",
      title: "Medicamento tomado",
      description: "Carvedilol 6.25mg - Dose matinal",
      time: "Hoje às 08:00",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      type: "progress",
      title: "Progresso atualizado",
      description: "Avançou para etapa 3 do estudo cardíaco",
      time: "Ontem às 16:30",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      type: "alert",
      title: "Lembrete de medicação",
      description: "Losartana 50mg - Dose vespertina em 2h",
      time: "Programado",
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <Layout title="Painel do Paciente">
      <div className="space-y-8">
        {/* Cartão de Boas-vindas */}
        <Card className="border-0 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Bem-vindo ao VivaCore!</h3>
                <p className="text-red-100">
                  Acompanhe seu progresso no estudo cardiovascular e mantenha sua saúde em dia.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Heart className="h-16 w-16 text-red-200 animate-pulse" />
                <Activity className="h-12 w-12 text-red-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas de Saúde */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthMetrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                    <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
                    <p className="text-sm text-slate-500">{metric.subtitle}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl ${metric.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <metric.icon className={`h-7 w-7 ${metric.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progresso do Estudo */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <span>Progresso do Estudo Cardíaco</span>
            </CardTitle>
            <CardDescription>
              Você está na Etapa 3 de 4 do estudo de pesquisa cardiovascular
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">Progresso Geral</span>
                <span className="text-purple-600 font-bold">75%</span>
              </div>
              <Progress value={75} className="h-3 bg-purple-100" />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {['Triagem', 'Baseline', 'Tratamento', 'Follow-up'].map((stage, index) => (
                <div key={stage} className="text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                    index < 3 ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                  <p className={`text-xs ${index < 3 ? 'text-purple-600 font-medium' : 'text-slate-500'}`}>
                    {stage}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse rapidamente as principais funcionalidades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.action}
                  className={`h-24 bg-gradient-to-br ${action.gradient} hover:scale-105 transition-all duration-300 text-white border-0 shadow-lg hover:shadow-xl flex flex-col items-center justify-center space-y-2 group`}
                >
                  <action.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-center">
                    <span className="font-semibold block">{action.title}</span>
                    <span className="text-xs opacity-90 block">{action.description}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividade Recente */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <Activity className="h-5 w-5 text-slate-600" />
              </div>
              <span>Atividade Recente</span>
            </CardTitle>
            <CardDescription>
              Acompanhe suas últimas interações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 ${activity.bgColor} rounded-xl hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center`}>
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-slate-900">{activity.title}</p>
                    <p className="text-sm text-slate-600">{activity.description}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
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

export default PatientDashboard;
