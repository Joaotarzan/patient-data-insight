
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Consultation {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const Consultations: React.FC = () => {
  const navigate = useNavigate();
  
  const [consultations] = useState<Consultation[]>([
    {
      id: '1',
      date: '2024-01-15',
      time: '14:00',
      doctor: 'Dr. Maria Santos',
      specialty: 'Cardiologia',
      location: 'Consultório 205',
      status: 'scheduled',
      notes: 'Consulta de acompanhamento mensal'
    },
    {
      id: '2',
      date: '2023-12-20',
      time: '09:30',
      doctor: 'Dr. João Silva',
      specialty: 'Clínico Geral',
      location: 'Consultório 103',
      status: 'completed',
      notes: 'Consulta de rotina - exames solicitados'
    },
    {
      id: '3',
      date: '2023-11-15',
      time: '16:00',
      doctor: 'Dr. Maria Santos',
      specialty: 'Cardiologia',
      location: 'Consultório 205',
      status: 'completed',
      notes: 'Primeira consulta - início do tratamento'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Agendada';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Layout title="Minhas Consultas">
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
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            Agendar Nova Consulta
          </Button>
        </div>

        {/* Próximas Consultas */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Próximas Consultas</span>
            </CardTitle>
            <CardDescription>
              Suas consultas agendadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations
                .filter(c => c.status === 'scheduled')
                .map((consultation) => (
                  <div
                    key={consultation.id}
                    className="p-4 border border-blue-200 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-gray-900">
                            {formatDate(consultation.date)}
                          </h3>
                          <Badge className={getStatusColor(consultation.status)}>
                            {getStatusText(consultation.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{consultation.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{consultation.doctor}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{consultation.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                        {consultation.notes && (
                          <p className="text-sm text-gray-500 italic">{consultation.notes}</p>
                        )}
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Consultas */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Histórico de Consultas</CardTitle>
            <CardDescription>
              Suas consultas anteriores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations
                .filter(c => c.status === 'completed')
                .map((consultation) => (
                  <div
                    key={consultation.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-gray-900">
                            {formatDate(consultation.date)}
                          </h3>
                          <Badge className={getStatusColor(consultation.status)}>
                            {getStatusText(consultation.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{consultation.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{consultation.doctor}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{consultation.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                        {consultation.notes && (
                          <p className="text-sm text-gray-500 italic">{consultation.notes}</p>
                        )}
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Ver Relatório
                      </Button>
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

export default Consultations;
