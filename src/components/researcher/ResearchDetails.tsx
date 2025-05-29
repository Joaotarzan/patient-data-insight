
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit3, Save, X, Heart, Calendar, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  description: string;
}

const ResearchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [originalDescription, setOriginalDescription] = useState('');

  // Dados estáticos das pesquisas
  const researchData: Research[] = [
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
      riskLevel: 'low',
      description: 'Este estudo clínico investiga os efeitos de novos tratamentos para hipertensão arterial em pacientes com idade entre 40 e 70 anos. O protocolo inclui monitoramento cardíaco contínuo, análise de biomarcadores e avaliação da qualidade de vida. Os resultados preliminares mostram uma redução significativa na pressão arterial sistólica e diastólica, com mínimos efeitos colaterais relatados. A pesquisa está em sua terceira fase, com previsão de conclusão em fevereiro de 2024.'
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
      riskLevel: 'medium',
      description: 'Estudo longitudinal focado no acompanhamento de crianças e adolescentes com cardiopatias congênitas. O objetivo é compreender melhor a evolução natural dessas condições e identificar fatores preditivos de complicações. Inclui ecocardiograma seriado, ressonância magnética cardíaca e testes de função pulmonar. Os dados coletados contribuirão para o desenvolvimento de protocolos de seguimento mais eficazes.'
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
      riskLevel: 'low',
      description: 'Ensaio clínico randomizado avaliando a eficácia de uma nova terapia combinada para insuficiência cardíaca com fração de ejeção reduzida. O estudo incluiu 200 pacientes acompanhados por 12 meses, com desfechos primários de hospitalização cardiovascular e mortalidade. Os resultados finais demonstraram uma redução de 30% nas hospitalizações e melhoria significativa na capacidade funcional dos pacientes.'
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
      riskLevel: 'high',
      description: 'Estudo piloto investigando o uso de dispositivos vestíveis para detecção precoce de arritmias cardíacas em pacientes de alto risco. Utiliza tecnologia de inteligência artificial para análise em tempo real de sinais de ECG. A fase inicial foca na validação da precisão diagnóstica comparada ao Holter tradicional. Resultados preliminares mostram sensibilidade de 94% para detecção de fibrilação atrial.'
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
      riskLevel: 'high',
      description: 'Pesquisa observacional de longo prazo examining a relação entre diabetes tipo 2 e desenvolvimento de doença cardiovascular. O estudo acompanha uma coorte de 500 pacientes diabéticos por 5 anos, coletando dados sobre controle glicêmico, fatores de risco cardiovascular e desfechos clínicos. Atualmente pausado para revisão do protocolo e adequação às novas diretrizes de pesquisa.'
    }
  ];

  const research = researchData.find(r => r.id === id);

  useEffect(() => {
    if (research) {
      setDescription(research.description);
      setOriginalDescription(research.description);
    }
  }, [research]);

  if (!research) {
    return (
      <Layout title="Pesquisa não encontrada">
        <div className="text-center py-12">
          <p className="text-gray-500">Pesquisa não encontrada.</p>
          <Button onClick={() => navigate('/researcher/patients')} className="mt-4">
            Voltar para Lista de Pesquisas
          </Button>
        </div>
      </Layout>
    );
  }

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setOriginalDescription(description);
    toast({
      title: "Descrição salva",
      description: "A descrição da pesquisa foi atualizada com sucesso.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDescription(originalDescription);
  };

  return (
    <Layout title="Detalhes da Pesquisa">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/researcher/patients')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para Lista</span>
          </Button>
          
          {!isEditing ? (
            <Button onClick={handleEdit} className="flex items-center space-x-2">
              <Edit3 className="h-4 w-4" />
              <span>Editar Descrição</span>
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Salvar</span>
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                <X className="h-4 w-4" />
                <span>Cancelar</span>
              </Button>
            </div>
          )}
        </div>

        {/* Cabeçalho da Pesquisa */}
        <Card className="border-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold">{research.name}</h1>
                  <Badge className={getStatusColor(research.status)}>
                    {getStatusText(research.status)}
                  </Badge>
                </div>
                <p className="text-slate-300 text-lg">{research.type}</p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span>Início: {formatDate(research.startDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span>Progresso: {research.progress}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span>Etapa: {research.currentStage}/4</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Heart className="h-8 w-8 text-red-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Detalhadas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Última Atualização</p>
                <p className="text-2xl font-bold text-gray-900">{formatDate(research.lastUpdate)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Nível de Risco</p>
                <p className={`text-2xl font-bold capitalize ${
                  research.riskLevel === 'low' ? 'text-green-600' :
                  research.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {research.riskLevel === 'low' ? 'Baixo' : 
                   research.riskLevel === 'medium' ? 'Médio' : 'Alto'}
                </p>
              </div>
            </CardContent>
          </Card>

          {research.nextEvaluation && (
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Próxima Avaliação</p>
                  <p className="text-2xl font-bold text-blue-600">{formatDate(research.nextEvaluation)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Descrição da Pesquisa */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Descrição da Pesquisa</CardTitle>
            <CardDescription>
              {isEditing ? 'Edite a descrição da pesquisa abaixo' : 'Detalhes completos sobre o estudo e seus objetivos'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[200px] text-base leading-relaxed"
                placeholder="Descreva os detalhes da pesquisa..."
              />
            ) : (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-base">{description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ResearchDetails;
