import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

import css from "./GoBackBtn.module.css";

const GoBackBtn = ({ backLinkRef }) => {
  return (
    <>
      <Link className={css.btn} to={backLinkRef.current}>
        <GoArrowLeft />
        <span className={css.span}>Go back</span>
      </Link>
    </>
  );
};

export default GoBackBtn;
