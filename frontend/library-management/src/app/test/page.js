"use client";

export default function Test() {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/test.php");

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-10">
      <button onClick={fetchData} style={{ cursor: "pointer" }}>
        Test
      </button>
    </div>
  );
}
