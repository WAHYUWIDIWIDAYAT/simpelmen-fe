import React, { useEffect, useState } from "react";
import FormDus from "./FormDus";
import FormStandingPouch from "./FormStandingPouch";
import FormSticker from "./FormSticker";

const FormSpecial = ({ data, type }) => {
  const [form, setForm] = useState();
  useEffect(() => {
    switch (type) {
      case "1":
        return setForm(<FormDus formData={data} />);
      case "2":
        return setForm(<FormStandingPouch formData={data} />);
      case "3":
        return setForm(<FormSticker formData={data} />);
      default:
        break;
    }
  }, [data, type]);
  return <>{form}</>;
};

export default FormSpecial;
