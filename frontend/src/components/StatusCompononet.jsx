export default function StatusComponent({ status }) {
  if (typeof status != 'string') {
    status = status == true ? 'true' : 'false'
  }
  return (
    <span
      className={
        (status === 'true')
          ? "flex w-4 h-4 bg-green-500 rounded-full"
          : "flex w-4 h-4 bg-red-500 rounded-full"
      }
    />
  );
}
