class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=c90b0cce2ce30333e33c648ba9521627';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error('Could not fetch $(url), status: $res.status');
    }
    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}/characters?limit=9&offset=210&${this._apiKey}`,
    );
    return this._trensformCharacter(res);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
    return this._trensformCharacter(res);
  };

  _trensformCharacter = (res) => {
    const char = res.data.results[0];
    return {
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : 'Для этого героя характеристики нет',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
