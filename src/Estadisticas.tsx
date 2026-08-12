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
    <div className="min-h-screen flex justify-center px-4 py-10 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-[480px]">
        <header className="mb-5">
          <h1 className="text-2xl font-bold m-0">Estadísticas</h1>
        </header>

        <ul className="flex flex-col gap-2">
          <li className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm dark:bg-gray-800 dark:border dark:border-gray-700 dark:shadow-none">
            <span>Total de tareas</span>
            <strong>{tareas.length}</strong>
          </li>
          <li className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm dark:bg-gray-800 dark:border dark:border-gray-700 dark:shadow-none">
            <span>Completadas</span>
            <strong>{completadas}</strong>
          </li>
          <li className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm dark:bg-gray-800 dark:border dark:border-gray-700 dark:shadow-none">
            <span>Pendientes</span>
            <strong>{pendientes}</strong>
          </li>
        </ul>

        <p className="mt-5">
          <Link to="/" className="text-blue-700 dark:text-blue-400 underline">
            ← Volver al Gestor de Tareas
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Estadisticas;
