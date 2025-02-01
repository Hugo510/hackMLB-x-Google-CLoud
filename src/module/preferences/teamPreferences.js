import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import teamStyles from './styles/teamPreferenceStyle';
import { getTeams } from '../../services/config/auth';

const SelectTeamsScreen = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [numColumns, setNumColumns] = useState(3); // Estado para numColumns

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
            onPress={() => {
                console.log('Equipos seleccionados:', selectedTeams);
            }}
        >
            <Text style={teamStyles.saveButtonText}>Guardar Equipos</Text>
        </TouchableOpacity>
    </View>
);
};

export default SelectTeamsScreen;
