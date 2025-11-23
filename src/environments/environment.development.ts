export const environment = {
  apiBaseUrl: 'https://localhost:7009/api/',
  tokenR: `{
      headers: {

        'Authorization': this.cookieService.get('Authorization')}
    }`};
