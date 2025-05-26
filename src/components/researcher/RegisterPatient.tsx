
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserPlus, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface PatientForm {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  address: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
  emergencyContact: string;
  emergencyPhone: string;
  consentSigned: boolean;
}

const RegisterPatient: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PatientForm>({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    emergencyContact: '',
    emergencyPhone: '',
    consentSigned: false
  });

  const handleInputChange = (field: keyof PatientForm, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.age) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.consentSigned) {
      toast({
        title: "Consentimento necessário",
        description: "O termo de consentimento deve ser assinado.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      console.log('Registering patient:', formData);
      
      // Mock successful registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Paciente cadastrado com sucesso!",
        description: `${formData.name} foi adicionado ao estudo.`
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        address: '',
        medicalHistory: '',
        allergies: '',
        currentMedications: '',
        emergencyContact: '',
        emergencyPhone: '',
        consentSigned: false
      });
      
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao cadastrar o paciente. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Cadastrar Paciente">
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5 text-blue-600" />
                <span>Informações Pessoais</span>
              </CardTitle>
              <CardDescription>
                Dados básicos do paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nome completo do paciente"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Idade *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Idade"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                      <SelectItem value="not_informed">Não informado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Endereço completo"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Informações Médicas</CardTitle>
              <CardDescription>
                Histórico médico e medicações atuais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Histórico Médico</Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="Descreva o histórico médico relevante..."
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  placeholder="Liste alergias conhecidas..."
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentMedications">Medicações Atuais</Label>
                <Textarea
                  id="currentMedications"
                  placeholder="Liste medicações em uso..."
                  value={formData.currentMedications}
                  onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Contato de Emergência</CardTitle>
              <CardDescription>
                Informações para casos de emergência
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Nome do Contato</Label>
                  <Input
                    id="emergencyContact"
                    type="text"
                    placeholder="Nome completo"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Telefone de Emergência</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consent */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Termo de Consentimento</CardTitle>
              <CardDescription>
                Confirmação de participação no estudo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consentSigned}
                  onChange={(e) => handleInputChange('consentSigned', e.target.checked)}
                  className="mt-1"
                  required
                />
                <label htmlFor="consent" className="text-sm text-gray-600 leading-5">
                  Confirmo que o paciente leu, compreendeu e assinou o termo de consentimento 
                  livre e esclarecido para participação neste estudo de pesquisa. O paciente 
                  foi informado sobre os procedimentos, riscos, benefícios e direitos 
                  relacionados à sua participação.
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/researcher')}
              disabled={loading}
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                'Cadastrando...'
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Cadastrar Paciente
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPatient;
