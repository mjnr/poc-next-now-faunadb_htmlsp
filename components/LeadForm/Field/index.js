export default function Field({ label = "", name = "", inputProps = {} }) {
  return (
    <div className="field">
      <input name={name} id={`field_${name}`} {...inputProps} />
    </div>
  );
}
