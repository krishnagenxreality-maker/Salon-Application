
import React, { useState, useCallback } from 'react';
import { Screen, Technique } from './types';
import HomeScreen from './screens/HomeScreen';
import TechniqueOverviewScreen from './screens/TechniqueOverviewScreen';
import TrainingScreen from './screens/TrainingScreen';
import CompletionScreen from './screens/CompletionScreen';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>(Screen.HOME);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);

  const handleSelectTechnique = useCallback((technique: Technique) => {
    setSelectedTechnique(technique);
    setScreen(Screen.OVERVIEW);
  }, []);

  const handleStartTraining = useCallback(() => {
    if (selectedTechnique) {
      setScreen(Screen.TRAINING);
    }
  }, [selectedTechnique]);
  
  const handleCompleteTraining = useCallback(() => {
    if(selectedTechnique){
        setScreen(Screen.COMPLETION);
    }
  }, [selectedTechnique]);

  const handleRestart = useCallback(() => {
     if(selectedTechnique){
        setScreen(Screen.TRAINING);
     }
  }, [selectedTechnique]);

  const handleBackToLibrary = useCallback(() => {
    setSelectedTechnique(null);
    setScreen(Screen.HOME);
  }, []);
  
  const renderScreen = () => {
    switch (screen) {
      case Screen.HOME:
        return <HomeScreen onSelectTechnique={handleSelectTechnique} />;
      case Screen.OVERVIEW:
        if (!selectedTechnique) return <HomeScreen onSelectTechnique={handleSelectTechnique} />;
        return <TechniqueOverviewScreen technique={selectedTechnique} onStart={handleStartTraining} onBack={handleBackToLibrary} />;
      case Screen.TRAINING:
        if (!selectedTechnique) return <HomeScreen onSelectTechnique={handleSelectTechnique} />;
        return <TrainingScreen technique={selectedTechnique} onComplete={handleCompleteTraining} onBack={handleBackToLibrary} />;
      case Screen.COMPLETION:
        if (!selectedTechnique) return <HomeScreen onSelectTechnique={handleSelectTechnique} />;
        return <CompletionScreen onRestart={handleRestart} onBackToLibrary={handleBackToLibrary} />;
      default:
        return <HomeScreen onSelectTechnique={handleSelectTechnique} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 text-gray-800 antialiased">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
