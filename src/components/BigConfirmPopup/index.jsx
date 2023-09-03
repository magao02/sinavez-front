import { useEffect } from "react";
import { Subtitle1, Title1 } from "../../styles/commonStyles";
import { BigCenteredPopup, ColorButton } from "./styles";

const BigConfirmPopup = ({ title, image, body, confirmText, cancelText, onConfirm, onCancel }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });
    // ran when the component is destroyed
    return () => {
      document.body.style.overflow = "";
    };
  });

  return <>
    <BigCenteredPopup>
      <div className="background" />
      <div className="container">
        <article>
          <header>
            <Title1>{title}</Title1>
          </header>
          <section>
            { image && <img src={image} /> }
            <Subtitle1>{body}</Subtitle1>
          </section>
          <footer>
            { cancelText && <ColorButton transparent onClick={() => onCancel()}>{cancelText}</ColorButton> }
            { confirmText && <ColorButton onClick={() => onConfirm()}>{confirmText}</ColorButton> }
          </footer>
        </article>
      </div>
    </BigCenteredPopup>
  </>;
};

export default BigConfirmPopup;