import { useState, useCallback } from "react";
import { UserRoutine } from "@/types";
import { supabase } from "@/utils";

export const useUserRoutinesCrud = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRoutine, setUserRoutine] = useState<UserRoutine | null>(null);
  const [userRoutines, setUserRoutines] = useState<UserRoutine[]>([]);

  const fetchUserRoutines = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: routines, error } = await supabase.from("user_routines")
        .select(`
            *,
            routines (
              routine_exercises (
                *,
                exercises(
                  *
                )
              )
            )`);

      if (error) {
        throw error;
      }

      setUserRoutines(routines);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserRoutineById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data: routine, error } = await supabase
        .from("routines")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setUserRoutine(routine);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PostUserRoutine = async (userRoutineData: UserRoutine) => {
    setLoading(true);
    setError(null);

    try {
      const { data: userRoutine, error } = await supabase
        .from("routines")
        .insert([userRoutineData])
        .select();

      if (error) {
        throw error;
      }

      setUserRoutine(userRoutine[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const PutUserRoutine = async (id: string, userRoutineData: UserRoutine) => {
    setLoading(true);
    setError(null);

    try {
      const { data: userRoutine, error } = await supabase
        .from("routines")
        .update(userRoutineData)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      setUserRoutines(userRoutine[0]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const DeleteUserRoutine = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("routines").delete().eq("id", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    userRoutine,
    userRoutines,
    fetchUserRoutines,
    fetchUserRoutineById,
    PostUserRoutine,
    PutUserRoutine,
    DeleteUserRoutine,
  };
};
