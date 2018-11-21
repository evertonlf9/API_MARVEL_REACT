import Utils from './Utils';

const getMarvel = (options) => {

  const marvelURL = Utils.getUrlApiMavel(),
        keys = Utils.GenerateKeys();

  const apiKey = keys.apikey,
        ts = keys.ts,
        hash = keys.hash;

  const {
    offset,
    name,
    title,
    exactMatch,
    sortName,
    limit,
    type,
    id,
  } = Object.assign({
    offset: 0,
    name: '',
    title: '',
    exactMatch: false,
    sortName: '',
    limit: 20,
  }, options);

  let url =
    `${marvelURL}${type}?ts=${ts}&apikey=${apiKey}&hash=${hash}&offset=${offset}&orderBy=${sortName}&limit=${limit}`;

  if (name) {
    if (exactMatch) { url += `&name=${name}`; }
    else { url += `&nameStartsWith=${name}`; }
  }

  if (title) {
      if (exactMatch) { url += `&title=${title}`; }
      else { url += `&titleStartsWith=${title}`; }
  }

    if (id) {
        url =  `${marvelURL}${type}/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
    }

  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          if (offset > resObj.data.total) {
            throw new Error('Page does not exist.');
          } else {
            const pages = Math.floor(resObj.data.total / limit);
            return {
              data: resObj.data.results,
              maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages,
            };
          }
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (e) {
        console.error(e);
        return {
          data: [],
          maxPage: 0,
        };
      }
    });
};

export {
    getMarvel,
};
