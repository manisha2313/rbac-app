function Test() {
  // A STRING, like what would come from a database or API
  const value = '<b>hi</b><img src="x" onerror="alert(1)">';
const user = {
  name: "John Doe",
  website: "https://example.com",
};
  return (
    <div>
      <h3>Safe (plain text):</h3>
      <div>{value}</div>
<a href={user.website}>My website</a>
      <h3>Dangerous (raw HTML):</h3>
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

export default Test;