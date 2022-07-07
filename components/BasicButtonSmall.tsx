interface BasicButtonProps {
  buttonText: string
  onClick?: () => void
  type?: "submit"
}

const BasicButtonSmall = (props: BasicButtonProps) => {
  const { buttonText, onClick, type } = props

  return (
    <button className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-1 px-2 rounded transition-colors mx-2" onClick={onClick} type={type}>
      {buttonText}
    </button>
  )
}

export default BasicButtonSmall
