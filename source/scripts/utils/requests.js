const requestAjax = (action, body) => {
  return fetch(action, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then(res => res.json())
}

export default requestAjax