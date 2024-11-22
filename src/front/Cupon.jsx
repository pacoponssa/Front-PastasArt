import { useState } from "react";
import axios from "axios";

function Cupon({ setDescuentoGlobal }) {
  const [codigoCupon, setCodigoCupon] = useState("");
  const [mensajeCupon, setMensajeCupon] = useState("");

  const aplicarCupon = () => {
    axios
      .get(`/cupon?codigo=${codigoCupon}`) 
      .then((respuesta) => {
        if (respuesta.data.ok && respuesta.data.data) {
          const { descuento } = respuesta.data.data; // obtengo descuento
          console.log("**cupon**"+ respuesta);
          console.log("**descuento**"+ {descuento})
          setDescuentoGlobal(descuento); // paso el descuento al home
          setMensajeCupon(`Código aplicado: ${descuento}% de descuento`);
        } else {
            console.log("**cuponError**"+ respuesta);
          setDescuentoGlobal(0);
          setMensajeCupon("Código no válido");
        }
      })
      .catch(() => {
        setDescuentoGlobal(0);
        setMensajeCupon("Error al validar el código de cupón");
        console.log("**Error cupon**");
      });
  };

  return (
    <div className="p-4 border rounded shadow-md bg-gray-100">
      <h2 className="mb-3 text-xl font-bold text-center">Aplicar Cupón</h2>
      <div className="flex items-center">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded"
          placeholder="Ingresa tu código"
          value={codigoCupon}
          onChange={(e) => setCodigoCupon(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={aplicarCupon}
        >
          Aplicar
        </button>
      </div>
      {mensajeCupon && <p className="mt-2 text-center text-red-500">{mensajeCupon}</p>}
    </div>
  );
}

export default Cupon;
