// Estilos
const container = "w-full mt-10 flex justify-center"
const image = "w-72 rounded-2xl object-cover"

export default function ErrorImage() {
  return (
    <div className={container}>
      <img src="/assets/errorImages/errorGeneral.png" alt="Error General" className={image} />
    </div>
  )
}