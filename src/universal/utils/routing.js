export const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err);
};

export const loadRoute = (cb) => {
  return (module) => {
    cb(null, module);
  }
};
