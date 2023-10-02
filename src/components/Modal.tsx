type onCloseHandler = () => void;

interface ModalProps {
  visible: boolean
  onClose: onCloseHandler
  children: React.ReactNode
}

const Modal = ({visible, children, onClose}: ModalProps) => {
  return (
    <>
      {visible && 
        <>
          <div 
            onClick={onClose}
            style={fullscreenBlack}
          >
          </div> 
          <div style={modalContainer}>
              {children}
          </div>
        </>
      }
    </>
  )
}

const fullscreenBlack: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  height: "100%",
  width: "100%",
  backgroundColor: "black",
  color: "white",
  opacity: "0.5",
  zIndex: "8888"
}

const modalContainer: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#161617",
  borderRadius: "0.375rem",
  width: "800px",
  height: "800px",
  overflow: "auto",
  padding: "40px",
  zIndex: "9999"
}

export default Modal