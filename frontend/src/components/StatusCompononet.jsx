export default function StatusComponent({ status }) {
  return (
    <span
      className={
        status
          ? "flex w-4 h-4 bg-green-500 rounded-full"
          : "flex w-4 h-4 bg-red-500 rounded-full"
      }
    />
  );
}
