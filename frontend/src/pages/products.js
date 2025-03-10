import "../index.css";

export default function ProductsComponent() {
  return (
    <div className="flex flex-col justify-center items-center text-black p-10">
      <h1 className="text-3xl font-extrabold tracking-wide text-gray-900">
        All Products
      </h1>
      <div style={{ width: "100%", minWidth: "300px", overflowX: "auto" }}>
        <table style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Product 1</td>
              <td>$9.99</td>
              <td>2025-09-03</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
