
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import PatientDashboard from "./components/patient/PatientDashboard";
import Consultations from "./components/patient/Consultations";
import Medications from "./components/patient/Medications";
import CurrentStage from "./components/patient/CurrentStage";
import ResearcherDashboard from "./components/researcher/ResearcherDashboard";
import PatientsMonitoring from "./components/researcher/PatientsMonitoring";
import RegisterPatient from "./components/researcher/RegisterPatient";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedUserType }: { children: React.ReactNode, allowedUserType?: 'patient' | 'researcher' }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedUserType && user?.type !== allowedUserType) {
    return <Navigate to={user?.type === 'patient' ? '/patient' : '/researcher'} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return (
    <Routes>
      {/* Root redirect based on user type */}
      <Route 
        path="/" 
        element={
          <Navigate 
            to={user?.type === 'patient' ? '/patient' : '/researcher'} 
            replace 
          />
        } 
      />
      
      {/* Patient routes */}
      <Route 
        path="/patient" 
        element={
          <ProtectedRoute allowedUserType="patient">
            <PatientDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/patient/consultations" 
        element={
          <ProtectedRoute allowedUserType="patient">
            <Consultations />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/patient/medications" 
        element={
          <ProtectedRoute allowedUserType="patient">
            <Medications />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/patient/current-stage" 
        element={
          <ProtectedRoute allowedUserType="patient">
            <CurrentStage />
          </ProtectedRoute>
        } 
      />
      
      {/* Researcher routes */}
      <Route 
        path="/researcher" 
        element={
          <ProtectedRoute allowedUserType="researcher">
            <ResearcherDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/researcher/patients" 
        element={
          <ProtectedRoute allowedUserType="researcher">
            <PatientsMonitoring />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/researcher/register" 
        element={
          <ProtectedRoute allowedUserType="researcher">
            <RegisterPatient />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
