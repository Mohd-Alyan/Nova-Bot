import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function NovaBots() {
  const [bots] = useState([
    {
      name: "Luna",
      description: "A friendly space explorer who loves telling stories about the stars.",
      avatar: "🌌",
    },
    {
      name: "James",
      description: "A helpful and knowledgeable teacher.",
      avatar: "📚",
    },
    {
      name: "Bella",
      description: "A playful and witty gamer who enjoys jokes and riddles.",
      avatar: "🎮",
    },
  ]);

  // --- Dev self-tests (run only in development) ---
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.assert(Array.isArray(bots), "bots should be an array");
      console.assert(bots.length > 0, "bots array should not be empty");
      bots.forEach((b, i) => {
        console.assert(
          typeof b.name === "string" && b.name.length > 0,
          `bot[${i}].name must be a non-empty string`
        );
        console.assert(
          typeof b.description === "string" && b.description.length > 0,
          `bot[${i}].description must be a non-empty string`
        );
        console.assert(
          typeof b.avatar === "string" && b.avatar.length > 0,
          `bot[${i}].avatar must be a non-empty string`
        );
      });
      console.log("✅ NovaBots self-tests passed");
    }
  }, [bots]);

  // Particle background effect
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "particle-canvas";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random(),
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.opacity += (Math.random() - 0.5) * 0.02;
        p.opacity = Math.min(Math.max(p.opacity, 0.2), 1);

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a2e] text-white relative overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-neutral-800 relative z-20 bg-neutral-950/80 backdrop-blur">
        <div className="flex items-center gap-2 text-xl font-bold border-b-2 border-neutral-700 pb-2">
          <motion.div
            animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Bot className="w-6 h-6 text-purple-400" />
          </motion.div>
          Alyan's Project Bot
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-purple-400 transition">Home</a>
          <a href="#" className="hover:text-purple-400 transition">Explore</a>
          <Button className="rounded-full shadow-lg px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">Login</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-12 py-20 border-y border-neutral-800 z-10">
        <div className="relative max-w-xl z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#7F00FF] to-[#E100FF] px-4 py-2 inline-block"
          >
            Create Your Own AI Bot
          </motion.h1>
          <p className="text-neutral-400 mb-6">
            Build and interact with unique AI characters.
          </p>
          <div className="flex gap-4" data-testid="hero-actions">
            {/* Primary pill gradient button */}
            <Button
              className="rounded-full px-6 py-3 text-base font-semibold shadow-lg shadow-purple-900/40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 focus-visible:ring-2 focus-visible:ring-purple-500/50"
            >
              Create Bot
            </Button>

            {/* Outlined pill with hover-fill animation */}
            <Button
              variant="outline"
              className="group relative overflow-hidden rounded-full px-6 py-3 text-base font-semibold border border-purple-500 text-black bg-white shadow-lg shadow-purple-900/20 hover:text-white focus-visible:ring-2 focus-visible:ring-purple-500/50"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 w-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ease-out group-hover:w-full"
              />
              <span className="relative">Explore Bots</span>
            </Button>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-10 md:mt-0 relative z-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-9xl"
          >
            🤖
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Bots */}
      <section className="relative px-12 py-10 z-10 bg-neutral-950/60">
        <h2 className="text-2xl font-semibold mb-6">Featured Bots</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bots.map((bot, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-full"
            >
              {/* Glassmorphic card */}
              <Card className="backdrop-blur-md bg-white/6 border border-white/10 rounded-[20px] h-full transition-transform duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(127,0,255,0.18)]">
                <CardContent className="p-6 flex flex-col items-center text-center h-full bg-transparent">
                  <div className="text-6xl mb-4">{bot.avatar}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{bot.name}</h3>
                  <p className="text-neutral-300 mb-4">{bot.description}</p>
                  <div className="mt-auto w-full flex justify-center">
                    <Button className="rounded-full shadow-lg px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">Chat</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
