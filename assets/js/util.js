class util {
  getQuery() {
    const query = new URLSearchParams(location.search);
    return Object.fromEntries(query);
  }
}

const utilHelper = new util();