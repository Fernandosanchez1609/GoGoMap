import ErrorHeader404 from "./ErrorHeader404"
import ErrorImage404 from "./ErrorImage404"
import ErrorText404 from "./ErrorText404"
import ErrorActions404 from "./ErrorActions404"
import ErrorFooter404 from "./ErrorFooter404"

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-app-surface-1 flex flex-col items-center px-6">
            <ErrorHeader404 />
            <ErrorImage404 />
            <ErrorText404 />
            <ErrorActions404 />
            <ErrorFooter404 />
        </div>
    )
}