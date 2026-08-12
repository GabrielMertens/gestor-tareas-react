import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Tarea {
  id: string;
  texto: string;
  completada: boolean;
}

type Filtro = "todas" | "pendientes" | "completadas";

interface BotonModoOscuroProps {
  modoOscuro: boolean;
  onToggle: () => void;
}

function BotonModoOscuro({ modoOscuro, onToggle }: BotonModoOscuroProps) {
  return (
    <button
      onClick={onToggle}
      className="px-3.5 py-2 rounded-md border border-gray-300 bg-white text-sm cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
    >
      {modoOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro"}
    </button>
  );
}

function cargarTareasIniciales(): Tarea[] {
  const guardado = localStorage.getItem("tareas");
  return guardado ? (JSON.parse(guardado) as Tarea[]) : [];
}

function cargarModoOscuroInicial(): boolean {
  return localStorage.getItem("modoOscuro") === "true";
}

const FILTROS: { valor: Filtro; etiqueta: string }[] = [
  { valor: "todas", etiqueta: "Todas" },
  { valor: "pendientes", etiqueta: "Pendientes" },
  { valor: "completadas", etiqueta: "Completadas" },
];

function App() {
  const [tareas, setTareas] = useState<Tarea[]>(cargarTareasIniciales);
  const [textoInput, setTextoInput] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [modoOscuro, setModoOscuro] = useState<boolean>(cargarModoOscuroInicial);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    document.body.classList.toggle("oscuro", modoOscuro);
    localStorage.setItem("modoOscuro", String(modoOscuro));
  }, [modoOscuro]);

  function toggleModoOscuro() {
    setModoOscuro(!modoOscuro);
  }

  function agregarTarea(event: React.FormEvent) {
    event.preventDefault();

    const texto = textoInput.trim();
    if (!texto) return;

    const nuevaTarea: Tarea = {
      id: crypto.randomUUID(),
      texto,
      completada: false,
    };

    setTareas([...tareas, nuevaTarea]);
    setTextoInput("");
  }

  function toggleTarea(id: string) {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  }

  function eliminarTarea(id: string) {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  }

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === "pendientes") return !tarea.completada;
    if (filtro === "completadas") return tarea.completada;
    return true;
  });

  const pendientes = tareas.filter((tarea) => !tarea.completada).length;

  return (
    <div className="min-h-screen flex justify-center px-4 py-10 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full max-w-[480px]">
        <header className="flex justify-between items-start mb-5">
          <div>
            <h1 className="text-2xl font-bold m-0">Gestor de Tareas</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 m-0">
              {pendientes} pendientes
            </p>
          </div>
          <div className="flex gap-2">
            <BotonModoOscuro modoOscuro={modoOscuro} onToggle={toggleModoOscuro} />
            <Link
              to="/estadisticas"
              className="px-3.5 py-2 rounded-md border border-gray-300 bg-white text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            >
              📊 Ver estadísticas
            </Link>
          </div>
        </header>

        <form onSubmit={agregarTarea} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="¿Qué necesitás hacer?"
            value={textoInput}
            onChange={(event) => setTextoInput(event.target.value)}
            className="flex-1 px-3 py-2.5 rounded-md border border-gray-300 text-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-md bg-blue-700 text-white font-semibold cursor-pointer hover:bg-blue-800"
          >
            Agregar
          </button>
        </form>

        <div className="flex gap-2 mb-4">
          {FILTROS.map(({ valor, etiqueta }) => (
            <button
              key={valor}
              onClick={() => setFiltro(valor)}
              className={
                filtro === valor
                  ? "px-3 py-1.5 rounded-full text-sm bg-blue-700 text-white"
                  : "px-3 py-1.5 rounded-full text-sm border border-gray-300 bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              }
            >
              {etiqueta}
            </button>
          ))}
        </div>

        <ul className="flex flex-col gap-2">
          {tareasFiltradas.map((tarea) => (
            <li
              key={tarea.id}
              className="flex items-center gap-2.5 bg-white rounded-lg p-3 shadow-sm dark:bg-gray-800 dark:border dark:border-gray-700 dark:shadow-none"
            >
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => toggleTarea(tarea.id)}
              />
              <span
                className={
                  tarea.completada
                    ? "flex-1 line-through text-gray-400 dark:text-gray-500"
                    : "flex-1"
                }
              >
                {tarea.texto}
              </span>
              <button
                onClick={() => eliminarTarea(tarea.id)}
                className="border-none bg-transparent text-red-600 cursor-pointer text-lg leading-none"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {tareas.length === 0 && (
          <p className="text-center text-gray-400 mt-6">
            No hay tareas todavía. ¡Agregá la primera!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;