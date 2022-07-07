interface BasicButtonProps {
  buttonText: string
  onClick?: () => void
  type?: "submit"
}

const BasicButton = (props: BasicButtonProps) => {
  const { buttonText, onClick, type } = props

  return (
    <button className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition-colors mx-2" onClick={onClick} type={type}>
      {buttonText}
    </button>
  )
}

export default BasicButton
