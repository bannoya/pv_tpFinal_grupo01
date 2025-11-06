export default function Project4() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#0d1117", // o el color que quieras
        overflow: "hidden",
      }}
    >
      <iframe
        src="../public/projects/p4/index.html"
        width="100%"
        height="100%"
        style={{
          border: "none",
          outline: "none",
          display: "block",
        }}
        title="Proyecto 4"
      />
    </div>
  );
}
