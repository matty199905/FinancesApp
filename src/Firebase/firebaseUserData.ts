import { Settings } from "@/Types/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const saveUserPreferences = async (uid: string, preferences: Settings) => {
  try {
    await setDoc(doc(db, "users", uid), { preferences }, { merge: true });
    console.log("Preferencias guardadas correctamente");
  } catch (error) {
    console.error("Error guardando preferencias:", error);
  }
};

export const loadUserPreferences = async (uid: string): Promise<Settings | null> => {
  try {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
      return docSnap.data().preferences as Settings;
    }
    return null;
  } catch (error) {
    console.error("Error cargando preferencias:", error);
    return null;
  }
};