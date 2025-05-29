import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, FileText, Calendar, Heart, Activity, AlertTriangle, BarChart3, UserCheck, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResearcherDashboard: React.FC = () => {
  const navigate = useNavigate();

  const researchMetrics = [
    {
      title: "Pesquisas Ativas",
      value: "24",
      subtitle: "+3 novas este mês",
      change: "+12.5%",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      title: "Taxa de Adesão",
      value: "87%",
      subtitle: "↗ +5% vs mês anterior",
      change: "+5.7%",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700"
    },
    {
      title: "Avaliações Hoje",
      value: "8",
      subtitle: "4 concluídas, 4 pendentes",
      change: "33%",
      icon: Calendar,
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    {
      title: "Relatórios Pendentes",
      value: "3",
      subtitle: "Para revisão e aprovação",
      change: "-25%",
      icon: FileText,
      gradient: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700"
    }
  ];

  const quickActions = [
    {
      title: "Acompanhar Pesquisas",
      description: "Monitorar progresso e dados cardiovasculares",
      action: () => navigate('/researcher/patients'),
      gradient: "from-blue-500 to-indigo-600",
      icon: Users
    },
    {
      title: "Cadastrar Pesquisa",
      description: "Adicionar novo estudo cardiovascular",
      action: () => navigate('/researcher/register'),
      gradient: "from-emerald-500 to-teal-600",
      icon: UserCheck
    }
  ];

  const recentActivity = [
    {
      type: "research_progress",
      research: "Estudo Hipertensão",
      message: "avançou para etapa 3 do protocolo",
      time: "2 horas atrás",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      type: "new_research",
      research: "Pesquisa Cardiopatia",
      message: "foi cadastrada no sistema",
      time: "4 horas atrás",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      type: "evaluation",
      research: "Estudo Arritmia",
      message: "avaliação cardiológica concluída",
      time: "6 horas atrás",
      icon: Stethoscope,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      type: "alert",
      research: "Pesquisa Diabetes Cardio",
      message: "apresentou alteração nos dados",
      time: "1 dia atrás",
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  const priorityResearch = [
    {
      name: "Estudo Cardiopatia Congênita",
      issue: "Atraso na coleta de dados",
      risk: "Médio",
      lastUpdate: "2 dias atrás",
      color: "border-amber-200 bg-amber-50"
    },
    {
      name: "Pesquisa Hipertensão Arterial", 
      issue: "Avaliação de follow-up amanhã",
      risk: "Baixo",
      lastUpdate: "Hoje",
      color: "border-blue-200 bg-blue-50"
    },
    {
      name: "Estudo Insuficiência Cardíaca",
      issue: "Excelente progresso no estudo",
      risk: "Baixo",
      lastUpdate: "1 hora atrás",
      color: "border-emerald-200 bg-emerald-50"
    }
  ];

  return (
    <Layout title="Painel do Pesquisador">
      <div className="space-y-8">
        {/* Cartão de Boas-vindas */}
        <Card className="border-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Painel de Pesquisa Cardiovascular</h3>
                <p className="text-slate-300">
                  Monitore o progresso das pesquisas e analise dados dos estudos em tempo real.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span>24 pesquisas ativas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-emerald-400" />
                    <span>87% de adesão</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas de Pesquisa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchMetrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        metric.change.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
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
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-slate-600" />
              </div>
              <span>Visão Geral dos Estudos</span>
            </CardTitle>
            <CardDescription>
              Distribuição de pesquisas por etapa do protocolo cardiovascular
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { stage: 'Planejamento', count: 6, total: 24, color: 'bg-blue-500' },
                { stage: 'Execução', count: 8, total: 24, color: 'bg-emerald-500' },
                { stage: 'Análise', count: 7, total: 24, color: 'bg-purple-500' },
                { stage: 'Finalização', count: 3, total: 24, color: 'bg-amber-500' }
              ].map((item, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600">{item.stage}</p>
                    <p className="text-2xl font-bold text-slate-900">{item.count}</p>
                  </div>
                  <div className="space-y-2">
                    <Progress value={(item.count / item.total) * 100} className="h-2" />
                    <p className="text-xs text-slate-500">{Math.round((item.count / item.total) * 100)}% do total</p>
                  </div>
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
              Acesse rapidamente as principais funcionalidades de pesquisa
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

        {/* Atividade Recente e Pesquisas Prioritárias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Atividade Recente */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Activity className="h-5 w-5 text-slate-600" />
                </div>
                <span>Atividade Recente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 p-4 ${activity.bgColor} rounded-xl hover:scale-[1.02] transition-transform duration-300`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-semibold text-slate-900">{activity.research}</span>
                        <span className="text-slate-600"> {activity.message}</span>
                      </p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pesquisas Prioritárias */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <span>Pesquisas em Destaque</span>
              </CardTitle>
              <CardDescription>
                Estudos que necessitam atenção especial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priorityResearch.map((research, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 rounded-xl ${research.color} hover:scale-[1.02] transition-transform duration-300`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <p className="font-semibold text-slate-900">{research.name}</p>
                        <p className="text-sm text-slate-600">{research.issue}</p>
                        <div className="flex items-center space-x-3 text-xs text-slate-500">
                          <span>Risco: {research.risk}</span>
                          <span>•</span>
                          <span>{research.lastUpdate}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="hover:bg-white">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ResearcherDashboard;
