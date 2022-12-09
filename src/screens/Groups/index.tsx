import Button from "@components/Button";
import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import ListEmpty from "@components/ListEmpty";
import Loading from "@components/Loading";
import { useFocusEffect } from "@react-navigation/native";
import { GroupGetAll } from "@storage/group/groupGetAll";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Container } from "./styles";

export default function Groups({navigation}: any){
  const [isLoading,setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  function handleNewGroup(){
    navigation.navigate("new")
  }

  async function fetchGroups(){
    try{
      setIsLoading(true)
      const data = await GroupGetAll()
      setGroups(data)
    }catch(error){
      console.log(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')
    }finally{
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('Players', {group})
  }

useFocusEffect(useCallback(() => {
  fetchGroups()
},[]))

  return(
    <Container>
      <Header />
      <Highlight subtitle="jogue com a sua turma" title="Turmas" />
      {isLoading ? <Loading/>: 
      <FlatList
      data={groups}
      renderItem={({item}) => <GroupCard  onPress={() => handleOpenGroup(item)} title={item}/>}
      keyExtractor={item => item}
      ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?"/>}
      contentContainerStyle={groups.length === 0 && { flex: 1}} //se não tiver nenhum grupo na lista a empty list ocupa todo o espaço
      />
    }
      <Button 
      title="Criar nova turma"
      onPress={handleNewGroup}
      />
      
    </Container>
  )
}