import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import TaskCard from "../components/TaskCard";
import XPLevelBar from "../components/XPLevelBar";
import GoalProgress from "../components/GoalProgress";
import Model from "../components/Model";

const initialTasks = [
  { id: "task1", title: "Read a chapter of a book", xp: 25, completed: false },
  { id: "task2", title: "Exercise for 30 minutes", xp: 50, completed: false },
  { id: "task3", title: "Meditate for 10 minutes", xp: 15, completed: false },
];

const goals = [
  { id: "goal1", title: "Improve Knowledge", importance: 8, progress: 0.45 },
  { id: "goal2", title: "Exercise Daily", importance: 5, progress: 0.7 },
  { id: "goal3", title: "Meditate", importance: 6, progress: 0.3 },
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const xpSum = tasks
      .filter((task) => task.completed)
      .reduce((acc, task) => acc + task.xp, 0);
    setTotalXP(xpSum);
  }, [tasks]);

  const toggleTask = (id, completed) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
    );
  };

  return (
    <>
      {/* Card container */}
      <div className="w-full max-w-7xl bg-gray-900 bg-opacity-95 rounded-3xl shadow-2xl m-20 p-10 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-white text-center tracking-wide drop-shadow-lg">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left panel: XP + 3D Avatar */}
          <section className="md:col-span-3 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 rounded-2xl p-8 shadow-lg flex flex-col items-center space-y-8 transform transition-transform hover:scale-[1.03] duration-300">

            {/* 3D Avatar Canvas */}
            <div className="w-40 h-40">
              <Canvas camera={{ position: [20, 1, 5], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} />
                <Suspense fallback={null}>
                  <Model url="/avatars/avatar1.glb" />
                </Suspense>
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>

            <XPLevelBar xp={totalXP} />
            <div className="text-center mt-2 text-white select-none">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight drop-shadow-sm">
                Level {Math.floor(totalXP / 300) + 1}
              </h2>
              <p className="text-gray-300 mt-1 text-sm sm:text-base">
                Total XP: {totalXP}
              </p>
            </div>
          </section>

          {/* Middle panel: Goals */}
          <section className="md:col-span-5 bg-gray-800 rounded-2xl p-8 shadow-lg space-y-8 transform transition-transform hover:scale-[1.02] duration-300">
            <h2 className="text-3xl font-semibold mb-6 text-white tracking-wide drop-shadow-md">
              Your Goals
            </h2>
            <div className="space-y-8">
              {goals.map((goal) => (
                <GoalProgress
                  key={goal.id}
                  title={goal.title}
                  importance={goal.importance}
                  progress={goal.progress}
                />
              ))}
            </div>
          </section>

          {/* Right panel: Tasks */}
          <section className="md:col-span-4 bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6 transform transition-transform hover:scale-[1.02] duration-300">
            <h2 className="text-3xl font-semibold mb-8 text-white tracking-wide drop-shadow-md">
              Tasks
            </h2>
            <div className="space-y-6">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={toggleTask} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
