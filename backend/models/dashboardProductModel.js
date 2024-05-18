import connection from '../database/connection.js';

const createProduct = {
  insert: (name, description, price, image, subCategoryId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO Products (name, description, price, image, subCategoryId) VALUES (?, ?, ?, ?, ?)',
        [name, description, price, image, subCategoryId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.affectedRows > 0);
          }
        }
      );
    });
  }
};

const updateProductModel = (id, product) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE Products SET ? WHERE id = ?', [product, id], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

const removeProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM Products WHERE id = ?', id, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

const retrieveProducts = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Products', (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};


export {
    createProduct,
    updateProductModel,
    removeProduct,
    retrieveProducts
};