import { createRef } from "react";
import useLeadForm from "./useLeadForm";
import Loader from "../Loader";
import Field from "./Field";

export default function LeadForm(props) {
  const $form = createRef();
  const { isLoading, onSaveContact } = useLeadForm({
    ...props,
    $form
  });

  return (
    <div className="lead-form">
      <h1 className="title">Adicionar contato</h1>
      <form onSubmit={onSaveContact} className="form-wrapper" ref={$form}>
        <Field
          name="lead_name"
          inputProps={{
            placeholder: "Nome",
            autoFocus: true,
            maxLength: 40,
            type: "text"
          }}
        />
        <Field
          name="lead_phone"
          inputProps={{
            placeholder: "Telefone",
            maxLength: 13,
            type: "tel"
          }}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <input type="submit" value="Salvar" className="btn" />
        )}
      </form>
    </div>
  );
}
