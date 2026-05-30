import ErrorHeader from "./ErrorHeader"
import ErrorImage from "./ErrorImage"
import ErrorText from "./ErrorText"
import ErrorActions from "./ErrorActions"
import ErrorFooter from "./ErrorFooter"

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-app-surface-1 flex flex-col items-center px-6">
            <ErrorHeader />
            <ErrorImage />
            <ErrorText />
            <ErrorActions />
            <ErrorFooter />
        </div>
    )
}