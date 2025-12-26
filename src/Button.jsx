const Button = ({ children, variation, btnType, clickAction }) => {
  const baseClass = "btn";
  let btnClass;
  if (variation === "standard") btnClass = "btn-standard";
  if (variation === "primary") btnClass = "btn-primary";
  if (variation === "secondary") btnClass = "btn-secondary";

  return (
    <button
      type={btnType}
      className={`${baseClass} ${btnClass}`}
      onClick={clickAction}
    >
      {children}
    </button>
  );
};
export default Button;
