
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pill, Clock, Calendar, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  instructions: string;
  status: 'active' | 'completed' | 'paused';
  nextDose?: string;
  taken: boolean;
}

const Medications: React.FC = () => {
  const navigate = useNavigate();
  
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Losartana',
      dosage: '50mg',
      frequency: '1x ao dia',
      startDate: '2023-11-15',
      instructions: 'Tomar pela manhã, em jejum',
      status: 'active',
      nextDose: '08:00',
      taken: true
    },
    {
      id: '2',
      name: 'Sinvastatina',
      dosage: '20mg',
      frequency: '1x ao dia',
      startDate: '2023-11-15',
      instructions: 'Tomar à noite, após o jantar',
      status: 'active',
      nextDose: '20:00',
      taken: false
    },
    {
      id: '3',
      name: 'Ácido Acetilsalicílico',
      dosage: '100mg',
      frequency: '1x ao dia',
      startDate: '2023-11-15',
      instructions: 'Tomar após o almoço',
      status: 'active',
      nextDose: '14:00',
      taken: true
    },
    {
      id: '4',
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: 'Se necessário',
      startDate: '2023-12-01',
      endDate: '2023-12-15',
      instructions: 'Para dor ou febre, máximo 4x ao dia',
      status: 'completed',
      taken: false
    }
  ]);

  const markAsTaken = (medicationId: string) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === medicationId
          ? { ...med, taken: true }
          : med
      )
    );
    
    toast({
      title: "Medicamento registrado!",
      description: "Dose marcada como tomada com sucesso."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
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
        return 'Finalizado';
      case 'paused':
        return 'Pausado';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const activeMedications = medications.filter(med => med.status === 'active');
  const completedMedications = medications.filter(med => med.status === 'completed');

  return (
    <Layout title="Meus Medicamentos">
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
          
          <Button className="bg-green-600 hover:bg-green-700">
            Adicionar Medicamento
          </Button>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Medicamentos Ativos</p>
                  <p className="text-2xl font-bold text-green-600">{activeMedications.length}</p>
                </div>
                <Pill className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tomados Hoje</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {activeMedications.filter(med => med.taken).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {activeMedications.filter(med => !med.taken).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medicamentos Ativos */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-green-600" />
              <span>Medicamentos Ativos</span>
            </CardTitle>
            <CardDescription>
              Seus medicamentos em uso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeMedications.map((medication) => (
                <div
                  key={medication.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    medication.taken 
                      ? 'border-green-200 bg-green-50/50' 
                      : 'border-orange-200 bg-orange-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center space-x-4">
                        <h3 className="font-semibold text-gray-900">
                          {medication.name} {medication.dosage}
                        </h3>
                        <Badge className={getStatusColor(medication.status)}>
                          {getStatusText(medication.status)}
                        </Badge>
                        {medication.taken ? (
                          <Badge className="bg-green-100 text-green-800">
                            Tomado hoje
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-100 text-orange-800">
                            Pendente
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{medication.frequency}</span>
                          {medication.nextDose && (
                            <span className="text-blue-600">({medication.nextDose})</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Desde {formatDate(medication.startDate)}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 italic">{medication.instructions}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {medication.taken ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : (
                        <Button
                          onClick={() => markAsTaken(medication.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Marcar como Tomado
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Histórico */}
        {completedMedications.length > 0 && (
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Medicamentos Finalizados</CardTitle>
              <CardDescription>
                Histórico de medicamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedMedications.map((medication) => (
                  <div
                    key={medication.id}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-gray-900">
                            {medication.name} {medication.dosage}
                          </h3>
                          <Badge className={getStatusColor(medication.status)}>
                            {getStatusText(medication.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{medication.frequency}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(medication.startDate)} - {medication.endDate && formatDate(medication.endDate)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 italic">{medication.instructions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Medications;
