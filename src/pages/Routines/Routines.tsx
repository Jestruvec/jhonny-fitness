import { useState } from "react";
import { CustomButton, RoutinesTable, RoutineForm } from "@/components";
import { Routine } from "@/types";

export const Routines = () => {
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false);
  const [routineToEdit, setRoutineToEdit] = useState<Routine | null>(null);

  let content: React.ReactNode; // Tipo React.ReactNode para contenido más flexible

  const toggleIsCreatingRoutine = () => {
    setIsCreatingRoutine((oldValue) => !oldValue);
  };

  const editRoutine = (routine: Routine) => {
    setRoutineToEdit(routine);
    toggleIsCreatingRoutine();
    console.log("tuki");
  };

  if (isCreatingRoutine) {
    content = (
      <RoutineForm
        onRoutineSet={toggleIsCreatingRoutine}
        routineToEdit={routineToEdit}
      />
    );
  } else {
    content = <RoutinesTable onRowClick={() => editRoutine} />;
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2">
        <CustomButton
          label={isCreatingRoutine ? "Regresar" : "Crear rutina"}
          onClick={toggleIsCreatingRoutine}
        />

        {isCreatingRoutine ? (
          <h1 className="text-2xl font-bold">Nueva rutina</h1>
        ) : (
          <></>
        )}
      </div>

      {content}
    </div>
  );
};
