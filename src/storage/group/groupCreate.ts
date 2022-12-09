import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { GroupGetAll } from "./groupGetAll";

export async function GroupCreate(newGroup: string){
  try{
    const storedGroups = await GroupGetAll();

    const groupAlreadyExists = storedGroups.includes(newGroup) //verificar se o novo grupo já existe

    if(groupAlreadyExists){
      throw new AppError('Já existe um grupo cadastrado com esse nome.')
    }

    const storage = JSON.stringify( [... storedGroups, newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  }catch(error){
    throw error;
  }
}