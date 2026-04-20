import { hoverBgFx, scaleFx } from "../../constants/styles";

const ActionButton = ({
  className = "",
  itemId,
  items = [],
  addMutation,
  removeMutation,
  isInListFn,
  variant = "toggle",
  onRemoveStart,
  onRemoveEnd,
  icons,
  disabled = false,
}) => {
  const isInList = isInListFn(items, itemId);

  const isLoading = addMutation?.isPending || removeMutation?.isPending;

  const handleClick = () => {
    if (isLoading || disabled) return;

    if (variant === "remove") {
      onRemoveStart?.();

      if (isInList) {
        removeMutation.mutate(itemId, {
          onSettled: () => {
            onRemoveEnd?.();
          },
        });
      }
      return;
    }

    if (isInList) {
      removeMutation.mutate(itemId);
    } else {
      addMutation.mutate(itemId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`w-full flex items-center justify-center ${className} ${scaleFx("sm")}`}
    >
      {variant === "remove" ? icons.remove : icons.toggle(isInList, isLoading)}
    </button>
  );
};

export default ActionButton;
