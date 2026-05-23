import ErrorHeader from "./ErrorHeader"
import ErrorImage from "./ErrorImage"

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-[#F5F5EE] flex flex-col items-center px-6">
            <ErrorHeader />
            <ErrorImage />
            {/* Aquí irá el Contenido principal */}
            {/* Aquí irá el Footer */}
        </div>
    )
}