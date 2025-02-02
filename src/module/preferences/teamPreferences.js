import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import teamStyles from './styles/teamPreferenceStyle';
import { getTeams } from '../../services/config/auth';
import { updatePreferences } from '../../services/config/auth';
import { useAuth } from "../../Context/AuthContext";

const SelectTeamsScreen = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [numColumns, setNumColumns] = useState(3); // Estado para numColumns
  const navigation = useNavigation(); 
  const { user } = useAuth();

  useEffect(() => {
    getTeams(setTeams, setLoading);  
  }, []);  

  // Función para manejar la selección de equipos
  const handleSelectTeam = (id) => {
    setSelectedTeams((prevSelectedTeams) => {
      if (prevSelectedTeams.includes(id)) {
        return prevSelectedTeams.filter((teamId) => teamId !== id);
      } else {
        return [...prevSelectedTeams, id];
      }
    });
  };
    
  // Funcion para seleccionar todos los Equipos
  const handleSelectAll = () => {
    if (selectedTeams.length === teams.length) {
        setSelectedTeams([]);
    } else {
        const allTeamIds = teams.map((team) => team.id);
        setSelectedTeams(allTeamIds);
    }
  };
  // Funcion para guardar el equipo en las preferencias (favoritos)
  const handleSaveTeams = async () => {
    if (!user || !user.id) {
        console.error("No se encontró el ID del usuario.");
        return;
    }

    // Obtener solo los nombres de los equipos seleccionados
    const selectedTeamNames = teams
        .filter(team => selectedTeams.includes(team.id))
        .map(team => team.name); 

    const preferencesData = {
        userId: user.id, 
        teams: selectedTeamNames, 
        players: ['Random'], 
        playTypes: ['Juegos'],
    };

    try {
        await updatePreferences(preferencesData); 
        console.log("Preferencias guardadas:", preferencesData);
        navigation.navigate("TabNavigator", { refresh: true }); 
    } catch (error) {
        console.error("Error al guardar preferencias:", error);
    }
};

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={teamStyles.container}>
        <Text style={teamStyles.title}>Selecciona tu equipo favorito:</Text>
        <TouchableOpacity
                style={teamStyles.selectAllButton} 
                onPress={handleSelectAll}
            >
                <Text style={teamStyles.selectAllButtonText}>
                    {selectedTeams.length === teams.length ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
                </Text>
            </TouchableOpacity>

        <FlatList
            data={teams}
            key={numColumns.toString()} 
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                        teamStyles.teamItem,
                        selectedTeams.includes(item.id) && teamStyles.selectedTeam,
                    ]}
                    onPress={() => handleSelectTeam(item.id)}
                >
                    <Text style={teamStyles.teamName}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />

        <TouchableOpacity
            style={teamStyles.saveButton}
            onPress={handleSaveTeams}
        >
            <Text style={teamStyles.saveButtonText}>Guardar Equipos</Text>
        </TouchableOpacity>
    </View>
);
};

export default SelectTeamsScreen;
