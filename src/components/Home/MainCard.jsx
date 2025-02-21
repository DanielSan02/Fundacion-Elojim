import React from 'react'

function MainCard() {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/niños.jpg)' }}>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Fundación Elojim Jadach</h1>
            <p className="text-lg md:text-2xl text-white mb-6">Transformando vidas, construyendo futuros</p>
            <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition">Conoce más</button>
    </div>
  </div>

  )
}

export default MainCard