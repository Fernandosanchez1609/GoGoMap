// Estilos
const container = "w-full mt-5 flex justify-center"
const image = "w-72 rounded-2xl object-cover"

export default function ErrorImage() {
  return (
    <div className={container}>
      <img src="/assets/errorImages/error404.png" alt="Error 404" className={image} />
    </div>
  )
}