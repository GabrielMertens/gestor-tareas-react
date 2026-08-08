import { Link } from "react-router-dom";

interface Tarea {
  id: string;
  texto: string;
  completada: boolean;
}

function cargarTareas(): Tarea[] {
  const guardado = localStorage.getItem("tareas");
  return guardado ? (JSON.parse(guardado) as Tarea[]) : [];
}

function Estadisticas() {
  const tareas = cargarTareas();
  const completadas = tareas.filter((tarea) => tarea.completada).length;
  const pendientes = tareas.length - completadas;

  return (
    <div className="app">
      <header>
        <h1>Estadísticas</h1>
      </header>

      <ul className="lista-tareas">
        <li className="tarea">
          <span>Total de tareas</span>
          <strong>{tareas.length}</strong>
        </li>
        <li className="tarea">
          <span>Completadas</span>
          <strong>{completadas}</strong>
        </li>
        <li className="tarea">
          <span>Pendientes</span>
          <strong>{pendientes}</strong>
        </li>
      </ul>

      <p style={{ marginTop: "20px" }}>
        <Link to="/">← Volver al Gestor de Tareas</Link>
      </p>
    </div>
  );
}

export default Estadisticas;
