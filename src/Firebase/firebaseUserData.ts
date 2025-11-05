import { UserPreferences } from "@/Types/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const saveUserPreferences = async (uid: string, preferences: UserPreferences) => {
  try {
    await setDoc(doc(db, "users", uid), { preferences }, { merge: true });
    console.log("Preferencias guardadas correctamente", preferences);
  } catch (error) {
    console.error("Error guardando preferencias:", error);
  }
};

export const loadUserPreferences = async (uid: string): Promise<UserPreferences | null> => {
  try {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
      console.log(docSnap.data().preferences);
      return docSnap.data().preferences as UserPreferences;
    }
    return null;
  } catch (error) {
    console.error("Error cargando preferencias:", error);
    return null;
  }
};