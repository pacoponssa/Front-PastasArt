import { useState } from "react";

const Disponibles = () => {
  const [verDisponibles, setVerDisponibles] = useState(false);

  return (
    <div>
      <div>
        <button
          onClick={() => setVerDisponibles(!verDisponibles)}
          className="p-2 text-white bg-green-400 rounded-md hover:bg-green-500"
        >
          {verDisponibles ? "Mostrar no disponibles" : "Mostrar disponibles"}
        </button>
      </div>
    </div>
  );
};

export default Disponibles;
