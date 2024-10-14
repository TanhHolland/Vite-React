import './loading.css'; // Import CSS riêng để dễ chỉnh sửa

const LoadingComponent = () => {
  return (
    <div className="loading">
      <span>B</span>
      <span>N</span>
      <span>A</span>
      <span style={{marginLeft : "40px"}}>P</span>
      <span>T</span>
      <span>I</span>
      <span>T</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
}

export default LoadingComponent;