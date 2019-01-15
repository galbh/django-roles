import fetch from 'isomorphic-fetch';

class HttpService {
  fetch(options) {
    const { url, method, body } = options;
    const headers = new Headers();

    if (options.contentType) {
      headers.append('Content-Type', options.contentType);
    }

    headers.append('X-CSRFTOKEN', this.getCookie('csrftoken'));

    return fetch(url, {
      method,
      headers,
      credentials: 'same-origin',
      body
    }).then((res) => {
      // handle success
      if (res.ok) {
        return res.text().then((text) => {
          if (text && this.isValidJsonString(text)) {
            return JSON.parse(text);
          }
          return text;
        });
      }
      // handle error
      return res.text().then((text) => {
        if (text && this.isValidJsonString(text)) {          
          const parsed = JSON.parse(text);
          throw new Error(parsed.detail || parsed);
        }
        throw new Error(text);
      });
    });
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  isValidJsonString(string) {
    /* eslint-disable */
    return /^[\],:{}\s]*$/.test(string.replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
    /* eslint-disable */
  }
}

export default new HttpService();
