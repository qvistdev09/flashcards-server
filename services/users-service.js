const fetch = require('node-fetch');
const apiPath = process.env.OKTA_API_PATH;
const apiToken = process.env.OKTA_API_TOKEN;

const createUser = userObject => {
  console.log({ ...userObject, groupIds: ['00ggbhvqoWgm5Ptij5d6'] });
  return fetch(`${apiPath}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `SSWS ${apiToken}`,
    },
    body: JSON.stringify({ ...userObject, groupIds: ['00ggbhvqoWgm5Ptij5d6'] }),
  });
};

module.exports = { createUser };
