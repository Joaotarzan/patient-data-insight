
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, FileText, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface ResearchForm {
  name: string;
  type: string;
  description: string;
  objectives: string;
  methodology: string;
  duration: string;
  targetPopulation: string;
  sampleSize: string;
  primaryEndpoint: string;
  secondaryEndpoints: string;
  inclusionCriteria: string;
  exclusionCriteria: string;
  ethicsApproval: boolean;
}

const RegisterPatient: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ResearchForm>({
    name: '',
    type: '',
    description: '',
    objectives: '',
    methodology: '',
    duration: '',
    targetPopulation: '',
    sampleSize: '',
    primaryEndpoint: '',
    secondaryEndpoints: '',
    inclusionCriteria: '',
    exclusionCriteria: '',
    ethicsApproval: false
  });

  const handleInputChange = (field: keyof ResearchForm, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.type || !formData.description || !formData.objectives) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.ethicsApproval) {
      toast({
        title: "Aprovação ética necessária",
        description: "A aprovação do comitê de ética deve ser confirmada.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      console.log('Registering research:', formData);
      
      // Mock successful registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Pesquisa cadastrada com sucesso!",
        description: `${formData.name} foi adicionada ao sistema.`
      });
      
      // Reset form
      setFormData({
        name: '',
        type: '',
        description: '',
        objectives: '',
        methodology: '',
        duration: '',
        targetPopulation: '',
        sampleSize: '',
        primaryEndpoint: '',
        secondaryEndpoints: '',
        inclusionCriteria: '',
        exclusionCriteria: '',
        ethicsApproval: false
      });
      
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao cadastrar a pesquisa. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Cadastrar Pesquisa">
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
          {/* Informações Básicas */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Informações Básicas</span>
              </CardTitle>
              <CardDescription>
                Dados principais da pesquisa cardiovascular
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Pesquisa *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ex: Estudo sobre Hipertensão Arterial"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Estudo *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clinical_trial">Ensaio Clínico</SelectItem>
                      <SelectItem value="observational">Estudo Observacional</SelectItem>
                      <SelectItem value="pilot_study">Estudo Piloto</SelectItem>
                      <SelectItem value="cohort_study">Estudo de Coorte</SelectItem>
                      <SelectItem value="case_control">Caso-Controle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva resumidamente a pesquisa..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objectives">Objetivos *</Label>
                <Textarea
                  id="objectives"
                  placeholder="Descreva os objetivos da pesquisa..."
                  value={formData.objectives}
                  onChange={(e) => handleInputChange('objectives', e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Metodologia */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Metodologia</CardTitle>
              <CardDescription>
                Detalhes metodológicos do estudo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="methodology">Metodologia</Label>
                <Textarea
                  id="methodology"
                  placeholder="Descreva a metodologia utilizada..."
                  value={formData.methodology}
                  onChange={(e) => handleInputChange('methodology', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duração</Label>
                  <Input
                    id="duration"
                    type="text"
                    placeholder="Ex: 12 meses"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetPopulation">População-Alvo</Label>
                  <Input
                    id="targetPopulation"
                    type="text"
                    placeholder="Ex: Adultos hipertensos"
                    value={formData.targetPopulation}
                    onChange={(e) => handleInputChange('targetPopulation', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sampleSize">Tamanho da Amostra</Label>
                  <Input
                    id="sampleSize"
                    type="number"
                    placeholder="Ex: 100"
                    value={formData.sampleSize}
                    onChange={(e) => handleInputChange('sampleSize', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endpoints */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Endpoints</CardTitle>
              <CardDescription>
                Desfechos primários e secundários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryEndpoint">Endpoint Primário</Label>
                <Textarea
                  id="primaryEndpoint"
                  placeholder="Descreva o desfecho primário..."
                  value={formData.primaryEndpoint}
                  onChange={(e) => handleInputChange('primaryEndpoint', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryEndpoints">Endpoints Secundários</Label>
                <Textarea
                  id="secondaryEndpoints"
                  placeholder="Descreva os desfechos secundários..."
                  value={formData.secondaryEndpoints}
                  onChange={(e) => handleInputChange('secondaryEndpoints', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Critérios */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Critérios de Elegibilidade</CardTitle>
              <CardDescription>
                Critérios de inclusão e exclusão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inclusionCriteria">Critérios de Inclusão</Label>
                <Textarea
                  id="inclusionCriteria"
                  placeholder="Liste os critérios de inclusão..."
                  value={formData.inclusionCriteria}
                  onChange={(e) => handleInputChange('inclusionCriteria', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exclusionCriteria">Critérios de Exclusão</Label>
                <Textarea
                  id="exclusionCriteria"
                  placeholder="Liste os critérios de exclusão..."
                  value={formData.exclusionCriteria}
                  onChange={(e) => handleInputChange('exclusionCriteria', e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Aprovação Ética */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Aprovação Ética</CardTitle>
              <CardDescription>
                Confirmação de aprovação pelo comitê de ética
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="ethics"
                  checked={formData.ethicsApproval}
                  onChange={(e) => handleInputChange('ethicsApproval', e.target.checked)}
                  className="mt-1"
                  required
                />
                <label htmlFor="ethics" className="text-sm text-gray-600 leading-5">
                  Confirmo que esta pesquisa foi aprovada pelo Comitê de Ética em Pesquisa (CEP) 
                  competente e que todos os procedimentos estão em conformidade com as diretrizes 
                  éticas para pesquisa envolvendo seres humanos estabelecidas pela Resolução 
                  CNS 466/2012 e suas complementares.
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
                  Cadastrar Pesquisa
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
