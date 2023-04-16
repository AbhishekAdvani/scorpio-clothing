const App = () => {
  return (
    <div className="categories-container">
      {/* 1 of 5 containers */}
      <div className="category-container">
        <div className="category-body-container">
          <h2>Hats</h2>
          <p>Shop Hats now</p>
        </div>
      </div>

      {/* 2 of 5 containers */}
      <div className="category-container">
        <div className="category-body-container">
          <h2>Jackets</h2>
          <p>Shop Jackets now</p>
        </div>
      </div>

      {/* 3 of 5 containers */}
      <div className="category-container">
        <div className="category-body-container">
          <h2>Sneakers</h2>
          <p>Shop Sneakers now</p>
        </div>
      </div>

      {/* 4 of 5 containers */}
      <div className="category-container">
        <div className="category-body-container">
          <h2>Womens</h2>
          <p>Shop Womens clothing now</p>
        </div>
      </div>

      {/* 5 of 5 containers */}
      <div className="category-container">
        <div className="category-body-container">
          <h2>Mens</h2>
          <p>Shop Mens clothing now</p>
        </div>
      </div>
    </div>
  );
};

export default App;
