import "./App.css";
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
    <button className="boton-modo" onClick={onToggle}>
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

function App() {
  const [tareas, setTareas] = useState<Tarea[]>(cargarTareasIniciales);
  const [textoInput, setTextoInput] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [modoOscuro, setModoOscuro] = useState<boolean>(cargarModoOscuroInicial);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  // Sincroniza la clase "oscuro" en <body> y guarda la preferencia
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
    <div className="app">
      <header>
        <div>
          <h1>Gestor de Tareas</h1>
          <p className="contador">{pendientes} pendientes</p>
        </div>
        <BotonModoOscuro modoOscuro={modoOscuro} onToggle={toggleModoOscuro} />
        <Link to="/estadisticas">📊 Ver estadísticas</Link>
      </header>

      <form className="form-tarea" onSubmit={agregarTarea}>
        <input
          type="text"
          placeholder="¿Qué necesitás hacer?"
          value={textoInput}
          onChange={(event) => setTextoInput(event.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <div className="filtros">
        <button
          className={filtro === "todas" ? "filtro activo" : "filtro"}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>
        <button
          className={filtro === "pendientes" ? "filtro activo" : "filtro"}
          onClick={() => setFiltro("pendientes")}
        >
          Pendientes
        </button>
        <button
          className={filtro === "completadas" ? "filtro activo" : "filtro"}
          onClick={() => setFiltro("completadas")}
        >
          Completadas
        </button>
      </div>

      <ul className="lista-tareas">
        {tareasFiltradas.map((tarea) => (
          <li
            key={tarea.id}
            className={tarea.completada ? "tarea completada" : "tarea"}
          >
            <input
              type="checkbox"
              checked={tarea.completada}
              onChange={() => toggleTarea(tarea.id)}
            />
            <span>{tarea.texto}</span>
            <button className="eliminar" onClick={() => eliminarTarea(tarea.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {tareas.length === 0 && (
        <p className="mensaje-vacio">No hay tareas todavía. ¡Agregá la primera!</p>
      )}
    </div>
  );
}

export default App;