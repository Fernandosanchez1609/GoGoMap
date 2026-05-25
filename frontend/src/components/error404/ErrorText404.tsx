// Estilos
const container = "w-full mt-2 flex flex-col items-center text-center gap-3"
const title = "text-3x1 font-black text-gray-900"
const subtitle = "text-base text-gray-500 max-w-xs"

export default function ErrorText404() {
    return (
        <div className={container}>
            <h1 className={title}>¡UPS! PÁGINA NO ENCONTRADA</h1>
            <p className={subtitle}>Parece que este punto no existe en el mapa.</p>
        </div>
    )
}