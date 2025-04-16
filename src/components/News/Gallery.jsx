'use client';
import { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import Image from 'next/image';

const Gallery = ({ images }) => {
    const [toggler, setToggler] = useState(false);
    const [index, setIndex] = useState(0);

    if (!images || images.length === 0) {
        return <p className="text-center">No hay imágenes disponibles.</p>;
    }

    const handleImageClick = (i) => {
        setIndex(i);
        setToggler(false); // 🔹 Apagar el lightbox antes de encenderlo nuevamente
        setTimeout(() => setToggler(true), 50); // 🔹 React detecta mejor el cambio si hay una pausa
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 max-w-5xl mx-auto h-[50vh] md:h-[60vh]" data-testid="gallery">
            {/* Imagen principal grande */}
            <div className="md:col-span-2 row-span-2 rounded-lg overflow-hidden h-full" data-testid="main-image">
                <Image
                    width={1920}
                    height={1080}
                    src={images[0]}
                    alt="Imagen principal"
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(0)}
                    data-testid="image-0"
                />
            </div>

            {/* Imágenes pequeñas */}
            {images.slice(1, 5).map((img, i) => (
                <div key={i} className="rounded-lg overflow-hidden h-full" data-testid={`small-image-${i + 1}`}>
                    <Image
                        width={1920}
                        height={1080}
                        src={img}
                        alt={`Imagen ${i + 1}`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onClick={() => handleImageClick(i + 1)}
                        data-testid={`image-${i + 1}`}
                    />
                </div>
            ))}

            {/* Lightbox para ver las imágenes en grande */}
            <FsLightbox
                toggler={toggler}
                sources={images}
                key={index} // 🔹 Forzar re-render para que cargue la imagen correcta
                slide={index + 1} // FsLightbox usa índices basados en 1, no en 0
                data-testid="lightbox"
            />
        </div>
    );
};

export default Gallery;