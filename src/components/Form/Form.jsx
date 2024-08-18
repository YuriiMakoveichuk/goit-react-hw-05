import { useState } from "react";
import { ImSearch } from "react-icons/im";
import toast from "react-hot-toast";

import css from "./Form.module.css";

const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return toast.success("Please enter what you want to find");
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <form className={css.box} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={query}
        onChange={handleChange}
      />
      <button className={css.btn}>
        <span className={css.spanBtn}>Search</span>
        <ImSearch />
      </button>
    </form>
  );
};

export default Form;
