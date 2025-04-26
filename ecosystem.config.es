module.exports = {
  apps: [{
    name: "elojimjadach-app",
    script: "npm",
    args: "run start -- -p 8081",
    cwd: "/home/elojimjadach.org/Fundacion-Elojim",
    autorestart: true,
    watch: false,
    max_memory_restart: "1G"
  }]
}
