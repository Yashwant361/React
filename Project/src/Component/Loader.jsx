export default function Loader() {
  return (
    <div className="row">
      {Array(8).fill("").map((_, i) => (
        <div className="col-md-3 mb-4" key={i}>
          <div className="card placeholder-glow">
            <div className="card-body">
              <p className="placeholder col-12"></p>
              <p className="placeholder col-8"></p>
              <p className="placeholder col-6"></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
