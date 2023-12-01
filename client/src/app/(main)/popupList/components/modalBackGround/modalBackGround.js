import "./modalBackGround.scss";

export default function ModalBackGround({ setFilterModal }) {
  return (
    <div
      className="modalBackGround"
      onClick={() => {
        window.document.body.style.overflowY = "scroll";
        setFilterModal(false);
      }}
    ></div>
  );
}
