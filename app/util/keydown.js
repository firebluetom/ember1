export default function handleAccessibleKeyDown(event, callback) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    callback?.();
  }
}
